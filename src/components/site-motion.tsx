"use client";

import { useEffect, useRef } from "react";

export function SiteMotion() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | null = null;
    const elements = [
      ...document.querySelectorAll<HTMLElement>(
        ".section-heading, .delivery-card, .theme-project, .about-intro, .skills-board, .approach-grid > li, .contact-top, .contact-section h2, .contact-bottom",
      ),
    ];
    function reveal(element: HTMLElement) {
      element.dataset.reveal = "visible";
      observer?.unobserve(element);
    }
    function setup() {
      observer?.disconnect();
      if (media.matches || !("IntersectionObserver" in window)) {
        elements.forEach((el) => el.removeAttribute("data-reveal"));
        return;
      }
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          }),
        { threshold: 0.08, rootMargin: "0px 0px -35px 0px" },
      );
      elements.forEach((el, index) => {
        if (el.getBoundingClientRect().top < innerHeight - 35) {
          reveal(el);
          return;
        }
        el.dataset.reveal = "pending";
        el.style.setProperty("--reveal-delay", `${(index % 3) * 55}ms`);
        observer?.observe(el);
      });
    }
    function focus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(
        '[data-reveal="pending"]',
      );
      if (element) {
        observer?.unobserve(element);
        element.dataset.reveal = "focused";
      }
    }
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = document.documentElement.scrollHeight - innerHeight;
        if (progress.current)
          progress.current.style.transform = `scaleX(${range > 0 ? Math.max(0, Math.min(1, scrollY / range)) : 0})`;
      });
    }
    setup();
    update();
    media.addEventListener("change", setup);
    document.addEventListener("focusin", focus);
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      elements.forEach((el) => el.removeAttribute("data-reveal"));
      media.removeEventListener("change", setup);
      document.removeEventListener("focusin", focus);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={progress} className="reading-progress" aria-hidden="true" />;
}
