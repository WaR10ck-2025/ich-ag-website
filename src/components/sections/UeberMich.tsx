import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { BIO, STATS, TECH_TAGS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function useCountUp(target: number, duration = 1200, active = false, suffix = '') {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced || !active ? target : 0)

  useEffect(() => {
    if (!active || reduced) {
      setValue(target)
      return
    }
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration, reduced])

  return suffix === '/7' ? `${value}/7` : `${value}${suffix}`
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const display = useCountUp(value, 1200, active, suffix)
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--color-accent-primary)',
          lineHeight: 1,
          marginBottom: '0.25rem',
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--color-text-tertiary)',
          letterSpacing: '0.05em',
        }}
      >
        // {label}
      </div>
    </div>
  )
}

export function UeberMich() {
  const sectionRef = useRef<HTMLElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="ueber-mich"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '80px 2rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Stats */}
        <div>
          <SectionLabel text="STATS" />
          {STATS.map(s => (
            <StatItem key={s.label} {...s} active={statsActive} />
          ))}

          {/* Avatar monogram */}
          <div
            style={{
              marginTop: '2rem',
              width: '80px',
              height: '80px',
              borderRadius: '4px',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'var(--color-accent-primary)',
            }}
          >
            ICH
          </div>
        </div>

        {/* Right: Bio */}
        <div>
          <SectionLabel text="ÜBER_MICH" />
          <h2
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: 'var(--color-text-primary)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            {BIO.headline}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {BIO.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {TECH_TAGS.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--color-text-accent)',
                  background: 'var(--color-accent-ghost)',
                  border: '1px solid var(--color-border-glow)',
                  borderRadius: '2px',
                  padding: '0.25rem 0.625rem',
                  letterSpacing: '0.03em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
