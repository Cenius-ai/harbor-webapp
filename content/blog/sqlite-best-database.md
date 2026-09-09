---
title: "Why SQLite is the best database for most applications you will ever build"
description: "Forget Postgres for a moment. The little embedded database that ships in your browser and phone is capable of far more than most developers realize."
date: 2025-02-18
author: "Marcus Okonkwo"
tags:
  - Databases
  - SQLite
  - Architecture
featured: true
coverImage: ""
---

SQLite is the most widely deployed database engine in the world. It runs on every iPhone, every Android device, every Chrome and Firefox browser, and inside countless embedded systems. It processes trillions of queries every day. And yet, most web developers treat it as a toy — something for unit tests and small side projects, not "real" production workloads.

That assumption is wrong. SQLite is not just capable of handling production workloads; for a large class of applications, it is the _best_ choice.

## The case for SQLite

SQLite has a fundamentally different architecture from client-server databases like Postgres or MySQL. There is no separate server process, no network protocol, and no connection pool. The database _is_ a file on disk, and your application links directly against the SQLite library. Queries are function calls, not network round-trips.

This has profound implications:

**Zero operational overhead.** No database server to provision, configure, monitor, upgrade, or back up separately from the application. The database file lives alongside your application code. Backups are file copies. Replication is file synchronization. For small to medium teams, this alone can justify the choice.

**Single-digit microsecond latency.** Without a network hop, simple queries complete in microseconds rather than milliseconds. For read-heavy workloads — the majority of web applications — this is transformative. A page that makes ten database queries behind the scenes sees those queries complete in under a millisecond total.

**Perfect consistency.** SQLite is single-writer by design, which means there is exactly one canonical state of the database at any moment. No replication lag, no eventual consistency, no stale reads. For applications that fit the single-writer model, this is a feature, not a limitation.

## "But what about concurrency?"

This is the first objection, and it is fair. SQLite has a single-writer design: only one connection can write at a time. Under heavy concurrent writes, this becomes a bottleneck.

But the question to ask is: does your application actually have heavy concurrent writes? Most web applications are read-heavy. A blog, a marketing site, a documentation platform, an analytics dashboard — these serve hundreds or thousands of reads per second, but writes are infrequent. SQLite handles read concurrency perfectly well.

And for the applications that do have concurrent write pressure, SQLite's WAL (Write-Ahead Logging) mode allows one writer and many readers to coexist without blocking. The writer does not block readers, and readers do not block the writer. This covers a surprisingly large class of use cases.

## The Litestream revolution

The biggest objection to SQLite in production has historically been durability in the face of server failure. If your database is a file on a single machine, and that machine dies, you lose data since the last backup.

Litestream changed this. It continuously streams SQLite WAL changes to an S3-compatible object store, providing point-in-time recovery with sub-second latency. If your server fails, you restore the database from the last replicated state and lose at most a second of writes. For most applications, that is an acceptable recovery point objective.

With Litestream, SQLite in production became not just viable but genuinely compelling.

## When SQLite is the right choice

SQLite excels for:

- **Single-server applications** that fit on one machine
- **Read-heavy workloads** with infrequent writes
- **Embedded or edge deployments** where operational simplicity matters
- **Development and testing** — a fast, zero-config database
- **Applications where data lives close to the user** — mobile, desktop, local-first web

It is less suitable for:

- **High-concurrency write workloads** — financial trading systems, real-time collaborative editing
- **Geographically distributed multi-writer scenarios** — where you need multiple servers writing simultaneously
- **Very large datasets** — while SQLite can handle terabytes, client-server databases have better tooling for managing data at that scale

## The bottom line

If you are building a web application that runs on a single server — and that describes the vast majority of the software most of us will ever build — SQLite is almost certainly sufficient. Add Litestream for durability, and you have a production-ready database with essentially zero operational burden.

The next time you reach for Postgres by default, pause and ask: does this application actually need a client-server database? Or would a file on disk serve just as well, with a fraction of the complexity?
