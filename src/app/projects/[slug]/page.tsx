import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const [hero, ...rest] = project.screenshots;

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/" className="inline-flex items-center rounded-xl border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-foreground">
        ← Dashboard
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">Case study · Embedded Shopify app</p>
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.repo}
            className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            View the code ↗
          </a>
        </div>
      </header>

      <figure className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface">
        {hero ? (
          <Image src={hero.src} alt={hero.alt} placeholder="blur" priority sizes="(min-width: 1024px) 1024px, 100vw" />
        ) : (
          <ProjectVisual project={project} priority />
        )}
        {hero && <figcaption className="border-t border-line px-5 py-3 text-sm text-muted">{hero.caption}</figcaption>}
      </figure>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
        <p className="text-lg leading-relaxed">{project.problem}</p>
      </div>

      <section className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-tight">What it does</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f.title} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <ol className="flex flex-col gap-6">
          {project.howItWorks.map((h, i) => (
            <li key={h.title} className="flex gap-4">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-medium">{h.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{h.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {rest.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">Screens</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((shot) => (
              <figure key={shot.alt} className="overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  placeholder="blur"
                  sizes="(min-width: 640px) 500px, 100vw"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
                <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 grid gap-12 md:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl font-semibold tracking-tight">Built with</h2>
        <div className="flex flex-col gap-6">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="rounded-md border border-line px-2.5 py-1 text-sm">
                {s}
              </li>
            ))}
          </ul>
          <div>
            <h3 className="mb-2 font-mono text-xs tracking-widest text-muted uppercase">Access scopes</h3>
            <ul className="flex flex-wrap gap-1.5">
              {project.scopes.map((s) => (
                <li key={s} className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Link
        href={`/projects/${next.slug}`}
        className="group mt-20 flex items-center justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent"
      >
        <span>
          <span className="block text-sm text-muted">Next app</span>
          <span className="text-xl font-semibold tracking-tight">{next.name}</span>
        </span>
        <span className="text-2xl text-accent transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}
