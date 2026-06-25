import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="wrapper" style={{
      paddingTop: 'clamp(32px, 4vw, 56px)',
      paddingBottom: 'clamp(48px, 6vw, 80px)',
    }}>
      <div style={{ maxWidth: '560px' }}>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400,
          letterSpacing: '-0.03em', lineHeight: 1.15,
          marginBottom: '24px',
        }}>
          About
        </h1>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: '16px',
          fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8,
        }}>
          <p>
            PromptStore is a curated library of AI design prompts. Copy free prompts
            instantly or unlock premium ones with Pro.
          </p>
          <p>
            Every prompt is tested across Claude, Lovable, v0, Antigravity, and Cursor.
          </p>

          <div style={{
            marginTop: '16px', paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '14px',
          }}>
            {[
              'Browse prompts by category, tool, or type',
              'Hover cards to see video previews',
              'Copy free prompts or unlock premium with Pro ($9/mo)',
              'Paste into any AI tool and build',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', fontSize: '14px' }}>
                <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{line}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link href="/" style={{
              fontSize: '14px', fontWeight: 500,
              color: 'var(--bg)', background: 'var(--text)',
              padding: '9px 18px',
              display: 'inline-block',
            }}>Browse Library</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
