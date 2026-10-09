import { revalidateTag } from "next/cache";

// Call after adding or editing stores in Neon:
//   curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://<site>/api/revalidate
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag("stores", { expire: 0 });
  return Response.json({ ok: true });
}
