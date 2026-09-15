import { Link } from 'react-router-dom'
import { Reveal } from '../components/ui/Reveal'
import HexMark from '../components/ui/HexMark'

const paragraphs = [
  'Hivestack is a small, focused studio building web and mobile products for businesses who want something real — not a template with their logo dropped in.',
  'We handle full-stack builds end to end: architecture, interface, backend, and everything in between. Every project ships with production-grade code, clean UI, and nothing bolted on that doesn\u2019t need to be there.',
  'We work closely with each client — no account managers, no hand-offs, no bloated process. You talk to the person building your product, from the first call to launch.',
  'Based in Surat, working with businesses who want their digital presence to feel as sharp as the rest of their operation.',
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 78% 18%, rgba(59,130,246,0.15) 0%, rgba(5,7,13,0) 58%)',
          }}
        />
        <div className="shell relative grid gap-16 pb-24 pt-36 md:grid-cols-[1.25fr_1fr] md:pb-32 md:pt-44">
          <div>
            <Reveal>
              <h1 className="text-5xl tracking-tightest md:text-7xl">
                A studio the size of the person you'll be talking to.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 space-y-7">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-measure text-lg leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden md:block">
            <div className="sticky top-32 flex justify-center">
              <HexMark size={210} className="text-accent/70" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell border-t border-white/[0.07] py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-2xl text-3xl tracking-tightest md:text-4xl">
            How a project usually runs.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-4">
          {[
            {
              step: 'First call',
              body: 'You describe the business and what the product has to do. We say what we think it needs — and what it doesn\u2019t.',
            },
            {
              step: 'Scope',
              body: 'A written scope with a fixed quote and a date. Nothing starts until you\u2019ve agreed to both.',
            },
            {
              step: 'Build',
              body: 'You see working builds as they land, not mockups. Changes happen while the code is still warm.',
            },
            {
              step: 'Launch',
              body: 'Deployed, handed over, and supported through the first weeks of real traffic.',
            },
          ].map((s, i) => (
            <li key={s.step} className="h-full bg-void p-8">
              <span className="font-display text-sm text-accent-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl tracking-tightest">{s.step}</h3>
              <p className="mt-4 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <Link
            to="/contact"
            className="group relative mt-14 inline-block px-8 py-3.5 font-display text-sm text-white"
          >
            <span className="absolute inset-0 border border-accent/45 transition-colors duration-400 group-hover:border-accent" />
            <span className="absolute inset-0 origin-left scale-x-0 bg-accent/15 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
            <span className="relative">Book the first call</span>
          </Link>
        </Reveal>
      </section>
    </>
  )
}
