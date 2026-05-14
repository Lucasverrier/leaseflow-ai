import Image from "next/image";
import CalendlyDemoLink from "./components/calendly-demo-link";
import SiteChromeHeader from "./components/site-chrome-header";

/** Hero background (subtle city / residential) */
const IMG_HERO_BUILDING =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80";
/** How It Works — apartment building */
const IMG_HOW_IT_WORKS =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";
/** Features section background pattern */
const IMG_FEATURES_TEXTURE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";

const CONTACT_EMAIL = "Ltverrier1@gmail.com";
const MAILTO_DEMO = `mailto:${CONTACT_EMAIL}`;
const PHONE_DISPLAY = "(978) 646-7715";
const PHONE_TEL = "tel:+19786467715";

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
      {/* Layered houses: outer 10% → middle 30% → inner solid navy; peaked roof + walls + door */}
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
    <a href="#top" className="flex items-center gap-2.5 shrink-0">
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
    </a>
  );
}

function IconAiChip({ className = "h-7 w-7 text-white" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" strokeWidth="1.5" />
      <path strokeLinecap="round" strokeWidth="1.5" d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
    </svg>
  );
}

function CheckCell({ children, strong }) {
  return (
    <td
      className={`px-4 py-3.5 text-sm ${strong ? "font-semibold text-[#0f2744]" : "text-[#0f2744]/85"}`}
    >
      {children}
    </td>
  );
}

const features = [
  {
    title: "24/7 AI Chat",
    body: "Instant answers on listings, availability, and applications—without adding headcount.",
    icon: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    title: "SMS Follow-Ups",
    body: "Polite, compliant nudges that keep warm leads moving from first message to tour.",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    title: "Tour Scheduling",
    body: "Offer real openings, reduce back-and-forth, and cut no-shows with reminders.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    title: "Lead Dashboard",
    body: "One place to see conversations, sources, and next steps—built for operators, not IT.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 16V9M12 16v-5M17 16v-9" />
      </>
    ),
  },
  {
    title: "Analytics",
    body: "Know what’s converting: response time, tour rate, and channel performance at a glance.",
    icon: (
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    ),
  },
  {
    title: "Fully Managed",
    body: "We configure prompts, integrations, and playbooks—so you launch confidently, not experimentally.",
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
  },
];

const faqs = [
  {
    q: "How fast can we go live?",
    a: "Most teams launch in 2–3 weeks. We handle configuration, testing, and training so you’re not stuck in a DIY portal.",
  },
  {
    q: "Does LeaseFlow replace my CRM?",
    a: "LeaseFlow focuses on speed-to-lead and tour conversion. We integrate with your existing stack where it matters and keep your workflow simple.",
  },
  {
    q: "Is SMS compliant?",
    a: "Yes—opt-in, quiet hours, and clear opt-out paths are built in. We align messaging to carrier and TCPA best practices.",
  },
  {
    q: "What if a prospect needs a human?",
    a: "Escalations route to your team with full context. The AI handles the repetitive 80% so you focus on tours and negotiations.",
  },
  {
    q: "How do you price for small portfolios?",
    a: "Transparent setup plus a predictable monthly fee—no surprise per-seat math. Custom quotes are available as you scale.",
  },
  {
    q: "Can you match our brand voice?",
    a: "Absolutely. We tune tone, FAQs, and policies to your properties and markets—including Massachusetts-specific nuances where needed.",
  },
  {
    q: "What support do we get after launch?",
    a: "Ongoing optimization, monitoring, and quarterly reviews are part of the partnership—not an upsell.",
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-[#0f2744]">
      <SiteChromeHeader />

      <main className="flex flex-col gap-0">
        {/* 2. Hero */}
        <section className="relative overflow-hidden border-b border-slate-200">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src={IMG_HERO_BUILDING}
              alt="Modern apartment buildings"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-br from-white via-white/93 to-slate-100/95"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(8,145,178,0.06),transparent_55%)]"
              aria-hidden
            />
          </div>
          <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
            <div>
              <p className="mb-3 inline-flex items-center rounded-full border border-[#0891b2]/35 bg-[#0891b2]/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0891b2]">
                AI leasing for small property managers
              </p>
              <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[#0f2744] sm:text-5xl lg:text-[3.25rem]">
                Never Miss a Rental Lead Again
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#0f2744]">
                LeaseFlow AI responds in seconds, 24/7—so prospects get answers while they’re still motivated. Built for independent operators who can’t afford a missed message or a bloated tech stack.
              </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CalendlyDemoLink className="inline-flex w-full items-center justify-center rounded-full bg-[#0f2744] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0f2744]/25 transition hover:bg-[#0a1f36] sm:w-auto">
                  Book a Demo
                </CalendlyDemoLink>
                <a
                  href="#how-it-works"
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0f2744] shadow-md transition hover:border-[#0f2744]/40 hover:bg-slate-50 sm:w-auto"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-4 flex w-full justify-center sm:justify-start">
                <a
                  href="/chat"
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#0891b2] bg-white px-6 py-3 text-sm font-semibold text-[#0891b2] shadow-md transition hover:bg-[#0891b2]/8 sm:w-auto"
                >
                  Try Live Demo
                </a>
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-[#0f2744] sm:text-left">
                Trusted by landlords across North Shore MA
              </p>
              <p className="mt-4 text-sm font-medium text-[#0f2744]/80">
                No code. No “platform project.” Just a concierge rollout with measurable lift.
              </p>
            </div>

            <div className="relative hidden lg:block lg:justify-self-end">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#0891b2]/8 via-transparent to-[#0f2744]/5 blur-2xl" aria-hidden />
              <div className="relative rounded-2xl border-2 border-slate-300 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f2744] text-xs font-bold text-white">
                      LF
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0f2744]">Live chat</p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#0891b2]">
                        AI online
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className="lf-typing-dot h-2 w-2 rounded-full bg-[#0f2744]/55" />
                    <span className="lf-typing-dot h-2 w-2 rounded-full bg-[#0f2744]/55" />
                    <span className="lf-typing-dot h-2 w-2 rounded-full bg-[#0f2744]/55" />
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="lf-chat-line flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-slate-200 bg-slate-100 px-4 py-2.5 text-[#0f2744]">
                      Hi, do you have any 1 bedrooms available?
                    </div>
                  </div>
                  <div className="lf-chat-line flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[#0f2744] px-4 py-2.5 text-white">
                      Yes — a 1BR at $1,400/month is available June 1st. Would you like to schedule a tour?
                    </div>
                  </div>
                  <div className="lf-chat-line flex justify-start">
                    <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-slate-200 bg-slate-100 px-4 py-2.5 text-[#0f2744]">
                      Yes, Saturday morning works
                    </div>
                  </div>
                  <div className="lf-chat-line flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[#0f2744] px-4 py-2.5 text-white">
                      Booked for Saturday at 10:00 AM. Confirmation sent via SMS.
                    </div>
                  </div>
                  <div className="lf-chat-line flex justify-center pt-1">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0f2744]/75">
                      Instant reply · under 60s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stats bar */}
        <section className="bg-navy text-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-6 sm:px-6 md:py-10 lg:grid-cols-4 lg:gap-0 lg:px-8">
            {[
              { k: "24/7", s: "Availability" },
              { k: "<60s", s: "Median first response" },
              { k: "93%", s: "Margin on recovered leads" },
              { k: "5×", s: "Cheaper than hiring coverage" },
            ].map((item, i) => (
              <div
                key={item.s}
                className={`lg:border-l lg:border-white/15 lg:px-8 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
              >
                <p className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {item.k}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{item.s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. How It Works */}
        <section
          id="how-it-works"
          className="border-b border-slate-200 bg-gradient-to-b from-slate-100 to-slate-50 py-12 md:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
                How it works
              </h2>
              <p className="mt-2 text-lg text-[#0f2744]">
                A crisp onboarding path—no six-month “implementation program.”
              </p>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-stretch">
              <div className="relative min-h-[220px] overflow-hidden rounded-2xl border-2 border-slate-300 shadow-xl lg:min-h-0">
                <Image
                  src={IMG_HOW_IT_WORKS}
                  alt="Modern apartment building"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <ol className="grid content-start gap-4 sm:gap-5">
                {[
                  {
                    step: "01",
                    title: "Tell us about your property",
                    body: "Share listings, policies, tour rules, and how you like to communicate—we map it to AI playbooks.",
                  },
                  {
                    step: "02",
                    title: "We set everything up",
                    body: "Chat, SMS, scheduling, and your dashboard are configured, tested, and tuned to your voice.",
                  },
                  {
                    step: "03",
                    title: "Watch leads convert",
                    body: "Prospects get instant answers and clear next steps—your team steps in when it truly matters.",
                  },
                ].map((item) => (
                <li
                  key={item.step}
                  className="relative rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg sm:p-7"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0891b2]">
                    {item.step}
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-[#0f2744]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-[#0f2744]">{item.body}</p>
                </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 5. Features */}
        <section
          id="features"
          className="relative border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/40 to-white py-12 md:py-16 lg:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.052]"
            style={{
              backgroundImage: `url("${IMG_FEATURES_TEXTURE}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
                Everything you need to respond like a national operator
              </h2>
              <p className="mt-2 text-lg text-[#0f2744]">
                Premium experience for renters. Lightweight operations for you.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="group overflow-hidden rounded-2xl border-2 border-slate-300 border-t-[3px] border-t-[#0891b2] bg-white p-6 shadow-lg transition hover:shadow-xl sm:p-7"
                >
                  <div className="mb-4 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0f2744]/8 text-[#0f2744] shadow-sm ring-1 ring-slate-200/80">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      aria-hidden
                    >
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#0f2744]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0f2744]">
                    {f.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Comparison */}
        <section className="border-b border-slate-200 bg-gradient-to-b from-slate-100/80 to-white py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
                Built for speed—not enterprise bloat
              </h2>
              <p className="mt-2 text-lg text-[#0f2744]">
                LeaseFlow is opinionated about leasing outcomes. Here’s how we compare at a glance.
              </p>
            </div>
            <div className="mt-8 overflow-x-auto rounded-2xl border-2 border-slate-300 bg-white shadow-lg">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b-2 border-slate-300 bg-slate-200">
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0f2744]">
                      Capability
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0f2744]">
                      LeaseFlow AI
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0f2744]/80">
                      Knock CRM
                    </th>
                    <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0f2744]/80">
                      Entrata
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-white">
                    <CheckCell strong>Dedicated AI leasing assistant</CheckCell>
                    <CheckCell strong>Native, fully managed</CheckCell>
                    <CheckCell>Add-on / partner dependent</CheckCell>
                    <CheckCell>Limited / workflow-specific</CheckCell>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <CheckCell strong>SMS nurture & follow-ups</CheckCell>
                    <CheckCell strong>Built-in templates + compliance guardrails</CheckCell>
                    <CheckCell>Available in broader suite</CheckCell>
                    <CheckCell>Often via integrations</CheckCell>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white">
                    <CheckCell strong>Self-serve tour scheduling</CheckCell>
                    <CheckCell strong>Real-time openings + reminders</CheckCell>
                    <CheckCell>Strong for multifamily</CheckCell>
                    <CheckCell>Enterprise configuration</CheckCell>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <CheckCell strong>Time to value (typical)</CheckCell>
                    <CheckCell strong>2–3 weeks</CheckCell>
                    <CheckCell>Longer rollout for full stack</CheckCell>
                    <CheckCell>Months for tailored workflows</CheckCell>
                  </tr>
                  <tr className="border-b border-slate-200 bg-white">
                    <CheckCell strong>Pricing clarity for small PMs</CheckCell>
                    <CheckCell strong>Simple setup + monthly</CheckCell>
                    <CheckCell>Scaled for larger operators</CheckCell>
                    <CheckCell>Enterprise-first packaging</CheckCell>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <CheckCell strong>Lead dashboard & analytics</CheckCell>
                    <CheckCell strong>Included, leasing-focused</CheckCell>
                    <CheckCell>Robust CRM reporting</CheckCell>
                    <CheckCell>Broad property management analytics</CheckCell>
                  </tr>
                  <tr className="bg-white">
                    <CheckCell strong>White-glove onboarding</CheckCell>
                    <CheckCell strong>Standard—not an upsell</CheckCell>
                    <CheckCell>Varies by contract</CheckCell>
                    <CheckCell>Professional services common</CheckCell>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-center text-xs font-medium text-[#0f2744]/75">
              Competitive summaries are illustrative; verify current vendor capabilities before purchase decisions.
            </p>
          </div>
        </section>

        {/* 7. Founding clients */}
        <section className="bg-navy py-12 text-white md:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Be a Founding Client
              </h2>
              <p className="mt-2 text-lg font-medium text-white">
                Launching with our first cohort of North Shore MA property managers
              </p>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Lifetime Pricing Lock",
                  body: "Founding clients keep $750/month for life, even when we raise prices.",
                },
                {
                  title: "Direct Founder Access",
                  body: "Work directly with Lucas to customize the AI for your exact properties.",
                },
                {
                  title: "Co-Design the Roadmap",
                  body: "Your feedback shapes what we build next, prioritized over future clients.",
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="flex h-full flex-col rounded-2xl border-2 border-white/25 bg-white/[0.06] p-6 shadow-xl backdrop-blur-sm sm:p-7"
                >
                  <h3 className="font-serif text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-white/95">{card.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Founding Client Application")}`}
                className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-[#0891b2] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0a7e96] sm:w-auto"
              >
                Apply for Founding Client Spot
              </a>
            </div>
          </div>
        </section>

        {/* 8. Pricing */}
        <section
          id="pricing"
          className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-100/70 py-12 md:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
                Pricing that respects small portfolios
              </h2>
              <p className="mt-2 text-lg text-[#0f2744]">
                One implementation. Predictable monthly partnership. No surprise “enterprise minimums.”
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-lg">
              <div className="rounded-3xl border-2 border-slate-300 bg-white p-7 shadow-2xl sm:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#0891b2]">
                      LeaseFlow Professional
                    </p>
                    <p className="mt-1 font-serif text-2xl font-semibold text-[#0f2744]">
                      Full-service AI leasing
                    </p>
                  </div>
                </div>
                <div className="mt-8 space-y-4 border-y-2 border-slate-200 py-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium text-[#0f2744]">One-time setup</span>
                    <span className="font-serif text-3xl font-semibold text-[#0f2744]">
                      $2,500
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium text-[#0f2744]">Monthly platform</span>
                    <span className="font-serif text-3xl font-semibold text-[#0f2744]">
                      $750<span className="text-lg font-semibold text-[#0f2744]/70">/mo</span>
                    </span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 text-sm font-medium text-[#0f2744]">
                  {[
                    "24/7 AI chat tuned to your listings",
                    "SMS follow-ups with compliance guardrails",
                    "Tour scheduling + reminders",
                    "Lead dashboard & pipeline visibility",
                    "Analytics on response and conversion",
                    "Fully managed onboarding & tuning",
                    "Quarterly optimization reviews",
                  ].map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-0.5 shrink-0 text-[#0f2744]" aria-hidden>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <CalendlyDemoLink className="mt-8 flex w-full items-center justify-center rounded-full bg-[#0f2744] py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0a1f36]">
                  Book a Demo
                </CalendlyDemoLink>
                <a
                  href="/chat"
                  className="mt-3 block text-center text-sm font-semibold text-[#0891b2] underline-offset-2 hover:underline"
                >
                  See it in action — Try the live demo →
                </a>
                <p className="mt-3 text-center text-xs font-medium text-[#0f2744]/75">
                  Custom pricing for larger portfolios. Cancel policies outlined in your agreement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Team */}
        <section
          id="team"
          className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/90 py-12 md:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
                Team
              </h2>
              <p className="mt-2 text-lg text-[#0f2744]">
                Operators, advisors, and AI specialists—aligned around your leasing outcomes.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                {
                  name: "Lucas Verrier",
                  role: "Founder",
                  body: "Product and GTM leadership focused on tools that help independent operators compete without enterprise overhead.",
                  avatar: "lv",
                },
                {
                  name: "AI Operations",
                  role: "Implementation & reliability",
                  body: "Prompt engineering, monitoring, and continuous tuning so assistants stay accurate as your portfolio changes.",
                  avatar: "ai",
                },
                {
                  name: "Real Estate Advisors",
                  role: "Leasing & compliance",
                  body: "Guidance on fair housing-aware messaging, tour workflows, and market-specific playbooks—including New England norms.",
                  avatar: "re",
                },
              ].map((m) => (
                <article
                  key={m.name}
                  className="rounded-2xl border-2 border-slate-300 bg-white p-6 text-center shadow-lg sm:p-7 sm:text-left"
                >
                  <div className="mx-auto mb-4 flex sm:mx-0">
                    {m.avatar === "lv" && (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0f2744] text-base font-bold tracking-tight text-white shadow-md ring-2 ring-white">
                        LV
                      </div>
                    )}
                    {m.avatar === "ai" && (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0891b2] text-white shadow-md ring-2 ring-white">
                        <IconAiChip className="h-8 w-8 text-white" />
                      </div>
                    )}
                    {m.avatar === "re" && (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#3d5a73] text-base font-bold tracking-tight text-white shadow-md ring-2 ring-white">
                        RE
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#0f2744]">
                    {m.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0f2744]/75">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#0f2744]">
                    {m.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FAQ */}
        <section
          id="faq"
          className="bg-gradient-to-b from-white via-slate-50/30 to-white py-12 md:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
                FAQ
              </h2>
              <p className="mt-2 text-lg text-[#0f2744]">
                Straight answers—no jargon wall.
              </p>
            </div>
            <div className="mt-6 space-y-2.5">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="lf-faq group rounded-2xl border-2 border-slate-300 bg-white shadow-lg open:border-[#0f2744]/35 open:shadow-xl"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#0f2744] sm:text-base">
                    {item.q}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 text-lg font-light text-[#0f2744] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="border-t-2 border-slate-200 px-5 pb-4 pt-0">
                    <p className="pt-3 text-sm font-medium leading-relaxed text-[#0f2744]">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 11. CTA banner */}
        <section id="cta" className="bg-navy py-12 md:py-16 lg:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ready to stop missing leads?
              </h2>
              <p className="mt-2 font-medium text-white">
                Book a demo and we’ll map LeaseFlow to your listings, tours, and SMS policies—no obligation.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <CalendlyDemoLink className="inline-flex min-h-[44px] w-full min-w-[160px] items-center justify-center rounded-full border-2 border-white bg-[#0f2744] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0a1f36] sm:w-auto">
                Book a Demo
              </CalendlyDemoLink>
              <a
                href={MAILTO_DEMO}
                className="inline-flex min-h-[44px] w-full min-w-[160px] items-center justify-center rounded-full bg-[#0891b2] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0a7e96] sm:w-auto"
              >
                Email Us
              </a>
              <a
                href="/chat"
                className="inline-flex min-h-[44px] w-full min-w-[160px] items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-white/10 sm:w-auto"
              >
                Try Live Demo
              </a>
            </div>
          </div>
        </section>

        {/* 12. Footer */}
        <footer className="border-t border-white/10 bg-gradient-to-b from-slate-900 via-[#0f2744] to-[#061828] py-10 text-white md:py-12">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <LogoWordmark onDark />
              <p className="mt-3 max-w-xs text-sm font-medium text-white/90">
                AI leasing for small property managers—fast responses, fuller tours, fewer dropped conversations.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm font-medium text-white/95">
                <li>
                  <a href={MAILTO_DEMO} className="hover:text-white/80">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={PHONE_TEL} className="hover:text-white/80">
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>North Shore, MA — serving Greater Boston area</li>
                <li className="text-white/80">Founded 2026</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Product
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                <li>
                  <a href="#features" className="text-white hover:text-white/80">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-white hover:text-white/80">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white hover:text-white/80">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/chat" className="text-white hover:text-white/80">
                    Tenant Chat
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="text-white hover:text-white/80">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/settings" className="text-white hover:text-white/80">
                    Client Settings
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Company
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                <li>
                  <a href="/about" className="text-white hover:text-white/80">
                    About
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-white hover:text-white/80">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-white hover:text-white/80">
                    How it works
                  </a>
                </li>
                <li>
                  <a href={MAILTO_DEMO} className="text-white hover:text-white/80">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Legal
              </p>
              <ul className="mt-3 space-y-2 text-sm font-medium">
                <li>
                  <a href="/privacy" className="text-white hover:text-white/80">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-white hover:text-white/80">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-6xl border-t border-white/15 px-4 pt-6 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-medium text-white/85">
              © 2026 LeaseFlow AI. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
