"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type TransitionEvent,
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
  // Boundary copies let both directions wrap without sliding across every item.
  const slides = [projects[projects.length - 1], ...projects, projects[0]];
  const [position, setPosition] = useState(1);
  const [animated, setAnimated] = useState(true);
  const moving = useRef(false);
  const frames = useRef<number[]>([]);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
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
  const selected = (position - 1 + projects.length) % projects.length;
  const project = projects[selected];
  const shouldPlay =
    playback === "play" || (playback === "auto" && !reducedMotion);
  const running = shouldPlay && !hovered && !hidden;

  const advance = useCallback(
    (offset: number) => {
      if (moving.current || projects.length < 2) return;
      if (reducedMotion) {
        setPosition(
          (current) =>
            ((current - 1 + offset + projects.length) % projects.length) + 1,
        );
      } else {
        moving.current = true;
        setAnimated(true);
        setPosition((current) => current + offset);
      }
    },
    [projects.length, reducedMotion],
  );

  useEffect(() => {
    if (!running || projects.length < 2) return;
    const timer = window.setInterval(() => advance(1), 6000);
    return () => window.clearInterval(timer);
  }, [advance, running, projects.length]);

  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    function settle(event: MediaQueryListEvent) {
      if (!event.matches) return;
      frames.current.forEach(cancelAnimationFrame);
      frames.current = [];
      moving.current = false;
      setAnimated(false);
      setPosition(
        (current) => ((current - 1 + projects.length) % projects.length) + 1,
      );
    }
    query.addEventListener("change", settle);
    return () => query.removeEventListener("change", settle);
  }, [projects.length]);

  useEffect(
    () => () => {
      frames.current.forEach(cancelAnimationFrame);
    },
    [],
  );

  function finishTransition(event: TransitionEvent<HTMLDivElement>) {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    )
      return;
    const canonical =
      position === 0
        ? projects.length
        : position === projects.length + 1
          ? 1
          : position;
    if (canonical !== position) {
      setAnimated(false);
      setPosition(canonical);
      frames.current.forEach(cancelAnimationFrame);
      frames.current = [
        requestAnimationFrame(() => {
          frames.current.push(
            requestAnimationFrame(() => {
              moving.current = false;
              setAnimated(true);
            }),
          );
        }),
      ];
    } else {
      moving.current = false;
    }
  }

  function select(offset: number) {
    setPlayback("pause");
    advance(offset);
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--pointer-x",
      `${((event.clientX - box.left) / box.width - 0.5) * 8}px`,
    );
    event.currentTarget.style.setProperty(
      "--pointer-y",
      `${((event.clientY - box.top) / box.height - 0.5) * 8}px`,
    );
  }

  const status = !shouldPlay
    ? "Paused · use arrows or play"
    : hovered
      ? "Paused while hovering"
      : hidden
        ? "Paused in background"
        : "Autoplay · every 6 seconds";

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
      onPointerMove={pointerMove}
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
        className="showcase-viewport"
        onPointerDown={(event) => {
          swiped.current = false;
          if (event.pointerType === "touch") {
            gesture.current = { x: event.clientX, y: event.clientY };
            setPlayback("pause");
          }
        }}
        onPointerCancel={() => {
          gesture.current = null;
        }}
        onPointerUp={(event) => {
          if (!gesture.current) return;
          const dx = event.clientX - gesture.current.x;
          const dy = event.clientY - gesture.current.y;
          gesture.current = null;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            swiped.current = true;
            select(dx < 0 ? 1 : -1);
          }
        }}
        onClickCapture={(event) => {
          if (swiped.current) {
            event.preventDefault();
            event.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        <div
          className="showcase-track"
          style={{
            transform: `translate3d(-${position * 100}%, 0, 0)`,
            transition: !animated || reducedMotion ? "none" : undefined,
          }}
          onTransitionEnd={finishTransition}
          onTransitionCancel={finishTransition}
        >
          {slides.map((item, index) => {
            const [front, back] = item.screenshots;
            const active = index === position;
            return (
              <div
                className="showcase-slide"
                key={`${index}-${item.slug}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${((index - 1 + projects.length) % projects.length) + 1} of ${projects.length}: ${item.name}`}
                aria-hidden={!active}
                inert={!active}
              >
                <div className="showcase-stack">
                  {back && (
                    <div
                      className="showcase-window showcase-back"
                      aria-hidden="true"
                    >
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
                    href={`/projects/${item.slug}`}
                    className="showcase-window showcase-front"
                    aria-label={`Read the ${item.name} case study`}
                  >
                    <div className="showcase-browser">
                      <i />
                      <i />
                      <i />
                      <span>{item.name}</span>
                      <b aria-hidden="true">↗</b>
                    </div>
                    {front && (
                      <Image
                        src={front.src}
                        alt={front.alt}
                        priority={index === 1}
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
              </div>
            );
          })}
        </div>
      </div>
      <div className="showcase-timer" aria-hidden="true">
        <span key={`${selected}-${running}`} data-running={running} />
      </div>
      <div className="showcase-bottom">
        <div aria-live={shouldPlay ? "off" : "polite"}>
          <span className="eyebrow">
            0{selected + 1} / 0{projects.length} — APP PROJECT
          </span>
          <Link href={`/projects/${project.slug}`}>
            {project.name} <span aria-hidden="true">↗</span>
          </Link>
          <span className="showcase-status">{status}</span>
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
