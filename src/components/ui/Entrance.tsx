import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { prefersReducedMotion } from '../../hooks/useSmoothScroll'

const SESSION_KEY = 'hivestack:entered'
const HEX_PATH = 'M24 3.5 41.7 13.75v20.5L24 44.5 6.3 34.25v-20.5Z'

type EntranceProps = {
  onEnter: () => void
}

/**
 * Plays once per browser session: the three hexagons fly into their stack,
 * the wordmark draws in, and the visitor opens the site themselves.
 */
export default function Entrance({ onEnter }: EntranceProps) {
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const settled = useRef(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY)
    if (seen || prefersReducedMotion()) {
      onEnter()
      return
    }
    setVisible(true)
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => setReady(true), 1750)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [onEnter])

  const enter = () => {
    if (settled.current) return
    settled.current = true
    sessionStorage.setItem(SESSION_KEY, '1')
    document.body.style.overflow = ''
    setVisible(false)
    onEnter()
  }

  useEffect(() => {
    if (!ready) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') enter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Front plate last so the stack builds back to front.
  const plates = [
    { x: 16, y: 16, opacity: 0.35, from: { x: 70, y: -50 }, delay: 0.1 },
    { x: 8, y: 8, opacity: 0.65, from: { x: -60, y: 60 }, delay: 0.26 },
    { x: 0, y: 0, opacity: 1, from: { x: 0, y: -90 }, delay: 0.42 },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void grain"
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute h-[42rem] w-[42rem] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(5,7,13,0) 68%)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />

          <svg width="150" height="150" viewBox="0 0 64 64" className="relative text-accent">
            {plates.map((p) => (
              <motion.g
                key={`${p.x}-${p.y}`}
                initial={{ opacity: 0, x: p.from.x, y: p.from.y }}
                animate={{ opacity: p.opacity, x: p.x, y: p.y }}
                transition={{ duration: 1.05, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <path d={HEX_PATH} fill="currentColor" />
              </motion.g>
            ))}
          </svg>

          <div className="relative mt-9 overflow-hidden">
            <motion.h1
              className="font-display text-[2.6rem] tracking-tightest text-white md:text-6xl"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              Hivestack
            </motion.h1>
          </div>

          <motion.p
            className="mt-4 text-center text-sm text-body md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.45 }}
          >
            From idea to production — nothing in between.
          </motion.p>

          <motion.button
            type="button"
            onClick={enter}
            className="group relative mt-12 px-8 py-3 font-display text-sm tracking-wide text-white"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: ready ? 'auto' : 'none' }}
          >
            <span className="absolute inset-0 border border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <span className="absolute inset-0 origin-left scale-x-0 bg-accent/12 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
            <span className="relative">Enter Hivestack</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
