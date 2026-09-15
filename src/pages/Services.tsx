import { Link } from 'react-router-dom'
import { PageHeader, Reveal } from '../components/ui/Reveal'
import { services } from '../data/services'
import { HexOutline } from '../components/ui/HexMark'

export default function Services() {
  return (
    <>
      <PageHeader
        title="What we build."
        lede="Six kinds of work, one team behind all of them. Most projects touch two or three of these at once — a site and an admin panel, or an app and the backend it runs on."
      />

      <section className="shell pb-24">
        <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.id}
              className="group relative h-full overflow-hidden bg-void p-9 transition-colors duration-500 hover:bg-surface/25 md:p-11"
            >
              <HexOutline
                size={110}
                className="pointer-events-none absolute -right-5 -top-5 text-accent/10 transition-all duration-700 ease-cinematic group-hover:-translate-y-1 group-hover:text-accent/20"
              />
              <h2 className="relative font-display text-2xl tracking-tightest text-white">
                {s.title}
              </h2>
              <p className="relative mt-5 max-w-measure text-sm leading-relaxed">{s.summary}</p>
              <ul className="relative mt-8 flex flex-wrap gap-2">
                {s.detail.map((d) => (
                  <li key={d} className="border border-white/[0.09] px-3 py-1 text-xs text-body/85">
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-28 md:pb-36">
        <Reveal>
          <div className="glass p-9 md:p-12">
            <h2 className="text-3xl tracking-tightest md:text-4xl">
              Every project is quoted on its own.
            </h2>
            <p className="mt-6 max-w-measure leading-relaxed">
              Scope, timeline, and cost depend on what you need — there's no package to pick
              from. Send us the shape of the project and you'll get a written scope and a
              fixed quote back.
            </p>
            <Link
              to="/contact"
              className="group relative mt-9 inline-block px-7 py-3 font-display text-sm text-white"
            >
              <span className="absolute inset-0 border border-accent/45 transition-colors duration-400 group-hover:border-accent" />
              <span className="absolute inset-0 origin-left scale-x-0 bg-accent/15 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
              <span className="relative">Request a quote</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
