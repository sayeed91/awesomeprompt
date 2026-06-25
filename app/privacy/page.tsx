export default function PrivacyPage() {
  return (
    <main className="wrapper" style={{
      paddingTop: 'clamp(32px, 4vw, 56px)',
      paddingBottom: 'clamp(48px, 6vw, 80px)',
    }}>
      <div style={{ maxWidth: '560px' }}>
        <h1 style={{
          fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400,
          letterSpacing: '-0.02em', marginBottom: '24px',
        }}>Privacy Policy</h1>
        <div style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p>Privacy policy will be published here before launch.</p>
        </div>
      </div>
    </main>
  )
}
