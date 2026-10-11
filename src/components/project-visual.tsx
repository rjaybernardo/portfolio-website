import Image from "next/image";

import type { Project } from "@/lib/projects";

// The bulk editor has no product screenshots yet, so it shows a sample preview
// of the before → after diff the app produces instead.
const sampleDiff = [
  { field: "Price", before: "$40.00", after: "$31.99" },
  { field: "Compare-at", before: "—", after: "$40.00" },
  { field: "Tags", before: "leather", after: "leather, sale" },
  { field: "Status", before: "Draft", after: "Active" },
];

// `fill` stretches the visual to its parent (dashboard thumbnails); otherwise it keeps a 16:10 frame.
export function ProjectVisual({
  project,
  priority,
  fill,
  sizes = "(min-width: 1024px) 480px, 100vw",
}: {
  project: Project;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}) {
  const frame = fill ? "h-full w-full" : "aspect-[16/10] w-full";
  const shot = project.screenshots[0];
  if (shot) {
    return (
      <Image
        src={shot.src}
        alt={shot.alt}
        placeholder="blur"
        priority={priority}
        sizes={sizes}
        className={`${frame} object-cover object-top-left`}
      />
    );
  }
  const rows = fill ? sampleDiff.slice(0, 2) : sampleDiff;
  return (
    <div
      className={`${frame} flex flex-col justify-center gap-1.5 bg-accent-soft font-mono ${fill ? "p-3 text-[10px] dash-short:[&>div:nth-child(n+2)]:hidden" : "gap-2 p-5 text-[11px] sm:p-8 sm:text-xs"}`}
    >
      {!fill && <p className="mb-1 text-muted">Preview · vendor = &quot;RGB Leather&quot; · −20 %, round to .99</p>}
      {rows.map((row) => (
        <div
          key={row.field}
          className={`grid items-center gap-1.5 rounded-md border border-line bg-surface ${fill ? "grid-cols-[1fr_auto_1fr] px-2 py-1" : "grid-cols-[6rem_1fr_auto_1fr] px-3 py-2"}`}
        >
          {!fill && <span className="text-muted">{row.field}</span>}
          <span className="truncate line-through decoration-muted/60">{row.before}</span>
          <span className="text-muted">→</span>
          <span className="truncate font-medium text-accent">{row.after}</span>
        </div>
      ))}
    </div>
  );
}
