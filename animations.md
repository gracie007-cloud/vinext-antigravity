# Animation Rules

> **Single source of truth for all animation conventions.**
> Every contributor — human or AI — must read this before creating or modifying
> any animation. All animation logic must comply with [`rules.md`](./rules.md)
> (naming, folder structure, TypeScript) and [`design-system.md`](./design-system.md)
> (motion tokens, easing, duration scale).
>
> This project uses **GSAP** (`gsap` + `@gsap/react`) as the exclusive animation
> library. Do not introduce Framer Motion, anime.js, or any competing animation
> library without explicit architectural approval.

---

## Table of Contents

1. [Setup & Plugin Registration](#1-setup--plugin-registration)
2. [Folder Structure & File Placement](#2-folder-structure--file-placement)
3. [File & Variable Naming](#3-file--variable-naming)
4. [The useGSAP Hook — Next.js Rules](#4-the-usegsap-hook--nextjs-rules)
5. [Tween Rules — gsap.to / from / fromTo](#5-tween-rules--gsapto--from--fromto)
6. [gsap.set() + clearProps](#6-gsapset--clearprops)
7. [Timeline Rules](#7-timeline-rules)
8. [Stagger Rules](#8-stagger-rules)
9. [ScrollTrigger Rules](#9-scrolltrigger-rules)
10. [gsap.matchMedia() — Responsive Animations](#10-gsapmatchmedia--responsive-animations)
11. [gsap.utils — The Utility Toolkit](#11-gsaputils--the-utility-toolkit)
12. [useGSAP Dependencies Array — Reactive Animations](#12-usegsap-dependencies-array--reactive-animations)
13. [ScrollTrigger.refresh() + markers — Next.js Gotchas](#13-scrolltriggerrefresh--markers--nextjs-gotchas)
14. [Page Transition Animations — App Router](#14-page-transition-animations--app-router)
15. [Performance Rules](#15-performance-rules)
16. [What Never To Do](#16-what-never-to-do)
17. [Code Documentation](#17-code-documentation)
18. [Quick Reference](#18-quick-reference)

---

## 1. Setup & Plugin Registration

### Installation

```bash
npm install gsap @gsap/react
```

### Central Config — `src/lib/gsapConfig.ts`

All GSAP imports and plugin registrations must live in **one file only**.
Never register plugins inside individual components or hooks.

```ts
/*
 * File Name:     gsapConfig.ts
 * Description:   Central GSAP configuration. Registers all plugins once.
 *                Import gsap and useGSAP exclusively from this file.
 * Author:        <Name>
 * Created Date:  <YYYY-MM-DD>
 */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register all plugins here — once, globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

### Import Rule

```ts
// ✅ Always import from the central config
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsapConfig";

// ❌ Never import directly from the gsap package in components
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

---

## 2. Folder Structure & File Placement

Animation code follows the same **hybrid architecture** defined in
[`rules.md § 2`](./rules.md#2-hybrid-folder-architecture).

### Where Animation Code Lives

| Scope | Location | Example |
|-------|----------|---------|
| Used by **1 feature** | `src/features/<feature>/hooks/` | `useHeroAnimation.ts` |
| Used by **2+ features** | `src/hooks/` | `useStaggerReveal.ts` |
| Reusable animated components | `src/components/ui/` | `AnimatedCounter.tsx` |
| Global GSAP config | `src/lib/` | `gsapConfig.ts` |
| Motion tokens / constants | `src/constants/` | `animationTokens.ts` |

### Animation Constants File

All shared duration, ease, and stagger values live in one constants file.
Never hardcode animation values inline — always reference a token.

```ts
/*
 * File Name:     animationTokens.ts
 * Description:   Shared GSAP animation constants — duration, ease, and
 *                stagger values used across the entire project.
 * Author:        <Name>
 * Created Date:  <YYYY-MM-DD>
 */

export const DURATION = {
  fast:   0.3,
  normal: 0.6,
  slow:   1.0,
  xslow:  1.5,
} as const;

export const EASE = {
  default:  "power2.out",
  strong:   "power3.out",
  bounce:   "back.out(1.7)",
  elastic:  "elastic.out(1, 0.3)",
  linear:   "none",
  inOut:    "power1.inOut",
} as const;

export const STAGGER = {
  fast:   0.06,
  normal: 0.1,
  slow:   0.15,
} as const;

export const BREAKPOINTS = {
  mobile:  "(max-width: 767px)",
  tablet:  "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;
```

### Feature Anatomy with Animations

```
features/<feature-name>/
├── components/
│   └── HeroSection.tsx       # Uses animation hook — no raw GSAP here
├── hooks/
│   └── useHeroAnimation.ts   # All raw GSAP logic isolated here
├── types/
└── index.ts
```

> **Rule**: Animation logic belongs in hooks. Components call the hook
> and attach the returned `ref`. Components must not contain raw
> `gsap.to()` / `gsap.from()` calls directly — except for simple
> micro-animations (e.g. `onMouseEnter` hover lifts).

---

## 3. File & Variable Naming

### Files

| File Type | Convention | Examples |
|-----------|-----------|----------|
| Animation hooks | `camelCase` + `use` prefix `.ts` | `useHeroAnimation.ts`, `useStaggerReveal.ts` |
| Animated components | **PascalCase** `.tsx` | `AnimatedCounter.tsx`, `RevealText.tsx` |
| Animation constants | `camelCase` `.ts` | `animationTokens.ts` |
| ScrollTrigger hooks | `camelCase` + `use` prefix `.ts` | `useScrollReveal.ts`, `usePinSection.ts` |

### Variables & Instances

| Thing | Convention | Example |
|-------|-----------|---------|
| Timeline instance | `camelCase` + `Tl` suffix | `heroTl`, `cardsTl`, `navTl` |
| ScrollTrigger instance | `camelCase` + `St` suffix | `heroPinSt`, `revealSt` |
| Tween reference | `camelCase` + `Tween` suffix | `fadeTween`, `floatTween` |
| GSAP context | `camelCase` + `Ctx` suffix | `heroCtx` |
| matchMedia instance | `camelCase` + `Mm` suffix | `heroMm`, `pagesMm` |

```ts
// ✅ Good naming
const heroTl     = gsap.timeline({ defaults: { ease: EASE.default } });
const heroMm     = gsap.matchMedia();
const floatTween = gsap.to(".anim-badge", { y: -10, repeat: -1, yoyo: true });

// ❌ Bad naming
const tl1  = gsap.timeline();
const anim = gsap.to(".anim-badge", { y: -10 });
const mm   = gsap.matchMedia();
```

### CSS Class Selectors for GSAP

GSAP targets elements via class selectors. Use a dedicated naming convention
that is clearly separate from Tailwind utility classes and JS hooks.

```
Prefix: anim-
Format: anim-<feature>-<element>

Examples:
  anim-hero-title
  anim-hero-nav
  anim-hero-cta
  anim-features-card
  anim-nav-link
```

```tsx
// ✅ Good — anim- prefix, clearly not a style class
<h1 className="anim-hero-title text-4xl font-bold text-foreground">
  Hello World
</h1>

// ❌ Bad — GSAP targets a Tailwind class, coupling animation to style
gsap.from(".text-4xl", { opacity: 0 });

// ❌ Bad — GSAP targets a JS hook class
gsap.from(".js-title", { opacity: 0 });
```

> **Rule**: The `anim-` prefix is animation-only. Never apply styles to
> it. Never use Tailwind utility classes or `data-` attributes as GSAP
> targets in production code.

---

## 4. The useGSAP Hook — Next.js Rules

### The Mandatory Pattern

Every component or hook that uses GSAP **must** follow this pattern exactly:

```tsx
"use client"; // 1. Must be a Client Component

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { DURATION, EASE } from "@/constants/animationTokens";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null); // 2. Ref on root element

  useGSAP(                                           // 3. useGSAP, NOT useEffect
    () => {
      gsap.from(".anim-hero-title", {
        opacity: 0,
        y: 60,
        duration: DURATION.slow,
        ease: EASE.strong,
      });
    },
    { scope: containerRef }                          // 4. Always scope!
  );

  return (
    <div ref={containerRef}>                         {/* 5. Ref on wrapper */}
      <h1 className="anim-hero-title">Hello</h1>
    </div>
  );
}
```

### The 5 Non-Negotiable Rules

```
1. "use client"     — Every file with useGSAP must be a Client Component.
                      Never use GSAP in Server Components.

2. useGSAP only     — Never use useEffect or useLayoutEffect for GSAP.
                      useGSAP handles React reconciliation and cleanup correctly.

3. scope always     — Always pass { scope: containerRef } to useGSAP.
                      This prevents selector leakage across components.

4. useRef on root   — Always attach the ref to the outermost wrapper element.
                      Never skip the ref or attach it to a child.

5. push client deep — Mark only the animated leaf component as "use client".
                      Keep parent page.tsx and layout.tsx as Server Components.
```

### Extracting Animation Logic into a Hook

For complex animations, extract all GSAP logic into a dedicated hook.
The component only calls the hook and attaches the ref.

```ts
/*
 * File Name:     useHeroAnimation.ts
 * Description:   Manages all GSAP animations for the Hero section —
 *                entrance timeline, floating badge loop, and responsive
 *                breakpoint handling via gsap.matchMedia().
 * Targets:       .anim-hero-nav, .anim-hero-title, .anim-hero-subtitle,
 *                .anim-hero-cta, .anim-hero-stat, .anim-hero-badge
 * Plugin:        ScrollTrigger
 * Author:        <Name>
 * Created Date:  <YYYY-MM-DD>
 */

"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { DURATION, EASE, STAGGER, BREAKPOINTS } from "@/constants/animationTokens";

/*
 * Function Name: useHeroAnimation
 * Description:   Returns a containerRef to attach to the hero wrapper.
 *                Runs the full entrance timeline on mount, with
 *                responsive variants via gsap.matchMedia().
 * Returns:       { containerRef } — attach to root element
 * Cleanup:       Handled automatically by useGSAP
 */
export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heroMm = gsap.matchMedia();

      // ♿ Reduced motion — skip all animation, snap to final state
      heroMm.add(BREAKPOINTS.reduced, () => {
        gsap.set(
          ".anim-hero-nav, .anim-hero-badge, .anim-hero-title, .anim-hero-subtitle, .anim-hero-cta, .anim-hero-stat",
          { clearProps: "all" }
        );
      });

      // 🖥️ Desktop — full cinematic entrance
      heroMm.add(BREAKPOINTS.desktop, () => {
        const heroTl = gsap.timeline({
          defaults: { ease: EASE.default, duration: DURATION.normal },
        });

        heroTl
          .from(".anim-hero-nav",      { y: -80, autoAlpha: 0 })
          .from(".anim-hero-badge",    { y: 20, autoAlpha: 0, duration: DURATION.fast  }, "-=0.1")
          .from(".anim-hero-title",    { y: 70, autoAlpha: 0, duration: DURATION.slow,
                                         ease: EASE.strong                             }, "-=0.2")
          .from(".anim-hero-subtitle", { y: 30, autoAlpha: 0                           }, "-=0.4")
          .fromTo(".anim-hero-cta",
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: DURATION.fast, ease: EASE.bounce       }, "<+=0.2")
          .from(".anim-hero-stat",     {
            y: 20, autoAlpha: 0, duration: DURATION.fast,
            stagger: { each: STAGGER.normal, from: "start" }                           }, "-=0.2");

        // Floating badge — independent of the main timeline
        gsap.to(".anim-hero-badge", {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: EASE.inOut,
          delay: 1.5,
        });
      });

      // 📱 Mobile — lighter, faster entrance
      heroMm.add(BREAKPOINTS.mobile, () => {
        const heroTl = gsap.timeline({
          defaults: { ease: EASE.default, duration: DURATION.fast },
        });

        heroTl
          .from(".anim-hero-title",    { y: 40, autoAlpha: 0 })
          .from(".anim-hero-subtitle", { y: 20, autoAlpha: 0 }, "-=0.1")
          .from(".anim-hero-cta",      { autoAlpha: 0        }, "-=0.1");
        // No parallax, no float loop, no stat stagger on mobile
      });
    },
    { scope: containerRef }
  );

  return { containerRef };
}
```

```tsx
// HeroSection.tsx — clean, zero raw GSAP
"use client";
import { useHeroAnimation } from "../hooks/useHeroAnimation";

export function HeroSection() {
  const { containerRef } = useHeroAnimation();

  return (
    <div ref={containerRef}>
      <nav className="anim-hero-nav">...</nav>
      <h1 className="anim-hero-title">...</h1>
    </div>
  );
}
```

---

## 5. Tween Rules — gsap.to / from / fromTo

### When to Use Each Method

| Method | Use When | Example |
|--------|----------|---------|
| `gsap.to()` | Element is already visible; animate it somewhere | Hover lift, parallax scroll, float loop |
| `gsap.from()` | Element is in its final CSS position; animate the entrance | Page load, scroll reveal |
| `gsap.fromTo()` | You need precise control of both start AND end state | CTA button scale pop, progress bar |
| `gsap.set()` | Snap to a state instantly with zero duration | Pre-set hidden state, reset after breakpoint |

```ts
// ✅ gsap.from() — page load entrance (most common for landing pages)
// Element sits at its CSS position. GSAP animates FROM y:60 TO its natural position.
gsap.from(".anim-hero-title", {
  y: 60,
  autoAlpha: 0,
  duration: DURATION.slow,
});

// ✅ gsap.to() — interactive or loop animations
// Element is already rendered. GSAP moves it TO the new state.
gsap.to(".anim-badge", {
  y: -10,
  repeat: -1,
  yoyo: true,
  duration: 2,
});

// ✅ gsap.fromTo() — full control of both start and end
gsap.fromTo(
  ".anim-hero-cta",
  { scale: 0, autoAlpha: 0 },
  { scale: 1, autoAlpha: 1, duration: DURATION.fast, ease: EASE.bounce }
);

// ✅ gsap.set() — zero-duration snap (see § 6 for full reference)
gsap.set(".anim-hero-cta", { autoAlpha: 0, scale: 0 });
```

### Standard Property Reference

Always prefer **transform + opacity** properties. Never animate layout properties.

```ts
// ✅ PREFERRED — GPU-accelerated, no layout recalc
{ x: 200 }           // translateX
{ y: -100 }          // translateY
{ scale: 1.2 }       // uniform scale
{ scaleX: 2 }        // horizontal scale
{ scaleY: 0.5 }      // vertical scale
{ rotation: 360 }    // degrees
{ opacity: 0 }       // transparency
{ autoAlpha: 0 }     // opacity + visibility combined — PREFERRED over opacity alone

// ⚠️ USE SPARINGLY — triggers style recalc but not layout
{ borderRadius: "50%" }
{ backgroundColor: "var(--primary)" }
{ color: "var(--foreground)" }

// ❌ NEVER — triggers layout reflow, destroys CLS score
{ width: "200px" }
{ height: "100px" }
{ top: "50px" }
{ left: "200px" }
{ margin: "20px" }
{ padding: "16px" }
```

> **`autoAlpha` rule**: Always prefer `autoAlpha` over `opacity` for entrance
> animations. When `autoAlpha` is `0`, GSAP also sets `visibility: hidden`,
> preventing invisible elements from being keyboard-focusable or intercepting
> pointer events.

---

## 6. gsap.set() + clearProps

### What `gsap.set()` Does

`gsap.set()` is a zero-duration tween — it applies properties instantly with
no animation. It is the correct way to set an initial state, reset elements,
or prepare the DOM before a timeline runs.

```ts
// ✅ Snap to a state instantly
gsap.set(".anim-hero-cta", { autoAlpha: 0, scale: 0 });

// ✅ Reset multiple elements at once
gsap.set(".anim-hero-title, .anim-hero-subtitle, .anim-hero-cta", {
  autoAlpha: 0,
  y: 0,
});

// ✅ Pre-hide elements before a delayed timeline fires
// Prevents elements from flashing visible before the animation starts
useGSAP(() => {
  // Snap all animated elements to their start state immediately
  gsap.set(".anim-hero-title",    { autoAlpha: 0, y: 60  });
  gsap.set(".anim-hero-subtitle", { autoAlpha: 0, y: 30  });
  gsap.set(".anim-hero-cta",      { autoAlpha: 0, scale: 0 });

  // Timeline runs after a short delay — elements are already hidden
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .to(".anim-hero-title",    { autoAlpha: 1, y: 0, duration: DURATION.slow  })
    .to(".anim-hero-subtitle", { autoAlpha: 1, y: 0, duration: DURATION.normal }, "-=0.3")
    .to(".anim-hero-cta",      { autoAlpha: 1, scale: 1, ease: EASE.bounce     }, "-=0.2");

}, { scope: containerRef });
```

### `clearProps` — Remove All Inline GSAP Styles

`clearProps` removes inline styles GSAP has written to an element.
This is essential when switching between breakpoints with `gsap.matchMedia()`
so styles from one breakpoint do not leak into another.

```ts
// ✅ Clear a specific property
gsap.set(".anim-hero-title", { clearProps: "opacity" });

// ✅ Clear multiple specific properties
gsap.set(".anim-hero-title", { clearProps: "opacity,transform" });

// ✅ Clear ALL inline GSAP styles — most common use case
gsap.set(".anim-hero-title", { clearProps: "all" });

// ✅ Clear all animated elements at once — use in reduced motion handler
gsap.set(
  ".anim-hero-nav, .anim-hero-title, .anim-hero-subtitle, .anim-hero-cta",
  { clearProps: "all" }
);
```

### When to Use Each

| Situation | What to Do |
|-----------|-----------|
| Pre-hide elements before a delayed timeline | `gsap.set(target, { autoAlpha: 0 })` |
| Prevent flash of unstyled content on load | `gsap.set(targets, { autoAlpha: 0 })` before timeline |
| Switch from one `matchMedia` breakpoint to another | `gsap.set(targets, { clearProps: "all" })` in the cleanup return |
| Reset an element completely after animation | `gsap.set(target, { clearProps: "all" })` |
| Snap to a mid-animation state for debugging | `gsap.set(target, { x: 200, rotation: 45 })` |

### clearProps in matchMedia Cleanup

When using `gsap.matchMedia()`, return a cleanup function to clear
GSAP inline styles before the next breakpoint's styles are applied:

```ts
heroMm.add(BREAKPOINTS.desktop, () => {
  gsap.from(".anim-hero-title", { y: 70, autoAlpha: 0, duration: DURATION.slow });

  // Return cleanup — runs when this breakpoint is no longer active
  return () => {
    gsap.set(".anim-hero-title", { clearProps: "all" });
  };
});
```

---

## 7. Timeline Rules

### Always Use Timelines for Sequences of 2+ Tweens

```ts
// ❌ Bad — manual delay math, breaks when you change any duration
gsap.from(".anim-nav",      { autoAlpha: 0, duration: 0.8 });
gsap.from(".anim-title",    { autoAlpha: 0, duration: 1,   delay: 0.8 });
gsap.from(".anim-subtitle", { autoAlpha: 0, duration: 0.8, delay: 1.6 });

// ✅ Good — chainable, self-managing, maintainable
const heroTl = gsap.timeline({
  defaults: { ease: EASE.default, duration: DURATION.normal },
});

heroTl
  .from(".anim-nav",      { autoAlpha: 0 })
  .from(".anim-title",    { autoAlpha: 0 })
  .from(".anim-subtitle", { autoAlpha: 0 });
```

### Always Set Defaults

```ts
// ✅ Set defaults on the timeline — override per tween only when needed
const heroTl = gsap.timeline({
  defaults: {
    ease:     EASE.default,
    duration: DURATION.normal,
  },
});

// This tween uses timeline defaults
heroTl.from(".anim-nav", { autoAlpha: 0, y: -80 });

// This tween overrides ease only — all other defaults still apply
heroTl.from(".anim-cta", { scale: 0, autoAlpha: 0, ease: EASE.bounce });
```

### Position Parameter — Standard Patterns

```ts
const tl = gsap.timeline();

// DEFAULT — plays after previous tween ends
tl.from(".a", { autoAlpha: 0 })

// OVERLAP — starts 0.3s before previous ends (smooth, professional feel)
  .from(".b", { autoAlpha: 0 }, "-=0.3")

// SYNC — starts at same time as previous
  .from(".c", { autoAlpha: 0 }, "<")

// SYNC + OFFSET — starts 0.2s after previous STARTED
  .from(".d", { autoAlpha: 0 }, "<+=0.2")

// GAP — starts 0.5s after previous ends
  .from(".e", { autoAlpha: 0 }, "+=0.5")

// ABSOLUTE — insert at exactly 2 seconds
  .from(".f", { autoAlpha: 0 }, 2);
```

**Which position to use on a landing page:**

| Pattern | Code | Best For |
|---------|------|----------|
| Slight overlap | `"-=0.2"` | Default — smooth, polished feel |
| Sync | `"<"` | Two things that belong together |
| Sync + small offset | `"<+=0.15"` | Staggered pair with shared start point |
| Gap | `"+=0.3"` | Distinct phase breaks within one timeline |

### Labels for Complex Timelines

Use labels when a timeline has more than 4–5 tweens or distinct phases.

```ts
const pageTl = gsap.timeline();

pageTl
  .addLabel("nav")
  .from(".anim-nav", { y: -80, autoAlpha: 0 }, "nav")

  .addLabel("hero", "nav+=0.3")
  .from(".anim-hero-title",    { y: 60, autoAlpha: 0 }, "hero")
  .from(".anim-hero-subtitle", { y: 30, autoAlpha: 0 }, "hero+=0.2")

  .addLabel("stats", "+=0.1")
  .from(".anim-hero-stat", {
    y: 20,
    autoAlpha: 0,
    stagger: STAGGER.normal,
  }, "stats");

// Debug: jump to any label while building
// pageTl.seek("stats");
// pageTl.timeScale(0.2);
```

### Timeline Callbacks

```ts
const heroTl = gsap.timeline({
  onStart:    () => console.log("▶️  heroTl started"),
  onComplete: () => console.log("✅ heroTl complete"),
});

// Playback controls — available at any time
heroTl.play();
heroTl.pause();
heroTl.reverse();
heroTl.restart();
heroTl.seek(2);           // jump to 2 seconds in
heroTl.timeScale(0.2);    // slow to 20% speed — dev only, never commit
```

### Timeline Debugging (Dev Only — Remove Before Merge)

```ts
const heroTl = gsap.timeline({
  timeScale: 0.2,                                    // ← DEV ONLY
  onStart:    () => console.log("▶️  started"),      // ← DEV ONLY
  onComplete: () => console.log("✅ complete"),      // ← DEV ONLY
});

// heroTl.seek("cards");                             // ← DEV ONLY
```

> **Rule**: Remove all `timeScale` overrides, `seek()` calls, and `console.log`
> callbacks before committing. These are dev-only tools.

---

## 8. Stagger Rules

### Basic vs. Advanced Stagger

```ts
// ✅ Basic — use a token number for simple, uniform cascades
gsap.from(".anim-hero-stat", {
  autoAlpha: 0,
  y: 20,
  stagger: STAGGER.normal, // 0.1 from tokens — never hardcode
});

// ✅ Advanced — use an object when you need direction or eased spacing
gsap.from(".anim-features-card", {
  autoAlpha: 0,
  y: 60,
  duration: DURATION.normal,
  stagger: {
    each: STAGGER.normal,    // gap between each element
    from: "start",           // direction of cascade
    ease: "power2.inOut",    // ease the spacing between items too
  },
});
```

### `from` Direction Reference

| Value | Effect | Best For |
|-------|--------|----------|
| `"start"` | Left → right | Horizontal lists, nav links, cards |
| `"end"` | Right → left | Dismissals, reverse reveals |
| `"center"` | Center → outward | Hero badges, radial reveals |
| `"edges"` | Edges → center | Closing / collapsing sequences |
| `"random"` | Random order | Playful / organic feel |
| `0` (index) | From a specific element | Custom focal point |

### `each` vs. `amount` — Which to Use

```ts
// each — fixed gap regardless of element count (PREFERRED)
// 5 elements = 5 × 0.1s gaps. 50 elements = 50 × 0.1s gaps.
stagger: { each: STAGGER.normal }

// amount — total time is fixed, gap shrinks as elements grow
// 5 elements = 0.2s each. 50 elements = 0.02s each.
stagger: { amount: 1.0 }
```

> **Rule**: Default to `each` for UI components. Use `amount` only when
> element count is variable and you need to guarantee a fixed total duration.

### Grid Stagger

For CSS Grid layouts, GSAP can stagger by grid position:

```ts
gsap.from(".anim-grid-item", {
  autoAlpha: 0,
  y: 40,
  duration: DURATION.normal,
  stagger: {
    each: STAGGER.fast,
    from: "start",
    grid: "auto",  // GSAP auto-detects grid columns from the DOM
  },
});
```

---

## 9. ScrollTrigger Rules

### Always Register in `gsapConfig.ts`

ScrollTrigger is already registered in `src/lib/gsapConfig.ts`.
Never re-register it inside a component or hook.

### Standard Scroll Reveal Pattern

```ts
gsap.from(".anim-section-title", {
  autoAlpha: 0,
  y: 60,
  duration: DURATION.slow,
  ease: EASE.strong,
  scrollTrigger: {
    trigger: ".anim-section-title",
    start:   "top 80%",                       // fires when top of element hits 80% of viewport
    end:     "top 40%",
    toggleActions: "play none none reverse",  // play on enter, reverse on scroll back up
  },
});
```

### `toggleActions` Reference

Format: `"onEnter onLeave onEnterBack onLeaveBack"`

| Preset | Code | Use Case |
|--------|------|----------|
| Play once, never reset | `"play none none none"` | Counters, one-time reveals |
| Play in, reverse on scroll up | `"play none none reverse"` | **Standard scroll reveals** ✅ |
| Full bidirectional | `"play reverse play reverse"` | Sticky nav, persistent states |

### Scrub — Tie Animation to Scroll Position

```ts
// scrub: true  — instant, 1:1 with scroll
// scrub: 1     — 1 second lag (smooth, professional — standard choice)
// scrub: 2     — 2 second lag (cinematic, heavy elements)

gsap.to(".anim-parallax-image", {
  y: -200,
  ease: EASE.linear,
  scrollTrigger: {
    trigger: ".anim-parallax-image",
    start:   "top bottom",
    end:     "bottom top",
    scrub:   1,
  },
});
```

### Pin — Stick Element During Scroll

```ts
ScrollTrigger.create({
  trigger:    ".anim-sticky-section",
  start:      "top top",
  end:        "+=600",       // pin for 600px of scrolling
  pin:        true,
  pinSpacing: true,          // keeps layout space while element is pinned
});
```

### Individual ScrollTrigger Per Element

When each element needs its own independent trigger, use
`gsap.utils.toArray()` and loop — do not use stagger with a shared trigger.
See `§ 11` for the full `gsap.utils` reference.

```ts
const cards = gsap.utils.toArray<HTMLElement>(".anim-features-card");

cards.forEach((card) => {
  gsap.from(card, {
    autoAlpha: 0,
    y: 60,
    duration: DURATION.normal,
    ease: EASE.default,
    scrollTrigger: {
      trigger:       card,
      start:         "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});
```

### ScrollTrigger Cleanup in Next.js

`useGSAP` handles cleanup automatically for all ScrollTriggers created
inside it. Only use manual cleanup for rare cases outside `useGSAP`:

```ts
useEffect(() => {
  const revealSt = ScrollTrigger.create({ ... });
  return () => revealSt.kill(); // manual cleanup
}, []);
```

> **Rule**: Always use `useGSAP` for ScrollTrigger creation. Let it
> handle cleanup. Only fall back to `useEffect` + manual `.kill()` for
> edge cases where `useGSAP` cannot be used.

---

## 10. gsap.matchMedia() — Responsive Animations

### Why It Is Required

Without `gsap.matchMedia()`, GSAP inline styles applied at one breakpoint
will persist when the viewport changes, causing broken layouts on resize.
CSS `@media` queries cannot override GSAP inline styles. This is why
`gsap.matchMedia()` is non-negotiable for any animation that differs by
screen size.

`gsap.matchMedia()` automatically reverts and kills all animations and
ScrollTriggers created inside a handler when that media query no longer
matches — preventing leaks between breakpoints.

### Standard Pattern

```ts
useGSAP(() => {
  const heroMm = gsap.matchMedia();

  // ♿ Reduced motion — always declare first, highest priority
  heroMm.add(BREAKPOINTS.reduced, () => {
    // Do NOT animate — snap everything to its final visible state
    gsap.set(
      ".anim-hero-title, .anim-hero-subtitle, .anim-hero-cta, .anim-hero-stat",
      { clearProps: "all" }
    );
  });

  // 🖥️ Desktop — full cinematic animations
  heroMm.add(BREAKPOINTS.desktop, () => {
    const heroTl = gsap.timeline({
      defaults: { ease: EASE.default, duration: DURATION.normal },
    });

    heroTl
      .from(".anim-hero-title",    { y: 70, autoAlpha: 0, duration: DURATION.slow })
      .from(".anim-hero-subtitle", { y: 30, autoAlpha: 0                           }, "-=0.3");

    gsap.to(".anim-parallax-bg", {
      y: -200,
      scrollTrigger: {
        trigger: ".anim-hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Return cleanup — fires when desktop breakpoint is exited
    return () => {
      gsap.set(".anim-hero-title, .anim-hero-subtitle", { clearProps: "all" });
    };
  });

  // 📱 Mobile — simplified entrance, no heavy scroll effects
  heroMm.add(BREAKPOINTS.mobile, () => {
    gsap.from(".anim-hero-title", {
      y: 30,
      autoAlpha: 0,
      duration: DURATION.fast,
    });

    // Return cleanup
    return () => {
      gsap.set(".anim-hero-title", { clearProps: "all" });
    };
  });

}, { scope: containerRef });
```

### Using Context Data Inside Handlers

Pass a context object as the second argument to share data between handlers:

```ts
const heroMm = gsap.matchMedia();

heroMm.add(
  {
    isDesktop: BREAKPOINTS.desktop,
    isMobile:  BREAKPOINTS.mobile,
    isReduced: BREAKPOINTS.reduced,
  },
  (context) => {
    const { isDesktop, isMobile, isReduced } = context.conditions as {
      isDesktop: boolean;
      isMobile:  boolean;
      isReduced: boolean;
    };

    if (isReduced) {
      gsap.set(".anim-hero-title", { clearProps: "all" });
      return;
    }

    const yDistance = isDesktop ? 70 : 30;
    const dur       = isDesktop ? DURATION.slow : DURATION.fast;

    gsap.from(".anim-hero-title", {
      y:         yDistance,
      autoAlpha: 0,
      duration:  dur,
      ease:      EASE.strong,
    });
  }
);
```

### Rules

```
✅ Always declare the reduced motion handler first — highest priority
✅ Always return a cleanup function that calls clearProps: "all" for each handler
✅ Use BREAKPOINTS tokens from animationTokens.ts — never hardcode media queries
✅ Use gsap.matchMedia() (not the deprecated ScrollTrigger.matchMedia())
✅ Never use CSS @media queries to control GSAP-animated elements
```

---

## 11. gsap.utils — The Utility Toolkit

### `gsap.utils.toArray()` — NodeList to Array

The most commonly used utility. Required when each element needs its own
independent ScrollTrigger, or when you need to iterate over GSAP targets
with full Array method access.

```ts
// ✅ toArray — converts selector string or NodeList to a typed array
const cards = gsap.utils.toArray<HTMLElement>(".anim-features-card");

// Now you can use .forEach(), .map(), .filter() etc.
cards.forEach((card, index) => {
  gsap.from(card, {
    autoAlpha: 0,
    y: 60,
    duration: DURATION.normal,
    delay: index * STAGGER.normal,  // manual stagger when not in a timeline
    scrollTrigger: {
      trigger:       card,          // each card has its OWN trigger
      start:         "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});
```

### `gsap.utils.clamp()` — Constrain a Value

```ts
// clamp(min, max, value) — value never goes below min or above max
const clampedProgress = gsap.utils.clamp(0, 1, rawProgress);
const clampedOpacity  = gsap.utils.clamp(0, 1, scrollRatio);

// Returns a reusable clamp function when called with 2 args
const clampProgress = gsap.utils.clamp(0, 1);
const safe = clampProgress(someValue); // always 0–1
```

### `gsap.utils.mapRange()` — Map One Range to Another

Essential for linking scroll progress to animation values:

```ts
// mapRange(inMin, inMax, outMin, outMax, value)
// Map scroll progress (0 → 1) to rotation (0 → 360deg)
const progressToRotation = gsap.utils.mapRange(0, 1, 0, 360);
const rotation = progressToRotation(scrollProgress); // 0.5 → 180

// Map scroll Y (0 → 1000px) to opacity (1 → 0)
const scrollToOpacity = gsap.utils.mapRange(0, 1000, 1, 0);
```

### `gsap.utils.interpolate()` — Tween Between Values

```ts
// Interpolate between two colors, numbers, or objects
const colorInterp = gsap.utils.interpolate("var(--primary)", "var(--secondary)");
const midColor = colorInterp(0.5); // 50% between the two colors

// Interpolate between numbers
const numInterp = gsap.utils.interpolate(0, 100);
const midPoint  = numInterp(0.3); // → 30
```

### `gsap.utils.wrap()` — Infinite Cycling

```ts
// wrap(min, max, value) — cycles value back to min after reaching max
// Essential for infinite carousels and looping animations
const wrap    = gsap.utils.wrap(0, slides.length);
const nextIdx = wrap(currentIndex + 1); // auto-wraps at the end
```

### When to Use Each

| Utility | Use When |
|---------|----------|
| `toArray()` | You need to iterate over GSAP targets with individual ScrollTriggers |
| `clamp()` | You need to constrain a computed value to a safe range |
| `mapRange()` | You need to link scroll progress or pointer position to an animation value |
| `interpolate()` | You need to blend between two values at a given progress point |
| `wrap()` | You need infinite cycling (carousels, loops) |

---

## 12. useGSAP Dependencies Array — Reactive Animations

### When to Use Dependencies

When an animation depends on React state or props — such as a menu toggle,
a tab change, a theme switch, or data loading — pass a `dependencies` array
to `useGSAP`. The animation will re-run whenever the dependency changes.

```ts
"use client";
import { useState, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import { DURATION, EASE } from "@/constants/animationTokens";

export function MobileMenu() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      gsap.to(".anim-menu-panel", {
        height:    isOpen ? "auto" : 0,
        autoAlpha: isOpen ? 1 : 0,
        duration:  DURATION.fast,
        ease:      isOpen ? EASE.default : EASE.inOut,
      });

      gsap.to(".anim-menu-icon", {
        rotation: isOpen ? 45 : 0,
        duration: DURATION.fast,
        ease:     EASE.bounce,
      });
    },
    {
      scope:          containerRef,
      dependencies:   [isOpen],   // re-run when isOpen changes
      revertOnUpdate: true,       // cleanly undo previous state before re-running
    }
  );

  return (
    <div ref={containerRef}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span className="anim-menu-icon">✕</span>
      </button>
      <div className="anim-menu-panel">...</div>
    </div>
  );
}
```

### `revertOnUpdate` — Why It Matters

Without `revertOnUpdate: true`, when `useGSAP` re-runs due to a dependency
change, the new animation will fight the inline styles left by the previous
animation run. `revertOnUpdate: true` cleanly reverts all GSAP state before
re-running — the same way `useEffect` cleanup works.

```ts
// ✅ Always pair dependencies with revertOnUpdate
useGSAP(
  () => { /* animation that depends on state */ },
  {
    scope:          containerRef,
    dependencies:   [isOpen, activeTab],  // re-run on any of these
    revertOnUpdate: true,                 // clean slate before each re-run
  }
);

// ❌ Missing revertOnUpdate — animations fight each other on state change
useGSAP(
  () => { /* animation */ },
  { scope: containerRef, dependencies: [isOpen] }
);
```

### Dependencies Rules

```
✅ Always pair dependencies: [...] with revertOnUpdate: true
✅ Only include values the animation actually reads
✅ Use for state-driven animations (open/closed, active tab, theme)
❌ Do not add dependencies for entrance animations that run once on mount
❌ Do not add dependencies just because a value exists in the component
```

---

## 13. ScrollTrigger.refresh() + markers — Next.js Gotchas

### The Problem

In a dynamic Next.js application, ScrollTrigger calculates all start/end
positions on mount. If content loads asynchronously after mount — images,
fetched data, dynamic components — the page height changes and all trigger
positions become inaccurate. The fix is `ScrollTrigger.refresh()`.

### When to Call `ScrollTrigger.refresh()`

```ts
// ✅ After all animations are registered, force a position recalculation
useGSAP(() => {
  // ... all your ScrollTrigger animations ...
  gsap.from(".anim-section-title", {
    autoAlpha: 0,
    y: 60,
    scrollTrigger: { trigger: ".anim-section-title", start: "top 80%" },
  });

  // Recalculate all trigger positions after registration
  ScrollTrigger.refresh();

}, { scope: containerRef });
```

```ts
// ✅ After images or async content finishes loading
useEffect(() => {
  const images = document.querySelectorAll("img");
  let loaded   = 0;

  images.forEach((img) => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) ScrollTrigger.refresh();
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) ScrollTrigger.refresh();
      });
    }
  });
}, []);
```

### `markers` — Dev-Only Visual Debugging

`markers: true` renders visible start/end lines on the page so you can
see exactly where each ScrollTrigger fires.

```ts
scrollTrigger: {
  trigger: ".anim-section",
  start:   "top 80%",
  end:     "top 40%",
  markers: true,  // 👈 DEV ONLY — shows colored lines in the browser
                  // NEVER commit with markers: true
}
```

> **Rule**: `markers: true` must never be committed to main. Use it
> locally while tuning `start` and `end` values, then remove it.

### Route Change Cleanup — App Router

In Next.js App Router, when navigating between pages, `useGSAP` handles
cleanup of animations tied to unmounted components. However, ScrollTriggers
attached to the document body (not scoped to a component) need manual cleanup:

```ts
// ✅ Kill all ScrollTriggers on route change — place in root layout
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsapConfig";

export function ScrollTriggerCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      // Kill all active ScrollTriggers when route changes
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pathname]);

  return null;
}
```

---

## 14. Page Transition Animations — App Router

### The Problem

Next.js App Router unmounts the outgoing page component immediately on
route change, leaving no time for an exit animation. The recommended
solution is `next-transition-router`.

### Installation

```bash
npm install next-transition-router
```

### Setup in Root Layout

```tsx
/*
 * File Name:     layout.tsx
 * Description:   Root layout. Wraps all pages with TransitionRouter
 *                for animated page enter/exit using GSAP.
 * Author:        <Name>
 * Created Date:  <YYYY-MM-DD>
 */

// app/layout.tsx
import { TransitionRouter } from "next-transition-router";
import { gsap } from "@/lib/gsapConfig";
import { DURATION, EASE } from "@/constants/animationTokens";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TransitionRouter
          /*
           * leave — animate the OUTGOING page before route change fires.
           * Must call next() when animation completes to trigger navigation.
           */
          leave={(next) => {
            gsap.to(".anim-page-wrapper", {
              autoAlpha: 0,
              y: -20,
              duration: DURATION.fast,
              ease:     EASE.default,
              onComplete: next,
            });
          }}
          /*
           * enter — animate the INCOMING page after new component mounts.
           * Must call next() when animation completes to signal readiness.
           */
          enter={(next) => {
            gsap.fromTo(
              ".anim-page-wrapper",
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y:         0,
                duration:  DURATION.normal,
                ease:      EASE.default,
                onComplete: next,
              }
            );
          }}
        >
          {children}
        </TransitionRouter>
      </body>
    </html>
  );
}
```

### Page Wrapper — Required on Every Page

Every page that participates in transitions must have a root element with
the `anim-page-wrapper` class:

```tsx
// app/dashboard/page.tsx
import { DashboardContent } from "@/features/dashboard";

export default function DashboardPage() {
  return (
    <div className="anim-page-wrapper">
      <DashboardContent />
    </div>
  );
}
```

### Reduced Motion — Disable Page Transitions

```tsx
// In layout.tsx — check before passing leave/enter handlers
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

<TransitionRouter
  leave={prefersReducedMotion ? undefined : (next) => { /* animate out */ next(); }}
  enter={prefersReducedMotion ? undefined : (next) => { /* animate in  */ next(); }}
>
  {children}
</TransitionRouter>
```

### Rules

```
✅ Always wrap page content in a div with class anim-page-wrapper
✅ Always call next() in onComplete — without it, navigation hangs
✅ Disable transitions when prefers-reduced-motion: reduce is set
✅ Keep leave duration short (DURATION.fast) — users are waiting to navigate
❌ Do not run heavy animations in leave — it blocks the route change
❌ Do not use CSS transitions for page transitions — they race with GSAP
```

---

## 15. Performance Rules

### The Golden Properties

Animate **only** these in performance-sensitive contexts:

```
✅ opacity       — composited, GPU only
✅ autoAlpha     — opacity + visibility, GPU only — PREFERRED
✅ x, y          — transform, composited
✅ scale         — transform, composited
✅ rotation      — transform, composited
✅ scaleX/scaleY — transform, composited
```

### Core Web Vitals — What Never to Animate

```
❌ width, height    — layout reflow (breaks CLS)
❌ top, left        — layout reflow (breaks CLS)
❌ margin, padding  — layout reflow (breaks CLS)
❌ font-size        — triggers layout recalc
❌ display          — use autoAlpha instead
```

### Reduce Motion — Accessibility Required

Every animation hook must respect `prefers-reduced-motion`.
Use `gsap.matchMedia()` with the `BREAKPOINTS.reduced` token —
do not check `window.matchMedia` manually inside hooks.

```ts
// ✅ Correct — use matchMedia with BREAKPOINTS.reduced token
const heroMm = gsap.matchMedia();

heroMm.add(BREAKPOINTS.reduced, () => {
  // Skip all motion — snap everything to its final visible state
  gsap.set(
    ".anim-hero-title, .anim-hero-subtitle, .anim-hero-cta, .anim-hero-stat",
    { clearProps: "all" }
  );
});

heroMm.add(BREAKPOINTS.desktop, () => {
  // Full animations for users without motion preference
  const heroTl = gsap.timeline({ ... });
  // ...
});
```

### `will-change` — Let GSAP Manage It

GSAP automatically applies `will-change: transform` during animations
and removes it when done. Never manually set `will-change` in CSS on
animated elements — it wastes GPU memory when permanently set.

```css
/* ❌ Never do this on GSAP-animated elements */
.anim-hero-title {
  will-change: transform; /* always-on = GPU memory waste */
}

/* ✅ GSAP applies and removes will-change automatically */
```

---

## 16. What Never To Do

```
❌ Import gsap directly from "gsap" in components — use @/lib/gsapConfig
❌ Use useEffect for GSAP — use useGSAP
❌ Omit { scope: containerRef } from useGSAP — selector leaks will occur
❌ Target Tailwind classes with GSAP — use anim- prefix classes only
❌ Register plugins inside components — register once in gsapConfig.ts
❌ Animate layout properties (top, left, width, height, margin, padding)
❌ Use opacity without considering autoAlpha for entrance animations
❌ Hardcode duration, ease, stagger, or breakpoint values — use tokens
❌ Leave timeScale / seek / markers: true / console.log in committed code
❌ Use GSAP in Server Components — always "use client"
❌ Put raw GSAP timelines inside component JSX — extract to a hook
❌ Ignore prefers-reduced-motion — add BREAKPOINTS.reduced to every hook
❌ Use CSS @media queries to control GSAP-animated elements — use matchMedia
❌ Skip clearProps: "all" when switching between matchMedia breakpoints
❌ Forget to call next() in TransitionRouter leave/enter — navigation will hang
❌ Use Framer Motion, anime.js, or CSS keyframes for complex sequences
❌ Call ScrollTrigger.refresh() before all animations are registered
❌ Use dependencies: [...] without revertOnUpdate: true
❌ Use the deprecated ScrollTrigger.matchMedia() — use gsap.matchMedia()
```

---

## 17. Code Documentation

Animation hooks and components follow the same documentation standard
as [`rules.md § 6`](./rules.md#6-code-documentation), with animation-specific
additions.

### Animation Hook Header

```ts
/*
 * File Name:     useHeroAnimation.ts
 * Description:   Manages entrance timeline and floating loop for the Hero
 *                section. Handles responsive breakpoints via matchMedia
 *                and respects prefers-reduced-motion.
 * Targets:       .anim-hero-nav, .anim-hero-title, .anim-hero-subtitle,
 *                .anim-hero-cta, .anim-hero-stat, .anim-hero-badge
 * Plugin:        ScrollTrigger
 * Author:        <Name>
 * Created Date:  <YYYY-MM-DD>
 */
```

### Animation Hook Function Doc

```ts
/*
 * Function Name: useHeroAnimation
 * Description:   Runs a sequenced entrance timeline for the hero section
 *                on mount. Desktop shows full cinematic sequence with
 *                parallax. Mobile shows a simplified entrance only.
 *                Reduced motion skips all animation via clearProps.
 * Parameters:    none
 * Returns:       { containerRef } — attach to the section's root wrapper
 * Cleanup:       Handled automatically by useGSAP + matchMedia revert
 */
```

### Inline Comments — Label Every Animation Block

```ts
const heroTl = gsap.timeline({
  defaults: { ease: EASE.default, duration: DURATION.normal },
});

// 1. Navbar drops from above the viewport on load
heroTl.from(".anim-hero-nav", { y: -80, autoAlpha: 0 });

// 2. Badge fades up — overlaps navbar exit by 0.1s for a connected feel
heroTl.from(".anim-hero-badge", { y: 20, autoAlpha: 0 }, "-=0.1");

// 3. Title is the focal point — longer duration + stronger ease for impact
heroTl.from(".anim-hero-title", {
  y: 70,
  autoAlpha: 0,
  duration: DURATION.slow,
  ease: EASE.strong,  // overrides default — title is the hero moment
}, "-=0.2");

// 4. Stats cascade left → right with stagger — reinforces scan direction
heroTl.from(".anim-hero-stat", {
  y: 20,
  autoAlpha: 0,
  duration: DURATION.fast,
  stagger: { each: STAGGER.normal, from: "start" },
}, "-=0.2");
```

---

## 18. Quick Reference

```
SETUP
  Install           → npm install gsap @gsap/react
  Config file       → src/lib/gsapConfig.ts (register ALL plugins here)
  Tokens file       → src/constants/animationTokens.ts
  Import rule       → always from @/lib/gsapConfig, never from "gsap" directly

FOLDER RULES
  Feature-only      → src/features/<name>/hooks/useXAnimation.ts
  Shared (2+)       → src/hooks/useXAnimation.ts
  Animated comp     → src/components/ui/AnimatedX.tsx
  Constants         → src/constants/animationTokens.ts

NAMING
  Timelines         → camelCase + Tl suffix      (heroTl, cardsTl)
  ScrollTriggers    → camelCase + St suffix      (revealSt, pinSt)
  matchMedia        → camelCase + Mm suffix      (heroMm, pagesMm)
  GSAP Selectors    → anim- prefix               (anim-hero-title, anim-features-card)
  Duration tokens   → DURATION.fast/normal/slow/xslow
  Ease tokens       → EASE.default/strong/bounce/elastic/linear/inOut
  Stagger tokens    → STAGGER.fast/normal/slow
  Breakpoint tokens → BREAKPOINTS.mobile/tablet/desktop/reduced

NEXT.JS PATTERN (ALL 5 REQUIRED)
  1. "use client"             → top of every animation file
  2. useGSAP not useEffect    → always, no exceptions
  3. { scope: containerRef }  → always, no exceptions
  4. useRef on root element   → containerRef attached to outermost wrapper
  5. Logic in hooks           → no raw GSAP timelines in component JSX

TWEEN METHODS
  gsap.from()       → page load entrances (most common)
  gsap.to()         → hover effects, loops, scroll-driven movement
  gsap.fromTo()     → full control of both start AND end state
  gsap.set()        → instant snap — pre-hide, reset, clear after breakpoint

PROPERTIES (SAFE TO ANIMATE)
  autoAlpha         → opacity + visibility — always prefer over opacity alone
  x, y              → transforms — always use over top/left
  scale             → transforms — always use over width/height
  rotation          → transforms — safe
  opacity           → safe but prefer autoAlpha for entrances

CLEARPROPS
  clearProps: "all"    → removes ALL GSAP inline styles from an element
  clearProps: "opacity,transform" → removes specific properties only
  Use in              → matchMedia cleanup return, reduced motion handler,
                        post-animation resets

TIMELINE
  defaults: {}      → always set ease + duration on every timeline
  "-=0.2"           → default overlap for polished sequential feel
  "<"               → sync two things that belong together
  "<+=0.15"         → sync + small offset
  addLabel()        → use when timeline has 4+ distinct phases
  timeScale(0.2)    → debug only, never commit

STAGGER
  stagger: token    → simple uniform cascade (use STAGGER.x token)
  each vs amount    → prefer each; use amount for variable-count lists
  from: "start"     → left to right (default for most layouts)
  from: "center"    → radial / focal reveals
  from: "random"    → organic, playful feel

SCROLLTRIGGER
  start/end         → "top 80%" / "top 40%" default for most reveals
  scrub: 1          → smooth parallax (1s lag is the standard choice)
  pin: true         → sticky sections
  toggleActions     → "play none none reverse" for standard scroll reveals
  markers: true     → dev only, never commit
  refresh()         → call after all triggers registered on dynamic pages
  toArray() loop    → use for individual trigger per element (not stagger)

MATCHMEDIA
  Always declare    → BREAKPOINTS.reduced handler first
  Always return     → cleanup function with clearProps: "all"
  Use tokens        → BREAKPOINTS.mobile/tablet/desktop/reduced
  Never use         → CSS @media to control GSAP-animated elements
  Deprecated        → ScrollTrigger.matchMedia() — use gsap.matchMedia()

GSAP UTILS
  toArray()         → NodeList → typed array for individual ScrollTriggers
  clamp()           → constrain computed value to safe range
  mapRange()        → link scroll progress to animation values
  interpolate()     → blend between two values at a progress point
  wrap()            → infinite cycling for carousels and loops

REACTIVE ANIMATIONS
  dependencies: []  → re-run animation when state/props change
  revertOnUpdate    → always pair with dependencies — clean slate on re-run

PAGE TRANSITIONS
  Library           → next-transition-router
  Wrapper class     → anim-page-wrapper on every page root element
  leave callback    → animate out, call next() in onComplete
  enter callback    → animate in, call next() in onComplete
  Reduced motion    → pass undefined to leave/enter when reduced is set

PERFORMANCE
  ✅ autoAlpha, x, y, scale, rotation — GPU composited, always safe
  ❌ top, left, width, height, margin, padding — layout reflow, never
  ✅ Respect prefers-reduced-motion via BREAKPOINTS.reduced in every hook
  ✅ Let GSAP manage will-change — never set it manually in CSS

NEVER
  ❌ Import gsap directly — use @/lib/gsapConfig
  ❌ useEffect for GSAP — use useGSAP
  ❌ Skip scope — selector leaks across components
  ❌ Target Tailwind classes — use anim- prefix
  ❌ Hardcode values — use animationTokens.ts
  ❌ Commit timeScale / seek / markers / console.log
  ❌ Animate layout properties
  ❌ Ignore prefers-reduced-motion
  ❌ Skip clearProps when switching matchMedia breakpoints
  ❌ Use dependencies without revertOnUpdate: true
  ❌ Forget next() in TransitionRouter callbacks
```

---

> **AI Agents**: Read this entire file before creating or modifying any animation.
> Follow § 2 for file placement. Follow § 3 for naming — `anim-` prefix is required
> on all GSAP target classes. Follow § 4 for the mandatory Next.js pattern — all
> 5 rules apply every time. Follow § 10 for `gsap.matchMedia()` — required for any
> animation that differs across breakpoints. Follow § 15 for performance and § 17
> for documentation standards. All duration, ease, stagger, and breakpoint values
> must come from `animationTokens.ts` — never hardcode them.

*Last updated: <!-- DATE --> · Maintainer: <!-- NAME -->*