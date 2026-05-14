"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Spinner } from "./spinner";

const CLIENT_CONFIG_KEY = "leaseflow-client-config";
const STORAGE_KEY = "leaseflow-tenant-conversations";

const WELCOME_BASE =
  "Hi! I am your leasing assistant. Ask me anything about our available units, pricing, or scheduling a tour.";

function welcomeForConfig(cfg) {
  const name = cfg && typeof cfg === "object" ? String(cfg.businessName || "").trim() : "";
  if (name) {
    return `Hi! I am your leasing assistant for ${name}. Ask me anything about our available units, pricing, or scheduling a tour.`;
  }
  return WELCOME_BASE;
}

function readClientConfigFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CLIENT_CONFIG_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function LogoMark({ className = "h-9 w-9" }) {
  const fill = "#ffffff";
  const doorFill = "#0f2744";
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

function LogoMarkNavy({ className = "h-7 w-7" }) {
  const fill = "#0f2744";
  const doorFill = "#ffffff";
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

function appendConversation(question, answer) {
  try {
    const prev = JSON.parse(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) || "[]" : "[]");
    const list = Array.isArray(prev) ? prev : [];
    list.unshift({
      id: crypto.randomUUID(),
      ts: Date.now(),
      question,
      answer,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 100)));
  } catch {
    /* ignore */
  }
}

/**
 * @param {{ embedded?: boolean }} props
 */
export default function LiveChatPanel({ embedded = false }) {
  const inputId = embedded ? "chat-input-embed" : "chat-input";
  const [clientConfig, setClientConfig] = useState(null);
  const [messages, setMessages] = useState(() => [
    { id: "welcome", role: "assistant", content: WELCOME_BASE },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    function refresh() {
      setClientConfig(readClientConfigFromStorage());
    }
    refresh();
    function onStorage(e) {
      if (e.key === CLIENT_CONFIG_KEY || e.key === null) refresh();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("leaseflow-client-config-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("leaseflow-client-config-updated", refresh);
    };
  }, []);

  useEffect(() => {
    const text = welcomeForConfig(clientConfig);
    setMessages((m) => {
      if (m.length === 1 && m[0].id === "welcome") {
        return [{ ...m[0], content: text }];
      }
      return m;
    });
  }, [clientConfig]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, pending, scrollToBottom]);

  const headerTitle = (() => {
    const n = clientConfig && String(clientConfig.businessName || "").trim();
    return n ? `${n} — Online` : "LeaseFlow Assistant — Online";
  })();

  const headerSub =
    (clientConfig && String(clientConfig.officeAddress || "").trim()) ||
    "North Shore, MA";

  const footerPhone =
    (clientConfig && String(clientConfig.businessPhone || "").trim()) || "(978) 646-7715";

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || pending) return;

    setError("");
    setInput("");

    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setPending(true);

    const cfg = readClientConfigFromStorage();

    const apiMessages = [...messages, userMsg]
      .filter((x) => x.role === "user" || x.role === "assistant")
      .map((x) => ({ role: x.role, content: x.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          clientConfig: cfg && typeof cfg === "object" ? cfg : {},
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        return;
      }

      const reply = data.reply;
      if (typeof reply !== "string" || !reply.trim()) {
        setError("No response from the assistant. Please try again.");
        return;
      }

      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "assistant", content: reply.trim() }]);
      appendConversation(text, reply.trim());
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const rootClass = embedded
    ? "relative flex min-h-0 flex-1 flex-col bg-slate-100 text-[#0f2744]"
    : "relative flex min-h-screen flex-col bg-slate-100 pb-20 text-[#0f2744] sm:pb-16";

  return (
    <div className={rootClass}>
      {!embedded ? (
        <header className="shrink-0 border-b border-white/10 bg-[#0f2744] px-4 py-3 shadow-md sm:px-6">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <LogoMark className="h-8 w-8" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{headerTitle}</p>
                <p className="truncate text-xs font-medium text-[#67e8f9]">{headerSub}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/settings"
                className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Settings
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Home
              </Link>
            </div>
          </div>
        </header>
      ) : null}

      <main
        className={`mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 pb-3 sm:px-4 ${embedded ? "pt-0" : "pt-4"}`}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl min-h-[22rem] sm:min-h-[28rem]">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#0f2744] px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm sm:max-w-[78%]"
                      : "max-w-[85%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-2.5 text-sm leading-relaxed text-[#0f2744] shadow-sm ring-1 ring-slate-200/80 sm:max-w-[78%]"
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {pending && (
              <div className="flex justify-start">
                <div
                  className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 ring-1 ring-slate-200/80"
                  aria-live="polite"
                  aria-busy="true"
                >
                  <span className="sr-only">Assistant is typing</span>
                  <span className="lf-typing-dot h-2 w-2 rounded-full bg-[#0891b2]" />
                  <span className="lf-typing-dot h-2 w-2 rounded-full bg-[#0891b2]" />
                  <span className="lf-typing-dot h-2 w-2 rounded-full bg-[#0891b2]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error ? (
            <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-center text-xs font-medium text-red-800 sm:text-sm">
              {error}
            </div>
          ) : null}

          <form
            onSubmit={sendMessage}
            className="border-t border-slate-200 bg-slate-50/90 p-3 sm:p-4"
          >
            <div className="flex gap-2">
              <label htmlFor={inputId} className="sr-only">
                Message
              </label>
              <input
                id={inputId}
                type="text"
                autoComplete="off"
                placeholder="Type your question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={pending}
                className="min-h-[44px] flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm text-[#0f2744] shadow-inner outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#0891b2] focus:ring-2 focus:ring-[#0891b2]/25 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="inline-flex min-h-[44px] min-w-[88px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0891b2] px-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#0e7490] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? (
                  <>
                    <Spinner className="h-4 w-4 text-white" />
                    <span className="sr-only">Sending message</span>
                  </>
                ) : (
                  "Send"
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] font-medium text-slate-500">
              AI-generated replies · call {footerPhone} for official availability
            </p>
          </form>
        </div>
      </main>

      {!embedded ? (
        <Link
          href="/"
          className="fixed bottom-4 right-4 z-50 flex max-w-[min(18rem,calc(100vw-1.5rem))] items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm transition hover:border-[#0891b2]/35 hover:ring-[#0891b2]/15"
        >
          <LogoMarkNavy className="h-7 w-7 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block text-[10px] font-bold uppercase tracking-wide text-[#0f2744]/70">
              Powered by
            </span>
            <span className="flex items-baseline gap-1">
              <span className="text-xs font-bold tracking-tight text-[#0f2744]">LeaseFlow</span>
              <span className="text-[0.55rem] font-bold tracking-[0.2em] text-[#0891b2] uppercase">AI</span>
            </span>
          </span>
        </Link>
      ) : null}
    </div>
  );
}
