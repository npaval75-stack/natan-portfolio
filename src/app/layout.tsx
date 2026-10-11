import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";
import { GrainOverlay } from "@/components/GrainOverlay";
import { HudChrome } from "@/components/HudChrome";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://natanpaval.dev"),
  title: "Natanael Paval — Portfolio 2026",
  description:
    "Graphic design portfolio of Natanael Paval, covering branding, editorial, motion, and visual identity.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://natanpaval.dev",
    siteName: "Natanael Paval",
    title: "Natanael Paval — Graphic Design Portfolio",
    description:
      "Selected branding, editorial, motion, and visual identity work by Natanael Paval.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body
        className="relative min-h-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <AtmosphericBackground />
        <HudChrome />
        <GrainOverlay />
        <div className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
