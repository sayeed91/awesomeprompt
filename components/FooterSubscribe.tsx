'use client'

export default function FooterSubscribe() {
  return (
    <form onSubmit={e => { e.preventDefault() }} style={{ display: 'flex', gap: '4px' }}>
      <input type="email" name="email" placeholder="Email" required style={{
        height: '34px', padding: '0 12px', width: '180px',
        border: '1px solid var(--border)', background: 'var(--bg-warm)',
        fontSize: '14px', color: 'var(--text)', outline: 'none',
      }} />
      <button type="submit" style={{
        height: '34px', padding: '0 14px',
        border: '1px solid var(--text)', background: 'var(--text)',
        color: 'var(--bg)', fontSize: '13px', fontWeight: 500,
      }}>Subscribe</button>
    </form>
  )
}
