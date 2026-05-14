"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ClientSettingsForm from "../components/client-settings-form";
import LiveChatPanel from "../components/live-chat-panel";

const STORAGE_KEY = "leaseflow-tenant-conversations";

/** Stable sample rows (avoid Date.now() at module scope → hydration / KPI drift). */
const DEMO_CONVERSATIONS = [
  {
    id: "demo-1",
    ts: new Date("2026-05-12T09:15:00").getTime(),
    question: "Do you have any 2-bedroom units open right now?",
    answer:
      "We do have 2BR homes on our North Shore roster—rent is typically $1,800/month. I can help you pick a time for a tour Mon–Sat, 9am–5pm, or you can call (978) 646-7715.",
  },
  {
    id: "demo-2",
    ts: new Date("2026-05-12T11:40:00").getTime(),
    question: "What is the rent for a one bedroom?",
    answer:
      "Our 1BR units are listed at $1,400 per month. If you share your move-in timeframe, I can suggest next steps and tour times.",
  },
  {
    id: "demo-3",
    ts: new Date("2026-05-10T15:05:00").getTime(),
    question: "Can I schedule a tour this Saturday at 2pm?",
    answer:
      "Saturday tours are available between 9am and 5pm—2pm works if that slot is still open. I will note your preference; for a firm confirmation, the office can lock it in at (978) 646-7715.",
  },
];

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
      <path
        d="M20 3 L37 22 L34 22 L34 37 L6 37 L6 22 L3 22 L20 3 Z"
        fill={fill}
        fillOpacity={0.1}
      />
      <path
        d="M20 8 L34 22 L31.5 22 L31.5 35.5 L8.5 35.5 L8.5 22 L6 22 L20 8 Z"
        fill={fill}
        fillOpacity={0.3}
      />
      <path
        d="M20 13 L31 22 L29 22 L29 34 L11 34 L11 22 L9 22 L20 13 Z"
        fill={fill}
        fillOpacity={1}
      />
      <rect x="16.25" y="25.5" width="7.5" height="8.5" rx="1" fill={doorFill} />
    </svg>
  );
}

function LogoWordmark({ onDark = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <LogoMark onDark={onDark} />
      <span className="flex items-baseline gap-1.5">
        <span
          className={`font-bold text-lg tracking-tight ${onDark ? "text-white" : "text-[#0f2744]"}`}
        >
          LeaseFlow
        </span>
        <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#0891b2] uppercase align-super">
          AI
        </span>
      </span>
    </Link>
  );
}

function startOfLocalDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function formatTs(ts) {
  return new Date(ts).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function loadStored() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stored, setStored] = useState([]);

  useEffect(() => {
    setStored(loadStored());
    function onStorage(e) {
      if (e.key === STORAGE_KEY || e.key === null) setStored(loadStored());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    function onFocus() {
      setStored(loadStored());
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const conversations = useMemo(() => {
    const merged = [...stored, ...DEMO_CONVERSATIONS];
    const seen = new Set();
    const out = [];
    for (const c of merged) {
      if (!c?.id || seen.has(c.id)) continue;
      seen.add(c.id);
      out.push(c);
    }
    return out.sort((a, b) => b.ts - a.ts);
  }, [stored]);

  const todayStart = startOfLocalDay(Date.now());
  const todayList = conversations.filter((c) => c.ts >= todayStart);

  const totalToday = todayList.length;
  const toursScheduled = conversations.filter((c) => {
    const blob = `${c.question} ${c.answer}`.toLowerCase();
    return (
      blob.includes("tour") &&
      (blob.includes("schedule") ||
        blob.includes("saturday") ||
        blob.includes("sunday") ||
        blob.includes("monday") ||
        blob.includes("2pm") ||
        blob.includes("9am") ||
        blob.includes("5pm") ||
        blob.includes("lock"))
    );
  }).length;

  const newLeads = todayList.length;
  const responded = conversations.filter((c) => typeof c.answer === "string" && c.answer.trim()).length;
  const responseRate =
    conversations.length === 0 ? 100 : Math.round((responded / conversations.length) * 100);

  const navLink =
    "flex w-full cursor-pointer items-center justify-start gap-2 rounded-xl border-0 bg-transparent px-3 py-2.5 text-left text-sm font-normal text-white/90 no-underline shadow-none ring-0 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20";

  function tabClass(tab) {
    return activeTab === tab ? `${navLink} bg-white/10 text-white` : navLink;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-[#0f2744]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <LogoWordmark />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-[#0f2744] shadow-sm transition hover:border-[#0891b2]/40 hover:bg-slate-50 sm:px-4 sm:text-sm"
            >
              Settings
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#0f2744] shadow-sm transition hover:border-[#0891b2]/40 hover:bg-slate-50 sm:inline-flex"
            >
              Open tenant chat
            </button>
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#0f2744] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#0a1f36]"
            >
              Marketing site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8 lg:py-8">
        <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-56">
          <nav
            className="rounded-2xl border border-slate-200 bg-[#0f2744] p-2 shadow-lg lg:sticky lg:top-24"
            aria-label="Dashboard menu"
          >
            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
              Menu
            </p>
            <ul className="space-y-0.5">
              <li>
                <button
                  type="button"
                  className={tabClass("overview")}
                  onClick={() => setActiveTab("overview")}
                  aria-current={activeTab === "overview" ? "true" : undefined}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={tabClass("settings")}
                  onClick={() => setActiveTab("settings")}
                  aria-current={activeTab === "settings" ? "true" : undefined}
                >
                  Client Settings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={tabClass("chat")}
                  onClick={() => setActiveTab("chat")}
                  aria-current={activeTab === "chat" ? "true" : undefined}
                >
                  Live Chat Preview
                </button>
              </li>
            </ul>
          </nav>

          <nav
            className="rounded-2xl border border-slate-200 bg-[#0f2744] p-2 shadow-lg"
            aria-label="Site navigation"
          >
            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
              Navigation
            </p>
            <ul className="space-y-0.5">
              <li>
                <Link href="/" className={navLink}>
                  Back to Marketing Site
                </Link>
              </li>
              <li>
                <a href="/#features" className={navLink}>
                  Product Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className={navLink}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#faq" className={navLink}>
                  FAQ
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="relative min-h-0 min-w-0 flex-1">
          <div className={activeTab === "overview" ? "space-y-6" : "hidden"} aria-hidden={activeTab !== "overview"}>
            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#0f2744] sm:text-3xl">
                {greeting()}, Lucas
              </h1>
              <p className="mt-1 text-sm font-medium text-[#0f2744]/75">
                Here is a snapshot of leasing activity. Recent chats include the demo below plus anything saved from{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("chat")}
                  className="font-semibold text-[#0891b2] underline-offset-2 hover:underline"
                >
                  Live Chat Preview
                </button>{" "}
                on this browser.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Conversations Today", value: String(totalToday), hint: "Sessions logged today" },
                { label: "Tours Scheduled", value: String(toursScheduled), hint: "Tour-related threads" },
                { label: "New Leads", value: String(newLeads), hint: "Inbound today" },
                { label: "Response Rate", value: `${responseRate}%`, hint: "Threads with an AI reply" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0891b2]">{card.label}</p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-[#0f2744]">{card.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{card.hint}</p>
                </div>
              ))}
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-md">
              <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[#0f2744]">Recent tenant conversations</h2>
                  <p className="text-xs font-medium text-slate-500">Question and latest AI reply</p>
                </div>
              </div>
              <ul className="divide-y divide-slate-100">
                {conversations.length === 0 ? (
                  <li className="px-5 py-10 text-center text-sm font-medium text-slate-500">
                    No conversations yet. Open the tenant chat to generate transcripts.
                  </li>
                ) : (
                  conversations.map((c) => (
                    <li key={c.id} className="px-5 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#0891b2]">
                        {formatTs(c.ts)}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#0f2744]">Tenant</p>
                      <p className="text-sm leading-relaxed text-[#0f2744]/90">{c.question}</p>
                      <p className="mt-3 text-sm font-semibold text-[#0f2744]">Assistant</p>
                      <p className="text-sm leading-relaxed text-slate-600">{c.answer}</p>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>

          <div
            className={activeTab === "settings" ? "mx-auto max-w-5xl pb-8" : "hidden"}
            aria-hidden={activeTab !== "settings"}
          >
            <ClientSettingsForm embedIntro />
          </div>

          <div
            className={activeTab === "chat" ? "flex min-h-[calc(100vh-8rem)] flex-col" : "hidden"}
            aria-hidden={activeTab !== "chat"}
          >
            <LiveChatPanel embedded />
          </div>
        </div>
      </div>
    </div>
  );
}
