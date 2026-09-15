import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import HexMark from '../ui/HexMark'

const links = [
  { to: '/demos', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled
          ? 'border-b border-white/[0.07] bg-void/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-[4.5rem] items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-accent transition-colors duration-300 hover:text-accent-soft"
          aria-label="Hivestack, home"
        >
          <HexMark size={28} />
          <span className="font-display text-lg font-semibold tracking-tightest text-white">
            Hivestack
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative font-display text-sm transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-body hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-500 ease-cinematic ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="group relative px-5 py-2 font-display text-sm text-white"
          >
            <span className="absolute inset-0 border border-accent/45 transition-colors duration-400 group-hover:border-accent" />
            <span className="absolute inset-0 origin-left scale-x-0 bg-accent/15 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
            <span className="relative">Start a project</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.07] bg-void/97 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex flex-col py-6">
              {[...links, { to: '/contact', label: 'Start a project' }].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `border-b border-white/[0.06] py-4 font-display text-xl tracking-tightest ${
                      isActive ? 'text-accent-soft' : 'text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
