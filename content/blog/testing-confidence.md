---
title: "Testing Is a Confidence Game"
description: "We don't write tests to find bugs. We write them to gain the confidence to change things. That distinction changes everything."
date: "2024-12-10"
author: "R. Okafor"
tags:
  - Testing
  - Craft
  - Engineering Culture
featured: false
coverImage: "/images/covers/testing.svg"
---

Walk into any engineering organization and ask about testing. You'll hear about coverage percentages, about whether integration tests are better than unit tests, about the right mocking library. What you'll rarely hear is the word "confidence."

## The real goal

Tests don't find bugs — not directly. Bugs are found by humans: the developer who writes a test before the implementation and watches it go green, the reviewer who spots an edge case in a diff, the on-call engineer who traces a production error back to a missing assertion. Tests are the scaffolding that makes those discoveries possible.

The value of a test suite is the confidence it gives you to change things. Can I upgrade this dependency without manually verifying every feature? Can I refactor this module and know within seconds if I broke something? Can a new team member ship code on their first day without fear?

## The testing trophy

Kent C. Dodds's "testing trophy" model — static analysis at the base, then unit tests, then integration tests, with a thin layer of end-to-end tests at the top — has held up remarkably well. But the crucial insight isn't the shape. It's that you should invest proportionally to the confidence each layer provides.

A single integration test that exercises a full API endpoint — request, authentication, business logic, database query, response — gives you more confidence than twenty unit tests mocking every dependency. And a single end-to-end test that clicks through the actual UI gives you confidence that all the pieces actually work together.

## What I've stopped doing

I no longer test implementation details. If a test breaks every time I refactor the internals of a component, the test is too coupled to the implementation. I test behavior — given this input, I expect this output or this side effect.

I no longer aim for 100% coverage. Coverage is a metric, not a goal. Some code (thin wiring, framework glue, generated types) doesn't benefit from dedicated tests. The energy is better spent on the critical paths.

I no longer mock by default. Mocks create a parallel universe where everything works perfectly — until it doesn't, and the tests pass anyway. I reach for real implementations first, fakes second, and mocks only when both are impractical.

Testing is a practice, not a checkbox. The goal isn't a green pipeline. The goal is the confidence to ship on Friday afternoon and sleep through the weekend.
