# Website Project Brief — Full Instructions for Jules

Read this entire file before starting. It has six sections: (1) Jules's task list, (2) design system, (3) content specifications and word counts, (4) writing style rules (human tone, not AI-sounding), (5) on-page SEO checklist, (6) competitor list and keyword clusters.

## Non-negotiable overarching rule

Every single decision on this project — every page, every component, every line of markup, every image, every content block — must be built to be search engine friendly and search algorithm friendly. This is not limited to section 5 below. It applies to:

- **Structure and code**: semantic HTML (correct use of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), no content hidden behind JavaScript that a crawler can't read, no content that only renders after user interaction, clean and crawlable URLs everywhere
- **Design decisions**: fast-loading over decorative, no heavy animations or scripts that slow down Core Web Vitals, no design choice that pushes page weight past what search engines reward
- **Content**: every content block written and structured the way it's described in sections 3, 4, and 5 — nothing added "just for design" that isn't also indexable, readable text
- **New pages going forward**: any future page Jules or anyone else adds to this site must follow the same rules in this file by default, not as an afterthought

If at any point a design or technical choice would look good but hurt crawlability, indexing, page speed, or ranking, choose the search-engine-friendly option. This rule overrides visual preference wherever the two conflict.

---

## 1. Jules's Task List

### Step 1 — Project setup
- Start a new Astro project
- Set up Content Collections for three content types: `services`, `blog`, `caseStudies` (future use)
- Add Cloudflare Pages deployment config

### Step 2 — Metadata in one central file
- Create `src/data/siteMeta.ts` (or `.json`) holding: site title, default meta description, default OG tags (og:title, og:description, og:image, og:type, og:url), Twitter card metadata, favicon, theme color
- Every page can override title/description, but defaults live in this one file only

### Step 3 — Footer as one shared component
- Create `src/components/Footer.astro`
- Every page imports this same component — no footer code duplicated across pages
- Footer contains: business name, contact info, social links, sitemap link, copyright line

### Step 4 — Auto sitemap
- Add `@astrojs/sitemap` integration
- Every new page (service page, blog page) is added to sitemap.xml automatically, no manual update
- Add sitemap reference to `robots.txt`

### Step 5 — Page structure
- Homepage: positioning statement + two paths (Buyers / Suppliers)
- `/services/buyers/[slug]` — 10 buyer service pages
- `/services/suppliers/[slug]` — 10 supplier service pages
- `/blog/[slug]` — SEO cluster pages
- `/contact` — reuse the existing Web3Forms integration pattern from the sdfltd.com project

### Step 6 — Schema markup
- LocalBusiness schema on homepage
- Service schema on every service page
- FAQ schema on every blog/guide page (kept for AI answer engines even though Google removed the visual rich snippet)
- BreadcrumbList schema site-wide

### Step 7 — Performance
- All images in WebP, lazy-loaded
- Core Web Vitals target: LCP under 2.5s, INP under 150ms, CLS under 0.1
- Keep each page's HTML under 2MB

---

## 2. Design System

### Color palette (strict — do not deviate)
- Background: near-black, `#0A0A0A`
- Primary text: white, `#FFFFFF`
- Secondary/muted text: light gray, `#A3A3A3`
- Borders/dividers: dark gray, `#262626`
- One accent color only, used sparingly for links and buttons — a single mid-tone color (Jules can propose one, e.g. a muted teal or amber), never more than one accent color on the whole site
- No gradients, no drop shadows, no decorative background images

### Typography
- One sans-serif system font stack (no Google Fonts import needed, keeps page weight down): `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Base font size: 16px on mobile, scale up to 18px on desktop body text
- Headings: bold weight, generous line-height (1.3–1.4), no all-caps headings
- Line length for paragraphs: max ~65 characters per line on desktop for readability

### Mobile-first build order (build in this order, not the reverse)
1. Design and build every page at 360px width first (smallest common phone screen)
2. Then add styles for 768px (tablet)
3. Then 1024px (small desktop)
4. Then 1280px+ (large desktop)
- Use `min-width` media queries only — base CSS is the mobile layout, larger screens add to it, never the other way around
- Touch targets (buttons, links) minimum 44px height on mobile

### Card / grid system
- Service cards: single column on mobile (360px–767px)
- 2 columns on tablet (768px–1023px)
- 3 columns on desktop (1024px+)
- Card structure, top to bottom: badge (Buyer/Supplier label), title, one-line problem statement, 3 bullet points, footer row with "Contact for a quote"
- Card style: background one shade lighter than page background (`#141414`), 1px border in `#262626`, border-radius 12px, padding 20px
- No hover animations beyond a subtle border color change — this is a B2B trust site, not a flashy consumer site

### Buttons
- Primary CTA: solid accent color background, white or black text depending on contrast, border-radius 8px
- Secondary CTA: outlined, accent color border, transparent background

---

## 3. Content Specifications and Word Counts

| Section | Word count target |
|---|---|
| Homepage hero headline | 8–14 words |
| Homepage hero subheadline | 20–35 words |
| Service card — title | 3–6 words |
| Service card — problem line | 15–25 words |
| Service card — each bullet | 8–15 words |
| Individual service page (`/services/...`) | 400–600 words total, including a short FAQ block of 3–4 questions |
| Blog pillar page (per cluster) | 1200–1800 words |
| Blog sub-page (per cluster) | 700–1000 words |
| Meta description | 150–160 characters |
| Title tag | 55–60 characters |

Do not pad any page past its target range just to add length. Short and specific beats long and generic.

---

## 4. Writing Style Rules — Human Tone, Not AI-Sounding

All website copy (service cards, service pages, blog posts) must read like it was written by a real person in the industry, not generated by an AI tool. Follow these rules strictly.

### Words and phrases to never use
leverage, seamless, streamline, cutting-edge, dynamic, holistic, empower, unlock, tailored solutions, robust, dedicated to excellence, in today's fast-paced world, dive into, delve into, furthermore, moreover, it is important to note, game-changer, revolutionize, best-in-class, world-class, unparalleled, elevate, curated, synergy, ecosystem (unless literally talking about a biological ecosystem), navigate the complexities, unlock your potential, take it to the next level

### Structural patterns to avoid
- Perfectly parallel three-item lists in every paragraph
- Every sentence starting with a transition word (Additionally, Furthermore, Moreover)
- Overuse of em-dashes for dramatic pauses
- Sentences that all run the same length — vary sentence length naturally, mix short and long
- Generic superlative claims ("the best", "unmatched", "trusted by all") without a specific fact backing it up

### What to do instead
- Write short, plain, declarative sentences
- State the real problem first, in the way a buyer or supplier would actually describe it, before the solution
- Use specific numbers and concrete detail instead of vague praise
- Contractions are fine (don't, won't, it's) — this is not formal corporate writing
- Every page carries a business-level byline ("Written by the Checkloom team") — no individual's real name or photo is ever used on the site. This is a firm client requirement, not a stylistic default.
- If a claim can't be backed by real experience, don't make the claim

---

## 5. On-Page SEO Checklist (updated for the March 2026 Google core update)

### Metadata (unique per page)
- [ ] Title tag 55–60 characters, primary keyword near the front
- [ ] Meta description 150–160 characters
- [ ] Canonical URL
- [ ] OG tags (title, description, image, url, type)
- [ ] Twitter card tags
- [ ] Language/locale tag

### Content
- [ ] One H1 per page, logical H2/H3 hierarchy
- [ ] Every page's content is unique — no repeated boilerplate (Google's "Information Gain" signal now penalizes generic, reworded content)
- [ ] Business-level byline (Checkloom) on every content/blog page — no individual name or photo
- [ ] Internal linking between pillar and cluster pages in both directions
- [ ] Problem-first, solution-second structure, not generic marketing copy

### Technical
- [ ] Auto-generated XML sitemap
- [ ] Correct robots.txt
- [ ] HTTPS
- [ ] Mobile-first responsive, built per section 2 above
- [ ] Core Web Vitals: LCP <2.5s, INP <150ms, CLS <0.1
- [ ] Page HTML under 2MB
- [ ] Descriptive image alt text
- [ ] Clean, lowercase, hyphen-separated URL slugs
- [ ] No back-button blocking or navigation manipulation (violates Google's current spam policy)

### Schema
- [ ] LocalBusiness schema on homepage
- [ ] Service schema on every service page
- [ ] FAQ schema on every guide/blog page (for AI answer engine retrieval, even without the visual snippet)
- [ ] BreadcrumbList schema site-wide

### Notes from the March 2026 update
- "Information Gain" is now a major ranking factor — content that just rephrases what competitors already say loses ground; specific, first-hand, experience-based content wins
- Anonymous or generic-byline pages are losing rankings — every guide page needs a real, verifiable author
- Google removed the visual FAQ rich snippet from search results in May 2026, but FAQ schema is still worth keeping for AI Overviews and LLM-based answer engines (ChatGPT, Gemini, Claude), which still read structured content to build answers
- Depth on one topic (a pillar page plus a network of linked sub-pages) now outperforms scattered single-keyword pages

---

## 6. Competitor List and Keyword Cluster Strategy

### Competitors — Buyer side (established buying houses / sourcing agents)
- Milky Fashions (milkyfashions.com) — strongest competitor, real case studies, FAQ, and guide content since 2002, but targets European/mid-market buyers (500+ pieces)
- Anoosha Apparel Sourcing (anooshasourcing.com)
- NakFashion (nakfashionbd.com)
- EDB Sourcing (edbsourcing.com)
- Sajnia Sourcing BD (sajniabd.com)
- PPH Bangladesh Garments Sourcing (pphbd.com)
- Vertex Sourcing BD (vertexsourcing.com)
- Dress Merchant (dressmerchant.com)
- SiATEX Bangladesh (siatex.com)
- SourceLoom (sourceloom.me)
- SourceReady (sourceready.com)
- Sharex Sourcing (sharexsourcing.com)
- Global Garments Stock (globalgarmentsstock.com) — stock lot/surplus niche only

### Competitors — MOQ/costing content (non-Bangladesh but ranking for the same keywords)
- Cord Apparel (cordapparel.com)
- Ninghow / Ninghow Apparel (ninghow.com, ninghowapparel.com)

### Competitors — Supplier/China side (mostly logistics-focused, nobody covers local representation)
- Total Import Solution (totalimportsolution.com)
- Various freight forwarders and 1688/Alibaba sourcing agent directories (accio.com, tradeford.com)
- Chinese fabric supplier directory sites (texsuppliers.com)

**Key finding:** almost nobody publishes content from the angle of "I'm a small foreign supplier who wants to sell into Bangladesh but has no local agent." This is the lowest-competition, fastest-ranking opportunity.

### Buyer Side Keyword Clusters (8)

1. **Factory verification** — pillar: "How to verify a garment factory in Bangladesh before paying"; sub-pages: signs of a middleman factory, how to check if a supplier is real
2. **Small order / low MOQ** — pillar: "Where to place a 100 to 300 piece garment order in Bangladesh"; sub-pages: why factories reject small orders, low MOQ knitwear factories under 300 pieces
3. **Feasibility / spec reality check** (open gap, nobody covers this directly) — pillar: "Is your fabric spec and budget actually realistic for Bangladesh sourcing"; sub-pages: bamboo cotton lycra fabric MOQ, why your target price doesn't match your fabric choice
4. **Sample process** — pillar: "Sample to bulk order process for small Bangladesh buyers"; sub-pages: sample cost vs bulk cost, how many sample rounds before approval
5. **Production monitoring** — pillar: "How to monitor garment production in Bangladesh without visiting"; sub-pages: subcontracting without buyer knowledge, delay warning signs
6. **Quality inspection** — pillar: "Third-party quality inspection for small garment orders in Bangladesh"; sub-pages: pre-shipment inspection checklist, bulk vs sample mismatch
7. **Shipping / documentation** — pillar: "Garment export documentation mistakes that delay customs"; sub-pages: Chittagong port delay reasons, HS code for garment exports
8. **First-time buyer guidance** — pillar: "First-time buyer's guide to ordering clothing from Bangladesh"; sub-pages: deposit requirements, total landed cost calculation

### Supplier Side Keyword Clusters (5 — lower competition, higher priority)

9. **Local representative service** (blue ocean) — pillar: "How foreign fabric and textile suppliers can find a local agent in Bangladesh"; sub-pages: local rep service explained, salary vs commission agent models
10. **Selling into the Bangladesh market** — pillar: "How to sell fabric or textile machinery to Bangladesh factories"; sub-pages: China textile supplier market entry, who buys imported fabric in Bangladesh
11. **Business setup** — pillar: "Setting up a liaison office in Bangladesh for a foreign textile company"; sub-pages: BIDA registration process, virtual office options
12. **Trade show support** — pillar: "Trade show and factory visit support for foreign suppliers in Bangladesh"; sub-pages: Dhaka Apparel Expo agent support, Bangladesh Denim Expo visitor guide
13. **Machinery sales support** — pillar: "Selling textile machinery in Bangladesh: local support guide"; sub-pages: installation coordination, spare parts distribution

### Content rules for all cluster pages
- Open with the real problem, phrased the way someone would actually search for it
- No generic marketing language ("we are the best", "trusted partner")
- Business-level byline only, no individual name or photo
- Every page links to at least one related cluster page

---

## 7. Third Audience — Local Factories & Suppliers (added after initial build)

The original brief covered only two audiences (Buyers, Suppliers). A third audience must be added: **Bangladeshi factories and suppliers who make good product but can't reach international buyers.**

### Why this matters
100+ Bangladeshi garment factories closed in 2024. Vietnam overtook Bangladesh as the #2 apparel exporter in 2025. The root cause in most of these cases isn't product quality — it's the absence of fast, professional, English-language buyer-facing communication. Capable factories lose consideration simply by being slow or hard to reach.

### Services for this audience (`type: 'factory'` in the services collection)
1. **Buyer-Facing Representation** — professional, fast, English-language point of contact for international buyers; handles follow-up, sampling coordination, communication.
2. **Documentation & Tech Pack Support** — converts factory specs into buyer-ready English tech packs and compliance files; reduces rejected shipments caused by miscommunication, not actual quality problems.
3. **Compliance & Certification Guidance** — help navigating BSCI, WRAP, GOTS, OEKO-TEX, Sedex/SMETA requirements that most buyers now require before placing an order.
4. **Digital Presence & Catalog Support** — professional factory profile, catalog, and photography so the factory is findable and presentable to buyers who've never heard of it.

### Local Factory Side Keyword Clusters
14. **Buyer acquisition** — pillar: "Why Bangladeshi garment factories are losing buyers to Vietnam and Cambodia"; sub-pages: what buyers actually look for beyond price, how to respond to buyer inquiries professionally
15. **English tech pack & documentation** — pillar: "Getting your factory's documentation buyer-ready in English"; sub-pages: common tech pack rejection reasons, compliance file checklist
16. **Certification guidance** — pillar: "Which garment compliance certification does your factory actually need"; sub-pages: BSCI vs Sedex vs WRAP, cost and timeline to get certified
17. **Factory visibility** — pillar: "Getting your factory found by international buyers who've never heard of you"; sub-pages: what a buyer-ready factory profile includes, photography that gets orders
