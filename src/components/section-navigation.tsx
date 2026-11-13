"use client";

import { useEffect, useState } from "react";

export function SectionNavigation() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = ["work", "about", "skills", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let id = "";
        for (const section of sections)
          if (section.getBoundingClientRect().top <= innerHeight * 0.35)
            id = section.id;
        setActive(id);
      });
    }
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return (
    <nav aria-label="Main navigation">
      {[
        { id: "work", label: "Work" },
        { id: "skills", label: "Skills" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact ↗" },
      ].map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          aria-current={active === link.id ? "location" : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
