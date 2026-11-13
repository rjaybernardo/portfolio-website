"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState("Copy email");
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus("Copied ✓"); }
    catch { setStatus("Select the email link to contact me"); }
  }
  return <button className="copy-email" onClick={copy} aria-live="polite">{status} <span aria-hidden>⧉</span></button>;
}
