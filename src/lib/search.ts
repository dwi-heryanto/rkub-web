import type { Product } from "@/types/catalog";

const MAX_LENGTH_DIFFERENCE = 3;
const MAX_EDIT_DISTANCE = 2;
const MAX_TYPO_TOKEN_LENGTH = 64;

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }

  return matrix[b.length][a.length];
}

function searchableTokens(product: Product) {
  return [product.name, product.category, ...product.aliases, ...product.tags].map(normalize);
}

export function searchProducts(products: Product[], query: string, category?: Product["category"]) {
  const q = normalize(query);
  const filteredByCategory = category ? products.filter((product) => product.category === category) : products;

  if (!q) return filteredByCategory;

  return filteredByCategory
    .map((product) => {
      const tokens = searchableTokens(product);
      const exact = tokens.some((token) => token.includes(q));
      const typoMatch = tokens.some((token) => {
        if (token.length > MAX_TYPO_TOKEN_LENGTH || q.length > MAX_TYPO_TOKEN_LENGTH) return false;
        if (Math.abs(token.length - q.length) > MAX_LENGTH_DIFFERENCE) return false;
        return levenshtein(token, q) <= MAX_EDIT_DISTANCE;
      });
      return {
        product,
        score: exact ? 2 : typoMatch ? 1 : 0,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
    .map((entry) => entry.product);
}

export function autocomplete(products: Product[], query: string, limit = 5) {
  const q = normalize(query);
  if (!q) return [];

  const names = products.flatMap((product) => [product.name, ...product.aliases]).filter((value) => normalize(value).includes(q));

  return [...new Set(names)].slice(0, limit);
}

export function createPostgresSearchQuery(query: string) {
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => `${token}:*`)
    .join(" & ");
}
