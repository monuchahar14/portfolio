---
name: Obsidian Kinetic
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#bdc2ff'
  on-secondary: '#131e8c'
  secondary-container: '#2f3aa3'
  on-secondary-container: '#a8afff'
  tertiary: '#c3c0ff'
  on-tertiary: '#1d00a5'
  tertiary-container: '#8582ff'
  on-tertiary-container: '#180092'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#0f0069'
  on-tertiary-fixed-variant: '#3323cc'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-hero:
    fontFamily: Geist
    fontSize: 3.75rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.025em
  headline-md:
    fontFamily: Geist
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.35'
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.04em
  label-nav:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an atmospheric, hyper-refined technical presence tailored for an ambitious software engineer and computer science scholar. Drawing philosophical and visual cues from vanguard developer tools like Vercel, Linear, and Raycast, the aesthetic fuses deep-space minimalism with subtle futuristic glassmorphism and surgical precision. 

The visual narrative centers on engineering mastery, clarity of thought, and high-velocity execution. Surfaces feel layered and cinematic rather than flat; visual energy is concentrated through luminous, translucent boundaries, rich dark slate plateaus, and electric indigo gradients. Monospaced metadata juxtaposes ultra-clean grotesque typography to project technical rigor alongside contemporary product refinement. Every element signals intentionality, restraint, and obsessive craft.

## Colors

The palette operates on calibrated contrast gradients within an ultra-dark spectrum. Background surfaces start at absolute midnight black (`#09090B`), establishing infinite optical depth. Elevated architectural tiers rely on precise zinc steps: `#18181B` for container backgrounds and `#27272A` for interactive states, separators, and subtle component housings.

Chromatic energy is harnessed strictly through the electric indigo spectrum. The primary accent (`#6366F1`) drives active states, focal links, and core call-to-actions, accompanied by `#818CF8` for luminous hover boundaries, gradients, and secondary highlights, anchored below by `#4F46E5` for pressed states and deep ambient radiance.

Typography contrast remains surgically sharp: `#FFFFFF` delivers uncompromised primary readability, `#A1A1AA` governs secondary prose and descriptions, and `#71717A` frames structural labels, timestamps, and de-emphasized metadata.

## Typography

The type ecosystem pairs the clinical, low-contrast precision of **Geist** for narrative hierarchy with the structured technical character of **JetBrains Mono** for developer attributes, tags, metrics, and timestamps.

- **Geist** carries all display headings, body narratives, navigation links, and action triggers. Tight negative tracking across `display-hero` and `headline` tiers replicates the dense, modern editorial weight typical of world-class engineering portfolios.
- **JetBrains Mono** is reserved strictly for operational parameters: git commits, project status badges, tech stack arrays, architectural metrics, and code snippets.
- Use font-smoothing (`antialiased`) across all platforms to preserve razor-sharp legibility against dark slate backdrops.

## Layout & Spacing

The structural layout uses a centered, constrained fluid grid with a maximum content canvas of 1200px for full-width showcases and 768px for single-column technical logs and case study prose.

- **Breakpoints**: 
  - Mobile (< 640px): 4-column layout, compact outer margins (`margin-sm: 1rem`), stacked project artifacts, horizontal tag scrolling.
  - Tablet (640px – 1024px): 8-column layout, fluid margins (`margin: 1.5rem`), dual-card configurations.
  - Desktop (> 1024px): 12-column layout, spacious outer canvas margins (`margin-lg: 3rem`), multi-column metric and repository grids.
- **Rhythm**: Apply an 8pt modular interval for macro component relationships (`space-xl: 2.5rem`), transitioning to a compact 4pt baseline for internal card padding and badge spacing.

## Elevation & Depth

Visual hierarchy abandons traditional drop shadows in favor of ambient luminescence, backdrop blur filtration, and calibrated hairline borders:

1. **Base Layer (Canvas)**: Solid `#09090B`. Can host subdued radial gradients (e.g., `#6366F1` at 8% opacity blurred to 120px) centered behind primary hero regions or section milestones.
2. **Glass Plateaus (Containers & Cards)**: Background tinted at `#18181B` with 60%–75% alpha, overlaid with a backdrop filter blur of `16px` to `24px`.
3. **Hairline Boundaries**: 1px structural borders using `rgba(255, 255, 255, 0.08)`. On interactive focus or card hover, the perimeter transitions smoothly to `rgba(99, 102, 241, 0.4)` paired with an inner edge glow.
4. **Focused Ambient Shadows**: Cards and active modals utilize a multi-stop tinted diffusion: `0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 32px -4px rgba(0, 0, 0, 0.6), 0 0 40px -10px rgba(99, 102, 241, 0.15)`.

## Shapes

The design uses a refined balance of controlled corner curves, ensuring geometric elegance without overly bulbous contours:

- **Base Components (Inputs, Small Cards, Buttons)**: Formed at `roundedness: 2` (0.5rem / 8px).
- **Larger Structural Cards & Modals (`rounded-lg`)**: 1rem (16px) corner radius, harmonizing with interior nested elements.
- **Hero Containers & Display Frames (`rounded-xl`)**: 1.5rem (24px) corner radius.
- **Pill Primitives**: Full capsule geometry (`border-radius: 9999px`) is applied selectively to status indicators, availability chips, category filters, and micro tech tags.

## Components

### Buttons
- **Primary Action**: Solid `#6366F1` background, `#FFFFFF` text, `0.5rem` radius, subtle top-edge inner highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`). Hover shifts background to `#4F46E5` with an exterior indigo halo glow.
- **Secondary / Glass Button**: Translucent `#18181B` (80% opacity), 1px border `rgba(255, 255, 255, 0.1)`, `#FFFFFF` text. Hover increases border illumination to `rgba(99, 102, 241, 0.5)` and shifts fill to `#27272A`.
- **Ghost Action**: Unbordered, `#A1A1AA` text. On hover, reveals `#FFFFFF` with minimal zinc background tint.

### Pill Badges & Chips
- **Status Indicator**: Fully rounded capsule, `0.25rem 0.625rem` padding. Features an electric pulsating green or indigo 6px dot alongside `label-badge` uppercase typography. Fill: `rgba(99, 102, 241, 0.1)` with a 1px `rgba(99, 102, 241, 0.25)` outline.
- **Tech Stack Badges**: Monospaced tags with a subtle slate backing (`#18181B`), 1px border (`#27272A`), and `#A1A1AA` text, transitioning on hover to `#FFFFFF` and glowing border.

### Project & Repository Cards
- Surface composed of semi-translucent `#18181B` backed by a 20px blur filter. 1px border framed in `rgba(255, 255, 255, 0.07)`.
- Interactive state elevates surface via a 200ms ease curve, revealing an inner radial border glow that follows cursor coordinates, accompanied by a 15% opacity ambient indigo back-reflection.

### Input Fields & Terminal Emulators
- Fields carry an inset `#09090B` background with a crisp 1px `#27272A` boundary. Active focus yields an electric indigo outline (`#6366F1`) with zero offset and a 2px diffused outer ring `rgba(99, 102, 241, 0.25)`.
- Interactive terminal displays utilize `JetBrains Mono`, featuring an authentic top bar housing 3 status dots (`#27272A`, or muted red/yellow/green) with seamless command copy triggers.

### Checkboxes & Toggle Switches
- Checkbox squares (0.25rem radius) use `#18181B` resting fill and `#27272A` borders. Checked state snaps to `#6366F1` with an SVG tick in `#FFFFFF`.
- Switch toggles use capsule pills with an animated `#FFFFFF` knob moving across a dark slate to electric indigo track.