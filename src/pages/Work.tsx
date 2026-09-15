import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PageHeader } from '../components/ui/Reveal'
import { demos } from '../data/demos'

export default function Work() {
  return (
    <>
      <PageHeader
        title="Live demos, not screenshots."
        lede="Five builds you can open and use. Each one was made to show how a business in that line of work would actually operate its site — the layout, the flow, the parts a customer touches first."
      />

      <section className="shell pb-28 md:pb-36">
        <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
          {demos.map((d) => (
            <a
              key={d.id}
              href={d.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col bg-void p-9 transition-colors duration-500 hover:bg-surface/25 md:p-11"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl tracking-tightest text-white md:text-3xl">
                    {d.name}
                  </h2>
                  <p className="mt-2 text-sm text-accent-soft">{d.sector}</p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-accent transition-transform duration-500 ease-cinematic group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>

              <p className="mt-6 flex-1 text-sm leading-relaxed">{d.blurb}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {d.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/[0.09] px-3 py-1 text-xs text-body/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}

          <Link
            to="/contact"
            className="group flex h-full flex-col justify-between bg-void p-9 transition-colors duration-500 hover:bg-surface/25 md:p-11"
          >
            <div>
              <h2 className="font-display text-2xl tracking-tightest text-white md:text-3xl">
                Yours next.
              </h2>
              <p className="mt-6 text-sm leading-relaxed">
                Any of these can be rebuilt around your own business — your services, your
                photos, your booking flow. That's usually where we start.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 font-display text-sm text-white">
              Ask for a demo
              <ArrowUpRight
                size={17}
                className="text-accent transition-transform duration-500 ease-cinematic group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>

      </section>
    </>
  )
}
