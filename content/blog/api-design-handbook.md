---
title: "The API Design Handbook Nobody Gave You"
description: "Designing an API that doesn't make your future self curse your name. Six principles drawn from years of maintaining public and internal APIs."
date: "2024-11-22"
author: "Mira Chen"
tags:
  - API Design
  - Backend
  - Architecture
featured: true
coverImage: "/images/covers/api-design.svg"
---

There's a particular kind of dread that comes from maintaining an API you designed two years ago. The endpoint names that seemed clever at the time. The response shape that made sense for exactly one use case. The pagination scheme that your mobile team can't work with. I've felt that dread enough times to start writing down what I've learned.

## Principle 1: Resources, not RPC

The most durable APIs model resources, not actions. `GET /articles` is a resource. `POST /publish-article` is an action dressed as an endpoint. The resource model gives you a stable vocabulary that survives feature changes. Publishing becomes updating a `status` field on the article resource — no new endpoint needed.

This isn't REST dogmatism. It's an observation about what ages well. Resource-oriented APIs are easier to document, easier to cache, easier to secure, and easier to extend.

## Principle 2: Paginate everything, from day one

Every list endpoint should be paginated. Not "when we need it." Not "when the dataset gets large." From the very first commit. Adding pagination later means breaking every client that assumed the full list would always fit in a single response.

Cursor-based pagination (`?after=abc123`) beats offset-based (`?page=3`) for any dataset that changes. Offsets drift when rows are inserted or deleted between requests. Cursors are stable pointers.

## Principle 3: The response shape is your contract

Never expose your database schema directly. The JSON your API returns is a contract between you and every client that will ever consume it. Naming matters. Nesting depth matters. Whether `null` means "not set" or "not applicable" matters.

I use a simple rule: if renaming a database column would change your API response, you've coupled them too tightly. Add a mapping layer. It's a few lines of code today and years of flexibility tomorrow.

## Principle 4: Errors should be machine-readable

A `500` status with an HTML body saying "Internal Server Error" is worse than useless — it's misleading. Every error response should include a machine-readable code, a human-readable message, and (in development) enough detail to diagnose the problem.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request body contains invalid fields.",
    "details": [
      { "field": "email", "issue": "Invalid email format" }
    ]
  }
}
```

## Principle 5: Version with care

API versioning is a last resort, not a first principle. Every version you support multiplies your maintenance burden. Prefer additive changes over breaking changes. Prefer deprecation periods over hard cutoffs. When you must break, do it with a clear migration path and a communicated timeline.

## Principle 6: Write the documentation first

Before you write a single handler, write the documentation. If you can't explain the endpoint clearly in prose, the design isn't right. Documentation-first design exposes awkward abstractions, inconsistent naming, and missing use cases before they're baked into code.

A well-designed API feels inevitable in retrospect. Every endpoint, every field, every error code seems like the only possible choice. Getting there takes the discipline to treat API design as a craft — not an afterthought.
