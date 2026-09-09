---
title: "TypeScript at Scale: Patterns That Survive"
description: "After five years of TypeScript in a million-line monorepo, here are the patterns that held up — and the ones that crumbled."
date: "2025-01-28"
author: "David Park"
tags:
  - TypeScript
  - Architecture
  - Engineering
featured: false
coverImage: "/images/covers/typescript.svg"
---

TypeScript is the rare technology that delivers exactly what it promises: catch bugs at compile time, document intent, and make refactoring safe. But the promise and the practice diverge at scale. A million-line codebase with three hundred contributors stresses every assumption you bring to the language.

## Branded types over primitives

The first pattern I'd institutionalize in any large TypeScript project: branded types for domain identifiers.

```typescript
type UserId = string & { readonly __brand: 'UserId' }
type OrderId = string & { readonly __brand: 'OrderId' }

function createUser(id: UserId) { /* ... */ }
createUser('abc123') // Error
createUser(order.id) // Error — OrderId ≠ UserId
```

A `string` is a `string` is a `string` — until it isn't. In a large system, `userId` and `orderId` are both strings, and the compiler will happily let you pass one where the other is expected. Branded types cost nothing at runtime (they're erased) and prevent an entire category of bugs.

## Exhaustive checking with `never`

The `never` type for exhaustive switch statements is underused:

```typescript
type Status = 'draft' | 'published' | 'archived'
function handleStatus(s: Status) {
  switch (s) {
    case 'draft': return prepareDraft()
    case 'published': return publish()
    case 'archived': return archive()
    default:
      const _exhaustive: never = s
      return _exhaustive
  }
}
```

Add a new status — `'scheduled'` — and the `never` assignment fails. The compiler tells you exactly where you need to add a case. In a codebase with hundreds of union types, this is indispensable.

## What crumbled

Not every pattern survived. Our attempt at a shared utility-type library became a dumping ground. Strict null checks, enabled mid-project, broke thousands of files and took six months to clean up — I'd enable them on day one for any new project. And `enum` in a library consumed by both ESM and CJS consumers caused enough bundling headaches that we migrated everything to const assertions with string unions.

TypeScript is a tool, not a religion. The patterns that survive at scale are the ones that reduce cognitive load, not add to it. If a type annotation needs a comment to explain what it does, the type is too clever.
