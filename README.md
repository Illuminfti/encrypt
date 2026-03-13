# Encrypt

Marketing website for **Encrypt** — a confidential execution network for Solana.

Built on RE-FHE and threshold-FHE research from dWallet Labs. Sister network to [Ika](https://ika.xyz).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Route map

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, problem/solution, RE-FHE, use cases, FHE-TLS, architecture, audience, research, CTA |
| `/developers` | Builder landing page — primitives, illustrative API, integration checklist |
| `/research` | RE-FHE, threshold-FHE, security model, FAQ |
| `/ecosystem` | Category cards and design partner opportunity |
| `/blog` | Placeholder hub with foundational brief cards |

## Where things live

### Content

All marketing copy is centralized in typed content files:

| File | What it controls |
|------|-----------------|
| `src/lib/site-config.ts` | External URLs, feature flags, metadata |
| `src/content/navigation.ts` | Nav links and CTAs (config-driven) |
| `src/content/home.ts` | All homepage section content |
| `src/content/pages.ts` | Developers, research, ecosystem, blog page content |
| `src/content/footer.ts` | Footer columns, social links, brand block |

### External URLs

All external URLs are configured in `src/lib/site-config.ts` under `siteConfig.urls`. If a URL is set to `undefined`, the corresponding link is automatically hidden from navigation and footer.

```ts
urls: {
  docs: undefined,         // Set to enable "Docs" in nav
  github: "https://...",
  x: "https://...",
  discord: undefined,      // Set to show Discord link
  waitlist: undefined,     // Set to show waitlist CTA
  // ...
}
```

### Future additions

- **Benchmarks**: Add to `/research` page via `researchPage.benchmarks` in `src/content/pages.ts`. The homepage benchmark card is already labeled "Coming soon" and will link through once content exists.
- **Partner logos**: Add to ecosystem categories in `src/content/pages.ts` → `ecosystemPage.categories`. The current cards show "Design partner opportunity" status.
- **Real blog posts**: Replace placeholder posts in `src/content/pages.ts` → `blogPage.posts`. Add slug routing in `src/app/blog/[slug]/page.tsx` when ready.
- **SDK docs**: Set `siteConfig.urls.docs` to a real URL to enable "Docs" links across the site.

### OG image

Generated at `src/app/opengraph-image.tsx` using Next.js ImageResponse. Features the Encrypt wordmark, 64-cell word bar motif, and Veilray silhouette on a dark gradient.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Deployed on Vercel

## Design system

- **Colors**: void, abyss, ultraviolet, cipher-mint, prism-cyan, signal-coral, cloud, mist
- **Typography**: Space Grotesk (display), Manrope (body)
- **Max widths**: 1440px shell, 1200px content
- **Section padding**: 96–144px desktop, 72–96px mobile
- **Card radius**: 24px
- **Border**: rgba(255,255,255,0.08)
