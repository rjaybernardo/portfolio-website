-- Shopify stores shown in the "Recent stores" section.
CREATE TABLE IF NOT EXISTS stores (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  url         text NOT NULL,
  role        text,                 -- e.g. "Theme development", "Custom app"
  summary     text,                 -- one or two sentences on what you did
  tags        text[] NOT NULL DEFAULT '{}',
  image_url   text,                 -- optional screenshot or logo URL
  period      text,                 -- e.g. "2026" or "Mar–Jun 2026"
  sort_order  integer NOT NULL DEFAULT 0,  -- higher shows first
  published   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);
