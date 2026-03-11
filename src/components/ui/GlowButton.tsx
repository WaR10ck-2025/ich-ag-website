import { type ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: React.CSSProperties
}

export function GlowButton({
  children,
  variant = 'primary',
  onClick,
  href,
  type = 'button',
  disabled = false,
  style,
}: GlowButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.875rem',
    fontWeight: 700,
    padding: '0.75rem 1.5rem',
    borderRadius: '2px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    transition: 'all 200ms ease-out',
    border: '1px solid',
    letterSpacing: '0.03em',
    minHeight: '44px',
    touchAction: 'manipulation',
    opacity: disabled ? 0.5 : 1,
    ...style,
  }

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'var(--color-accent-primary)',
    borderColor: 'var(--color-accent-primary)',
    color: 'var(--color-bg-base)',
  }

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text-primary)',
  }

  const appliedStyle = variant === 'primary' ? primaryStyle : ghostStyle

  if (href) {
    return (
      <a
        href={href}
        style={appliedStyle}
        onMouseEnter={e => {
          if (variant === 'primary') {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px var(--color-accent-dim)'
          } else {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent-primary)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-accent)'
          }
        }}
        onMouseLeave={e => {
          if (variant === 'primary') {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none'
          } else {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)'
          }
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={appliedStyle}
      onMouseEnter={e => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px var(--color-accent-dim)'
        } else {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent-primary)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-accent)'
        }
      }}
      onMouseLeave={e => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none'
        } else {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)'
        }
      }}
    >
      {children}
    </button>
  )
}
