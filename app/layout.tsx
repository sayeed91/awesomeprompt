import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import ThemeProvider from '@/components/ThemeProvider'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PromptStore — AI Design Prompts',
  description: 'Curated AI prompts for building websites with Claude, Lovable, v0, and more.',
}

import FooterSubscribe from '@/components/FooterSubscribe'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t = localStorage.getItem('theme');
            if (!t) t = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', t);
          })();
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}

          <footer className="wrapper" style={{
            marginTop: 'clamp(40px, 5vw, 64px)',
            paddingTop: 'clamp(32px, 4vw, 48px)',
            paddingBottom: 'clamp(32px, 4vw, 48px)',
          }}>
            <div style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 'clamp(32px, 4vw, 48px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '40px',
            }}>
              <div>
                <span style={{
                  fontSize: '14px', fontWeight: 500, color: 'var(--text)',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>PromptStore</span>
                <p style={{
                  fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7,
                  marginTop: '8px', maxWidth: '280px',
                }}>
                  Curated AI design prompts.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href="/" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Library</Link>
                  <Link href="/hire" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Hire Us</Link>
                  <Link href="/about" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>About</Link>
                  <Link href="/pricing" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Pricing</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link href="/terms" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Terms</Link>
                  <Link href="/privacy" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Privacy</Link>
                </div>
              </div>

              <FooterSubscribe />
            </div>

            <div style={{
              marginTop: '32px', paddingTop: '16px',
              fontSize: '13px', color: 'var(--muted)',
            }}>
              &copy; 2026 PromptStore
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
