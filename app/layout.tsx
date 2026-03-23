import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevChallenge Pro — Full Stack Coding Challenges",
  description:
    "Practice real-world full stack development with Figma-to-MERN challenges. Build portfolio projects, sharpen your skills, and stand out as a developer.",
  keywords: [
    "Full Stack Coding Challenges",
    "Portfolio Projects for Developers",
    "Full Stack Project Ideas",
    "Frontend Mentor Alternatives",
    "MERN Stack Practice Projects",
    "Full Stack Portfolio Challenge",
    "Figma to MERN Project",
    "Real World Full Stack Tasks",
    "Interactive Full Stack Practice",
  ],
  openGraph: {
    title: "DevChallenge Pro — Full Stack Coding Challenges",
    description:
      "Practice real-world full stack development with Figma-to-MERN challenges. Build portfolio projects and stand out as a developer.",
    url: "https://devchallenge-pro.vercel.app",
    siteName: "DevChallenge Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevChallenge Pro — Full Stack Coding Challenges",
    description:
      "Practice real-world full stack development with Figma-to-MERN challenges. Build portfolio projects and stand out as a developer.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-22P5EMYWWP"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-22P5EMYWWP');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-[#0b1326] text-[#dae2fd] min-h-screen`}>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
