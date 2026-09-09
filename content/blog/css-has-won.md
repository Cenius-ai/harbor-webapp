---
title: "CSS Has Won: Rethinking the Frontend Stack in 2025"
description: "Modern CSS has absorbed the problems we reached for JavaScript to solve. Here's what that means for how we build interfaces."
date: "2025-02-03"
author: "Mira Chen"
tags:
  - CSS
  - Frontend
  - Web Platform
featured: true
coverImage: "/images/covers/css-won.svg"
---

For the better part of a decade, the frontend industry operated under a quiet assumption: CSS wasn't enough. We needed JavaScript to manage state, to scope styles, to handle layout, to animate. We built elaborate toolchains — CSS-in-JS libraries, utility frameworks, component-scoped style systems — all to work around the language's perceived limitations.

Something shifted in the last three years. Not all at once, but steadily. CSS got good.

## The cascade, reconsidered

The cascade was the original sin we were trying to escape. It felt unpredictable. Styles leaked. Specificity wars broke out. Every team I joined had at least one developer who'd mutter "I hate CSS" while fighting a z-index battle.

But the cascade is also CSS's superpower. It's a design token system built into the platform — define a variable on `:root`, override it in a `.dark` class, and every element that references it updates automatically. No re-render. No prop drilling. No JavaScript at all.

With `@layer`, we finally have a way to control cascade priority explicitly. With `:has()`, we can style parents based on their children — a capability that previously required JavaScript or complex workarounds. Container queries let components adapt to their own size, not just the viewport.

## What we can let go of

The list of things we no longer need JavaScript for is striking. Modal dialog positioning? `dialog` element + `::backdrop`. Smooth scrolling? `scroll-behavior: smooth`. Responsive grids without media queries? `auto-fit` and `minmax`. View transitions between pages? The View Transitions API, now shipping in all major browsers.

This doesn't mean frameworks are obsolete. It means we can choose them for the right reasons: state management, routing, server rendering — not because CSS can't center a div.

## The stack I'm reaching for now

In 2025, my default stack is lighter. A server-rendered foundation (Nuxt, Next, or plain Astro). Tailwind for utility classes, but only where they genuinely save time — not as a replacement for understanding CSS. Custom properties for theming. One small animation library, if needed. That's often enough.

The web platform has matured. The tools we build on top of it should reflect that maturity — doing less, not more, and trusting the platform to handle the rest.
