import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface UseTypewriterOptions {
  lines: string[]
  charDelay?: number
  lineDelay?: number
  startDelay?: number
}

export function useTypewriter({
  lines,
  charDelay = 60,
  lineDelay = 800,
  startDelay = 400,
}: UseTypewriterOptions) {
  const reduced = useReducedMotion()
  const [displayLines, setDisplayLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduced) {
      setDisplayLines(lines)
      setDone(true)
      return
    }

    let cancelled = false
    const typed: string[] = []

    const run = async () => {
      await delay(startDelay)
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return
        typed.push('')
        for (let j = 0; j <= lines[i].length; j++) {
          if (cancelled) return
          typed[i] = lines[i].slice(0, j)
          setDisplayLines([...typed])
          await delay(charDelay)
        }
        if (i < lines.length - 1) await delay(lineDelay)
      }
      setDone(true)
    }

    run()
    return () => { cancelled = true }
  }, [lines, charDelay, lineDelay, startDelay, reduced])

  return { displayLines, done }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
