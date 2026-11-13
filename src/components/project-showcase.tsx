"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const [front, back] = project.screenshots;

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 8}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - .5) * 8}px`);
  }

  return (
    <div className="showcase" onPointerMove={move} onPointerLeave={event => {
      event.currentTarget.style.setProperty("--pointer-x", "0px");
      event.currentTarget.style.setProperty("--pointer-y", "0px");
    }}>
      <div className="showcase-grid" aria-hidden="true" />
      <div className="showcase-circle" aria-hidden="true" />
      <div className="showcase-top"><span className="eyebrow">A few things I&apos;ve built</span><span className="showcase-spark" aria-hidden="true">✳</span></div>
      <div className="showcase-stack" key={project.slug}>
        {back && <div className="showcase-window showcase-back" aria-hidden="true"><div className="showcase-browser"><i/><i/><i/></div><Image src={back.src} alt="" sizes="(min-width: 1024px) 420px, 60vw" /></div>}
        <Link href={`/projects/${project.slug}`} className="showcase-window showcase-front" aria-label={`Read the ${project.name} case study`}><div className="showcase-browser"><i/><i/><i/><span>{project.name}</span><b aria-hidden="true">↗</b></div>{front && <Image src={front.src} alt={front.alt} priority={selected === 0} sizes="(min-width: 1024px) 560px, 85vw" />}</Link>
        <span className="showcase-sticker">Made for<br /><strong>Shopify.</strong></span>
      </div>
      <div className="showcase-bottom"><div aria-live="polite"><span className="eyebrow">0{selected + 1} / 0{projects.length} — APP PROJECT</span><Link href={`/projects/${project.slug}`}>{project.name} <span aria-hidden="true">↗</span></Link></div><div className="showcase-controls"><button aria-label="Previous featured project" onClick={() => setSelected((selected - 1 + projects.length) % projects.length)}>←</button><button aria-label="Next featured project" onClick={() => setSelected((selected + 1) % projects.length)}>→</button></div></div>
    </div>
  );
}
