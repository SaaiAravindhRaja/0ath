import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "0ath",
  description: "Agent-operated proof-of-ship markets for Agora builders."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link href="/" className="brand" aria-label="0ath home">
                0ath <span>Agora proof markets</span>
              </Link>
              <nav className="nav" aria-label="Primary">
                <Link href="/oaths/new">New oath</Link>
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
