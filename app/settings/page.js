"use client";

import Link from "next/link";
import ClientSettingsForm from "../components/client-settings-form";

function LogoMark({ className = "h-9 w-9" }) {
  const fill = "#ffffff";
  const doorFill = "#0f2744";
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M20 3 L37 22 L34 22 L34 37 L6 37 L6 22 L3 22 L20 3 Z" fill={fill} fillOpacity={0.1} />
      <path d="M20 8 L34 22 L31.5 22 L31.5 35.5 L8.5 35.5 L8.5 22 L6 22 L20 8 Z" fill={fill} fillOpacity={0.3} />
      <path d="M20 13 L31 22 L29 22 L29 34 L11 34 L11 22 L9 22 L20 13 Z" fill={fill} fillOpacity={1} />
      <rect x="16.25" y="25.5" width="7.5" height="8.5" rx="1" fill={doorFill} />
    </svg>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-[#0f2744]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#0f2744] shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <LogoMark className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Client assistant settings</p>
              <p className="truncate text-xs font-medium text-[#67e8f9]">LeaseFlow AI</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/dashboard"
              className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link
              href="/chat"
              className="rounded-full bg-[#0891b2] px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-[#0e7490]"
            >
              Preview chat
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <ClientSettingsForm />
      </main>
    </div>
  );
}
