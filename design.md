# eOrdonnances — Design System & UI/UX Guide

> **Audience**: Senior Front‑End Engineers
>
> **Goal**: Enable consistent, cohesive implementation of a Nintendo‑inspired UI/UX adapted to a serious medical product.

---

## 0. Purpose & Scope

### Why this document exists

This document defines the **design rules, constraints, and intent** behind eOrdonnances’ UI. It exists to:

* Prevent subjective or taste‑driven UI decisions
* Enable multiple engineers to ship UI that feels *one product*
* Encode visual + interaction decisions so they scale without degradation

This is **not** a marketing brand book. It is an **execution guide**.

### What this design governs

Applies to:

* Web app UI (desktop + tablet first, mobile adaptive)
* Core flows: search, browse, preview, select, and export prescriptions
* All reusable components and layouts

Does **not** apply to:

* External marketing pages
* PDFs / printed prescriptions (separate constraints)

---

## 1. Design Philosophy

### Non‑negotiable principles

1. **Clarity beats expressiveness**
   A junior doctor under time pressure should never decode UI intent.

2. **State is always visible**
   If something changes, the UI must *show* it (color, position, motion).

3. **Friendly ≠ childish**
   The aesthetic is playful, the behavior is professional.

4. **Consistency compounds trust**
   Familiar patterns reduce perceived risk in a medical context.

### Core values

* Reduce cognitive load before adding features
* Prefer boring consistency over expressive novelty
* Motion exists to explain state change, not decorate
* Color communicates meaning before beauty

### Explicit tradeoffs

* We accept slightly more UI chrome for clarity
* We accept fewer layout variations for predictability
* We accept limited theming flexibility to preserve cohesion

### What “good” looks like

* A doctor can use the app without instruction
* UI feels calm, responsive, and reassuring
* Nothing surprises; everything responds

---

## 2. Brand Personality & Tone

### Emotional character

* **Calm**: no aggressive contrast, no jittery motion
* **Confident**: clear hierarchy, decisive actions
* **Approachable**: rounded shapes, friendly colors

Think: *Nintendo menus*, not arcade games.

### Voice alignment (UI copy implication)

* Short, direct labels
* Neutral medical language
* No jokes, no slang

### What the brand is not

* Not minimalistic to the point of ambiguity
* Not hyper‑serious or sterile
* Not trendy, flashy, or experimental

### This informs

* Medium‑high color saturation (never neon)
* Soft easing curves
* Predictable interaction timing
* Generous spacing

---

## 3. Visual Identity

### 3.1 Color System

#### Philosophy

Colors are **roles**, not decorations. Never use raw hex values in components.

#### Color roles

* **Primary**: main actions, selection, focus
* **Secondary**: supporting actions
* **Surface**: cards, panels, backgrounds
* **Accent**: highlights, badges (used sparingly)

#### Semantic colors

* Success: confirmation, completion
* Warning: reversible risk
* Error: blocking issues
* Info: neutral system feedback

#### Contrast rules

* Body text: WCAG AA minimum
* Interactive text: AA minimum
* Critical actions: AAA preferred

#### Breaking color rules

Allowed **only** when:

* Reinforcing medical urgency
* Highlighting irreversible actions

Must be documented per instance.

---

### 3.2 Typography

#### Font families

* Primary: Humanist sans‑serif (readable, friendly)
* Fallback: system UI fonts

#### Type scale

* Small: metadata, hints
* Base: body text (default)
* Medium: labels, section headers
* Large: page titles

Scale exists to signal hierarchy, not style.

#### Line height

* Body text: generous (comfort over density)
* Labels: tighter, but readable

#### When text should NOT be styled

* Medical terminology
* Drug names
* Dosage instructions

These must remain neutral and legible.

---

### 3.3 Layout & Spacing

#### Layout system

* Card‑based composition
* Clear separation between regions
* No edge‑to‑edge dense layouts

#### Spacing scale

* XS / S / M / L / XL
* Always use scale values

#### Density philosophy

* Default: comfortable
* Compact: opt‑in only (tables, power users)

#### Edge padding rules

* Pages always breathe
* No content touches viewport edges

---

## 4. Design Tokens (Conceptual)

### Single source of truth

All visual decisions must map to tokens.

### Token categories

* Color
* Spacing
* Radius
* Typography
* Motion
* Elevation

### Naming conventions

* Semantic > visual
* `color.action.primary`
* `space.md`

### Rules for adding tokens

* Must solve more than one case
* Must be reviewed
* Must not duplicate intent

### Never hard‑code

* Colors
* Border radius
* Animation duration

---

## 5. Components & Patterns

### 5.1 Component Philosophy

* Compose small primitives
* Avoid one‑off components
* Prefer extension over duplication

Create a new component only if:

* It represents a new intent
* It will be reused

Do not create components for layout convenience alone.

---

### 5.2 Core Components

#### Buttons

* Purpose: trigger actions
* States: default, hover, pressed, disabled, loading
* Accessibility: focus ring always visible
* Misuse: buttons as navigation links

#### Cards

* Purpose: group related information
* States: default, selected, disabled
* Misuse: nesting too deeply

#### Inputs

* Purpose: structured data entry
* States: empty, filled, error, disabled
* Error messages must be explicit

(Extend similarly for dropdowns, lists, modals.)

---

### 5.3 Interaction Patterns

#### Forms

* One primary action per form
* Errors inline, never hidden

#### Navigation

* Location always visible
* No hidden critical routes

#### Empty states

* Explain why it’s empty
* Suggest next action

#### Loading

* Skeletons over spinners
* Preserve layout stability

#### Errors

* Human explanation
* Clear recovery path

---

## 6. Motion & Animation

### Motion principles

* Fast but gentle
* Purposeful only
* Never distract

### Durations

* Micro‑interactions: short
* Layout transitions: medium
* Page transitions: rare

### Forbidden animation

* Infinite motion without intent
* Decorative looping
* Motion that blocks interaction

### Performance

* 60fps target
* No layout thrashing

---

## 7. Accessibility Baseline

### Minimum guarantees

* Full keyboard navigation
* Logical focus order
* Visible focus styles

### Color

* Never rely on color alone

### Reduced motion

* Respect system preference
* Disable non‑essential animation

---

## 8. Responsive & Adaptive Design

### Breakpoint philosophy

* Design desktop first
* Collapse progressively

### Mobile vs desktop

* Same information
* Different layout priority

### Touch vs pointer

* Larger hit targets on touch

### Must never disappear

* Primary actions
* Patient safety information

---

## 9. Anti‑Patterns

Explicitly disallowed:

* Over‑styled UI chrome
* Inconsistent spacing hacks
* Animation for decoration
* Hidden critical actions
* One‑off visual exceptions

If it feels clever, it’s probably wrong.

---

## 10. Evolution & Governance

### Change process

* Proposed via design review
* Documented with rationale

### Approval

* Design owner + engineering lead

### Backward compatibility

* Breaking changes discouraged
* Migrations documented

### When consistency may break

* Regulatory requirements
* Patient safety
* Accessibility compliance

Consistency serves trust — break it only when trust is at risk.

# eOrdonnances — Concrete UI Patterns (Nintendo‑Inspired)

This document translates inspiration from **Nintendo system & Pokémon UIs** into **explicit, reusable UI decisions** for eOrdonnances.

This is not moodboard material. These are **patterns to follow**.

---



## 1. Global Screen Structure

### Pattern: “Safe Centered World”

**Inspired by:** Pokémon menu screens, Nintendo Switch system UI

**Rules**

* Content lives in a centered column or panel
* Background is visually active but *non-informative*
* Primary interaction zone is clearly bounded

**Why**

* Creates psychological safety
* Reduces edge anxiety
* Focuses attention inward

**Apply to**

* Search screens
* Prescription preview
* Confirmation flows

---

## 2. Card System (Primary Building Block)

### Pattern: Rounded Information Cards

**Inspired by:** Pokémon party screens, inventory menus

**Design Choices**

* Medium border radius (friendly, not bubbly)
* Soft elevation or outline (never both)
* Clear internal padding

**Card Anatomy**

1. Header (context)
2. Content (information)
3. Optional footer (action)

**Rules**

* One main intent per card
* Never nest cards more than one level
* Cards never scroll internally

**Apply to**

* Disease results
* Prescription templates
* Patient summaries

---

## 3. Primary Action System

### Pattern: Singular Clear Action

**Inspired by:** “A button = proceed” Nintendo logic

**Design Choices**

* One visually dominant primary button per screen
* Secondary actions visually quieter

**Rules**

* Primary action placed bottom-right or bottom-center of main panel
* Never compete with another action

**Examples**

* “Add prescription”
* “Confirm & export”

---

## 4. Selection & Focus Feedback

### Pattern: Obvious Selection State

**Inspired by:** Pokémon party highlight, menu cursor glow

**Design Choices**

* Selected item has:

  * Background color shift
  * Slight scale or elevation change
  * Optional subtle glow

**Rules**

* Selection must be visible without color alone
* Hover ≠ selected

**Apply to**

* Search results
* Prescription lists
* Option pickers

---

## 5. Navigation Model

### Pattern: Mode-Based Navigation

**Inspired by:** Pokémon tabs / Nintendo app launcher

**Design Choices**

* Flat top or side navigation
* Clear current mode indicator
* No deep nesting

**Rules**

* Navigation items represent modes, not actions
* Current mode always highlighted

**Example Modes**

* Search
* Saved
* Recent
* Settings

---

## 6. Status & Feedback Language

### Pattern: Calm System Feedback

**Inspired by:** Pokémon text boxes, save confirmations

**Design Choices**

* Rounded notification containers
* Soft entrance motion
* Neutral language

**Rules**

* No aggressive colors
* No alarmist phrasing unless blocking

**Examples**

* “Prescription added successfully”
* “Some fields need attention”

---

## 7. Loading & Progress

### Pattern: Stable Skeletons

**Inspired by:** Pokémon stat screens loading seamlessly

**Design Choices**

* Skeletons mirror final layout
* No spinners for primary content

**Rules**

* Layout never jumps
* Loading feels intentional, not empty

---

## 8. Motion System

### Pattern: Soft State Transitions

**Inspired by:** Menu transitions in Pokémon

**Design Choices**

* Ease-in-out curves
* Short, consistent durations

**Rules**

* Motion only on state change
* No continuous animation

**Examples**

* Card selection
* Modal open/close

---

## 9. Empty States

### Pattern: Guided Stillness

**Inspired by:** Pokémon empty boxes / initial states

**Design Choices**

* Calm illustration or icon
* Clear explanation
* One suggested action

**Rules**

* Never joke
* Never shame user

**Example**

> “No prescriptions saved yet. Start by searching for a condition.”

---

## 10. Error Handling

### Pattern: Friendly Precision

**Inspired by:** Pokémon battle errors (“It failed!” — but calmer)

**Design Choices**

* Inline errors near source
* Soft color usage

**Rules**

* Explain what to fix
* Never blame the user

---

## 11. Visual Do / Don’t Summary

### Do

* Round corners consistently
* Use spacing generously
* Make selection obvious
* Keep one main action

### Don’t

* Use sharp, aggressive shapes
* Hide critical actions
* Over-animate
* Overload screens

---

## Final Mental Model

> **Nintendo UIs feel good because they are forgiving, predictable, and kind.**

eOrdonnances should feel the same —
not playful, but **supportive under pressure**.

If a UI choice reduces anxiety, it’s probably correct.
