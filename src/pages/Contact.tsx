import { useState } from 'react'
import type { FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { PageHeader, Reveal } from '../components/ui/Reveal'
import { services } from '../data/services'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full border border-white/[0.11] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-body/55 transition-colors duration-300 focus:border-accent focus:outline-none'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError('')

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      setError(
        'The form isn\u2019t connected yet. Email singlaharsh1400@gmail.com and we\u2019ll pick it up from there.',
      )
      return
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: String(data.get('name') ?? ''),
          reply_to: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? ''),
          project_type: String(data.get('project') ?? ''),
          message: String(data.get('message') ?? ''),
          to_email: 'singlaharsh1400@gmail.com',
        },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setError(
        'That didn\u2019t send. Email singlaharsh1400@gmail.com or message us on WhatsApp instead.',
      )
    }
  }

  return (
    <>
      <PageHeader
        title="Start a project."
        lede="Tell us what you want built and roughly when you need it. You'll get a reply with a scope, a quote, and an honest read on whether we're right for the job."
      />

      <section className="shell grid gap-14 pb-28 md:grid-cols-[1.35fr_1fr] md:pb-36">
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-display text-sm text-white">
                  Name
                </label>
                <input id="name" name="name" required className={field} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-display text-sm text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={field}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-2 block font-display text-sm text-white">
                  Phone <span className="text-body/60">(optional)</span>
                </label>
                <input id="phone" name="phone" className={field} placeholder="+91" />
              </div>
              <div>
                <label htmlFor="project" className="mb-2 block font-display text-sm text-white">
                  What do you need
                </label>
                <select id="project" name="project" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Pick the closest one
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title} className="bg-void">
                      {s.title}
                    </option>
                  ))}
                  <option value="Something else" className="bg-void">
                    Something else
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-display text-sm text-white">
                About the project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className={`${field} resize-y`}
                placeholder="What the business does, what the product has to do, and when you'd like it live."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative px-8 py-3.5 font-display text-sm text-white disabled:opacity-55"
            >
              <span className="absolute inset-0 border border-accent/45 transition-colors duration-400 group-hover:border-accent" />
              <span className="absolute inset-0 origin-left scale-x-0 bg-accent/15 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
              <span className="relative">
                {status === 'sending' ? 'Sending…' : 'Send project details'}
              </span>
            </button>

            <div aria-live="polite" className="min-h-[1.5rem]">
              {status === 'sent' && (
                <p className="text-sm text-accent-ice">
                  Sent. You'll hear back within a day, usually sooner.
                </p>
              )}
              {status === 'error' && <p className="text-sm text-accent-soft">{error}</p>}
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass h-full p-8">
            <h2 className="font-display text-xl tracking-tightest">Reach us directly</h2>
            <p className="mt-4 text-sm leading-relaxed">
              If a form isn't your thing, any of these land in the same place.
            </p>

            <ul className="mt-8 space-y-6">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'singlaharsh1400@gmail.com',
                  href: 'mailto:singlaharsh1400@gmail.com',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+91 94090 16646',
                  href: 'tel:+919409016646',
                },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: '+91 94090 16646',
                  href: 'https://wa.me/919409016646',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="font-display text-sm text-white">{label}</p>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-sm transition-colors duration-300 hover:text-accent-soft"
                    >
                      {value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-white/[0.09] pt-6">
              <p className="text-sm leading-relaxed">
                Based in Surat, Gujarat. We work with clients across India and remotely
                elsewhere.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
