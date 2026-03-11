import { type FormEvent, useState } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../../lib/constants'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function Kontakt() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate submission
    setTimeout(() => setStatus('success'), 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border)',
    borderRadius: '2px',
    padding: '0.75rem 1rem',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    minHeight: '44px',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    marginBottom: '0.375rem',
    letterSpacing: '0.03em',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-accent-primary)'
    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-ghost)'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-border)'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <section
      id="kontakt"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '80px 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel text="KONTAKT" />
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: 'var(--color-text-primary)',
          marginBottom: '3rem',
          letterSpacing: '-0.02em',
        }}
      >
        Schreiben Sie mir.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Terminal info block */}
        <div>
          {/* Status indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-success)',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }}
              className="pulse-dot"
            />
            SYSTEM ONLINE
          </div>

          {[
            { label: 'E-Mail', value: SITE.email, href: `mailto:${SITE.email}` },
            { label: 'Telefon', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
            { label: 'Reaktionszeit', value: SITE.responseTime },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '0.25rem',
                }}
              >
                &gt; {item.label}
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-accent)',
                    textDecoration: 'none',
                    transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  {item.value}
                </a>
              ) : (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          {status === 'success' ? (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-success)',
                padding: '2rem',
                border: '1px solid var(--color-success)',
                borderRadius: '4px',
                background: 'rgba(0,255,136,0.05)',
              }}
            >
              <div style={{ fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-text-tertiary)' }}>
                // STATUS
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>NACHRICHT_GESENDET</div>
              <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: '0.75rem', fontSize: '0.9375rem' }}>
                Ich melde mich innerhalb von {SITE.responseTime} bei Ihnen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-9999px' }}>
                {status === 'error' && 'Fehler beim Senden. Bitte versuchen Sie es erneut.'}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>NAME</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Max Mustermann"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>E-MAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="max@beispiel.de"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label htmlFor="betreff" style={labelStyle}>BETREFF</label>
                  <select
                    id="betreff"
                    name="betreff"
                    required
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="beratung">IT-Beratung</option>
                    <option value="support">IT-Support</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nachricht" style={labelStyle}>NACHRICHT</label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    required
                    rows={5}
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <input
                    id="datenschutz"
                    name="datenschutz"
                    type="checkbox"
                    required
                    style={{
                      width: '18px',
                      height: '18px',
                      minWidth: '18px',
                      marginTop: '2px',
                      cursor: 'pointer',
                      accentColor: 'var(--color-accent-primary)',
                    }}
                  />
                  <label
                    htmlFor="datenschutz"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                  >
                    Ich habe die{' '}
                    <a href="#datenschutz" style={{ color: 'var(--color-text-accent)', textDecoration: 'none' }}>
                      Datenschutzerklärung
                    </a>{' '}
                    gelesen und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>

                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-error)' }}>
                    ✕ Fehler beim Senden. Bitte versuchen Sie es erneut.
                  </p>
                )}

                <GlowButton type="submit" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
                  {status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden _'}
                </GlowButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
