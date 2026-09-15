import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/** One quiet fade-up as a block enters view. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

type PageHeaderProps = {
  title: string
  lede: string
}

export function PageHeader({ title, lede }: PageHeaderProps) {
  return (
    <header className="shell pb-16 pt-36 md:pb-24 md:pt-44">
      <Reveal>
        <h1 className="max-w-4xl text-5xl tracking-tightest md:text-7xl">{title}</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-7 max-w-measure text-lg leading-relaxed md:text-xl">{lede}</p>
      </Reveal>
    </header>
  )
}
