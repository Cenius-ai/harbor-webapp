---
title: "Git History Tells Stories: How to Write Commits That Age Well"
description: "Your commit history is a narrative that your teammates — and your future self — will read months later. Here's how to make it worth reading."
date: "2024-10-18"
author: "David Park"
tags:
  - Git
  - Collaboration
  - Craft
featured: false
coverImage: "/images/covers/git-history.svg"
---

Six months from now, you'll `git blame` a line of code and find a commit message that says "fix stuff." You'll sigh, close the terminal, and spend twenty minutes reconstructing what the original author was thinking. That author might even be you.

## The commit message as a document

A good commit message answers three questions: what changed, why it changed, and (if non-obvious) how. The "what" goes in the subject line. The "why" and "how" go in the body. That's it. But the discipline of answering those three questions transforms your history from a log of arbitrary snapshots into a narrative.

```
Stop caching user permissions indefinitely

Previously, we cached permissions for the lifetime of the session,
which meant users who had their roles changed in the admin panel
wouldn't see the updated permissions until they logged out and back in.

We now invalidate the cache on any write to the permissions table and
re-fetch on the next request.
```

This message tells me everything I need to know if I encounter this commit during a bisect, a blame, or a code review six months later.

## The size of a good commit

A commit should be one logical change. Not one file, not one function — one *idea*. A bug fix with a test. A refactoring that moves a function between files. A feature addition with its documentation.

The test for whether a commit is the right size: can you describe it in a single sentence without using the word "and"? If not, split it. Small, focused commits are easier to review, easier to revert, and easier to understand in isolation.

## Rebase with care

I rebase my feature branches before merging. A clean, linear history is easier to follow than a tangle of merge commits. But I never rebase shared branches — rewriting history that others have based work on is a recipe for confusion and duplicated effort.

The rule of thumb: rebase your own work freely. Never rebase `main`. Never rebase a branch you've pushed and others have pulled. And if you're unsure whether someone has pulled your branch, ask before you rebase.

## What the history should feel like

A well-maintained Git history reads like a clean narrative. Each commit is a small, coherent step toward a goal. The messages explain the reasoning, not just the mechanics. A new team member can walk through the history of a feature and understand not just what was built, but why each decision was made.

The best time to start writing good commits was the first commit. The second-best time is the next one.
