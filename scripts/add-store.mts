import { parseArgs } from "node:util";

import { connect } from "./db.mjs";

const { values } = parseArgs({
  options: {
    name: { type: "string" },
    url: { type: "string" },
    role: { type: "string" },
    summary: { type: "string" },
    tags: { type: "string" },
    image: { type: "string" },
    repo: { type: "string" },
    period: { type: "string" },
    order: { type: "string", default: "0" },
  },
});

if (!values.name || !values.url) {
  console.error(
    'Usage: npm run store:add -- --name "Store" --url https://store.com [--role "Theme development"] ' +
      '[--summary "..."] [--tags "Liquid,Theme"] [--image https://...] [--repo https://github.com/...] ' +
      '[--period 2026] [--order 10]',
  );
  process.exit(1);
}

const tags = values.tags ? values.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
const client = await connect();
const { rows } = await client.query(
  `INSERT INTO stores (name, url, role, summary, tags, image_url, repo_url, period, sort_order)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
   RETURNING id`,
  [values.name, values.url, values.role ?? null, values.summary ?? null, tags, values.image ?? null,
   values.repo ?? null, values.period ?? null, Number(values.order)],
);
await client.end();
const row = rows[0];
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
