'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')

  return (
    <main className="wrapper" style={{
      paddingTop: 'clamp(48px, 8vw, 100px)',
      paddingBottom: 'clamp(48px, 6vw, 80px)',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <h1 style={{
          fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400,
          letterSpacing: '-0.02em', marginBottom: '8px',
        }}>Log in</h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>
          Access your account and saved prompts.
        </p>

        <form onSubmit={e => e.preventDefault()} style={{
          display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
          <div>
            <label style={{
              display: 'block', fontSize: '13px', fontWeight: 500,
              color: 'var(--text-secondary)', marginBottom: '6px',
            }}>Email</label>
            <input
              type="email" name="email" required
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px',
                fontSize: '14px', color: 'var(--text)',
                background: 'var(--bg-warm)', border: '1px solid var(--border)',
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block', fontSize: '13px', fontWeight: 500,
              color: 'var(--text-secondary)', marginBottom: '6px',
            }}>Password</label>
            <input
              type="password" name="password" required
              placeholder="Your password"
              style={{
                width: '100%', padding: '10px 14px',
                fontSize: '14px', color: 'var(--text)',
                background: 'var(--bg-warm)', border: '1px solid var(--border)',
                outline: 'none',
              }}
            />
          </div>
          <button type="submit" style={{
            padding: '10px', marginTop: '4px',
            background: 'var(--text)', color: 'var(--bg)',
            border: 'none', fontSize: '14px', fontWeight: 500,
            cursor: 'pointer',
          }}>Log in</button>
        </form>

        <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '20px', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/pricing" style={{ color: 'var(--text)', fontWeight: 500 }}>Get Pro</Link>
        </p>
      </div>
    </main>
  )
}
