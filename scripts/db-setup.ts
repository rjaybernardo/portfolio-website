import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set (add it to .env.local)");

const sql = neon(url);
await sql.query(readFileSync("db/schema.sql", "utf8"));
console.log("stores table is ready");
