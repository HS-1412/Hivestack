import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import HexMark from '../components/ui/HexMark'
import { prefersReducedMotion } from '../hooks/useSmoothScroll'
import { services } from '../data/services'
import { demos } from '../data/demos'

const JourneyCanvas = lazy(() => import('../components/three/JourneyCanvas'))

const chapters = [
  {
    key: 'build',
    label: 'Build',
    heading: 'We build the whole thing.',
    body: 'Architecture, interface, backend, deployment. Not a theme with your logo dropped in — an application written for what your business actually does.',
  },
  {
    key: 'design',
    label: 'Design',
    heading: 'Design happens alongside the build.',
    body: 'Layout, type, and motion are decided in the same place the code is written, so what ships is what you approved — not an approximation of it.',
  },
  {
    key: 'scale',
    label: 'Scale',
    heading: 'Built to hold up.',
    body: 'Typed code, a real data model, and access rules set from the start. Adding your second hundred listings should not mean rebuilding the first.',
  },
  {
    key: 'partner',
    label: 'Partner',
    heading: 'You talk to the person building it.',
    body: 'No account managers, no hand-offs between teams, no status meetings about status meetings. One line of communication from the first call.',
  },
  {
    key: 'ship',
    label: 'Ship',
    heading: 'Then it goes live.',
    body: 'Deployed, measured, and handed over with the keys. We stay on afterwards for the changes that only surface once real people are using it.',
  },
]

export default function Home() {
  const journeyRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const [active, setActive] = useState(0)
  const [webglOk, setWebglOk] = useState(true)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ok =
        !!window.WebGLRenderingContext &&
        !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
      setWebglOk(ok)
    } catch {
      setWebglOk(false)
    }
  }, [])

  useEffect(() => {
    const el = journeyRef.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const total = el.offsetHeight - window.innerHeight
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
        progress.current = p
        const index = Math.min(chapters.length - 1, Math.floor(p * chapters.length + 0.15))
        setActive(index)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      {/* The journey: one pinned stage, five chapters of copy passing through it. */}
      <div ref={journeyRef} className="relative h-[520vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {webglOk && !reduced ? (
            <Suspense
              fallback={
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 42%, rgba(59,130,246,0.22) 0%, rgba(5,7,13,0) 62%)',
                  }}
                />
              }
            >
              <JourneyCanvas progress={progress} />
            </Suspense>
          ) : (
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 62% 45%, rgba(59,130,246,0.2) 0%, rgba(5,7,13,0) 62%)',
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-end pr-[8vw] md:flex">
                <HexMark size={320} className="text-accent/30" />
              </div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/55 via-transparent to-void" />

          <div className="relative flex h-full items-center">
            <div className="shell w-full">
              <div className="relative h-[19rem] max-w-2xl md:h-[17rem]">
                {chapters.map((c, i) => (
                  <motion.div
                    key={c.key}
                    className="absolute inset-0 flex flex-col justify-center"
                    animate={{
                      opacity: active === i ? 1 : 0,
                      y: active === i ? 0 : 26,
                      filter: active === i ? 'blur(0px)' : 'blur(6px)',
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden={active !== i}
                  >
                    <span className="font-display text-sm text-accent-soft">{c.label}</span>
                    <h2 className="mt-4 text-4xl tracking-tightest md:text-6xl">{c.heading}</h2>
                    <p className="mt-6 max-w-measure text-base leading-relaxed md:text-lg">
                      {c.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter rail */}
          <div className="absolute bottom-10 left-0 right-0">
            <div className="shell flex items-center gap-3">
              {chapters.map((c, i) => (
                <div key={c.key} className="flex flex-1 flex-col gap-2">
                  <span
                    className={`h-px w-full transition-colors duration-500 ${
                      i <= active ? 'bg-accent' : 'bg-white/15'
                    }`}
                  />
                  <span
                    className={`hidden font-display text-xs transition-colors duration-500 sm:block ${
                      i === active ? 'text-white' : 'text-body/55'
                    }`}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What we do */}
      <section className="shell border-t border-white/[0.07] py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-3xl text-4xl tracking-tightest md:text-5xl">
            Six things we build, all of them properly.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="h-full bg-void p-8 transition-colors duration-500 hover:bg-surface/25"
            >
              <h3 className="font-display text-xl tracking-tightest">{s.title}</h3>
              <p className="mt-4 text-sm leading-relaxed">{s.summary}</p>
            </div>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link
            to="/services"
            className="group mt-10 inline-flex items-center gap-2 font-display text-sm text-white"
          >
            See how each one works
            <ArrowRight
              size={16}
              className="text-accent transition-transform duration-400 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </section>

      {/* Work preview */}
      <section className="shell border-t border-white/[0.07] py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-3xl text-4xl tracking-tightest md:text-5xl">
            Demos you can open right now.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-measure leading-relaxed">
            Each one is a live build, not a screenshot. Open them, click through them, and
            judge them the way your customers would.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {demos.slice(0, 3).map((d) => (
            <a
              key={d.id}
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-2 py-7 transition-colors duration-400 hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-display text-2xl tracking-tightest text-white md:text-3xl">
                {d.name}
              </span>
              <span className="flex items-center gap-3 text-sm text-body">
                {d.sector}
                <ArrowRight
                  size={15}
                  className="text-accent transition-transform duration-400 group-hover:translate-x-1"
                />
              </span>
            </a>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            to="/demos"
            className="group mt-10 inline-flex items-center gap-2 font-display text-sm text-white"
          >
            All five demos
            <ArrowRight
              size={16}
              className="text-accent transition-transform duration-400 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </section>

      {/* Close */}
      <section className="relative overflow-hidden border-t border-white/[0.07]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 100%, rgba(59,130,246,0.16) 0%, rgba(5,7,13,0) 60%)',
          }}
        />
        <div className="shell relative py-28 text-center md:py-40">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl tracking-tightest md:text-6xl">
              Tell us what you want built.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-7 max-w-measure leading-relaxed">
              Describe the project in a few lines. You'll get a straight answer on scope,
              timeline, and whether we're the right studio for it.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              to="/contact"
              className="group relative mt-11 inline-block px-9 py-4 font-display text-sm text-white"
            >
              <span className="absolute inset-0 border border-accent/45 transition-colors duration-400 group-hover:border-accent" />
              <span className="absolute inset-0 origin-left scale-x-0 bg-accent/15 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
              <span className="relative">Start a project</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
