import Link from "next/link";

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/" className="text-sm text-muted">← All projects</Link>
      <p role="status" className="mt-12 text-muted">Loading case study…</p>
    </main>
  );
}
