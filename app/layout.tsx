import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "0ath",
  description: "Agent-operated proof-of-ship markets for Agora builders."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <div className="shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand" aria-label="0ath home">
                <strong>0ath</strong>
                <span>Agora proof markets</span>
              </Link>
              <nav className="nav" aria-label="Primary">
                <Link href="/oaths/new">New oath</Link>
                <Link href="/judge">Judge</Link>
                <Link href="/dashboard">Dashboard</Link>
                <a href="https://github.com/SaaiAravindhRaja/0ath" target="_blank" rel="noreferrer">
                  Repo
                </a>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
