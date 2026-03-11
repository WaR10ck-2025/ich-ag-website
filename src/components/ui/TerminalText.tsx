import { useTypewriter } from '../../hooks/useTypewriter'

interface TerminalTextProps {
  lines: string[]
  onDone?: () => void
}

export function TerminalText({ lines, onDone }: TerminalTextProps) {
  const { displayLines, done } = useTypewriter({ lines })

  if (done && onDone) {
    // Call onDone after render via setTimeout to avoid setState during render
    setTimeout(onDone, 0)
  }

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      {displayLines.map((line, i) => {
        const isLast = i === displayLines.length - 1
        const isComplete = done || i < displayLines.length - 1
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span>{line}</span>
            {isLast && !isComplete && (
              <span className="cursor-blink" style={{ color: 'var(--color-accent-primary)', marginLeft: '2px' }}>
                |
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
