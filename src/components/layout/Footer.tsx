import { SITE } from '../../lib/constants'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-base)',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--color-text-tertiary)',
        }}
      >
        [{SITE.name}] © {SITE.year}
      </span>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['Impressum', 'Datenschutz'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-text-tertiary)',
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-tertiary)' }}
          >
            {item}
          </a>
        ))}
      </div>
    </footer>
  )
}
