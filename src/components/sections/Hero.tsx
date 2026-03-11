import { useState } from 'react'
import { motion } from 'framer-motion'
import { BackgroundPaths } from '../ui/BackgroundPaths'
import { GlowButton } from '../ui/GlowButton'
import { HERO_LINES, SITE } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Hero() {
  const reduced = useReducedMotion()
  const [ctaVisible, setCtaVisible] = useState(false)

  // Pre-compute per-letter delay across all lines
  let gi = 0
  const lines = HERO_LINES.map((line, li) => {
    const words = line.split(' ').map((word, wi) => {
      const letters = word.split('').map((ch) => {
        const delay = reduced ? 0 : gi * 0.04 + 0.3
        gi++
        return { ch, delay }
      })
      if (wi < line.split(' ').length - 1) gi++ // visual gap for space
      return letters
    })
    gi += 2 // pause between lines
    return words
  })

  const lastLine = lines[lines.length - 1]
  const lastWord = lastLine[lastLine.length - 1]
  const lastLetterDelay = lastWord[lastWord.length - 1].delay

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 2rem 80px',
        overflow: 'hidden',
      }}
    >
      <BackgroundPaths />

      {/* Radial gradient overlay to keep text readable */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, transparent 0%, var(--color-bg-base) 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Status pre-label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-text-accent)',
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            className="pulse-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-success)',
              display: 'inline-block',
            }}
          />
          // STATUS: ONLINE_
        </motion.div>

        {/* Letter-by-letter animated headline */}
        <h1
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          {lines.map((words, li) => (
            <div key={li}>
              {words.map((letters, wi) => (
                <span
                  key={wi}
                  style={{ display: 'inline-block', marginRight: '0.35em' }}
                >
                  {letters.map(({ ch, delay }, ci) => {
                    const isLast =
                      li === lines.length - 1 &&
                      wi === words.length - 1 &&
                      ci === letters.length - 1
                    return (
                      <motion.span
                        key={ci}
                        initial={{ y: reduced ? 0 : 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { delay, type: 'spring', stiffness: 150, damping: 25 }
                        }
                        onAnimationComplete={
                          isLast ? () => setCtaVisible(true) : undefined
                        }
                        style={{
                          display: 'inline-block',
                          background:
                            'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent-primary) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {ch}
                      </motion.span>
                    )
                  })}
                </span>
              ))}
            </div>
          ))}
        </h1>

        {/* Sub-copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={reduced || ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '540px',
              lineHeight: 1.7,
            }}
          >
            {SITE.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <GlowButton href="#leistungen" variant="primary">
              Leistungen ansehen _
            </GlowButton>
            <GlowButton href="#kontakt" variant="ghost">
              Kontakt aufnehmen →
            </GlowButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: reduced ? 0.5 : lastLetterDelay + 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--color-text-tertiary)',
          letterSpacing: '0.1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          zIndex: 1,
        }}
      >
        <span>↓ SCROLL</span>
      </motion.div>
    </section>
  )
}
