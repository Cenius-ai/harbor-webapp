---
title: "How TypeScript's type system rewired the way I think about software"
description: "A decade of JavaScript, then TypeScript came along and changed everything. Here's how gradual typing reshaped my approach to designing maintainable systems."
date: 2025-01-15
author: "Elena Vasquez"
tags:
  - TypeScript
  - JavaScript
  - Software Design
featured: true
coverImage: ""
---

It started with a compiler error that stopped me cold. I had been writing JavaScript for ten years — servers, SPAs, tooling — and I thought I understood my code. Then I added TypeScript to a modest Express API, and the compiler told me a function I had been calling with three arguments for two years actually only accepted two. The third argument, a configuration object I had "always" passed, was being silently swallowed. The code had never worked the way I believed it did.

That was the moment I realized: I had been reasoning about my code through documentation, convention, and habit — none of which kept pace with the reality of what the machine actually executed.

## Before types: the tacit knowledge problem

In a dynamic language, knowledge about a codebase is largely tacit. It lives in developers' heads, in pull-request review checklists, in tribal conventions passed around the team. You know that `getUser()` returns an object with an `email` property because you wrote it, or because someone told you, or because you traced through three files and confirmed it. But the machine doesn't enforce it, and nothing stops a new teammate from passing the wrong shape.

This works fine on a small team with low turnover. It stops working the moment the team grows, or the codebase ages, or the original authors leave. I have inherited projects where the only reliable documentation was the git blame on a particular line, and the person who wrote it had left the company two years earlier.

TypeScript makes tacit knowledge explicit and machine-enforceable. A function's signature becomes a contract. A data structure becomes a schema. The compiler becomes the institutional memory that outlasts any individual developer.

## The shift in design thinking

What surprised me most was not that types catch bugs — that part is well-advertised. The deeper change was in how I _designed_ software. With types, I started thinking about data flow before I wrote a single line of implementation. I would model the domain:

```typescript
interface Invoice {
  id: string
  customerId: string
  lineItems: LineItem[]
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  issuedAt: Date
  dueAt: Date
}

interface LineItem {
  description: string
  quantity: number
  unitPriceCents: number
}
```

That interface is not just documentation. It forces me to decide: can an invoice be partially paid? What happens when a line item is removed? The types surface edge cases that I would have deferred — and later regretted — in a dynamically-typed codebase.

The type system becomes a design tool, not a constraint. It is the fastest way I know to sketch a domain model and get immediate feedback about its coherence.

## Gradual adoption is underrated

TypeScript's greatest strength is that it is optional and incremental. You do not have to rewrite a million-line codebase to benefit from it. Add a `tsconfig.json` with `strict: false`, rename a few files to `.ts`, and start adding types where they provide the most value: API boundaries, shared data structures, complex state machines.

I have migrated three production codebases this way. Each time, the team was nervous about the overhead. Each time, the overhead turned out to be modest — and the bugs we caught in the first week alone justified the effort.

## A few things I wish I had known

First, `strict: true` is worth it, but perhaps not on day one. Enable it once the team is comfortable and the critical paths are typed. The stricter checks (`noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`) each prevent entire categories of runtime errors.

Second, prefer `interface` over `type` for object shapes — the error messages are better, and declaration merging can be useful for augmenting external types. Use `type` for unions, intersections, and mapped types.

Third, invest in a good `tsconfig` early. A poorly configured TypeScript project is worse than no TypeScript at all: it gives a false sense of safety. Use `@tsconfig/strictest` as a starting point and relax only what you must.

Fourth, branded types (`type UserId = string & { readonly __brand: unique symbol }`) are a lightweight way to prevent mixing up IDs of different entities. This alone has prevented bugs in every codebase I have applied it to.

## The bottom line

TypeScript rewired my relationship with my own code. It turned a fuzzy, habit-driven understanding into an explicit, verifiable one. It made me a more deliberate designer. And it made my teams faster — not slower — because we spend less time debugging mysteries and more time building features.

If you are on the fence: add types to one module, one API, one shared library. Watch what happens. You may find, as I did, that you cannot go back.
