import { type ReactNode, useState } from 'react'

interface ScanlineCardProps {
  children: ReactNode
  index?: string
  style?: React.CSSProperties
}

export function ScanlineCard({ children, index, style }: ScanlineCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--color-bg-surface)',
        border: `1px solid ${hovered ? 'var(--color-border-glow)' : 'var(--color-border)'}`,
        borderRadius: '4px',
        padding: '2rem',
        transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
        boxShadow: hovered ? '0 0 32px var(--color-accent-ghost)' : 'none',
        ...style,
      }}
    >
      {index && (
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-text-tertiary)',
            letterSpacing: '0.05em',
          }}
        >
          [{index}]
        </span>
      )}
      {children}
    </div>
  )
}
