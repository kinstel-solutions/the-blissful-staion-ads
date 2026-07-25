# The Blissful Station — Optimization & Enhancement Plan

_Created: 2026-07-23 · Source: PageSpeed Insights report (`docs/psi-report-part1.txt`, Jul 22 2026) + full codebase audit._

## Context

The site is an ads landing page (Next.js 16 / React 19). On mobile it scores **Performance 83**, and its real-user **Core Web Vitals assessment is FAILED** — held back by loading speed, not layout stability (CLS is a perfect 0). Because this page is the destination for paid ad traffic, load speed and conversion tracking directly affect ad cost-per-conversion, so the perf gap has real budget impact.

A codebase audit alongside the report surfaced three distinct problem areas: (1) real performance issues, mostly third-party JS and build config; (2) accumulated dead code and duplication that inflate the bundle and maintenance cost; (3) accessibility gaps and an insecure lead-capture API. This plan sequences the work into three phases, highest-impact-first.

### Baseline metrics (Mobile, to beat)

| Metric | Lab | Field (CrUX) | Target |
|---|---|---|---|
| Performance score | 83 | — | ≥ 90 |
| LCP | 2.8 s | 2.6 s (needs improvement) | < 2.5 s |
| TBT | 470 ms | — | < 200 ms |
| FCP | 1.0 s | 2.4 s | < 1.8 s |
| CLS | 0 ✅ | 0 ✅ | keep 0 |
| TTFB | — | 1.3 s (high) | < 0.8 s |

### Key audit correction (important)

PSI flags the LCP "Entrance" image as missing `fetchpriority=high`/not-lazy. **The source already sets `priority` on it** (`src/components/sections/HeroSection.tsx:166`, `priority={idx === 0}`). So this is **not a code bug** — it is most likely a stale production deployment or a truncated report snippet. **Action: redeploy and re-run PSI before changing this.** Do not "fix" what is already correct in source.

---

## Phase 1 — Performance & Core Web Vitals

Goal: get Performance into the green (≥90) and pass CWV. These are the direct levers from the PSI report. Low risk, high impact.

### 1.1 Ship a modern browserslist target — removes legacy polyfills (~14 KiB)
- **Why:** No `browserslist` is defined (`package.json` has no key, no `.browserslistrc`), so Next falls back to a target that transpiles/injects polyfills for `Array.prototype.at/flat/flatMap`, `Object.fromEntries/hasOwn`, `String.prototype.trimStart/trimEnd` — all natively supported by every browser this site's users have.
- **Change:** add a `"browserslist"` key to `package.json`, e.g. `[">0.3%", "last 2 versions", "not dead", "not op_mini all"]` (or the modern `"defaults"` preset). Rebuild and confirm the polyfill chunk shrinks.
- **Files:** `package.json`.
- **Impact:** removes the "Legacy JavaScript" opportunity; small FCP/LCP win.

### 1.2 Add resource hints for third-party origins
- **Why:** PSI: "no origins were preconnected" despite loading heavy JS from `googletagmanager.com`. Connection setup happens on the critical path.
- **Change:** add to `<head>` in `src/app/layout.tsx`:
  - `<link rel="preconnect" href="https://www.googletagmanager.com" />`
  - `<link rel="dns-prefetch" href="https://www.googletagmanager.com" />`
  - (fonts are self-hosted by `next/font`, so no Google Fonts preconnect needed).
- **Files:** `src/app/layout.tsx` (head, lines 44–90).
- **Impact:** shaves connection latency off the biggest third-party payload.

### 1.3 Reduce Total Blocking Time — the #1 problem (470 ms), driven by Google Tag Manager
- **Why:** GTM loads three tags (GA4 `G-Y72BE55PB4`, container `GTM-N83PLXXG`, Google Ads conversion `AW-181…`) = **469.9 KiB, ~199 KiB unused**, and all 7 long main-thread tasks. It's already `strategy="lazyOnload"` (`layout.tsx:97–109`), which is why the tasks fire post-load — good, but they still block.
- **Changes (in priority order):**
  1. **Audit the GTM container itself** (in the GTM web UI, not code): remove unused tags/triggers/variables. This is the single biggest TBT lever and requires no code change. **Do not remove the Google Ads conversion tag** — it is essential for ad ROI.
  2. **Consider offloading GTM to a web worker** via [Partytown](https://partytown.builder.io/) (or `@next/third-parties` `GoogleTagManager`, already installed but unused — see 2.4). Partytown moves tag-manager JS off the main thread → large TBT reduction. Higher effort; validate conversion tracking still fires end-to-end before shipping.
- **Files:** `src/app/layout.tsx`; GTM container (external).
- **Impact:** largest single win toward the 90 score. Verify Google Ads conversions still record after any change.

### 1.4 Harden `next.config.ts` for images and production builds
- **Why:** config is effectively empty (`next.config.ts:1–7`, only `trailingSlash`). No modern image formats or console stripping.
- **Changes:**
  - `images: { formats: ["image/avif", "image/webp"] }` — smaller LCP image delivery (PSI "Improve image delivery ~5 KiB").
  - `compiler: { removeConsole: { exclude: ["error"] } }` for production — drops stray logs from the client bundle.
- **Files:** `next.config.ts`.
- **Impact:** smaller images, marginally smaller JS.

### 1.5 Fix non-composited "simmer" animation (main-thread repaints)
- **Why:** PSI flags 9 elements animating `background-position` (`.simmer-text`, `.alex-button` in `globals.css:48–83`) — not GPU-composited, repaints every frame on buttons/headings, some off-screen. Bucketed under CLS (already 0) so it's a repaint/jank cost, not a CWV failure, but it feeds main-thread work.
- **Changes:** convert the effect to a `transform`/`opacity`-based animation (compositable), or gate it behind `@media (prefers-reduced-motion: no-preference)` and pause it when off-screen / stop the infinite loop on `.alex-button` (the `:hover` already overrides the background but the animation keeps running).
- **Files:** `src/app/globals.css`.
- **Impact:** lower main-thread/rendering time (PSI "Minimize main-thread work 2.2 s").

---

## Phase 2 — Code Cleanup & Bundle Reduction

Goal: remove dead weight and duplication. Addresses PSI "~48 KiB unused first-party JS" and lowers maintenance cost. Low risk (deletions of confirmed-unused code), do after Phase 1 so perf deltas are measurable.

### 2.1 Delete dead component files (confirmed zero imports)
- `src/components/ui/button.tsx` (also `"use client"`, pulls in `class-variance-authority` + `@base-ui/react`), `card.tsx`, `input.tsx`, `textarea.tsx`. All reference Tailwind tokens not defined in `globals.css` — leftover shadcn scaffolding.
- Re-verify no imports before deleting; then remove now-unused deps if nothing else uses them (`class-variance-authority`, `shadcn`).

### 2.2 Delete unused assets (repo weight; one is large)
- `public/assets/hero_mental_wellness.png` (**~678 KB, unreferenced**), `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` (Next template leftovers), `public/swatantra-1.jpg`, `public/assets/BS-office.jpg`, `BS-reception.jpg`, `logo-full.webp`, `therapy-room-close.jpg`, `public/new_Images/tbs_clinician-2.jpeg`.
- Also remove root build artifacts `build.log`, `build.txt`.
- **Verify each is unreferenced** (grep `src/`) before deleting.

### 2.3 Remove dead CSS and de-duplicate
- Dead keyframes in `globals.css`: `@keyframes float` (`:39–42`, unused), `@keyframes shimmerBg` (`:44–47`, byte-identical duplicate of `simmer`).
- **Two identically-named `@keyframes marquee`**: one in `globals.css:151–165`, another inline in `TestimonialsSection.tsx:72–81`. Consolidate to one definition.
- Duplicated hardcoded clinic-image arrays: `HeroSection.tsx:132–155` and `our-expert-psychologist/page.tsx:147–178`. Extract to a shared module (e.g. `src/lib/clinicImages.ts`) and use the `[...arr, ...arr]` marquee pattern instead of manual duplication.

### 2.4 Resolve the `@next/third-parties` dependency
- Installed (`package.json:14`) but **never imported**. Either **use it** for GTM (`GoogleTagManager` component — ties into Phase 1.3) or **remove the dependency**. Don't leave it as dead weight.

### 2.5 Trim unnecessary `"use client"` boundaries (cuts client JS)
- `Footer.tsx`, `AboutTherapist.tsx`, and `ContactSection.tsx` are client components only to attach a single analytics `onClick`, shipping otherwise-static markup as client JS.
- Refactor: keep the static markup as server components and isolate the interactive bit into a tiny client child (or a client wrapper around just the tracked link). `CanonicalTag.tsx` could be derived server-side too.
- Reconsider the `next/dynamic` wrapping in `page.tsx:5–22`: four server sections wrapped with `ssr:true` add indirection without a real code-split payoff.

### 2.6 Minor cleanups
- Remove unused imports `Mail`, `Phone` and the commented-out contact block in `our-expert-psychologist/page.tsx:62–75`; fix `italic italic` (`:251`).
- Fix canonical host inconsistency: `sitemap.ts:4` and `robots.ts:9` use `theblissfulstation.com` while metadata/JSON-LD use `www.theblissfulstation.com` (`layout.tsx:25,53–55`). Pick one host (the `www` used in canonical) and align; remove the "Replace with your actual domain" placeholder comment.
- Drop legacy `import React from 'react'` where unused (StatsSection, TestimonialsSection, WhyChooseUsSection, ServicesSection, ContactForm, AlexButton, FloatingBookingWidget, WhatsAppWidget). Cosmetic.

---

## Phase 3 — Accessibility, Correctness & Security

Goal: raise Accessibility from 91 toward 100, fix correctness bugs, and secure the lead API. These protect conversions (a broken/inaccessible form loses leads) and close a real injection risk.

### 3.1 Secure and validate the lead-capture API (highest priority in this phase)
- **File:** `src/app/api/send/route.ts`.
- **HTML injection:** user fields (`name`, `email`, `phone`, `age`, `concern`, `message`) are interpolated raw into email HTML (lines 40, 44, 48, 56, 63, 87, 88). A crafted field can inject arbitrary HTML into staff/customer inboxes. **Escape all user input** before interpolation (a small `escapeHtml` helper).
- **No validation:** body is destructured straight from `req.json()` (line 16) with no schema, though `zod` is already a dependency. **Add a zod schema** mirroring the client `ContactForm` schema and reject invalid payloads with 400.
- **Error leakage:** raw `(error as Error).message` and `clinicRes.error.message` returned to the client (lines 114, 124) — return generic messages, log detail server-side only. Also fix the client message that hints at `RESEND_API_KEY` (`ContactForm.tsx:151`).
- **Silent failure:** `userRes` (confirmation email) is never checked (line 105) — a failed confirmation still returns `success:true`. Inspect and log it.

### 3.2 Fix form accessibility (protects lead conversion)
- **File:** `src/components/ContactForm.tsx`.
- **Labels not associated:** 5 of 6 fields have bare `<label>` with no `htmlFor` matching the input `id` (Name label `:192`/input `:200`; Phone `:213/:220`; Email `:233/:240`; Age `:255/:262`; Message `:333/:340`). Add matching `id`/`htmlFor` (checkbox at `:351/:355` is the correct model).
- **Inaccessible custom dropdown:** the "Primary Concern" selector (`:283–323`) is `div onClick` only — no `role="listbox"`/`role="option"`, no `aria-expanded`, no keyboard support, mouse-only. Either add full listbox ARIA + keyboard handling, or replace with a native `<select>` (simplest, fully accessible) styled to match.

### 3.3 Fix invalid markup and heading hierarchy
- `AboutTherapist.tsx:39–43`: three `<li>` inside a `<p>` with no `<ul>` — wrap in `<ul>`.
- Two `<h1>` on the homepage: `HeroSection.tsx:81` and `AboutTherapist.tsx:32` — demote the About one to `<h2>` (Hero is the page title).
- `StatsSection.tsx:25` jumps to `<h3>` with no `<h2>` — add a section `<h2>` (visually hidden if needed).

### 3.4 Contrast and small-text fixes
- `simmer-text` gradient passes through translucent light green (`globals.css:53–67`) on white — likely < 4.5:1 mid-animation; ensure the resting/animated color meets contrast.
- Placeholder `text-gray-400` (~2.8:1), `opacity-80/60` labels (`ContactForm.tsx:192`, `ContactSection.tsx:32,46,63`) — darken to meet 4.5:1.
- Star ratings `text-yellow-400` on white (`TestimonialsSection.tsx:23,50`) — add an `aria-label` (e.g. "5 out of 5 stars") and consider a darker star color.
- Very small type: hero badges `text-[10px]` (`HeroSection.tsx:70–77`), errors `text-[11px]` — bump to ≥12px.

---

## Verification

Run after **each phase** and compare against the baseline table above:

1. **Build & bundle:** `npm run build` — confirm no errors; note first-load JS per route (should drop after Phase 1.1 and Phase 2). `npm run lint` clean.
2. **Local smoke test:** `npm run dev`, load `/`, confirm the hero carousel, contact form submit (lead + confirmation emails via Resend), and all CTAs/analytics clicks fire (`dataLayer` events in the console / GTM Preview mode).
3. **Deploy to production, then re-run PageSpeed Insights** (mobile) — this is the authoritative check; local Lighthouse won't reflect real TTFB/CDN. Confirm: Performance ≥ 90, LCP < 2.5s, TBT < 200ms, and the "Legacy JavaScript" + "no preconnect" opportunities are gone.
4. **Conversion tracking regression (critical for ads):** in GTM Preview / Google Ads, confirm the conversion tag and `generate_lead` still fire after any Phase 1.3 change **before** relying on the campaign.
5. **Accessibility (Phase 3):** re-run Lighthouse Accessibility (target ≥ 98) and tab through the entire form with keyboard only — every field, the concern dropdown, and submit must be reachable and operable.
6. **CWV field data:** Core Web Vitals are 28-day rolling real-user data — the field/CrUX pass will lag the deploy by days/weeks even after lab scores improve. Track it over time, don't expect an instant field flip.

## Notes / open questions

- **Redeploy first** to resolve the LCP `priority` discrepancy (see "Key audit correction") before assuming any LCP code change is needed.
- **TTFB 1.3s** is high and largely hosting/origin-bound (Vercel region, cold starts, or a slow origin). If TTFB stays high after Phase 1, investigate Vercel region/caching separately — it's not fixable purely in this codebase.
