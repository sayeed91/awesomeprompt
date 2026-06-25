'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '/', label: 'Library' },
    { href: '/hire', label: 'Hire Us' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 100,
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="wrapper" style={{
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/" style={{
            fontSize: '14px', fontWeight: 500, color: 'var(--text)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            PromptStore
          </Link>
          <div className="nav-desktop" style={{ gap: '24px' }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                fontSize: '14px', color: 'var(--muted)',
              }}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="nav-desktop" style={{ alignItems: 'center', gap: '16px' }}>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px',
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {theme === 'dark'
              ? <Sun size={16} strokeWidth={1.5} />
              : <Moon size={16} strokeWidth={1.5} />
            }
          </button>
          <Link href="/login" style={{ fontSize: '14px', color: 'var(--muted)' }}>Log in</Link>
          <Link href="/pricing" style={{
            fontSize: '13px', fontWeight: 500, color: 'var(--bg)',
            background: 'var(--text)', padding: '7px 16px',
          }}>Pro</Link>
        </div>

        {/* Mobile hamburger */}
        <div className="nav-mobile" style={{ alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px',
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {theme === 'dark'
              ? <Sun size={16} strokeWidth={1.5} />
              : <Moon size={16} strokeWidth={1.5} />
            }
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px',
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="wrapper" style={{
          paddingTop: '8px',
          paddingBottom: '16px',
          borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              fontSize: '15px', color: 'var(--text)', padding: '8px 0',
            }}>{l.label}</Link>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', gap: '12px' }}>
            <Link href="/login" onClick={() => setMobileOpen(false)} style={{
              fontSize: '14px', color: 'var(--muted)', padding: '8px 0',
            }}>Log in</Link>
            <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{
              fontSize: '13px', fontWeight: 500, color: 'var(--bg)',
              background: 'var(--text)', padding: '8px 16px',
            }}>Pro</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
