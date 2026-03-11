import { useEffect, useRef } from 'react'
import { ScanlineCard } from '../ui/ScanlineCard'
import { SectionLabel } from '../ui/SectionLabel'
import { SERVICES } from '../../lib/constants'

export function Leistungen() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      el.classList.add('reveal')
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), i * 150)
            obs.unobserve(el)
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <section
      id="leistungen"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '80px 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <SectionLabel text="LEISTUNGEN" />
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
        Was ich für Sie tue.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {SERVICES.map((service, i) => (
          <div key={service.id} ref={el => { cardRefs.current[i] = el }}>
            <ScanlineCard index={service.id}>
              {/* Icon */}
              <div style={{ marginBottom: '1.25rem' }}>
                {service.id === '01' ? <IconConsulting /> : <IconSupport />}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.75rem',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.65,
                }}
              >
                {service.description}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {service.items.map(item => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-accent-primary)' }}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScanlineCard>
          </div>
        ))}
      </div>
    </section>
  )
}

function IconConsulting() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3 2-2 3 3" />
    </svg>
  )
}

function IconSupport() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
