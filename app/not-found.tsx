import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="wrapper" style={{
      paddingTop: 'clamp(64px, 10vw, 120px)',
      paddingBottom: 'clamp(64px, 10vw, 120px)',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400,
        letterSpacing: '-0.03em', marginBottom: '14px',
      }}>Page not found</h1>
      <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '24px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" style={{
        fontSize: '14px', fontWeight: 500,
        color: 'var(--bg)', background: 'var(--text)',
        padding: '9px 18px', display: 'inline-block',
      }}>Back to library</Link>
    </main>
  )
}
