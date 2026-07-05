import { NextResponse } from "next/server";

import { getProducts } from "@/lib/cms";
import { autocomplete, searchProducts } from "@/lib/search";
import type { Product } from "@/types/catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || undefined;
  const mode = searchParams.get("mode") || "search";
  const limit = Number(searchParams.get("limit") || 12);
  const page = Number(searchParams.get("page") || 1);

  const products = await getProducts();

  if (mode === "autocomplete") {
    return NextResponse.json({ suggestions: autocomplete(products, query) });
  }

  const results = searchProducts(products, query, category as Product["category"] | undefined).map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    unitPrice: product.unitPrice,
    image: product.image,
    category: product.category,
  }));

  const start = (page - 1) * limit;
  const paged = results.slice(start, start + limit);

  return NextResponse.json({
    total: results.length,
    page,
    limit,
    results: paged,
  });
}
