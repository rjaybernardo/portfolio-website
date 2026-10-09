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

export function ProjectVisual({ project, priority }: { project: Project; priority?: boolean }) {
  const shot = project.screenshots[0];
  if (shot) {
    return (
      <Image
        src={shot.src}
        alt={shot.alt}
        placeholder="blur"
        priority={priority}
        sizes="(min-width: 1024px) 480px, 100vw"
        className="aspect-[16/10] w-full object-cover object-top"
      />
    );
  }
  return (
    <div className="flex aspect-[16/10] w-full flex-col justify-center gap-2 bg-accent-soft p-5 font-mono text-[11px] sm:p-8 sm:text-xs">
      <p className="mb-1 text-muted">Preview · vendor = &quot;RGB Leather&quot; · −20 %, round to .99</p>
      {sampleDiff.map((row) => (
        <div
          key={row.field}
          className="grid grid-cols-[6rem_1fr_auto_1fr] items-center gap-2 rounded-md border border-line bg-surface px-3 py-2"
        >
          <span className="text-muted">{row.field}</span>
          <span className="truncate line-through decoration-muted/60">{row.before}</span>
          <span className="text-muted">→</span>
          <span className="truncate font-medium text-accent">{row.after}</span>
        </div>
      ))}
    </div>
  );
}
