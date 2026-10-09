import { parseArgs } from "node:util";
import { neon } from "@neondatabase/serverless";

const { values } = parseArgs({
  options: {
    name: { type: "string" },
    url: { type: "string" },
    role: { type: "string" },
    summary: { type: "string" },
    tags: { type: "string" },
    image: { type: "string" },
    period: { type: "string" },
    order: { type: "string", default: "0" },
  },
});

if (!values.name || !values.url) {
  console.error(
    'Usage: npm run store:add -- --name "Store" --url https://store.com [--role "Theme development"] ' +
      '[--summary "..."] [--tags "Liquid,Theme"] [--image https://...] [--period 2026] [--order 10]',
  );
  process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set (add it to .env.local)");
const sql = neon(url);

const tags = values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
const [row] = await sql`
  INSERT INTO stores (name, url, role, summary, tags, image_url, period, sort_order)
  VALUES (${values.name}, ${values.url}, ${values.role ?? null}, ${values.summary ?? null},
          ${tags}, ${values.image ?? null}, ${values.period ?? null}, ${Number(values.order)})
  RETURNING id
`;
console.log(`Added store #${row.id}: ${values.name}`);

const site = process.env.NEXT_PUBLIC_SITE_URL;
const secret = process.env.REVALIDATE_SECRET;
if (site && secret) {
  const res = await fetch(`${site}/api/revalidate`, {
    method: "POST",
    headers: { authorization: `Bearer ${secret}` },
  });
  console.log(res.ok ? `Revalidated ${site}` : `Revalidate failed: ${res.status}`);
}
