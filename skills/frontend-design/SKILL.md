---
name: frontend-design
description: Production-ready HTML/CSS/JS frontend standards for the КММТ college site. Covers architecture, animation, performance, and anti-patterns. Stack is vanilla HTML + CSS custom properties + vanilla JS — no React, no Tailwind.
---

# Frontend Design Skill — КММТ College Site

> Stack: Semantic HTML5 · CSS custom properties · Vanilla JS (ES2022+)
> No frameworks. No build step. Single-file deploy.

---

## 0. DESIGN READ (run before every UI task)

Before touching code, state:
**"Reading this as: [section name], audience [родители / студенты / оба], vibe [premium / trust / energy], dial VARIANCE=[N] MOTION=[N] DENSITY=[N]."**

Default dials for КММТ:
- `DESIGN_VARIANCE: 7` — asymmetric but structured, not chaotic
- `MOTION_INTENSITY: 6` — fluid entries, hover physics, no scroll-hijack
- `VISUAL_DENSITY: 4` — breathable, lots of whitespace

---

## 1. CSS ARCHITECTURE

### 1.A Custom Properties (single source of truth)
All values from `:root` in `styles.css`. Never hardcode hex, px, or timing inline.

```css
:root {
  --dark:       #1B2E4B;
  --dark-2:     #162540;
  --gold:       #C9A84C;
  --gold-light: #E0C06D;
  --gold-dark:  #A8893A;
  --white:      #FFFFFF;
  --grey:       #F5F5F5;
  --text:       #2D2D2D;
  --text-muted: #6B7280;

  --font-main: 'Manrope', sans-serif;
  --font-head: 'Montserrat', sans-serif;

  --radius:    12px;
  --radius-lg: 20px;
  --shadow:    0 4px 24px rgba(27, 46, 75, 0.10);
  --shadow-gold: 0 4px 32px rgba(201, 168, 76, 0.25);
  --ease:      cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration:  0.3s;
}
```

### 1.B Forbidden CSS patterns
- ❌ `transition: all` — always specify the property
- ❌ `linear` or `ease-in-out` easing — use `var(--ease)` or `var(--ease-spring)`
- ❌ `!important` except for `.sr-only` / a11y utilities
- ❌ Animate `top`, `left`, `width`, `height` — animate `transform` and `opacity` only
- ❌ `backdrop-filter` on scrolling containers (GPU repaint hell on mobile)
- ❌ `h-screen` / `100vh` for hero — use `min-height: 100dvh`
- ❌ Arbitrary z-index numbers — use the scale: nav=100, modal=200, toast=300

### 1.C Spacing scale (use these, nothing else)
```
4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 96px · 128px
```
Section vertical padding: minimum `96px 0`. Hero: `128px 0 80px`.

### 1.D Typography rules
- Hero H1: `clamp(38px, 6vw, 72px)`, weight 900, line-height 1.08
- Section H2: `clamp(28px, 4vw, 48px)`, weight 800, line-height 1.15
- Body: `15-16px`, line-height 1.6-1.7, `var(--text-muted)` for secondary
- Max line length: `65ch` for body paragraphs
- Font pairing: Montserrat (headings) + Manrope (body) — do not substitute

### 1.E Color discipline
- One accent: `var(--gold)` — used consistently everywhere
- Background alternation allowed: `--white` → `--dark` → `--grey` → `--dark`
- Never invert mid-dark-section (no light island inside dark section)
- Gold on dark: ✓ | Gold on light background: only for badges/highlights
- Dark text on gold: ✓ | White text on gold: ❌ (contrast fails)

---

## 2. ANIMATION STANDARDS

### 2.A Scroll reveals — use IntersectionObserver ONLY
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
```
- ❌ NEVER `window.addEventListener('scroll', ...)` — banned
- ❌ NEVER `setInterval` for animation state
- Apply `.fade-up` class, transition via CSS (`transform + opacity`)

### 2.B Transitions
```css
/* Standard */
transition: transform var(--duration) var(--ease),
            opacity   var(--duration) var(--ease);

/* Spring (for hover lifts, modals) */
transition: transform 0.4s var(--ease-spring),
            box-shadow 0.4s var(--ease-spring);
```

### 2.C Hover states (mandatory on interactive elements)
- Cards: `translateY(-4px)` + `box-shadow: var(--shadow-gold)`
- Buttons: `translateY(-2px)` + brightness boost or color shift
- Links: underline from 0→100% width via `::after` pseudo-element
- Active/press: `scale(0.98)` or `translateY(1px)`

### 2.D Carousels
- Transform-based only: `track.style.transform = translateX(-Npx)`
- Touch support mandatory: `touchstart` / `touchend` delta detection
- Never use JS-driven `scrollLeft` animation without `requestAnimationFrame`
- Dots: active dot widens to 24px with `border-radius: 4px`

### 2.E `prefers-reduced-motion` (mandatory)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. HTML STANDARDS

### 3.A Semantic structure (required)
```
<header> — fixed nav
<main>
  <section id="hero">
  <section id="programs">
  ...
</main>
<footer>
```
Every `<section>` must have an `id` for anchor linking.

### 3.B Image strategy
- Real logos: Clearbit API `https://logo.clearbit.com/{domain}` with `onerror` fallback
- Placeholder photos: `https://picsum.photos/seed/{descriptive-slug}/{w}/{h}`
- Hero background: real city/campus photo URL or CSS gradient fallback
- ❌ NEVER div-based fake screenshots
- ❌ NEVER hand-rolled decorative SVG paths
- All `<img>` must have descriptive `alt` text

### 3.C Multilingual (KZ/RU)
- All user-visible strings in `data-ru="..."` and `data-kz="..."` attributes
- JS reads attribute and sets `el.innerHTML` or `el.placeholder`
- Language stored in `localStorage.setItem('kmmt_lang', lang)`
- Switch without page reload, no hard-coded text in HTML content nodes

### 3.D Accessibility
- Focus visible: `:focus-visible` outline `2px solid var(--gold)` offset `3px`
- Skip link: `<a href="#main" class="sr-only">Skip to content</a>`
- Interactive elements min touch target: 44×44px
- WCAG AA contrast: body text 4.5:1, large text 3:1
- `aria-label` on icon-only buttons, `role="region"` on carousels

---

## 4. JS STANDARDS

### 4.A Module pattern
```js
'use strict';
// Feature initialization wrapped in functions, called at bottom of file
// No global state except lang preference (localStorage)
```

### 4.B DOM queries — cache once
```js
const header = document.getElementById('header'); // ✓ cached
// ❌ never query DOM inside scroll/animation loops
```

### 4.C Event delegation over per-element listeners
```js
// ✓ one listener on parent
document.querySelector('.tabs').addEventListener('click', e => {
  if (e.target.matches('.tab')) handleTab(e.target);
});
// ❌ not: tabs.forEach(tab => tab.addEventListener(...))
```

### 4.D Form handling
- `e.preventDefault()` on submit
- Show success modal (not alert/confirm)
- Reset form after success
- No console.log in production code

---

## 5. ANTI-PATTERNS (banned)

### Visual
- ❌ Inter, Roboto, Arial as fonts
- ❌ AI-purple gradients or random neon accents
- ❌ Three equal feature cards in a row (use asymmetric grid)
- ❌ Generic box-shadow: `0 4px 6px rgba(0,0,0,0.1)` — tint shadow to bg
- ❌ Mixed border-radius per page (pick one system and lock it)
- ❌ em-dash `—` anywhere visible — use regular hyphen `-`

### Performance
- ❌ `backdrop-filter` on scrolling elements
- ❌ `will-change: transform` on static elements
- ❌ Animate layout-triggering properties
- ❌ Google Fonts in production via `<link>` with `display=block`

### Content
- ❌ Generic names: "John Doe", "Acme Corp"
- ❌ Fake-precise stats without data ("99.9% uptime")
- ❌ Scroll cues: "↓ scroll", "Scroll to explore"
- ❌ Section eyebrow on every single section (max every other)

---

## 6. PRE-FLIGHT CHECK

Before delivering any UI change:
- [ ] No em-dash `—` anywhere
- [ ] Gold accent consistent across all sections
- [ ] Border-radius system not mixed
- [ ] Hero headline ≤ 2 lines, subtext ≤ 20 words
- [ ] Navigation single-line at desktop
- [ ] All `transition` use named properties + `var(--ease)`
- [ ] All scroll reveals use `IntersectionObserver`
- [ ] `data-ru` / `data-kz` on every user-visible string
- [ ] Logo images have `onerror` fallback
- [ ] Mobile tested: single column, `px: 24px`, min touch targets 44px
- [ ] `prefers-reduced-motion` CSS block present
