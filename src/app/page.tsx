import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { StoreList } from "@/components/store-list";
import { processSteps, toolkit } from "@/lib/process";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 leading-relaxed text-muted">{children}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] opacity-60"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="size-2 rounded-full bg-accent" />
            {site.role}
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            Shopify apps that take the busywork off a merchant&apos;s plate.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{site.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#apps"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              See the apps
            </Link>
            <Link
              href="#process"
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              How I work
            </Link>
          </div>
          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              ["4", "embedded Shopify apps"],
              ["2026-07", "Admin GraphQL API"],
              ["Polaris", "web components UI"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-3xl sm:text-4xl">{value}</dd>
                <dd className="mt-1 text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="apps" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading eyebrow="Apps" title="Things I've built for Shopify merchants">
          Each one is an embedded admin app with its own case study: the problem, what it does, and the math and API
          calls behind it.
        </SectionHeading>
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-black/5"
              >
                <div className="overflow-hidden border-b border-line">
                  <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                    <ProjectVisual project={project} priority={i < 2} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-xl font-medium tracking-tight">{project.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">{project.tagline}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent">
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="pt-2 text-sm font-medium text-accent">Read the case study →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="process" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHeading eyebrow="How I work" title="How I build on Shopify">
            The same habits run through every app, whether it touches discounts, inventory, checkout or the product
            catalog.
          </SectionHeading>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s) => (
              <li key={s.step} className="flex flex-col gap-3 bg-surface p-6">
                <span className="font-mono text-sm text-accent">{s.step}</span>
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {toolkit.map((t) => (
              <div key={t.group}>
                <h3 className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">{t.group}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {t.items.map((item) => (
                    <li key={item} className="rounded-md border border-line px-2.5 py-1 text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stores" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading eyebrow="Client work" title="Stores I've worked on recently" />
        <StoreList />
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Need an app or a hand with your store?
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                {site.email}
              </a>
            )}
            <a
              href={site.github}
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
            >
              GitHub
            </a>
            {site.linkedin && (
              <a
                href={site.linkedin}
                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
