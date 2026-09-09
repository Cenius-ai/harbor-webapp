---
title: "On technical debt: what it really costs and when to pay it down"
description: "Not all technical debt is created equal. Some of it is a smart investment; some of it is compound interest working against you. Here is how to tell the difference."
date: 2024-12-10
author: "Soren Lindqvist"
tags:
  - Engineering
  - Teams
  - Process
featured: false
coverImage: ""
---

The metaphor of technical debt has been so thoroughly absorbed into software culture that we rarely examine what it actually means. We use it to describe everything from a poorly-named variable to a million-line monolith that resists every attempt at change. That range is too broad to be useful. If everything is technical debt, nothing is.

Ward Cunningham originally coined the metaphor to describe a specific trade-off: shipping code that does not yet reflect your current understanding of the problem, in order to learn faster. The "debt" was the gap between the code as written and the code as it should be, given what you now know. Crucially, this kind of debt was _intentional_ and _temporary_. You took it on to accelerate learning, and you paid it down once the learning stabilized.

That is not how most teams use the term today.

## Three kinds of technical debt

I find it useful to distinguish three categories:

**Strategic debt** is intentional and time-bound. You choose a simpler implementation — a monolithic service instead of microservices, a hand-rolled queue instead of Kafka — because you need to validate the product before investing in scalable infrastructure. You document the trade-off, set a review date, and revisit the decision before it calcifies. Strategic debt is an investment.

**Accidental debt** is unintentional but inevitable. Every codebase accumulates cruft: modules that should be split, abstractions that turned out wrong, dependencies that are now outdated. This is the friction of learning and changing requirements. It cannot be avoided entirely, but it can be managed through regular refactoring and a culture that values code review.

**Negligent debt** is the dangerous kind. It grows when teams consistently choose expedience over quality, skip code review, ignore failing tests, and defer documentation indefinitely. Negligent debt compounds. Each shortcut makes the next one more likely, because the code is harder to understand and harder to change. Eventually, velocity drops to zero, and the only option is a rewrite.

## The cost is not just engineering

When people talk about technical debt, they usually focus on engineering velocity: how fast can the team ship features? But the real cost is broader.

**Hiring and retention.** Good engineers leave teams that consistently accumulate negligent debt. They know that the codebase is a liability on their resume — experience maintaining a tangled monolith is not as marketable as experience building clean systems. The best people have options, and they exercise them.

**Business risk.** A codebase with high accidental or negligent debt is fragile. Small changes cause unexpected failures. Outages become common. The system becomes impossible to reason about, so every deployment is an act of faith. This is not just an engineering problem; it is a business continuity problem.

**Product stagnation.** When velocity drops, the product stops improving. Competitors ship features faster. Customers notice. The debt that seemed like a shortcut six months ago has become a barrier to the very growth it was meant to enable.

## When to pay it down

The calculus for paying down technical debt is straightforward but easy to ignore:

Pay it down when the cost of the debt — in slower velocity, more bugs, and lower morale — exceeds the cost of paying it. This sounds obvious, but the costs are often invisible because they are distributed: a little slowdown on every feature, a little extra debugging on every bug report. The cumulative effect is enormous, but no single instance feels like a crisis.

A practical approach: track "friction" metrics. How long does it take to ship a typical feature? How many bugs are introduced per release? How much time does the team spend on firefighting versus feature work? When these metrics trend in the wrong direction, debt is the likely cause.

Then, allocate a consistent percentage of each cycle to debt reduction — 20% is a common starting point. This is not a "cleanup sprint" that gets postponed indefinitely. It is a standing investment, like paying the minimum on a credit card. Without it, the interest accumulates.

## The bottom line

Technical debt is a financial metaphor, and like most financial metaphors, it works best when you treat it quantitatively. Not all debt is bad. Strategic debt accelerates learning. Accidental debt is the cost of doing business. Negligent debt is the one that kills you.

The teams I admire treat debt as a board-level concern, not an engineering complaint. They track it, budget for it, and pay it down steadily. They ship fast _and_ keep the codebase healthy — not because they are superhuman, but because they understand that velocity and quality are two sides of the same coin.
