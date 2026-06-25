import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <main className="wrapper" style={{
      paddingTop: 'clamp(32px, 4vw, 56px)',
      paddingBottom: 'clamp(48px, 6vw, 80px)',
      maxWidth: '720px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          Simple pricing
        </h1>
        <p style={{
          fontSize: '15px', color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}>
          Free prompts are always free. One plan unlocks everything.
        </p>
      </div>

      {/* Single Pro card — the focus */}
      <div style={{
        border: '1px solid var(--border)',
        marginBottom: 'clamp(48px, 6vw, 72px)',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 28px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-warm)',
        }}>
          <span style={{
            fontSize: '14px', fontWeight: 500, color: 'var(--text)',
          }}>Pro</span>
          <span style={{
            fontSize: '12px', fontWeight: 500,
            padding: '3px 10px',
            background: 'var(--text)', color: 'var(--bg)',
          }}>Recommended</span>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
          {/* Price */}
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 400,
              letterSpacing: '-0.03em',
            }}>$9</span>
            <span style={{ fontSize: '15px', color: 'var(--muted)', marginLeft: '4px' }}>/month</span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>
            Cancel anytime. No contracts. Instant access.
          </p>

          {/* Two columns of features */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '14px 32px', marginBottom: '36px',
          }}>
            {[
              'All premium prompts',
              'Multi-section designs',
              'New prompts weekly',
              'Early access (7 days)',
              'Tested on 5 AI tools',
              'Request prompt types',
              'Production-ready output',
              'Priority support',
            ].map(f => (
              <div key={f} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <Check size={15} strokeWidth={1.5} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} />
                {f}
              </div>
            ))}
          </div>

          {/* CTA */}
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '14px', fontSize: '15px', fontWeight: 500,
            color: 'var(--bg)', background: 'var(--text)', border: 'none',
            cursor: 'pointer',
          }}>
            Get Pro <ArrowRight size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Free note */}
      <div style={{
        textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)',
        padding: '24px',
        border: '1px solid var(--border)',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Not ready for Pro? Free prompts are always available — no account needed.
        </p>
        <Link href="/" style={{
          fontSize: '14px', fontWeight: 500, color: 'var(--text)',
          textDecoration: 'underline', textUnderlineOffset: '3px',
          textDecorationColor: 'var(--border)',
        }}>Browse free prompts</Link>
      </div>

      {/* FAQ */}
      <div>
        <h2 style={{
          fontSize: '16px', fontWeight: 500,
          color: 'var(--text)', marginBottom: '24px',
          textAlign: 'center',
        }}>Common questions</h2>

        {[
          { q: 'Can I cancel anytime?', a: 'Yes. One click, no questions. You keep access until the billing period ends.' },
          { q: 'Which AI tools work?', a: 'Every prompt is tested with Claude, Lovable, v0, Antigravity, and Cursor.' },
          { q: 'How often do you add prompts?', a: 'Every week. Pro members get them 7 days before public release.' },
          { q: 'What if a prompt doesn\'t work?', a: 'We\'ll fix or replace it. Every prompt is tested before publishing.' },
        ].map(item => (
          <div key={item.q} style={{
            padding: '18px 0',
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>
              {item.q}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
