# КММТ College Website — Project Rules

## Skills

Before any UI or frontend task, always read:
- skills/frontend-design/SKILL.md
- skills/ui-ux-pro-max/SKILL.md

## Project Overview

Premium bilingual (KZ/RU) landing page for КММТ college in Almaty.
Stack: vanilla HTML5 + CSS custom properties + vanilla JS. No frameworks, no build step.

Files:
- `index.html` — all markup, semantic sections, multilingual data-attributes
- `styles.css` — design system via CSS custom properties
- `script.js` — language switcher, carousels, scroll reveals, form modal
- `Logo k.png` — official logo (do not resize or filter without approval)

## Core Constraints

- Language: all user-visible strings must have `data-ru` AND `data-kz` attributes
- Colors: only from CSS custom properties (`--dark`, `--gold`, `--white`, `--grey`, `--text`, `--text-muted`)
- Fonts: Manrope (body) + Montserrat (headings) — do not substitute
- No em-dash `—` anywhere visible
- No `window.addEventListener('scroll')` — use IntersectionObserver
- Animate only `transform` and `opacity` — never layout properties

## Design System

```
Primary dark:  #1B2E4B
Accent gold:   #C9A84C
White:         #FFFFFF
Surface grey:  #F5F5F5
Body text:     #2D2D2D
Muted text:    #6B7280
```

## Conversion Goal

Every UI decision must move the user toward: `#cta` (the contact form).
Primary CTA text: RU "Получить консультацию" / KZ "Кеңес алу"

## Audience

- Parents (35-50): trust, safety, ROI, license, employment stats
- Students (15-18): speed to income, international prestige, language skills

## Section Order (locked)

Hero → Problem → Programs → Journey → CTA Strip → International → Languages → Partners → Gallery → Reviews → Parents → CTA Form → Contacts → Footer

Do not add sections or change the order without confirming.
