"use client";

import { useEffect, useRef, useState } from "react";

export function PortfolioControls({ email }: { email: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const actions = [{label: "Explore selected work", href: "#work", hint: "01"}, {label: "About Raphael", href: "#about", hint: "02"}, {label: "Get in touch", href: "#contact", hint: "03"}];
  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else { setQuery(""); dialog.current?.showModal(); }
      }
    }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(email); setCopied(true); }
    catch { setCopied(false); window.location.href = `mailto:${email}`; }
  }
  return <>
    <button className="command-trigger" onClick={() => { setQuery(""); dialog.current?.showModal(); }} aria-label="Open quick navigation, Control or Command K">Quick jump <kbd>⌘ K</kbd></button>
    <dialog ref={dialog} className="command-dialog" onClick={e => { if(e.target === e.currentTarget) dialog.current?.close(); }} aria-label="Quick navigation"><div className="command-inner"><div className="command-search"><input autoFocus aria-label="Search navigation" placeholder="Where would you like to go?" value={query} onChange={e=>setQuery(e.target.value)} /><button onClick={()=>dialog.current?.close()} aria-label="Close quick navigation">Esc</button></div><div className="command-results">{actions.filter(a=>a.label.toLowerCase().includes(query.toLowerCase())).map(action=><a key={action.href} href={action.href} onClick={()=>dialog.current?.close()}><span>{action.label}</span><span>{action.hint} ↗</span></a>)}{!query || "copy email".includes(query.toLowerCase()) ? <button onClick={copy}><span>{copied ? "Email copied ✓" : "Copy email address"}</span><span>↗</span></button> : null}<p aria-live="polite">{copied ? email : "Navigate with Tab · Close with Esc"}</p></div></div></dialog>
  </>;
}

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("Copy email");
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus("Copied ✓"); }
    catch { setStatus("Select the email link to contact me"); }
  }
  return <button className="copy-email" onClick={copy} aria-live="polite">{status} <span aria-hidden>⧉</span></button>;
}
