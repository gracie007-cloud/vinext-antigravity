# agents.md — AI Agent Guidance

> **For AI coding agents working in this codebase.**
> Read this file first, then read the sub-folder `agents.md` closest to the file you're editing.

---

## Project Snapshot

- **Type**: Single Next.js 16 frontend application (not a monorepo)
- **Tech**: Next.js 16 App Router, React 19, TypeScript 5, Tailwind v4, shadcn/ui, GSAP
- **Package Manager**: pnpm
- **Sub-packages**: `app/` has its own [`agents.md`](app/agents.md)
- **Conventions**: `rules.md` (code), `design-system.md` (UI), `animations.md` (GSAP)

---

## Project Rules Reference

> **Before creating or modifying ANY file, read [`rules.md`](./rules.md).**
> It defines folder structure, naming, documentation headers, imports, commits,
> and all other code conventions. These rules are NOT repeated here.

**Quick links into `rules.md`:**
- Folder & hybrid architecture → `rules.md § 1-2`
- Feature module rules → `rules.md § 3`
- File & component naming → `rules.md § 4-5`
- Variable & function naming → `rules.md § 5`
- Documentation & comments → `rules.md § 6`
- Imports → `rules.md § 7`
- Git & commits → `rules.md § 9`

---

## Design System Reference

> **Before building ANY user-facing UI, read [`design-system.md`](./design-system.md).**
> It defines typography (4 sizes, 2 weights), spacing (8pt grid), colors
> (60/30/10 rule), shadcn/ui patterns, Tailwind v4 setup, dark mode, and
> accessibility. These rules are NOT repeated here.

**Quick links into `design-system.md`:**
- Typography → `design-system.md § 2`
- Spacing (8pt grid) → `design-system.md § 3`
- Color (60/30/10) → `design-system.md § 4`
- Tailwind v4 setup → `design-system.md § 5`
- Component architecture → `design-system.md § 6`
- UI review checklist → `design-system.md § 10`

---

## Animation System Reference

> **Before creating or modifying ANY animation, read [`animations.md`](./animations.md).**
> It defines GSAP setup, the mandatory useGSAP hook pattern, tween and timeline rules,
> stagger, ScrollTrigger, gsap.matchMedia() for responsive animations, animation tokens,
> and performance rules. These rules are NOT repeated here.

**Quick links into `animations.md`:**
- Setup & plugin registration → `animations.md § 1`
- Folder structure & file placement → `animations.md § 2`
- Naming (`anim-` prefix, `Tl`/`St`/`Mm` suffixes) → `animations.md § 3`
- Mandatory `useGSAP` pattern (all 5 rules) → `animations.md § 4`
- Tween methods + `gsap.set()` + `clearProps` → `animations.md § 5-6`
- Timeline, stagger, ScrollTrigger → `animations.md § 7-9`
- `gsap.matchMedia()` responsive animations → `animations.md § 10`
- `gsap.utils` toolkit → `animations.md § 11`
- Reactive animations + dependencies → `animations.md § 12`
- Performance & `prefers-reduced-motion` → `animations.md § 15`

---

## Root Setup Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Lint
pnpm lint

# Type check (add to package.json if needed)
npx tsc --noEmit
```

---

## Security & Secrets

- **Never** commit API keys, tokens, or passwords.
- `.env.example` (committed, dummy values) → `.env` / `.env.local` (gitignored).
- `UPPER_SNAKE_CASE` for all env vars.
- Client-exposed vars: prefix with `NEXT_PUBLIC_`.
- Never log PII in production.
- See `rules.md § 10` for full details.

---

## JIT Index — Directory Map

| Area | Path | Agent Guidance | UI? | Anim? |
|------|------|----------------|-----|-------|
| App Router | `app/` | [`app/agents.md`](app/agents.md) | Yes | Yes |

**Quick-find commands:**

```bash
# Find all TypeScript/TSX files
Get-ChildItem -Recurse -Include *.ts,*.tsx

# Find all animation hooks
Get-ChildItem -Recurse -Filter "use*Animation.ts"

# Find GSAP imports (should all come from gsapConfig)
Select-String -Path "*.ts","*.tsx" -Pattern "from ['\"]gsap['\"]"

# Find anim- prefixed classes
Select-String -Path "*.tsx" -Pattern "anim-"
```

---

## Definition of Done

Run this validation before submitting changes:

```bash
pnpm lint; if($?) { npx tsc --noEmit }; if($?) { pnpm build }
```

**Checklist:**
- [ ] Code follows all rules in [`rules.md`](./rules.md)
- [ ] UI follows all rules in [`design-system.md`](./design-system.md) (if UI-facing)
- [ ] Animations follow all rules in [`animations.md`](./animations.md) (if animation-facing)
- [ ] New files have required documentation headers
- [ ] Commits follow Conventional Commits format
- [ ] No secrets or PII in the diff

---

*Last updated: 2026-02-25*
