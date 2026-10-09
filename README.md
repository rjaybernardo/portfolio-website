# portfolio-website

Shopify developer portfolio built with Next.js 16 (Cache Components), Tailwind CSS 4 and Neon Postgres, deployed on Vercel.

- **Apps**: the four Shopify apps live in `src/lib/projects.ts`, with screenshots in `src/content/screenshots/`. Each has a case-study page at `/projects/<slug>`.
- **How I work**: process steps and toolkit in `src/lib/process.ts`.
- **Stores**: the "Stores I've worked on recently" section is read from the `stores` table in Neon.
- **Name, intro, contact links**: `src/lib/site.ts`.

## Setup

```sh
npm install
cp .env.example .env.local   # fill in DATABASE_URL from Neon
npm run db:setup             # creates the stores table
npm run dev
```

## Deploy (Vercel + Neon)

1. Import the GitHub repo in Vercel.
2. In the project, open **Storage → Connect Database → Neon** (creates the database and sets `DATABASE_URL`).
3. Add `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-site.vercel.app`) and `REVALIDATE_SECRET` (any random string) under **Settings → Environment Variables**, then redeploy.
4. Pull the env locally with `vercel env pull .env.local` (or copy `DATABASE_URL` by hand) and run `npm run db:setup` once.

## Adding a store

From the command line:

```sh
npm run store:add -- --name "Store name" --url https://store.com \
  --role "Theme development" --summary "Rebuilt the PDP and cart drawer." \
  --tags "Liquid,Online Store 2.0" --period 2026 --order 10
```

Or in the Neon SQL editor:

```sql
INSERT INTO stores (name, url, role, summary, tags, period, sort_order)
VALUES ('Store name', 'https://store.com', 'Theme development',
        'Rebuilt the PDP and cart drawer.', ARRAY['Liquid', 'Online Store 2.0'], '2026', 10);
```

Stores are ordered by `sort_order` (highest first). Set `published = false` to hide one, and `image_url` to show a screenshot.

The page caches stores for up to an hour. `store:add` refreshes the live site automatically when `NEXT_PUBLIC_SITE_URL` and `REVALIDATE_SECRET` are in `.env.local`; after editing in the SQL editor, run:

```sh
curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://your-site.vercel.app/api/revalidate
```
