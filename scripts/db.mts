import dns from "node:dns";
import net from "node:net";
import pg from "pg";

// Node gives each address 250 ms before trying the next one, which is shorter than
// the round trip to Neon from far-away regions, so every attempt gets cut off.
dns.setDefaultResultOrder("ipv4first");
net.setDefaultAutoSelectFamilyAttemptTimeout(5000);

export async function connect() {
  const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (run `vercel env pull .env.local`)");
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  return client;
}
