---
title: "Git rebase, explained for people who just want to get their PR merged"
description: "Rebasing is the most misunderstood tool in the Git toolbox. Here is what it actually does, when to use it, and why your team probably needs a policy."
date: 2025-01-06
author: "Soren Lindqvist"
tags:
  - Git
  - Workflow
  - Tools
featured: false
coverImage: ""
---

Every developer has a Git horror story. Mine involves a rebase gone wrong, a force-push to `main`, and a very patient senior engineer who spent an afternoon helping me recover the lost commits. I swore off rebasing for a year after that. It seemed like a dangerous power tool — useful in expert hands, catastrophic in mine.

I was wrong. Rebase is not dangerous. What is dangerous is not understanding what it does. Once you internalize the mental model, rebase becomes one of the most useful tools in your workflow. Here is that mental model.

## What rebase actually does

At its core, `git rebase` replays commits. It takes a sequence of commits and applies them, one by one, on top of a different base commit. The result is a linear history: no merge commits, no "branches" in the commit graph.

Imagine you have:

```
A---B---C  (main)
     \
      D---E  (feature)
```

You want to incorporate the changes from `main` into your feature branch. With `git merge main`, you get:

```
A---B---C---*
     \     /
      D---E
```

With `git rebase main`, you get:

```
A---B---C---D'---E'  (feature)
```

The key insight: `D'` and `E'` are _new commits_ with the same changes as `D` and `E`, but different parents. The original `D` and `E` still exist in Git's object database until garbage-collected, but your branch now points to the replayed versions.

## The golden rule — and why it exists

You have probably heard: "Never rebase commits that exist outside your local repository." The reasoning: rebasing rewrites commit history. If you rebase commits that you have already pushed, and then force-push the rewritten history, anyone who based work on the original commits will have a mess to untangle.

The practical rule: rebase is safe on branches that only you are working on. For shared branches, prefer merge. For your own feature branch before opening a pull request, rebase freely.

## Interactive rebase is the real superpower

`git rebase -i` opens an editor listing the commits in your branch, each prefixed with `pick`. You can change that prefix to:

- `reword` — change the commit message
- `squash` — combine this commit with the previous one
- `fixup` — like squash, but discard this commit's message
- `drop` — remove the commit entirely
- `edit` — pause at this commit to amend it
- `reorder` — just move the lines around

This lets you clean up a messy branch before sharing it. Squash the "fix typo" and "actually fix typo" commits into the commit they were fixing. Reorder commits so related changes are adjacent. Reword commit messages to describe _why_ rather than _what_. The result is a clean, logical history that is easy to review and easy to bisect later.

```bash
# Common pattern: squash the last 3 commits into one
git rebase -i HEAD~3
```

## When to use rebase vs merge

For integrating `main` into your feature branch: **rebase**. It keeps your branch up to date with `main` without creating merge commits that clutter your branch's history.

For integrating your feature branch into `main`: **merge** (usually with `--no-ff` to preserve the branch topology). The merge commit documents that a feature was integrated as a unit.

For cleaning up your branch before review: **interactive rebase**. A clean commit history makes review faster and more thorough. Reviewers can follow the logical progression of changes rather than wading through "fix" and "wip" commits.

## Recovering from a bad rebase

If a rebase goes wrong, `git rebase --abort` stops it and returns you to your original state. If the rebase completed but you want to undo it, `git reflog` shows every state your branch has been in. Find the entry from before the rebase and `git reset --hard` to that commit. Nothing is truly lost in Git; it is just hard to find.

## The bottom line

Rebase is not a power tool for experts. It is a core part of Git that every developer should understand. The mental model — replaying commits onto a new base — is simple once you internalize it. Interactive rebase is the single best way to produce a clean, reviewable commit history. And the golden rule — do not rewrite shared history — is all you need to keep yourself out of trouble.

Learn rebase. Your reviewers will thank you.
