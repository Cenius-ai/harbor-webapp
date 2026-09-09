---
title: "The Tao of testing: what to test, what not to test, and how to tell the difference"
description: "Testing is a skill, not a chore. The best test suites are small, fast, and focused on the boundaries where things actually break."
date: 2024-11-20
author: "Marcus Okonkwo"
tags:
  - Testing
  - Engineering
  - Quality
featured: false
coverImage: ""
---

I once joined a team with a test suite that took 47 minutes to run. Forty-seven minutes, on every push, blocking every PR. The suite had over four thousand tests. It covered every function, every branch, every edge case the original authors could imagine. It also contained hundreds of tests that had never failed — not once, in years of production use — and dozens that tested implementation details so tightly that any refactor required updating tests.

The team had internalized "write tests" as a moral imperative without ever asking: _what should we test, and why?_

## The purpose of testing

Tests serve three purposes, and it is worth being explicit about each:

1. **Prevent regressions.** When you change code, tests verify that existing behavior has not broken. This is the most common and most important purpose.

2. **Document behavior.** A well-written test describes what the code should do, in a language that is unambiguous and executable. Tests are living documentation.

3. **Enable refactoring.** A fast, reliable test suite gives you the confidence to improve the design of your code without fear of breaking it. Without tests, refactoring is gambling.

Notice what is not on this list: "achieving 100% code coverage." Coverage is a metric, not a goal. A codebase with 100% coverage and bad tests is worse than a codebase with 70% coverage and good ones, because the former creates a false sense of security.

## What to test

Test the things that are likely to break and painful when they do:

- **Business logic.** The calculations, transformations, and rules that define what your application _does_. If a billing system calculates the wrong amount, that is a serious problem. Test the calculation thoroughly.

- **API boundaries.** The interfaces between systems — REST endpoints, database queries, message queues — are where integration failures happen. Test that your API returns the expected shape for a given input, and that it handles errors gracefully.

- **Edge cases and invariants.** What happens when the input is empty? When the list is null? When the number is negative? The boundaries of your domain are where bugs cluster.

## What not to test

Do not test things that are unlikely to break or cheap to fix if they do:

- **Framework internals.** React knows how to render components. Express knows how to route requests. You do not need to verify that the framework works.

- **Trivial getters and setters.** A function that returns a property does not need a test. The test would be a tautology.

- **Implementation details.** Test _what_ the code does, not _how_ it does it. If you change the implementation without changing the behavior, the tests should still pass. If they do not, you are testing the wrong thing.

## A practical testing strategy

For most applications, a three-layer strategy works well:

**Unit tests** for business logic and pure functions. These should be fast (milliseconds each), numerous, and completely deterministic. No database, no network, no filesystem.

**Integration tests** for API endpoints and database queries. These verify that your code integrates correctly with its dependencies. They are slower than unit tests but faster than end-to-end tests.

**End-to-end tests** for critical user journeys. A handful of tests that walk through the most important flows — sign up, make a purchase, cancel a subscription. These are slow and flaky by nature, so keep them few and focused.

The ideal ratio varies by application, but a healthy test suite tends to be roughly 70% unit, 25% integration, and 5% end-to-end.

## The bottom line

Testing is a skill. A good test suite is small, fast, and focused on the boundaries where things actually break. A bad test suite is large, slow, and tests everything except what matters. The difference is not effort — it is judgment.

Before you write a test, ask: what would break if this code changed? What would the failure look like? Would this test catch it? If the answers are unclear, the test may not be worth writing. Focus your energy on the tests that pay rent.
