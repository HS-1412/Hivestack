export type Service = {
  id: string
  title: string
  summary: string
  detail: string[]
}

export const services: Service[] = [
  {
    id: 'web',
    title: 'Web development',
    summary:
      'Marketing sites, dashboards, and internal tools built as real applications — fast, typed, and maintainable long after launch.',
    detail: ['React / Next.js', 'TypeScript', 'Supabase / Postgres', 'Vercel'],
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    summary:
      'Native-feeling apps for iOS and Android from one codebase, with the same backend your web product already runs on.',
    detail: ['React Native', 'Push + offline', 'App Store / Play release'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    summary:
      'Storefronts with catalogue, cart, and checkout wired to payments — built to load quickly on the connections your customers actually have.',
    detail: ['Catalogue + cart', 'Payment gateway', 'Order dashboard'],
  },
  {
    id: 'saas',
    title: 'SaaS & MVP builds',
    summary:
      'A first working version of your product: auth, data model, billing hooks, and an admin view — enough to put in front of real users.',
    detail: ['Auth + roles', 'Schema design', 'Admin panel'],
  },
  {
    id: 'design',
    title: 'Branding & UI design',
    summary:
      'Identity, type, colour, and interface systems designed alongside the build, so the thing you ship looks like the thing you approved.',
    detail: ['Logo + identity', 'Design system', 'Prototypes'],
  },
  {
    id: 'landing',
    title: 'Landing pages',
    summary:
      'One page that does one job — launch, campaign, or waitlist — written and built to convert, shipped in days rather than weeks.',
    detail: ['Copy + layout', 'Form capture', 'SEO + analytics'],
  },
]
