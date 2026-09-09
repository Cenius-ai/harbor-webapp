---
title: "Docker for Developers Who Just Want to Ship"
description: "A practical, no-nonsense guide to containerizing your application without getting lost in the Docker ecosystem."
date: "2024-08-14"
author: "Mira Chen"
tags:
  - Docker
  - DevOps
  - Deployment
featured: false
coverImage: "/images/covers/docker.svg"
---

Docker can feel like a universe. Swarm, Compose, Kubernetes, registries, multi-stage builds, layer caching, networking drivers — it's easy to drown before you've even shipped your first container. But for most developers, you need about ten percent of what Docker offers. Here's that ten percent.

## The Dockerfile that works

A production Dockerfile for a Node.js application doesn't need to be complicated:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.output /app/.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

Multi-stage builds keep your final image small. The build stage has all the dev dependencies and toolchain. The production stage copies only the built output. The result is an image that's fast to pull, fast to start, and has a smaller attack surface.

## Environment variables, not config files

Configuration that changes between environments should live in environment variables, not files baked into the image. The same image should run in staging and production — only the environment variables differ.

```bash
docker run -e DATABASE_URL="postgres://..." -e PORT=3000 my-app
```

This pattern, called "build once, run anywhere," is the single most important principle in containerized deployment. It means your staging environment actually tests the same artifact that goes to production.

## Don't run as root

By default, processes inside a Docker container run as root. If an attacker compromises your application, they have root access inside the container — and potentially on the host, depending on your configuration. Add a non-root user:

```dockerfile
RUN addgroup -S app && adduser -S app -G app
USER app
```

## Health checks matter

A container that's running isn't necessarily healthy. A health check tells Docker (and your orchestrator) whether your application is actually ready to serve traffic. Read the port from the `PORT` environment variable with a localhost fallback so the same Dockerfile works in local dev and behind a reverse proxy:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-3000}/health || exit 1
```

Without a health check, your container can start successfully and immediately crash — and your orchestrator won't know the difference until requests start failing.

## The mental model

Think of a container as a lightweight virtual machine with one job. It runs one process. It exposes one port. It's immutable — you never modify a running container; you build a new image and replace it. Everything else — volumes, networks, orchestration — is scaffolding around that core idea.

Docker doesn't have to be complicated. For most of us, it's a packaging format and a runtime guarantee. The rest can wait until you actually need it.
