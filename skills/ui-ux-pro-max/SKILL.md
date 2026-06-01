---
name: ui-ux-pro-max
description: Premium UX/UI design standards for КММТ college site. Covers information architecture, conversion design, copywriting rules, layout patterns, and component-level design decisions. Audience: казахстанские родители (35-50) + студенты (15-18).
---

# UI/UX Pro-Max Skill — КММТ College Site

> Goal: every screen decision must move the user toward one action — оставить заявку / кеңеске жазылу.
> Audience split: Parents (trust, safety, ROI) + Students (energy, money, speed).

---

## 0. DESIGN READ

Before any layout decision:

**"Reading this section as: [section type] targeting [parents / students / both], conversion goal [заявка / консультация / поступить], current scroll depth [above fold / mid / bottom]."**

---

## 1. INFORMATION ARCHITECTURE

### Page narrative order (locked — do not reorder sections)
```
Hero           → grab attention, single promise
Problem        → break trust in alternatives
Programs       → show the solution
Journey        → build confidence (step by step)
CTA Strip      → capture impatient users
International  → premium differentiator
Languages      → secondary differentiator
Partners       → social proof (companies)
Gallery        → emotional connection
Reviews        → social proof (humans)
Parents Block  → address objections
Main CTA Form  → primary conversion
Contacts       → closing trust signal
Footer         → navigation fallback
```

### CTA placement rule
CTA button every 2-3 sections. Never more than 3 sections without a call-to-action.
Sequence: Hero → CTA Strip → Programs cards → Main CTA Form → Footer

### Anchor linking
Every section `id` must match nav link `href`. No orphan sections.

---

## 2. HERO STANDARDS

### Text limits (hard rules)
- Headline: max 2 lines, max 8 words total
- Sub-headline: max 20 words, max 3 lines
- CTAs: 1 primary (gold) + 1 secondary (outline) max
- Stats bar: max 4 stats, each 1-2 words label

### Hero formula for КММТ
```
[BADGE] — 25 лет на рынке (credibility)
[H1 LINE 1] — action verb + object  (what we do)
[H1 LINE 2] — gold color + outcome  (what you get)
[SUB] — 3 key differentiators, comma-separated
[CTA PRIMARY] — "Подобрать направление" (directed, not vague)
[CTA SECONDARY] — "Узнать больше" (low commitment)
[STATS] — numbers only, no marketing fluff
```

### Forbidden hero elements
- ❌ Version labels, beta stamps
- ❌ Trust logo wall inside the hero
- ❌ More than 4 stats
- ❌ Background text visible behind overlay (contrast failure)
- ❌ Autoplay video without mute control

---

## 3. COMPONENT DESIGN RULES

### Cards
Every card must answer: "What do I get if I click this?"
- Tag (small, gold, uppercase): category
- Title (large, bold): the promise
- Description (14px, muted): 2-3 lines max, concrete benefit
- Stats: 2 numbers max, labeled
- CTA: gold button, present tense verb

Card hover: `translateY(-4px)` + gold border + `box-shadow: var(--shadow-gold)`
Featured card: gold border always-on + subtle gradient background

### Buttons
```
Primary (gold):   bg var(--gold), text var(--dark), weight 700
Secondary:        transparent, border rgba(white,0.4), text white
Hover primary:    translateY(-2px), brightness 110%, shadow-gold
Hover secondary:  border-color gold, text gold
Active:           scale(0.98)
```
Button text: present tense, max 4 words, fits ONE line at all sizes
❌ Never: "Learn More", "Click Here", "Submit" — too vague

### Forms
- Label above input (never placeholder-as-label)
- Input focus: gold border + `box-shadow: 0 0 0 3px rgba(201,168,76,0.15)`
- Select: custom arrow, same height as inputs
- Submit button: full width, gold, present tense ("Получить консультацию")
- Success: modal overlay — not redirect, not alert
- Note below submit: privacy policy reference, 11px, muted

### Carousels
- Visible prev/next arrows always (not hidden until hover on mobile)
- Dots below: active dot wider (24px) in gold
- Touch swipe: 40px threshold for swipe detection
- Auto-advance: only with pause-on-hover, never on reviews carousel
- 3 items max visible on desktop, 1 on mobile

### Review cards
- Stars: gold `★` characters, `letter-spacing: 2px`
- Quote: `font-style: italic`, max 3 lines body
- Attribution: avatar initial circle (dark bg, gold text) + name + role
- Never: "John Doe", generic placeholder names

### Partner logos
- Real logos via Clearbit API, `onerror` fallback to text
- Grayscale by default, color on hover
- Min height 80px, consistent padding 20px 24px
- Hover: `translateY(-2px)` + gold border + color logo

---

## 4. COPYWRITING RULES

### Voice
- Direct, confident, results-focused
- No "quality education", "modern approach", "unique opportunity" — meaningless
- Concrete: "87% трудоустроены", "3 диплома", "работа на 3-м курсе"
- Parents: safety + ROI language ("гарантия результата", "лицензия МОН")
- Students: speed + money language ("доход уже на 2-м курсе", "стажировка в Marriott")

### Section headline formula
```
[Verb] + [specific outcome]
✓ "Обучаем профессии. Гарантируем карьеру."
✓ "От первого курса — к первой работе"
✗ "Качественное образование для вашего будущего"
✗ "Мы лучший колледж в Алматы"
```

### Numbers rules
- Always use real or plausible numbers (87%, 25+, 3 диплома)
- Never round to 100%, 50%, 99%
- Format: `87%` not `87 процентов`, `30%+` for growth metrics

### CTA copy
```
High intent:   "Поступить" / "Оқуға түсу"
Medium intent: "Подобрать направление" / "Бағыт таңдау"
Low intent:    "Получить консультацию" / "Кеңес алу"
Discovery:     "Узнать больше" / "Толығырақ білу"
```
Match CTA copy to scroll depth — discovery at top, high-intent at bottom.

---

## 5. LAYOUT PATTERNS

### Section header pattern (not every section)
```
[LABEL] — small uppercase, gold, with left line
[H2]    — large, bold, dark or white depending on bg
[BODY]  — optional, 15-18px, muted, max 560px wide
```
Rule: MAX every other section uses label+h2+body combo. Alternate bare h2, or h2+body only.

### Grid patterns in use
```
Programs:      3-col equal (desktop), 1-col (mobile)
International: 3-col equal (desktop), 1-col (mobile)
Languages:     3-col equal (desktop), 1-col (mobile)
Partners:      4-col (desktop), 2-col (tablet), 1-col (mobile)
Parents:       2-col (desktop), 1-col (mobile)
Journey:       1-col stacked with left connector line
CTA Main:      2-col: text + form (desktop), 1-col (mobile)
```

### Dark sections (--dark bg)
- Section label: gold
- H2: white
- Body text: rgba(255,255,255,0.7)
- Cards: #1e3352 background, rgba(gold,0.2) border
- On hover: gold border solid, gold shadow

### Light sections (--white or --grey bg)
- Section label: gold
- H2: var(--dark)
- Body text: var(--text-muted)
- Cards: white bg, var(--grey-2) border
- On hover: gold border, gold shadow

### Section alternation (mandatory)
```
Hero          → dark
Problem       → white
Programs      → dark    ← alternates
Journey       → white
CTA Strip     → gold gradient (accent break)
International → white
Languages     → dark
Partners      → white
Gallery       → grey
Reviews       → white
Parents       → grey
CTA Main      → dark
Contacts      → dark
Footer        → darkest (#0e1e30)
```
No two same-tone sections in a row (except dark→dark at end is allowed).

---

## 6. MOBILE UX

### Breakpoints
- `480px`: single column, full-width buttons, stacked hero stats
- `768px`: 2-column where possible, hamburger nav
- `1024px`: full desktop layout

### Mobile mandatory
- Touch targets: 44×44px minimum
- Tap to close modal (overlay click)
- Swipe carousels (40px threshold)
- Burger: icon morphs to X (rotate animation)
- Nav overlay: full screen, centered links, large text (22px+)
- Floating CTA: visible only after 400px scroll, bottom-right
- No hover states on touch — only `:active`

### Mobile forbidden
- Horizontal scroll on page body
- Text smaller than 13px
- Buttons narrower than 200px
- Two buttons side by side below 480px

---

## 7. TRUST SIGNALS (ordered by impact)

1. **Numbers** — 25+, 87%, 3 дипломы → always visible in hero stats
2. **Partner logos** — real logos, not text
3. **Reviews** — real names, role, platform badge (2GIS)
4. **WorldSkills** — competition result = third-party validation
5. **License badge** — "Лицензия МОН РК" in parents section + footer
6. **Urgency** — "Осталось мест: ограничено" in CTA strip (not fake countdown)

---

## 8. CONVERSION OPTIMIZATION

### Form best practices
- 3 fields max: name, phone, program (reducing friction)
- Phone field: `type="tel"` with mask hint `+7 (___) ___-__-__`
- Program dropdown pre-selects nothing (forces active choice)
- Submit: full width, gold, weight 700
- After submit: modal (not page redirect)
- Above form: 3 benefits with ✓ checkmarks (reassurance)

### Urgency without fakery
- "Приём открыт" — seasonal truth
- "Осталось мест: ограничено" — true for any physical program
- Never: fake countdown timers, fake "N people viewing this"

### CTA hierarchy on page
```
1st CTA (Hero):     "Подобрать направление" → links to #cta
2nd CTA (Strip):    "Записаться на консультацию" → links to #cta
3rd CTA (Cards):    "Узнать подробнее" → links to #cta
4th CTA (Form):     "Получить консультацию" → submits form
5th CTA (Floating): "Записаться" → links to #cta (appears after scroll)
```
All non-form CTAs scroll to the form section `#cta`.

---

## 9. PRE-FLIGHT UX CHECK

Before delivering any section:
- [ ] Section advances the narrative (why here in the page order?)
- [ ] There is a CTA within 3 sections of any direction
- [ ] No text says "quality", "modern", "unique" without proof
- [ ] Numbers are concrete and plausible
- [ ] Both parent and student audiences are served
- [ ] Dark/light alternation maintained
- [ ] Mobile: single column with 24px horizontal padding
- [ ] Review cards: real-sounding names, role, platform
- [ ] Partner logos: real logos or onerror text fallback
- [ ] Form: max 3 fields, success modal, privacy note
- [ ] Language switcher: all strings translated in both KZ/RU
