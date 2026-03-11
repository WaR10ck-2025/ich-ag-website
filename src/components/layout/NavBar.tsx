import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../../lib/constants'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '64px',
    background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
    transition: 'background 300ms ease, border-color 300ms ease',
  }

  return (
    <header>
      <nav style={navStyle} role="navigation" aria-label="Hauptnavigation">
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          [ICH_AG]<span className="cursor-blink" style={{ color: 'var(--color-accent-primary)' }}>|</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '2rem' }} className="hidden-mobile">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: isActive ? 'var(--color-text-accent)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                  touchAction: 'manipulation',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)' }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)' }}
              >
                // {link.label}
              </a>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className="show-mobile"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            color: 'var(--color-text-primary)',
            padding: '0.5rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            minWidth: '44px',
            minHeight: '44px',
            display: 'none',
            touchAction: 'manipulation',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 99,
            background: 'var(--color-bg-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            animation: 'fade-in 200ms ease-out',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                touchAction: 'manipulation',
              }}
            >
              // {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </header>
  )
}
