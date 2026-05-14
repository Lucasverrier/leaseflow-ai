import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteTitle = "LeaseFlow AI — AI Leasing Assistant for Small Property Managers";
const siteDescription =
  "Never miss a rental lead again. LeaseFlow AI responds to tenant inquiries 24/7, sends SMS follow-ups, and schedules tours automatically. Built for small landlords in North Shore MA.";
const keywords = [
  "AI leasing",
  "property management",
  "rental automation",
  "leasing chatbot",
  "small landlord software",
  "North Shore MA property management",
];

export const viewport: Viewport = {
  themeColor: "#0f2744",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | LeaseFlow AI",
  },
  description: siteDescription,
  keywords,
  authors: [{ name: "LeaseFlow AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LeaseFlow AI",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0f2744]">
        {children}
      </body>
    </html>
  );
}
