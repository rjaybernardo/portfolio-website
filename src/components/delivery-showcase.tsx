"use client";

import { useState, type KeyboardEvent } from "react";
import { pipelineRepo, pipelineRun, pipelineSteps } from "@/lib/skills";

export function DeliveryShowcase() {
  const [selected, setSelected] = useState(0);
  const step = pipelineSteps[selected];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % pipelineSteps.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + pipelineSteps.length) % pipelineSteps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = pipelineSteps.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    document.getElementById(`pipeline-tab-${next}`)?.focus();
  }

  return (
    <div className="delivery-card">
      <div className="delivery-heading">
        <div>
          <p className="eyebrow">Workflow project / GitHub Actions</p>
          <h3>
            Shopify Theme
            <br />
            CI/CD Pipeline<span>.</span>
          </h3>
        </div>
        <a href={pipelineRepo} className="delivery-repo">
          View repository <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="delivery-intro">
        Check the theme. Keep the build. Release the version you checked.
      </p>
      <div
        className="pipeline-tabs"
        role="tablist"
        aria-label="Explore CI/CD pipeline stages"
      >
        {pipelineSteps.map((item, index) => (
          <button
            key={item.label}
            id={`pipeline-tab-${index}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls="pipeline-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span>0{index + 1}</span>
            <strong>{item.label}</strong>
            <span aria-hidden="true">
              {index < pipelineSteps.length - 1 ? "→" : "↗"}
            </span>
          </button>
        ))}
      </div>
      <div
        key={step.label}
        id="pipeline-panel"
        role="tabpanel"
        aria-labelledby={`pipeline-tab-${selected}`}
        tabIndex={0}
        className="pipeline-panel"
      >
        <div className="pipeline-description">
          <p className="eyebrow">Inside the workflow</p>
          <h4>{step.title}</h4>
          <p>{step.description}</p>
          <p className="pipeline-proof">{step.proof}</p>
          <a
            href={`${pipelineRepo}/blob/main/.github/workflows/${step.file}`}
            className="text-link"
          >
            Read {step.file} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="workflow-code">
          <div>
            <span className="code-dots" aria-hidden="true">
              ● ● ●
            </span>
            <span>{step.file}</span>
          </div>
          <pre aria-label={`${step.file} excerpt`}>
            <code>{step.code}</code>
          </pre>
          <p>Workflow excerpt · explanatory comments added</p>
        </div>
      </div>
      <div className="delivery-evidence">
        <a href={pipelineRun}>
          <span className="status-dot" /> Theme quality: verified successful run
          ↗
        </a>
        <p>
          Staging was skipped in that run. Store release and rollback are not
          yet verified.
        </p>
      </div>
    </div>
  );
}
