"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import type { Project } from "@/lib/projects";

function subscribeMotion(notify: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const [playback, setPlayback] = useState<"auto" | "play" | "pause">("auto");
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => true,
  );
  const shouldPlay =
    playback === "play" || (playback === "auto" && !reducedMotion);

  useEffect(() => {
    if (!shouldPlay || hovered || hidden || projects.length < 2) return;
    const timer = window.setInterval(
      () => setSelected((index) => (index + 1) % projects.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [shouldPlay, hovered, hidden, projects.length]);

  function select(offset: number) {
    setPlayback("pause");
    setSelected(
      (index) => (index + offset + projects.length) % projects.length,
    );
  }
  const project = projects[selected];
  const [front, back] = project.screenshots;

  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`,
    );
  }

  return (
    <div
      className="showcase"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Shopify projects"
      onFocusCapture={(event) => {
        if (
          !(event.target instanceof Element) ||
          !event.target.closest(".showcase-play")
        )
          setPlayback("pause");
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerMove={move}
      onPointerLeave={(event) => {
        setHovered(false);
        event.currentTarget.style.setProperty("--pointer-x", "0px");
        event.currentTarget.style.setProperty("--pointer-y", "0px");
      }}
    >
      <div className="showcase-grid" aria-hidden="true" />
      <div className="showcase-circle" aria-hidden="true" />
      <div className="showcase-top">
        <span className="eyebrow">A few things I&apos;ve built</span>
        <button
          className="showcase-play"
          type="button"
          aria-label={
            shouldPlay ? "Pause banner autoplay" : "Start banner autoplay"
          }
          title={shouldPlay ? "Pause banner autoplay" : "Start banner autoplay"}
          onClick={() => setPlayback(shouldPlay ? "pause" : "play")}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            {shouldPlay ? (
              <path d="M8 5v14M16 5v14" />
            ) : (
              <path d="m8 5 11 7-11 7V5Z" />
            )}
          </svg>
        </button>
      </div>
      <div
        className="showcase-stack"
        key={project.slug}
        role="group"
        aria-roledescription="slide"
        aria-label={`${selected + 1} of ${projects.length}: ${project.name}`}
      >
        {back && (
          <div className="showcase-window showcase-back" aria-hidden="true">
            <div className="showcase-browser">
              <i />
              <i />
              <i />
            </div>
            <Image
              src={back.src}
              alt=""
              sizes="(min-width: 1024px) 420px, 60vw"
            />
          </div>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="showcase-window showcase-front"
          aria-label={`Read the ${project.name} case study`}
        >
          <div className="showcase-browser">
            <i />
            <i />
            <i />
            <span>{project.name}</span>
            <b aria-hidden="true">↗</b>
          </div>
          {front && (
            <Image
              src={front.src}
              alt={front.alt}
              priority={selected === 0}
              sizes="(min-width: 1024px) 560px, 85vw"
            />
          )}
        </Link>
        <span className="showcase-sticker">
          Made for
          <br />
          <strong>Shopify.</strong>
        </span>
      </div>
      <div className="showcase-bottom">
        <div aria-live={shouldPlay ? "off" : "polite"}>
          <span className="eyebrow">
            0{selected + 1} / 0{projects.length} — APP PROJECT
          </span>
          <Link href={`/projects/${project.slug}`}>
            {project.name} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="showcase-controls">
          <button
            aria-label="Previous featured project"
            onClick={() => select(-1)}
          >
            ←
          </button>
          <button aria-label="Next featured project" onClick={() => select(1)}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
