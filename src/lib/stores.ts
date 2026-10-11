import { cacheLife, cacheTag } from "next/cache";

import { getSql } from "@/lib/db";

export type Store = {
  id: number;
  name: string;
  url: string;
  role: string | null;
  summary: string | null;
  tags: string[];
  image_url: string | null;
  repo_url: string | null;
  period: string | null;
};

export async function getStores(): Promise<Store[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("stores");

  const sql = getSql();
  if (!sql) return [];
  try {
    return (await sql`
      SELECT id, name, url, role, summary, tags, image_url, repo_url, period
      FROM stores
      WHERE published
      ORDER BY sort_order DESC, created_at DESC
    `) as Store[];
  } catch (error) {
    console.error("Failed to load stores", error);
    return [];
  }
}
