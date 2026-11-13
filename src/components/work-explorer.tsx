"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/project-visual";

export function WorkExplorer({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const [screen, setScreen] = useState(0);
  const project = projects[selected];
  const shot = project.screenshots[screen];

  function select(index: number) { setSelected(index); setScreen(0); }
  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault(); select(next);
    document.getElementById(`project-tab-${next}`)?.focus();
  }

  return (
    <div className="work-explorer">
      <div className="project-tabs" role="tablist" aria-label="Explore Shopify projects">
        {projects.map((p, i) => <button key={p.slug} id={`project-tab-${i}`} role="tab" aria-selected={selected === i} aria-controls="project-panel" tabIndex={selected === i ? 0 : -1} onClick={() => select(i)} onKeyDown={event => handleKeys(event, i)}><span>0{i + 1}</span>{p.name.replace(" System", "")}</button>)}
      </div>
      <div id="project-panel" role="tabpanel" aria-labelledby={`project-tab-${selected}`} tabIndex={0} className="explorer-panel">
        <div key={project.slug} className="explorer-content">
          <div className="explorer-preview">
            <div className="preview-top"><span className="status-dot" /> EMBEDDED SHOPIFY APP <span className="ml-auto">{String(selected + 1).padStart(2, "0")} / 05</span></div>
            <div className="explorer-screen">
              {shot ? <Image key={shot.src.src} src={shot.src} alt={shot.alt} placeholder="blur" sizes="(min-width: 1024px) 800px, 95vw" /> : <ProjectVisual project={project} />}
            </div>
            {shot ? <div className="screen-controls"><p>{shot.caption}</p><div className="flex gap-2">{project.screenshots.map((s, i) => <button key={s.alt} onClick={() => setScreen(i)} aria-label={`Show screenshot ${i + 1}: ${s.alt}`} aria-pressed={screen === i}>{String(i + 1).padStart(2, "0")}</button>)}</div></div> : <p className="screen-controls">Illustrative preview · sample data, not a product screenshot</p>}
          </div>
          <div className="explorer-story"><p className="eyebrow">Project / {String(selected + 1).padStart(2, "0")}</p><h3>{project.name}</h3><p>{project.tagline}</p><div className="engineering-note"><span className="eyebrow">Implementation</span><h4>{project.howItWorks[2].title}</h4><p>{project.howItWorks[2].body}</p></div><ul className="flex flex-wrap gap-2 mt-5">{project.highlights.map(h => <li className="tag" key={h}>{h}</li>)}</ul><div className="explorer-actions"><Link href={`/projects/${project.slug}`} className="button-primary">Full case study <span aria-hidden>↗</span></Link><a href={project.repo} className="text-link">Source code ↗</a></div></div>
        </div>
      </div>
      <div className="project-directory"><span className="eyebrow">All case studies</span>{projects.map((p,i) => <Link key={p.slug} href={`/projects/${p.slug}`}><span>0{i+1}</span>{p.name}<span aria-hidden>↗</span></Link>)}</div>
    </div>
  );
}
