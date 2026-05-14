"use client";

import { useState } from "react";
import { Spinner } from "./spinner";

export const CALENDLY_DEMO_URL =
  "https://calendly.com/ltverrier1/leaseflow-ai-demo";

/**
 * Primary "Book a Demo" link — opens Calendly in a new tab via the anchor's
 * native behavior. Shows a brief spinner on the current page after click.
 */
export default function CalendlyDemoLink({ className, children }) {
  const [busy, setBusy] = useState(false);

  function handleClick() {
    if (busy) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
    }, 400);
  }

  return (
    <a
      href={CALENDLY_DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-busy={busy}
    >
      {busy ? (
        <span className="inline-flex items-center justify-center gap-2">
          <Spinner className="h-4 w-4" />
          <span className="sr-only">Opening scheduler…</span>
        </span>
      ) : (
        children
      )}
    </a>
  );
}
