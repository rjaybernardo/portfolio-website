"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";

const flows = [
  { label: "Discounts", input: "Campaign rules", output: "Native discount", api: "discountAutomaticBasicCreate", detail: "Shopify handles scheduling, expiry, and usage limits.", nodes: ["Audience", "Rules", "Schedule"] },
  { label: "Shipping", input: "Checkout request", output: "Selected rate", api: "Carrier Service → EasyPost", detail: "Hard timeouts and fallback rates keep checkout moving.", nodes: ["Location", "Carrier", "Fallback"] },
  { label: "Returns", input: "Return request", output: "Refund + restock", api: "Returns API → financial outcome", detail: "A forward-only status flow protects the return lifecycle.", nodes: ["Approve", "Label", "Receive"] },
];

export function CommerceScene() {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const flow = flows[active];
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    setTilt({ x: (event.clientX - box.left) / box.width - .5, y: (event.clientY - box.top) / box.height - .5 });
  }
  return (
    <div className="commerce-scene" onPointerMove={move} onPointerLeave={() => setTilt({x: 0, y: 0})} style={{ "--tilt-x": `${tilt.y * -7}deg`, "--tilt-y": `${tilt.x * 7}deg` } as CSSProperties}>
      <div className="orbital-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="orbit-center"><svg viewBox="0 0 100 100" fill="none"><path d="M29 35h42l5 46H24l5-46Z" stroke="currentColor" strokeWidth="2"/><path d="M39 38V26a11 11 0 0 1 22 0v12" stroke="currentColor" strokeWidth="2"/><path d="m55 46-13 17h12l-8 13 19-21H52l3-9Z" fill="currentColor"/></svg></div><span className="orbit-label label-api">GRAPHQL ↗</span><span className="orbit-label label-ui">MERCHANT EXPERIENCE</span><span className="orbit-star">✳</span></div>
      <div className="flow-console">
        <div className="console-header"><span className="flex items-center gap-2"><span className="status-dot" /> COMMERCE / ENGINE</span><span>INTERACTIVE ↗</span></div>
        <div className="flow-switcher" aria-label="Explore an example app workflow">{flows.map((f,i) => <button key={f.label} aria-pressed={active === i} onClick={() => setActive(i)}>{f.label}</button>)}</div>
        <div className="flow-body" key={active}><div className="flow-endpoint"><span className="flow-symbol">↳</span><div><small>INPUT</small><p>{flow.input}</p></div><span className="flow-check">✓</span></div><div className="flow-nodes">{flow.nodes.map((node,i) => <span key={node}><small>0{i+1}</small>{node}</span>)}</div><div className="flow-endpoint output"><span className="flow-symbol">↗</span><div><small>OUTPUT</small><p>{flow.output}</p></div><span className="flow-check">✓</span></div><div className="console-code"><span>ƒ</span> {flow.api}</div><p className="console-detail">{flow.detail}</p></div>
        <div className="console-footer"><span>WORKFLOW VISUALIZATION</span><span>NOT LIVE STORE DATA</span></div>
      </div>
    </div>
  );
}
