import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { StoreList } from "@/components/store-list";
import { processSteps, toolkit } from "@/lib/process";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const initials = site.name
  .split(" ")
  .map((w) => w[0])
  .filter((_, i, all) => i === 0 || i === all.length - 1)
  .join("");

const stats = [
  { value: String(projects.length), label: "Embedded Shopify apps", icon: "M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v5H4zM13 14h7v5h-7z" },
  { value: "2026-07", label: "Admin GraphQL API", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 3v18M4 7.5l16 9M20 7.5l-16 9" },
  { value: String(toolkit[0].items.length), label: "Shopify APIs in use", icon: "M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" },
  { value: "Polaris", label: "Web components UI", icon: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" },
];

function Icon({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

function Panel({
  title,
  meta,
  className = "",
  delay = 0,
  children,
}: {
  title: string;
  meta?: React.ReactNode;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{ animationDelay: `${delay}ms` }}
      className={`rise flex min-h-0 flex-col rounded-2xl border border-line bg-surface/85 p-4 shadow-sm shadow-black/[0.03] backdrop-blur ${className}`}
    >
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {meta && <span className="truncate text-xs text-muted">{meta}</span>}
      </header>
      <div className="scroll-quiet min-h-0 flex-1 dash:overflow-y-auto">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex max-w-[1680px] flex-col gap-3 p-3 sm:p-4 dash:grid dash:h-dvh dash:grid-cols-12 dash:grid-rows-[auto_minmax(0,1.3fr)_minmax(0,1fr)] dash:overflow-hidden">
      {/* Profile sidebar */}
      <aside className="rise flex min-h-0 flex-col gap-5 rounded-2xl border border-line bg-surface/85 p-5 shadow-sm shadow-black/[0.03] backdrop-blur dash:col-span-3 dash:row-span-3">
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 text-lg font-semibold text-white shadow-md shadow-emerald-500/20">
            {initials}
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight">{site.name}</h1>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.role}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[1.35rem] leading-snug font-semibold tracking-tight">
            Shopify apps that take the busywork off a merchant&apos;s plate.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{site.intro}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              <Icon d="M3 6h18v12H3zM3 7l9 6 9-6" />
              Get in touch
            </a>
          )}
          <a
            href={site.github}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
          >
            GitHub ↗
          </a>
          {site.linkedin && (
            <a
              href={site.linkedin}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              LinkedIn ↗
            </a>
          )}
        </div>

        <div className="scroll-quiet flex min-h-0 flex-1 flex-col gap-4 border-t border-line pt-4 dash:overflow-y-auto">
          {toolkit.map((t) => (
            <div key={t.group}>
              <h2 className="mb-2 font-mono text-[11px] tracking-widest text-muted uppercase">{t.group}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {t.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-surface-2 px-2 py-0.5 text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {site.email && <p className="truncate font-mono text-[11px] text-muted">{site.email}</p>}
      </aside>

      {/* KPI row */}
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 dash:col-span-9">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{ animationDelay: `${60 + i * 40}ms` }}
            className="rise flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface/85 p-4 sm:flex-row sm:items-center shadow-sm shadow-black/[0.03] backdrop-blur"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Icon d={s.icon} className="size-5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-muted sm:truncate">{s.label}</dt>
              <dd className="truncate text-xl font-semibold tracking-tight">{s.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {/* Apps */}
      <Panel title="Apps" meta="Embedded admin apps · open one for the case study" delay={200} className="dash:col-span-9">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 dash:h-full dash:grid-rows-2">
          {projects.map((project, i) => (
            <li key={project.slug} className="min-h-0">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col gap-2.5 rounded-xl border border-line bg-surface-2 p-2 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-black/5"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-lg border border-line dash:aspect-auto dash:min-h-0 dash:flex-1">
                  <div className="h-full transition-transform duration-500 group-hover:scale-[1.04]">
                    <ProjectVisual project={project} priority={i < 3} fill sizes="(min-width: 1024px) 400px, 100vw" />
                  </div>
                </div>
                <div className="flex min-w-0 shrink-0 flex-col gap-1 px-1 pb-1">
                  <h3 className="flex items-center justify-between gap-2 text-sm font-semibold tracking-tight">
                    <span className="truncate">{project.name}</span>
                    <span className="text-accent transition-transform group-hover:translate-x-0.5">→</span>
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted dash-short:line-clamp-1">{project.tagline}</p>
                  <ul className="flex flex-wrap gap-1 pt-1 dash:hidden">
                    {project.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] text-accent">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
          {site.email && (
            <li className="min-h-0">
              <a
                href={`mailto:${site.email}`}
                className="group relative flex h-full min-h-40 flex-col justify-end gap-1 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 p-4 text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 dash:min-h-0"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125"
                />
                <span className="relative text-lg leading-snug font-semibold tracking-tight">Need an app for your store?</span>
                <span className="relative flex items-center justify-between gap-2 text-sm text-white/85">
                  Tell me what you do by hand today
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            </li>
          )}
        </ul>
      </Panel>

      {/* How I work */}
      <Panel title="How I work" meta="Habits behind every app" delay={260} className="dash:col-span-6">
        <ol className="grid gap-2 sm:grid-cols-2 dash:h-full dash:grid-rows-3">
          {processSteps.map((s) => (
            <li key={s.step} title={s.body} className="flex min-h-0 gap-3 overflow-hidden rounded-xl bg-surface-2 p-3 dash-short:items-center dash-short:py-2">
              <span className="font-mono text-xs text-accent dash-short:self-start dash-short:pt-0.5">{s.step}</span>
              <div className="min-w-0">
                <h3 className="text-sm leading-snug font-medium">{s.title}</h3>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted dash-short:hidden">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>

      {/* Client work */}
      <Panel title="Client work" meta="Stores I've worked on recently" delay={320} className="dash:col-span-3">
        <StoreList />
      </Panel>
    </main>
  );
}
