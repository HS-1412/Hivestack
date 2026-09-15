export type Demo = {
  id: string
  name: string
  sector: string
  url: string
  blurb: string
  stack: string[]
}

export const demos: Demo[] = [
  {
    id: 'velvet-brew',
    name: 'Velvet Brew Café',
    sector: 'Café',
    url: 'https://velvet-brew-caf-demo.vercel.app/',
    blurb:
      'Menu, story, and table enquiries for a neighbourhood café — warm photography with the ordering path kept one tap away.',
    stack: ['React', 'Vite', 'Tailwind'],
  },
  {
    id: 'real-life-yoga',
    name: 'Real Life Yoga',
    sector: 'Yoga studio',
    url: 'https://real-life-yoga-demo.vercel.app/',
    blurb:
      'Class timetable, teacher profiles, and enquiry flow for a studio — built so a full schedule reads clearly on a phone.',
    stack: ['React', 'Vite', 'Tailwind'],
  },
  {
    id: 'deals-property',
    name: 'Deals Property',
    sector: 'Real estate',
    url: 'https://deals-property-demo.vercel.app/',
    blurb:
      'Public property catalogue with filters, plus an admin panel where listings are added and edited without touching code.',
    stack: ['React', 'Framer Motion', 'Admin panel'],
  },
  {
    id: 'meridian-dental',
    name: 'Meridian Dental Studio',
    sector: 'Dental clinic',
    url: 'https://meridian-dental-demo.vercel.app/',
    blurb:
      'Treatments, clinicians, and appointment requests for a practice — calm layout, everything a nervous patient looks for up front.',
    stack: ['React', 'Vite', 'Tailwind'],
  },
  {
    id: 'lumiere-salon',
    name: 'Lumière Hair & Beauty',
    sector: 'Salon',
    url: 'https://lumiere-salon-demo.vercel.app/',
    blurb:
      'Service menu, gallery, and booking enquiry for a salon — image-led, with the price-free service list kept scannable.',
    stack: ['React', 'Vite', 'Tailwind'],
  },
]
