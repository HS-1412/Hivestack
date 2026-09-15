# Hivestack

Marketing site for Hivestack — React + Vite + TypeScript, deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the build locally
```

## Contact form

The form uses EmailJS and sends to `singlaharsh1400@gmail.com`. Copy `.env.example`
to `.env` and fill in the three values from your EmailJS dashboard:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Your EmailJS template should expect these variables: `from_name`, `reply_to`,
`phone`, `project_type`, `message`, `to_email`.

Until those are set, the form tells visitors to email directly rather than
failing silently. Add the same three variables in Vercel's project settings
before deploying.

## Routes

| Path        | Page                                       |
| ----------- | ------------------------------------------ |
| `/`         | Home — WebGL scroll journey, five chapters |
| `/demos`    | Work — the five live demo builds           |
| `/services` | Services — six services, no pricing        |
| `/about`    | About — studio copy and how a project runs |
| `/contact`  | Contact — EmailJS form plus direct details |

`vercel.json` rewrites all paths to `index.html` so client-side routing works
on refresh and direct links.

## Where to edit content

- `src/data/demos.ts` — the demo projects and their URLs
- `src/data/services.ts` — the six services
- `src/pages/Home.tsx` — the `chapters` array drives the scroll journey copy
- `src/pages/About.tsx` — the `paragraphs` array holds the studio copy
- `src/components/layout/Footer.tsx` — contact details

## Design system

Defined in `tailwind.config.js` and `src/index.css`.

- Background `#05070d`, surface `#1e2347`
- Accents `#3b82f6` / `#60a5fa` / `#7dd3fc`
- Headings `#ffffff`, body `#94a3b8`
- Chakra Petch for headings and UI, IBM Plex Sans for body

Fonts load from Google Fonts in `index.html`. If you'd rather self-host them
the way you did on Vibes Realty, swap the `<link>` for local `@font-face`
rules — it removes a third-party request and the flash of fallback type.

## The scroll journey

`src/pages/Home.tsx` holds a 520vh section with a pinned stage inside it.
Scroll position within that section is normalised to `0..1` and written to a
ref, which drives two things:

- `src/components/three/HexField.tsx` — 5,200 points that form the three
  hexagons of the mark, then release on a per-point stagger into a corridor
  the camera flies down. Roughly three-quarters of the points trace the
  hexagon edges so the mark stays legible; the rest dust the interior.
- `src/components/three/JourneyCanvas.tsx` — camera rig and bloom.

The canvas is lazy-loaded, so Three.js stays out of the initial bundle
(~176 KB gzipped first load; the 3D chunk only downloads on the home page).

It is skipped entirely, in favour of a static gradient and mark, when:

- the visitor has `prefers-reduced-motion: reduce` set, or
- WebGL is unavailable (checked at mount)

## Entrance

`src/components/ui/Entrance.tsx` plays once per browser session, tracked with
`sessionStorage` under `hivestack:entered`. Clear that key to see it again.
Skipped under reduced motion.

## Known gaps

- The released particles read as a dense starfield rather than true light
  trails. Point sprites can only stretch within their own quad, so streaks are
  capped at the sprite size. Real trails would mean rendering line segments or
  instanced quads instead of `THREE.Points` — a contained refactor of
  `HexField.tsx` if you want to push it further.
- No analytics wired in yet.
