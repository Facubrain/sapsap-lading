# UI Feature Implementation Workflow

This document provides a systematic approach for implementing high‑quality, accessible, and theme‑aware UI features. It complements LLM_FEATURE_IMPLEMENTATION.md and follows the same 6‑step cadence. Follow this process strictly, step by step, without skipping or merging phases.

## When to Use This Workflow

Use this approach when:
- Building new screens or reusable components
- Implementing features with notable visual or interaction complexity
- Ensuring accessibility, localization, and light/dark theme support
- Delivering UI for critical user flows (onboarding, checkout, settings, etc.)
- Designing cross‑platform or responsive/adaptive interfaces

## Repo‑Specific Notes

- Mobile app: apps/mobile (Expo React Native)
- Theming/tokens: apps/mobile/src/theme/{tokens.ts,brand.ts}; helpers like getTheme()
- Primitives: apps/mobile/src/components/primitives/* (AppScreen, AppText, AppButton, etc.)
- Localization: useTranslation() with keys in apps/mobile/src/locales/en.json (register in apps/mobile/src/i18n/config.ts)
- Commands: pnpm mobile, pnpm dev, pnpm lint, pnpm type-check (see README)

## The 6‑Step Workflow

### Step 1: Requirements & UX Analysis
*Goal*: Understand what the UI must achieve before coding.

- Summarize the feature’s purpose and user goals
- Link design assets (Figma/Zeplin/etc.) and call out key specs
- Identify functional requirements: states (empty/loading/error), interactions, gestures, animations
- Identify non‑functional requirements:
  - Accessibility (screen readers, roles/labels, focus, hit areas ≥44×44)
  - Localization (long text, truncation rules, RTL)
  - Theming (light/dark parity via tokens)
  - Responsiveness/adaptation (phones/tablets, orientation)
  - Performance (animation smoothness, list virtualization)
- Define explicit acceptance criteria with Design/Product
- Do not proceed until design and UX are validated

### Step 2: Architecture & Design (UI)
*Goal*: Define a scalable, maintainable UI structure.

- Break the design into reusable components; align with app primitives
  - Prefer apps/mobile/src/components/primitives/* for base building blocks
  - Screens in apps/mobile/src/screens (PascalCase)
- Define props, state, data dependencies, and ownership boundaries
- Separate presentation and logic (container vs. presentational where useful)
- Apply system patterns:
  - Design tokens (getTheme(), tokens.ts), brand, and NativeWind classes
  - Consistent spacing/typography/colors from tokens (avoid hardcoded values)
- Plan layout (RN Flexbox), adaptive rules, and large‑screen considerations
- Confirm alignment with the design system (spacing, typography scale, color usage)
- Document component contracts and responsibilities

### Step 3: Test Planning (UI‑Centric)
*Goal*: Define how the UI will be validated.

- Visual checks: targeted snapshot tests for structural regressions
- Interaction tests: presses, typing, scrolling; assert user‑visible outcomes
- Accessibility tests: roles, labels, focus order, contrast, hit areas
- Theme tests: verify light/dark styles resolve via tokens
- Localization tests: long strings, truncation/line‑wrap, RTL mirroring
- Responsiveness/adaptation checks: phone vs. tablet, portrait vs. landscape
- Performance checks: animation jank, list virtualization for long lists
- Keep tests fast and deterministic (mock network/services where needed)
- Place tests under apps/mobile/__tests__ following repo conventions

### Step 4: Iterative Implementation
*Goal*: Build incrementally while maintaining visual fidelity.

- Implement one component at a time, starting from primitives/composables
- For each component:
  1. Restate requirements (props, states, UX behaviors)
  2. Write interaction/a11y tests first where feasible
  3. Implement the minimal version (structure/layout/basic styles)
  4. Apply tokens/theming and adaptive rules (light/dark, size classes)
  5. Add animations/transitions (only where meaningful and performant)
  6. Verify against design specs (pixel‑approximate check and spacing audit)
  7. Run tests (unit/integration/snapshots); keep commits small and scoped
- Keep design/dev in sync with frequent visual reviews/screenshots

### Step 5: Self‑Review & Quality Checks
*Goal*: Ensure the UI is production‑ready and meets standards.

- Design fidelity:
  - Compare to design source; verify spacing, typography, colors use tokens
  - Validate icon sizes, padding, and alignment across states
- Accessibility:
  - Provide accessibilityRole, labels, and helpful hints
  - Verify screen reader output (VoiceOver/TalkBack), focus order, and contrast
  - Ensure touch targets meet minimum size
- Code quality:
  - Run pnpm lint and pnpm type-check; ensure strong typing of props
  - Favor tokens/NativeWind over inline styles; keep components small and reusable
  - Localize all user‑facing text with useTranslation() and keys in en.json
- Performance:
  - Avoid unnecessary re‑renders; memoize where appropriate
  - Use FlatList/SectionList for large collections; lazy‑load heavy content
  - Aim for smooth animations (~60 FPS on common devices)
- Test coverage:
  - Ensure interaction and snapshot tests pass
  - Validate dark/light mode and localization scenarios
- Documentation:
  - Add usage notes in component docblocks or README snippets
  - Include screenshots/GIFs in PR for design sign‑off (use Storybook only if configured)

### Step 6: Final Validation
*Goal*: Confirm the UI fully satisfies requirements.

- Run full checks: pnpm lint, pnpm type-check, relevant tests
- Validate on devices/emulators (iOS/Android), both light and dark
- Verify localization (EN baseline; others as needed) and RTL support if applicable
- Confirm tablet/large‑screen layouts where relevant
- Conduct design sign‑off review
- Create a summary including:
  - Implemented components/screens and responsibilities
  - Test evidence (what was exercised and how)
  - Screenshots/GIFs covering states and themes
  - Known limitations and future improvements

### Post‑Implementation Cleanup (Required)

- Run the LLM Clean Command for a code‑review‑first cleanup and documentation pass
  - See LLM_CLEAN_COMMAND.md; keep cleanup scoped to your changes
- Ensure adherence to repo standards (AGENTS.md, README, MVP_PRD)
- Remove unused assets/dead code; compress images if applicable
- Confirm localization keys exist and unused keys are pruned

## Best Practices

### UI Testing Philosophy
- Test user experience and outcomes, not internal implementation details
- Keep snapshots focused and resilient; use them to catch real regressions
- Accessibility tests are non‑optional for shippable UI

### Implementation Guidelines
- Use design tokens for spacing, typography, and color (no hardcoded UI values)
- Ensure light/dark theme parity using getTheme() and/or NativeWind classes
- Localize all user‑facing strings via useTranslation() and en.json
- Keep components small, composable, and reusable; colocate by feature under src/
- Prefer primitives (AppScreen, AppText, AppButton, etc.) to ensure consistency
- Use testID and accessibility props to support testing and assistive tech

### Communication
- Collaborate closely with designers; validate visual correctness early and often
- Share progress with annotated screenshots or short videos
- Flag design/UX inconsistencies early with proposed resolutions

## Example Usage

markdown
## Feature: User Profile Screen

### Step 1: Requirements & UX Analysis
[List requirements, design links, states, accessibility needs]

### Step 2: Architecture & Design (UI)
[Break into components; define props/state; token/theming plan]

### Step 3: Test Planning (UI‑Centric)
[List interaction tests, a11y checks, theme/localization, snapshots]

### Step 4: Iterative Implementation
[Component‑by‑component build; screenshots and test runs]

### Step 5: Self‑Review & Quality Checks
[Design fidelity notes, a11y report, performance notes]

### Step 6: Final Validation
[Validation results, sign‑off, future improvements]


## Important Rules

- DO NOT jump directly to implementation
- DO NOT skip test planning
- DO NOT hardcode user‑facing text or theme values
- ALWAYS validate each step before proceeding
- ALWAYS maintain the app in a working state

This companion workflow ensures UI features are accessible, localized, theme‑aware, and visually consistent with the design system—while remaining maintainable and well‑tested.
