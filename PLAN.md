# Cinematic Homepage Redesign — Implementation Plan

## Problem Statement
The current single-column layout leaves the right half of the viewport empty. Headlines are big and left-aligned, but the body content (max-width 680px) sits in one corner. The result feels unbalanced — not "full" and "minimal" like lenis.darkroom.engineering.

## Design Philosophy
Lenis's site achieves fullness through **intentional negative space + edge-to-edge typography + asymmetric 2-column compositions**. The key insight: it's not about filling every pixel — it's about making the *entire viewport feel considered*. We'll do this with:
- Headlines that span the **full viewport width** (truly wall-to-wall)
- A **split layout** (label/headline on left, body on right) so content occupies both halves
- **Counter-numbers** and decorative elements on the right side to balance sections
- Generous whitespace that feels *designed*, not *empty*

---

## 1. Layout Approach

### Hero (no change needed — already centered and fills viewport)
Keep as-is. Centered name, centered tagline, centered links. This works.

### Chapter Sections — Asymmetric Split Layout
Transform the current vertical stack (label → headline → body) into a **two-region composition**:

```
┌─────────────────────────────────────────────────────┐
│  01                                                 │  ← counter, top-right
│                                                     │
│  ABOUT                                              │  ← label, top-left
│                                                     │
│  Wenbo                                              │
│  (Vito) Zhu                                         │  ← headline spans FULL width
│                                                     │
│                        │  Hello! I'm Wenbo...       │
│                        │  I joined when the team... │  ← body text, right column
│                        │  I initiated, led, and...  │
│                        │                            │
└─────────────────────────────────────────────────────┘
```

**CSS structure:**
```css
.chapter {
  min-height: 100vh;
  padding: 10vh 6vw 8vh;      /* slightly tighter horizontal to maximize width */
  display: grid;
  grid-template-columns: 1fr;  /* still single column for label/headline */
  grid-template-rows: auto auto 1fr;
  position: relative;
}
```

The headline stays full-width (spanning the entire viewport minus padding). The **body** gets pushed to the right via:

```css
.chapter__body {
  max-width: 540px;
  margin-left: auto;           /* RIGHT-ALIGNED body text */
  padding-top: 3rem;
}
```

This creates asymmetry: massive headline on the left, readable body text on the right.

### Section Counter
Add a counter number (01, 02, 03...) positioned top-right of each chapter:

```css
.chapter__counter {
  position: absolute;
  top: 10vh;
  right: 6vw;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--text-dim);
  font-variant-numeric: tabular-nums;
}
```

Added via `data-count="01"` attribute on each `<section class="chapter">`, displayed with CSS `content: attr(data-count)` or as an actual element.

### Timeline, News, Awards — Right-Aligned Lists
These structured lists also shift right to match the body alignment:

```css
.timeline,
.news-list,
.awards-list {
  max-width: 540px;
  margin-left: auto;
}
```

### Publications & Services Sections
These already use their own layout (`.scene--publications`, `.scene--services`). They stay full-width but get the same counter treatment and slightly adjusted padding.

### Mobile (≤768px)
On mobile, everything collapses to a single column with no right-alignment:
```css
@media (max-width: 768px) {
  .chapter__body,
  .timeline,
  .news-list,
  .awards-list {
    margin-left: 0;
    max-width: 100%;
  }
  .chapter__counter { display: none; }
}
```

---

## 2. Typography System

### Font Stack
Keep Inter (already set). It's clean and works perfectly for this aesthetic.

### Scale

| Element | Current | New | Notes |
|---|---|---|---|
| Hero name | `clamp(2.8rem, 7.5vw, 6.5rem)` | `clamp(3.2rem, 8vw, 7rem)` | Slightly larger for impact |
| Chapter headline | `clamp(3.5rem, 8.5vw, 9rem)` | `clamp(3.5rem, 9vw, 10rem)` | Bigger max to truly fill width |
| Chapter label | `0.62rem` | `0.68rem` | Slightly more readable |
| Chapter body | `clamp(0.9rem, 1.3vw, 1.02rem)` | `clamp(0.92rem, 1.2vw, 1.05rem)` | Marginally larger for readability |
| Counter | — (new) | `0.72rem` | Monospace feel, tabular nums |
| Section heading (Pubs/Services) | `clamp(2rem, 4vw, 3.5rem)` | `clamp(2.4rem, 5vw, 4rem)` | Slightly bolder |

### Headline Treatment
- **Weight:** 700 (keep)
- **Letter-spacing:** -0.04em (keep — the tight tracking is essential)
- **Line-height:** 0.93 (keep)
- **Color:** `var(--text)` = `#f0f0f2` (keep)
- **NEW: Gradient on select headlines** — add a subtle text gradient on the "About" headline only:
  ```css
  .chapter:first-of-type .chapter__headline {
    background: linear-gradient(135deg, var(--text) 60%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ```

### Body Text
- **Color:** `rgba(240,240,242,0.42)` → bump to `rgba(240,240,242,0.50)` for slightly better readability
- **Line-height:** 1.9 → keep (generous, Lenis-style)
- **Bold/strong:** `rgba(240,240,242,0.70)` → bump to `rgba(240,240,242,0.80)`

---

## 3. Section-by-Section Breakdown

### Hero
No structural changes. Minor tweaks:
- Increase hero name size slightly (see typography table)
- Add subtle horizontal line below the hero links area — a thin `1px` rule at `bottom: 20vh` that animates in width from center:
  ```css
  .scene--hero::after {
    content: '';
    position: absolute;
    bottom: 18vh;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 120px;
    height: 1px;
    background: var(--rule);
  }
  ```
  Animated via GSAP in the hero timeline.

### 01 — About
- Label: "About" (top-left, small caps)
- Counter: "01" (top-right)
- Headline: "Wenbo (Vito) Zhu" — full width, massive
- Body: right-aligned, 540px max. All current content preserved exactly.

### 02 — Career / Timeline
- Label: "Career"
- Counter: "02"
- Headline: "Timeline" — full width
- Body (right-aligned): The timeline `<ul>` moves right. The grid layout within each timeline-item stays the same (year | content).

### 03 — Research
- Label: "Research"
- Counter: "03"
- Headline: "Interests"
- Body (right-aligned): The three bullet points. Short section — that's fine, the negative space is intentional.

### 04 — News
- Label: "News"
- Counter: "04"
- Headline: "Updates"
- Body (right-aligned): News list items.

### 05 — Publications
- Keeps its own `.scene--publications` styling
- Add a counter "05" element
- The section heading gets the same large treatment
- Pub rows stay full-width within their container

### 06 — Awards
- Label: "Awards"
- Counter: "06"
- Headline: "Competition & Awards"
- Awards list right-aligned

### 07 — Services
- Keeps `.scene--services`
- Add counter "07"
- Content stays as-is

---

## 4. Animation Plan

### Hero (entrance — no scroll, plays on load)
Keep existing timeline. Add one new element:
```js
heroTl.to('.scene--hero::after', { scaleX: 1, duration: 1.2 }, 1.0);
// Actually: use a real element .hero__rule since pseudo can't be targeted by GSAP
```
Add a `.hero__rule` element.

### Chapter Reveals (scroll-scrubbed)
Current behavior: label fades in, headline clips up from bottom, body fades up.
**Enhanced plan:**

1. **Counter** — fades in from `opacity: 0`, slight `translateY(-10px)`, scrubbed with section entry
2. **Label** — keep current (fade + translateY)
3. **Headline** — keep clip-up reveal (translateY from 112%), but add a very subtle horizontal stagger if there are `<br>` splits (each line reveals 0.08s apart)
4. **Body** — keep fade + translateY(20px), but change to `translateY(30px)` for slightly more travel distance, adding a more cinematic feel
5. **NEW: Horizontal rule** — a thin line that scales from `scaleX(0)` to `scaleX(1)` between the headline and body area, separating the two zones. This line originates from the right (since body is right-aligned):
   ```css
   .chapter__divider {
     width: 100%;
     height: 1px;
     background: var(--rule);
     transform-origin: right center;
     transform: scaleX(0);
   }
   ```
   Animated in the chapter ScrollTrigger timeline at offset 0.15.

### Timeline Items
Keep current: `opacity: 0, x: 30` → `opacity: 1, x: 0`. Change `x: 30` to `x: 40` for slightly more dramatic slide-in.

### News Items
Keep current: `opacity: 0, y: 20` → `opacity: 1, y: 0`.

### Award Items
Keep current: `opacity: 0, y: 24, scale: 0.97` → `opacity: 1, y: 0, scale: 1`.

### Publication Rows
Keep current slide-up.

### Scroll Nav Dots
Keep current behavior — no changes needed.

### Scroll-Linked Parallax (NEW)
Add subtle parallax to the chapter counter numbers — they move at a slightly different rate than the section:
```js
gsap.to(counter, {
  scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'bottom top', scrub: true },
  y: -40,
  ease: 'none'
});
```
This gives a subtle depth effect without being distracting.

---

## 5. HTML Structure Changes

### index.md — Add counters and dividers to each chapter

Each chapter section gets:
1. A `data-count` attribute
2. A `.chapter__counter` span
3. A `.chapter__divider` div between headline and body

Example transformation for About:
```html
<section class="chapter" data-section data-count="01" aria-label="About">
<span class="chapter__counter">01</span>
<p class="chapter__label">About</p>
<div class="chapter__headline-clip">
<span class="chapter__headline">Wenbo<br>(Vito) Zhu</span>
</div>
<div class="chapter__divider" aria-hidden="true"></div>
<div class="chapter__body">
...content unchanged...
</div>
</section>
```

Same pattern for Career (02), Research (03), News (04), Awards (06).

For Publications (05) and Services (07), add just the counter:
```html
<section class="scene--publications" data-section data-count="05" aria-label="Publications">
<span class="chapter__counter">05</span>
...
</section>
```

### _layouts/homepage.html — Add hero rule element

Inside `.scene--hero`, before the closing `</section>`:
```html
<div class="hero__rule" aria-hidden="true"></div>
```

No other layout changes needed.

---

## 6. CSS Changes Summary

### New rules to add:
1. `.chapter__counter` — positioned absolute top-right, subtle monospace number
2. `.chapter__divider` — horizontal rule between headline and body, animated via GSAP
3. `.chapter__body { margin-left: auto; }` — push body to the right
4. `.timeline, .news-list, .awards-list { margin-left: auto; }` — match right alignment
5. `.hero__rule` — thin centered line in hero
6. First chapter headline gradient (optional flourish)
7. Typography size bumps (see table in section 2)
8. `--text-dim` opacity bump: 0.42 → 0.50
9. `--text-mid` opacity bump: 0.70 → 0.80
10. Mobile overrides: reset margin-left, hide counters

### Rules to modify:
1. `.chapter` padding: `12vh 8vw 10vh` → `10vh 6vw 8vh`
2. `.chapter__body` max-width: `680px` → `540px`, add `margin-left: auto`
3. `.chapter__headline` font-size max: `9rem` → `10rem`
4. `.hero__name` font-size: slight bump

### Rules to remove:
None. All existing rules are preserved.

---

## 7. JS Changes Summary

### cinematic-scroll.js additions:
1. Animate `.chapter__counter` elements (fade in with slight y translation)
2. Animate `.chapter__divider` elements (scaleX from 0 to 1, right-origin)
3. Add counter parallax effect (subtle y offset on scrub)
4. Animate `.hero__rule` in the hero entrance timeline

### No changes to:
- Lenis initialization
- Hero parallax exit
- Timeline/news/award item animations (just tweak travel distance values)
- Scroll nav dot system
- Publications heading/row animations

---

## 8. Files Modified

| File | Changes |
|---|---|
| `assets/css/cinematic.css` | New counter/divider rules, layout adjustments, typography tweaks |
| `assets/js/cinematic-scroll.js` | Counter/divider/hero-rule animations, parallax for counters |
| `index.md` | Add counter spans and divider divs to each section |
| `_layouts/homepage.html` | Add `.hero__rule` element |

---

## 9. What This Achieves

- **Left half utilized:** Giant headlines span the full width, starting from the left edge
- **Right half utilized:** Body text, timelines, and lists are right-aligned, occupying the right half
- **Counters on the right:** Section numbers in the top-right corner add visual weight to the right side
- **Divider lines:** Horizontal rules between headline and body create visual structure spanning the gap
- **The empty space in between becomes intentional negative space** — not wasted area, but a designed pause
- **All content preserved:** Zero content removed, only structural wrappers added
