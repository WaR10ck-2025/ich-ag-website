interface SectionLabelProps {
  text: string
  className?: string
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--color-text-accent)',
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '0.75rem',
      }}
    >
      // {text}
    </span>
  )
}
