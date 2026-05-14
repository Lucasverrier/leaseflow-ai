import SiteSubpageShell from "../components/site-subpage-shell";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Privacy Policy",
  description: "How LeaseFlow AI collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <SiteSubpageShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-600">
          Last Updated: May 12, 2026 · Effective Date: May 12, 2026
        </p>

        <div className="mt-10 max-w-none space-y-10 text-[15px] leading-relaxed text-slate-800">
          <section>
            <h2 className="text-xl">Section 1 — Introduction</h2>
            <p>
              LeaseFlow AI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This policy explains how we
              collect, use, and protect information when you use our AI leasing assistant service.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 2 — Information We Collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Property manager information:</strong> name, business name, email, phone, business address
              </li>
              <li>
                <strong>Property information:</strong> listings, pricing, availability, policies
              </li>
              <li>
                <strong>Tenant conversation data:</strong> messages exchanged with the AI assistant
              </li>
              <li>
                <strong>Usage data:</strong> log files, IP addresses, browser type
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Section 3 — How We Use Information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To operate the AI leasing assistant</li>
              <li>To communicate with property manager clients</li>
              <li>To improve our service</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Section 4 — Data Sharing</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>We do <strong>not</strong> sell your data to third parties.</li>
              <li>
                We use OpenAI&apos;s API to power the AI — conversation data is processed by OpenAI under their privacy
                terms.
              </li>
              <li>We may share data if required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Section 5 — Data Security</h2>
            <p>
              We use industry-standard encryption (TLS in transit, encrypted at rest) and access controls. However, no
              system is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 6 — Your Rights</h2>
            <p>
              You may request: data export, data deletion, correction of inaccurate data. Contact{" "}
              <a href="mailto:Ltverrier1@gmail.com" className="font-semibold text-[#0891b2] hover:underline">
                Ltverrier1@gmail.com
              </a>{" "}
              for any requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 7 — Cookies</h2>
            <p>
              We use essential cookies for site functionality and analytics cookies (Google Analytics if added later).
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 8 — Children&apos;s Privacy</h2>
            <p>Our service is not intended for anyone under 18.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 9 — Changes</h2>
            <p>We may update this policy. Changes will be posted here with a new effective date.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 10 — Contact</h2>
            <p className="font-semibold text-[#0f2744]">LeaseFlow AI</p>
            <ul className="mt-2 list-none space-y-1 pl-0">
              <li>
                Email:{" "}
                <a href="mailto:Ltverrier1@gmail.com" className="text-[#0891b2] hover:underline">
                  Ltverrier1@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+19786467715" className="text-[#0891b2] hover:underline">
                  (978) 646-7715
                </a>
              </li>
              <li>Location: North Shore, MA</li>
            </ul>
          </section>
        </div>
      </article>
    </SiteSubpageShell>
  );
}
