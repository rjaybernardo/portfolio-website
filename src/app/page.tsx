import Image from "next/image";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { ClientNames, StoreList } from "@/components/store-list";
import { processSteps, skills, toolkit } from "@/lib/process";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const initials = site.name
  .split(" ")
  .map((w) => w[0])
  .filter((_, i, all) => i === 0 || i === all.length - 1)
  .join("");

function Icon({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

function Panel({
  id,
  title,
  meta,
  className = "",
  delay = 0,
  children,
}: {
  id?: string;
  title: string;
  meta?: React.ReactNode;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{ animationDelay: `${delay}ms` }}
      className={`rise flex min-h-0 scroll-mt-4 flex-col rounded-2xl border border-line bg-surface/85 p-4 shadow-sm shadow-orange-950/[0.03] backdrop-blur ${className}`}
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
    <main className="mx-auto flex max-w-[1680px] flex-col gap-3 p-3 sm:p-4 dash:grid dash:h-dvh dash:grid-cols-12 dash:grid-rows-[auto_minmax(0,1.7fr)_minmax(0,1fr)] dash:overflow-hidden">
      {/* Profile sidebar */}
      <aside className="rise flex min-h-0 flex-col gap-5 rounded-2xl border border-line bg-surface/85 p-5 shadow-sm shadow-orange-950/[0.03] backdrop-blur dash:col-span-3 dash:row-span-3">
        <div className="flex items-center gap-4">
          {site.photo ? (
            <Image
              src={site.photo}
              alt={site.name}
              width={160}
              height={160}
              preload
              className="size-20 shrink-0 rounded-2xl object-cover shadow-lg ring-4 shadow-orange-700/20 ring-accent-soft dash-short:size-16"
            />
          ) : (
            <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#c2410c] to-[#f59e0b] text-2xl font-semibold text-white shadow-lg ring-4 shadow-orange-700/20 ring-accent-soft dash-short:size-16 dash-short:text-xl">
              {initials}
            </span>
          )}
          <div className="min-w-0">
            <h1 className="text-lg leading-tight font-semibold tracking-tight">{site.name}</h1>
            <p className="mt-1 text-sm font-medium text-accent">{site.role}</p>
            <div className="mt-2 flex gap-1.5">
              <a
                href={site.github}
                className="rounded-lg border border-line bg-surface px-2 py-1 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
              >
                GitHub ↗
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  className="rounded-lg border border-line bg-surface px-2 py-1 text-xs font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted dash-short:line-clamp-4">{site.intro}</p>

        <div className="scroll-quiet flex min-h-0 flex-1 flex-col gap-4 border-t border-line pt-4 pb-6 dash:overflow-y-auto dash:[mask-image:linear-gradient(to_bottom,black_calc(100%-2.5rem),transparent)]">
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

        {site.email && (
          <a href={`mailto:${site.email}`} className="truncate font-mono text-[11px] text-muted hover:text-accent">
            {site.email}
          </a>
        )}
      </aside>

      {/* Hero: the one dark card, so the eye lands here first */}
      <section
        style={{ animationDelay: "60ms" }}
        className="rise relative isolate order-first overflow-hidden rounded-2xl bg-ink p-6 dash:order-none text-white shadow-xl shadow-orange-950/15 dash:col-span-9 dash:px-6 dash:py-5"
      >
        <span aria-hidden className="pointer-events-none absolute -top-24 -right-16 -z-10 size-96 rounded-full bg-[#ea580c]/35 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 size-80 rounded-full bg-[#f59e0b]/15 blur-3xl" />

        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 dash-short:hidden">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#fb923c] opacity-70 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-[#fb923c]" />
          </span>
          Available for Shopify projects and roles
        </p>
        <p className="mt-3 max-w-4xl text-3xl leading-[1.1] font-semibold tracking-tight text-balance xl:text-[2.4rem] dash-short:mt-0 dash-short:text-[1.9rem]">
          Shopify stores and apps that take the{" "}
          <span className="bg-gradient-to-r from-[#fb923c] to-[#fcd34d] bg-clip-text text-transparent">busywork</span> off a
          merchant&apos;s plate.
        </p>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex shrink-0 flex-wrap gap-2">
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-600/30 transition-colors hover:bg-[#ea580c]"
              >
                <Icon d="M3 6h18v12H3zM3 7l9 6 9-6" />
                Get in touch
              </a>
            )}
            <a
              href="#apps"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 dash-short:hidden"
            >
              See my apps ↓
            </a>
          </div>

          {/* Services */}
          <ul aria-label="Services" className="flex flex-wrap gap-1.5 lg:justify-end">
            {skills.map((skill) => (
              <li
                key={skill.title}
                title={skill.body}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] py-1 pr-3 pl-1.5 text-xs font-medium text-white/90"
              >
                <span className="grid size-5 place-items-center rounded-full bg-[#ea580c]/25 text-[#fdba74]">
                  <Icon d={skill.icon} className="size-3" />
                </span>
                {skill.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:gap-5">
          <p className="shrink-0 font-mono text-[11px] tracking-widest text-white/45 uppercase">Stores I&apos;ve worked on</p>
          <ClientNames />
        </div>
      </section>

      {/* Apps */}
      <Panel id="apps" title="Apps" meta="Embedded admin apps · open one for the case study" delay={200} className="dash:col-span-9">
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
                className="group relative flex h-full min-h-40 flex-col justify-end gap-1 overflow-hidden rounded-xl bg-gradient-to-br from-[#c2410c] via-[#ea580c] to-[#f59e0b] p-4 text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-600/25 dash:min-h-0"
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
                <h3 className="text-sm leading-snug font-medium dash-short:truncate">{s.title}</h3>
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
