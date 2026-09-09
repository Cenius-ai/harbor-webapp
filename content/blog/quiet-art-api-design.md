---
title: "The quiet art of API design: why your REST endpoints still matter"
description: "GraphQL, tRPC, gRPC — each new protocol promises to fix what REST got wrong. But good API design has never been about the transport. It is about modeling resources with clarity and restraint."
date: 2025-02-03
author: "Marcus Okonkwo"
tags:
  - API Design
  - REST
  - Backend
featured: true
coverImage: ""
---

Every few years, a new API protocol arrives with a compelling pitch. GraphQL promised to eliminate over-fetching. gRPC offered high-performance binary serialization. tRPC brought end-to-end type safety. Each of these is genuinely useful in the right context. But the conversation tends to focus on the protocol — as if choosing the right transport is the hard part of API design.

It is not. The hard part is modeling resources well: naming things, scoping data, handling errors consistently, and designing for evolution without breaking existing clients. Those challenges are orthogonal to whether you send JSON over HTTP or Protocol Buffers over HTTP/2.

## What makes an API "good"

A good API feels obvious in retrospect. The resource names match the domain vocabulary. The response shapes are predictable. Errors tell you what went wrong and how to fix it. Authentication and authorization are consistent across every endpoint. Versioning is either handled transparently or signalled clearly.

None of this requires a particular protocol. I have seen exquisite REST APIs and terrible GraphQL ones. The difference was never the transport. It was the care the team put into understanding their domain and modeling it honestly.

## Naming is the hardest problem

There is an old joke that the two hardest problems in computer science are cache invalidation, naming things, and off-by-one errors. Naming deserves its place on that list. In API design, every endpoint, every field, every query parameter is a name that clients will depend on — potentially forever.

A few principles I have found reliable:

**Use the domain's language.** If your users call something a "shipment," your endpoint should be `/shipments`, not `/fulfillment-orders`. Consistency with the business vocabulary reduces the cognitive load for everyone who touches the API.

**Prefer plural nouns for collections.** `/customers`, `/invoices`, `/orders`. It is a small convention, but conventions matter when you have hundreds of resources across dozens of services.

**Nest resources where the relationship is compositional.** An invoice line item does not exist independently of its invoice, so `/invoices/{id}/line-items` makes sense. But a customer exists independently of their orders, so `/customers/{id}/orders` is a relationship — not a composition — and should be designed with that distinction in mind.

**Avoid verbs in URLs.** The HTTP method already communicates the action. `POST /orders` creates an order; `GET /orders/{id}` retrieves it. A `/create-order` endpoint is a sign that the design needs another pass.

## Error responses are part of the contract

Every API has a happy path. The unhappy paths are where the design earns its keep. A good error response includes:

- A machine-readable error code (`invalid_address`, `insufficient_inventory`)
- A human-readable message that suggests a remedy
- A reference to the specific field or parameter that failed
- A unique request ID for debugging

Clients should never have to parse error messages to determine what happened. Error codes are the contract; messages are for humans reading logs.

## Evolving without breaking

The single most important decision in API design is how you handle change. Semantic versioning in the URL (`/v1/`, `/v2/`) is the most explicit approach and the easiest for clients to reason about. But it commits you to maintaining multiple versions concurrently.

An alternative — and my preference for internal APIs — is to design for additive change from the start. New fields are always safe to add. New endpoints are always safe to add. New optional parameters are safe. The contract is: we will never remove a field or change its meaning without a new major version.

This requires discipline. It means thinking carefully about every field you expose, because you may be supporting it for years. But the payoff is that clients never break unexpectedly, and the API can evolve without the overhead of parallel version maintenance.

## The protocol is secondary

GraphQL is excellent when clients need to shape their own queries and the data graph is complex. gRPC shines in high-throughput service-to-service communication. tRPC is delightful in a monorepo where client and server share TypeScript definitions. REST remains the simplest, most widely understood, and most cacheable option for public APIs.

But all of them still require you to name things, model resources, handle errors, and plan for change. That work — the quiet, careful work of understanding a domain and expressing it in a stable interface — is what makes an API good. Everything else is implementation detail.
