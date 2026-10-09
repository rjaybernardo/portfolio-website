import { readFileSync } from "node:fs";

import { connect } from "./db.mjs";

const client = await connect();
await client.query(readFileSync("db/schema.sql", "utf8"));
await client.end();
console.log("stores table is ready");
