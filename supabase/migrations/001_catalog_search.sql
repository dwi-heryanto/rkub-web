-- Full-text search support for Payload products
-- Adjust table/column names to match Payload schema if needed.

create extension if not exists pg_trgm;

create index if not exists products_search_idx on products using gin (
  to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(array_to_string(aliases, ' '), '') || ' ' || coalesce(array_to_string(tags, ' '), '') || ' ' || coalesce(category, ''))
);

create index if not exists products_name_trgm_idx on products using gin (name gin_trgm_ops);
