import { Link } from 'react-router-dom'
import HexMark from '../ui/HexMark'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Link to="/" className="flex items-center gap-3 text-accent" aria-label="Hivestack, home">
            <HexMark size={26} />
            <span className="font-display text-base font-semibold text-white">Hivestack</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A small studio in Surat building web and mobile products end to end. You talk to
            the person building your product, from the first call to launch.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-medium text-white">Pages</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: '/demos', label: 'Work' },
              { to: '/services', label: 'Services' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors duration-300 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-medium text-white">Get in touch</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href="mailto:singlaharsh1400@gmail.com"
                className="transition-colors duration-300 hover:text-white"
              >
                singlaharsh1400@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919409016646" className="transition-colors duration-300 hover:text-white">
                +91 94090 16646
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919409016646"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-body/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Hivestack. Surat, Gujarat.</p>
          <p>From idea to production — nothing in between.</p>
        </div>
      </div>
    </footer>
  )
}
