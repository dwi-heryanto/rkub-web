import { createPostgresSearchQuery } from "@/lib/search";

export function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  };
}

export function createCatalogFtsWhereClause() {
  return "to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(array_to_string(aliases, ' '), '') || ' ' || coalesce(array_to_string(tags, ' '), '') || ' ' || coalesce(category, '')) @@ to_tsquery('simple', ?)";
}

export function createCatalogFtsSqlParam(query: string) {
  return createPostgresSearchQuery(query);
}

export function createCatalogFtsSql(query: string) {
  const tsQuery = createPostgresSearchQuery(query);
  return {
    whereClause: createCatalogFtsWhereClause(),
    params: [tsQuery],
  };
}
