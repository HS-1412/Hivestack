import { Link } from 'react-router-dom'
import HexMark from '../components/ui/HexMark'

export default function NotFound() {
  return (
    <section className="shell flex min-h-[78vh] flex-col items-center justify-center py-32 text-center">
      <HexMark size={64} className="text-accent/60" />
      <h1 className="mt-10 text-4xl tracking-tightest md:text-5xl">
        This page isn't here.
      </h1>
      <p className="mt-5 max-w-measure leading-relaxed">
        The link may be old, or the address slightly off. The work, services, and contact
        pages are all one click away.
      </p>
      <Link
        to="/"
        className="group relative mt-10 px-8 py-3.5 font-display text-sm text-white"
      >
        <span className="absolute inset-0 border border-accent/45 transition-colors duration-400 group-hover:border-accent" />
        <span className="absolute inset-0 origin-left scale-x-0 bg-accent/15 transition-transform duration-500 ease-cinematic group-hover:scale-x-100" />
        <span className="relative">Back to home</span>
      </Link>
    </section>
  )
}
