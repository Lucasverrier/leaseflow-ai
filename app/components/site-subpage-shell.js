import Link from "next/link";
import SiteChromeHeader from "./site-chrome-header";

/**
 * Marketing subpages: shared sticky header + slim gradient footer with legal links.
 */
export default function SiteSubpageShell({ children }) {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-white text-[#0f2744]">
      <SiteChromeHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="border-t border-white/10 bg-gradient-to-r from-slate-900 via-[#0f2744] to-[#061828] py-8 text-white">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm font-medium">
          <Link href="/" className="text-white/95 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-white/95 hover:text-white">
            About
          </Link>
          <Link href="/privacy" className="text-white/95 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white/95 hover:text-white">
            Terms of Service
          </Link>
        </div>
        <p className="mt-4 text-center text-xs font-medium text-white/75">© 2026 LeaseFlow AI</p>
      </footer>
    </div>
  );
}
