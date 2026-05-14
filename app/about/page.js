import SiteSubpageShell from "../components/site-subpage-shell";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "About",
  description: "Why LeaseFlow AI exists, our mission, and how to reach the team.",
};

export default function AboutPage() {
  return (
    <SiteSubpageShell>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#0f2744] sm:text-4xl">
          About LeaseFlow AI
        </h1>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-slate-800">
          <section>
            <h2 className="font-serif text-xl font-semibold text-[#0f2744]">Section 1 — Why We Built This</h2>
            <p className="mt-3">
              Small landlords in places like North Shore MA are losing leads every day because they can&apos;t respond to
              tenant inquiries fast enough. Big enterprise software costs thousands per month and isn&apos;t built for
              portfolios of 5 to 50 units. We built LeaseFlow AI for them.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#0f2744]">Section 2 — Meet the Founder</h2>
            <p className="mt-3">
              Lucas Verrier is the founder of LeaseFlow AI. He studies Entrepreneurial Finance at Virginia Tech and
              works in real estate construction with his father in Lynn, Massachusetts. The idea for LeaseFlow AI came
              directly from watching small landlords struggle with the same problem repeatedly: missing tenant inquiries
              that came in after hours or while they were at their day jobs. LeaseFlow AI solves that problem with
              always-on AI that responds instantly, qualifies leads, and books tours automatically.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#0f2744]">Section 3 — Our Mission</h2>
            <p className="mt-3">
              Make professional AI leasing tools accessible to landlords who run their portfolios as a side business or
              with small teams. The same technology enterprise property managers use, built for everyone else.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#0f2744]">Section 4 — Based In</h2>
            <p className="mt-3">
              North Shore, MA — serving Greater Boston, Lynn, Salem, Beverly, Gloucester, and surrounding areas.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[#0f2744]">Section 5 — Get In Touch</h2>
            <ul className="mt-3 list-none space-y-2 pl-0 text-slate-800">
              <li>
                Email:{" "}
                <a href="mailto:Ltverrier1@gmail.com" className="font-medium text-[#0891b2] hover:underline">
                  Ltverrier1@gmail.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+19786467715" className="font-medium text-[#0891b2] hover:underline">
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
