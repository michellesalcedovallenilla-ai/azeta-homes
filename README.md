# Azeta Homes — Argenis Zabala

Single-page React site for Argenis Zabala, real estate advisor in Houston, TX.
Live at **https://argeniszabala.com/**.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **framer-motion** / **motion** for animation
- **recharts** for the mortgage-calculator chart
- **react-calendly** for the booking modal (loads `calendly.com` in an iframe)
- Deployed to **Cloudflare Workers Assets** via `wrangler.toml`

The whole site is static. There is no backend, database, authentication, payment,
or analytics integration in this repository. The only third-party services used
at runtime are Google Fonts, Calendly (booking modal), WhatsApp deep links, and
testimonial images served from `i.imgur.com`.

## Local development

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # outputs to ./dist
npm run preview  # serves ./dist locally
npm run lint     # tsc --noEmit (type check)
```

## Deployment

The project is deployed by Cloudflare's build pipeline, which runs `npm run build`
and serves `./dist` via Workers Assets. Configuration lives in
[`wrangler.toml`](./wrangler.toml). The custom domain `argeniszabala.com` is
declared there as a route.

HTTP response headers (cache, security) are configured in
[`public/_headers`](./public/_headers). A recommended Content-Security-Policy
is included as a commented suggestion — test it in a Cloudflare preview
deployment before enabling on production, because a too-strict policy can break
the Calendly modal or third-party images.

## Environment variables

None are currently required. See [`.env.example`](./.env.example).

## Project structure

```
azeta-homes/
├── index.html                # SEO metadata, OG/Twitter cards, font preloads
├── public/                   # Static assets served verbatim
│   ├── _headers              # Cloudflare HTTP response headers
│   ├── favicon.{svg,png}
│   ├── og-image.{svg,png}    # 1200×630 social preview
│   ├── robots.txt
│   ├── sitemap.xml
│   └── videohere_opt.mp4     # Hero video (faststart-encoded)
├── src/
│   ├── App.tsx               # All UI components and sections
│   ├── main.tsx              # Entry point
│   ├── index.css             # Tailwind theme tokens + global styles
│   ├── constants/translations.ts  # ES/EN copy
│   └── lib/utils.ts          # cn() helper
├── check.cjs                 # Local helper: verify hero video file integrity
├── optimize.cjs              # Local helper: re-encode hero video via ffmpeg
├── tsconfig.json
├── vite.config.ts
└── wrangler.toml
```

## Integrations to verify before launch

- **Calendly URL**: `https://calendly.com/argeniszabalarealtor/real-estate-consultation`
  ([`src/App.tsx:1078`](src/App.tsx#L1078))
- **WhatsApp number**: `+1 832 388 7224`
  ([`src/App.tsx:1050`](src/App.tsx#L1050) and elsewhere)
- **Testimonial images**: currently served from `i.imgur.com`
  ([`src/App.tsx:439`](src/App.tsx#L439) onwards). Imgur is a free image host
  and should be replaced with self-hosted images (in `public/`) or a controlled
  CDN before launch — see SECURITY.md or the manual checklist for details.
- **Social links** (Instagram / TikTok / LinkedIn): commented out in
  [`src/App.tsx`](src/App.tsx) Footer. Replace `REPLACE_ME` placeholders with the
  real profile URLs and uncomment the block to re-enable.
- **Privacy / Terms / Contact**: the footer currently only links Contact (to
  WhatsApp). Privacy and Terms links were removed because no real pages exist
  yet; re-add them when content is ready.

## Maintenance notes

- All site copy lives in [`src/constants/translations.ts`](src/constants/translations.ts)
  with `es` and `en` keys. Add or edit copy in both languages to keep the toggle
  consistent.
- Tailwind theme tokens (brand colors, fonts) live in
  [`src/index.css`](src/index.css) under the `@theme` block.
- The hero video lives at `public/videohere_opt.mp4`. To regenerate it from a
  larger source, place a `videohere.mp4` next to `optimize.cjs` and run
  `node optimize.cjs` (requires `ffmpeg` on PATH).
