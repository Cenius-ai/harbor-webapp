---
title: "Accessibility is not an edge case: building interfaces that work for everyone"
description: "One billion people worldwide live with some form of disability. Designing for accessibility is not a niche concern — it is a fundamental responsibility of building for the web."
date: 2025-02-25
author: "Elena Vasquez"
tags:
  - Accessibility
  - Frontend
  - Design
featured: false
coverImage: ""
---

I failed my first accessibility audit. It was not close. A screen reader user tried to navigate a dashboard I had built, and within thirty seconds she was stuck — a critical form control had no label, the chart data was invisible to assistive technology, and the modal dialog trapped keyboard focus in a loop. She could not complete the task. I had shipped a product that was literally unusable for a significant fraction of its intended audience.

That failure changed how I build software. Here is what I learned.

## The scale of the issue

The World Health Organization estimates that over one billion people — about 15% of the world's population — live with some form of disability. This includes visual impairments, hearing loss, motor disabilities, cognitive differences, and temporary or situational impairments. Someone with a broken arm, someone holding a baby, someone in bright sunlight — these are accessibility use cases too.

If your application does not work for these users, you are not building for "everyone." You are building for a subset, and a shrinking one — the global population is aging, and disability rates increase with age.

## The fundamentals

Accessibility is not a feature. It is a quality attribute, like performance or security. You do not "add accessibility" at the end of a project any more than you "add security" after a breach. It must be built in from the start.

The Web Content Accessibility Guidelines (WCAG) 2.2 provide a concrete standard. Level AA is the generally accepted target for most applications. The guidelines are organized around four principles — content must be Perceivable, Operable, Understandable, and Robust (POUR) — but in practice, a handful of patterns cover most issues:

**Semantic HTML is the foundation.** A `<button>` is focusable, keyboard-operable, and announced by screen readers. A `<div onclick="...">` is none of those things. Use real interactive elements. Use headings in order. Use `<nav>` and `<main>` and `<form>`. The browser gives you accessible behavior for free if you use the right elements.

**Every interactive element needs an accessible name.** Images need `alt` text (or `alt=""` if purely decorative). Form inputs need `<label>` elements or `aria-label`. Icon buttons — think a hamburger menu, a close X, a search magnifying glass — need labels that describe their action, not their appearance.

**Everything must work with a keyboard.** Tab through your application. Can you reach every interactive element? Is there a visible focus indicator? Can you activate buttons with Enter, toggle checkboxes with Space, close modals with Escape? If not, you have work to do.

**Color is never the only signal.** Error states, success states, and data visualizations must communicate information through more than color alone. Add icons, text labels, or patterns. An estimated 300 million people worldwide have some form of color vision deficiency.

## The tools

A screen reader is the single most valuable accessibility testing tool. VoiceOver is built into macOS; NVDA is free for Windows. Spend an hour navigating your application with the screen reader and a keyboard. The experience will teach you more than any checklist.

Automated tools — Lighthouse, axe, WAVE — catch about 30% of accessibility issues. They are necessary but insufficient. Manual testing, ideally with actual users of assistive technology, is irreplaceable.

## The bottom line

Accessibility is not an edge case. It is not a compliance checkbox. It is the baseline expectation of a web that works for everyone. The guidelines are clear, the tools are available, and the patterns are well-established. The only remaining barrier is the will to prioritize it.

Start with semantic HTML. Add keyboard support. Test with a screen reader. You will be surprised how much better your product becomes — not just for users with disabilities, but for everyone.
