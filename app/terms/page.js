import SiteSubpageShell from "../components/site-subpage-shell";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Terms of Service",
  description: "Terms governing use of LeaseFlow AI.",
};

export default function TermsPage() {
  return (
    <SiteSubpageShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm font-medium text-slate-600">Last Updated: May 12, 2026</p>

        <div className="mt-10 max-w-none space-y-10 text-[15px] leading-relaxed text-slate-800">
          <section>
            <h2 className="text-xl">Section 1 — Acceptance</h2>
            <p>By using LeaseFlow AI you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 2 — Service Description</h2>
            <p>
              LeaseFlow AI provides an AI-powered leasing assistant for property managers. Service includes 24/7 chat,
              SMS follow-ups, tour scheduling, and management dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 3 — Eligibility</h2>
            <p>You must be 18+ and legally authorized to represent the rental properties you list.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 4 — Payment Terms</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>One-time setup fee: $2,500 (paid upfront)</li>
              <li>Monthly subscription: $750/month</li>
              <li>Billed monthly via invoice</li>
              <li>Cancel anytime with 30 days written notice</li>
              <li>No refunds on setup fee once implementation begins</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Section 5 — Acceptable Use</h2>
            <p>You agree <strong>not</strong> to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the service for illegal discrimination</li>
              <li>Violate Fair Housing Act, ADA, or state housing laws</li>
              <li>Misrepresent property availability or terms</li>
              <li>Spam or harass prospects</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Section 6 — Fair Housing Compliance</h2>
            <p>
              You are responsible for ensuring AI responses comply with Fair Housing laws. We provide tools to help but
              final responsibility is yours.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 7 — AI Accuracy Disclaimer</h2>
            <p>
              AI responses are informational. Official availability, pricing, and lease terms must be confirmed through
              your direct contact methods. We are not liable for AI errors.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 8 — Intellectual Property</h2>
            <p>
              LeaseFlow AI owns all software, branding, and underlying technology. You retain ownership of your property
              data and conversations.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 9 — Termination</h2>
            <p>We may terminate accounts for: nonpayment, violation of terms, illegal activity.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 10 — Limitation of Liability</h2>
            <p>
              Our liability is limited to the amount you paid in the previous 12 months. We are not liable for indirect
              damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Section 11 — Indemnification</h2>
            <p>You agree to indemnify LeaseFlow AI for claims arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 12 — Governing Law</h2>
            <p>These terms are governed by Massachusetts law. Disputes resolved in Essex County, MA.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 13 — Changes to Terms</h2>
            <p>We may update terms with 30 days notice.</p>
          </section>

          <section>
            <h2 className="text-xl">Section 14 — Contact</h2>
            <ul className="list-none space-y-1 pl-0">
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
            </ul>
          </section>
        </div>
      </article>
    </SiteSubpageShell>
  );
}
