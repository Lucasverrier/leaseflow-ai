"use client";

import Link from "next/link";
import CalendlyDemoLink from "./calendly-demo-link";

function LogoMark({ className = "h-9 w-9", onDark = false }) {
  const fill = onDark ? "#ffffff" : "#0f2744";
  const doorFill = onDark ? "#0f2744" : "#ffffff";
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M20 3 L37 22 L34 22 L34 37 L6 37 L6 22 L3 22 L20 3 Z" fill={fill} fillOpacity={0.1} />
      <path d="M20 8 L34 22 L31.5 22 L31.5 35.5 L8.5 35.5 L8.5 22 L6 22 L20 8 Z" fill={fill} fillOpacity={0.3} />
      <path d="M20 13 L31 22 L29 22 L29 34 L11 34 L11 22 L9 22 L20 13 Z" fill={fill} fillOpacity={1} />
      <rect x="16.25" y="25.5" width="7.5" height="8.5" rx="1" fill={doorFill} />
    </svg>
  );
}

function LogoWordmark({ onDark = false }) {
  return (
    <a href="/#top" className="flex items-center gap-2.5 shrink-0">
      <LogoMark onDark={onDark} />
      <span className="flex items-baseline gap-1.5">
        <span className={`font-bold text-lg tracking-tight ${onDark ? "text-white" : "text-[#0f2744]"}`}>
          LeaseFlow
        </span>
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#0891b2] uppercase align-super">
          AI
        </span>
      </span>
    </a>
  );
}

const navClass = "transition hover:text-[#0a1f36]";
const mobileRow = "block rounded-xl px-3 py-2 text-sm font-medium text-[#0f2744] hover:bg-slate-100";

export default function SiteChromeHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <LogoWordmark />
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#0f2744] lg:flex" aria-label="Main">
          <a href="/#features" className={navClass}>
            Features
          </a>
          <a href="/#how-it-works" className={navClass}>
            How It Works
          </a>
          <a href="/#pricing" className={navClass}>
            Pricing
          </a>
          <a href="/#faq" className={navClass}>
            FAQ
          </a>
          <a href="/#team" className={navClass}>
            Team
          </a>
          <Link href="/about" className={navClass}>
            About
          </Link>
        </nav>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <details className="relative shrink-0 lg:hidden">
            <summary className="list-none [&::-webkit-details-marker]:hidden">
              <span
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-[#0f2744]"
                aria-label="Open menu"
              >
                <svg className="h-5 w-5 text-[#0f2744]" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-300 bg-white p-2 shadow-xl">
              <a href="/#features" className={mobileRow}>
                Features
              </a>
              <a href="/#how-it-works" className={mobileRow}>
                How It Works
              </a>
              <a href="/#pricing" className={mobileRow}>
                Pricing
              </a>
              <a href="/#faq" className={mobileRow}>
                FAQ
              </a>
              <a href="/#team" className={mobileRow}>
                Team
              </a>
              <Link href="/about" className={mobileRow}>
                About
              </Link>
              <Link href="/dashboard" className={`${mobileRow} font-semibold`}>
                Sign In
              </Link>
              <CalendlyDemoLink className={`${mobileRow} mt-1 bg-[#0f2744] text-center font-semibold text-white hover:bg-[#0a1f36]`}>
                Book a Demo
              </CalendlyDemoLink>
            </div>
          </details>
          <Link
            href="/dashboard"
            className="hidden items-center justify-center rounded-full border-2 border-[#0f2744] bg-transparent px-3 py-2.5 text-sm font-semibold text-[#0f2744] shadow-sm transition hover:bg-[#0f2744]/5 sm:inline-flex sm:px-5"
          >
            Sign In
          </Link>
          <CalendlyDemoLink className="hidden min-w-0 items-center justify-center rounded-full bg-[#0f2744] px-3 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0a1f36] sm:inline-flex sm:max-w-[12rem] sm:px-5 lg:max-w-none">
            Book a Demo
          </CalendlyDemoLink>
        </div>
      </div>
    </header>
  );
}
