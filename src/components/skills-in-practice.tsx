"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { skillAreas } from "@/lib/skills";

export function SkillsInPractice() {
  const [selected, setSelected] = useState(0);
  const area = skillAreas[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % skillAreas.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + skillAreas.length) % skillAreas.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skillAreas.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`skill-tab-${next}`)?.focus();
  }

  return (
    <div className="skills-board">
      <div
        className="skills-tabs"
        role="tablist"
        aria-label="Explore skills in practice"
      >
        {skillAreas.map((item, index) => (
          <button
            key={item.id}
            id={`skill-tab-${index}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls="skill-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={item.icon} />
            </svg>
            <span>{item.label}</span>
            <span className="skill-tab-index">0{index + 1}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        key={area.id}
        id="skill-panel"
        aria-labelledby={`skill-tab-${selected}`}
        tabIndex={0}
        className="skill-panel"
      >
        <div className="skill-overview" key={area.id}>
          <p className="eyebrow">Skills in practice / 0{selected + 1}</p>
          <h3>{area.title}</h3>
          <p>{area.description}</p>
          <ul className="skill-chips" aria-label="Tools and techniques">
            {area.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
        <div className="skill-evidence">
          <p className="eyebrow">See it in the work</p>
          {area.evidence.map((item) => (
            <Link key={item.href} href={item.href} className="evidence-link">
              <span>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <p className="evidence-footnote">
            Each example links to source code or a case study.
          </p>
        </div>
      </div>
    </div>
  );
}
