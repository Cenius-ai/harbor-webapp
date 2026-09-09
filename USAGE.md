# Usage

Harbor is a statically generated blog (or SSR with Nuxt) that runs in a browser. Once the development server is running, open `http://localhost:3000` in your browser.

## Pages & Navigation

### Home page (`/`)

- Shows the blog title, subtitle, and a featured hero article (the most recent post with `featured: true` in its frontmatter).
- Displays a grid of up to 4 more featured articles below the hero.
- Click **Read article** on the hero post or any **PostCard** to go to the full article.
- Click **View all posts** to go to `/blog`.

### Blog listing (`/blog`)

- Lists all articles (newest first) in a paginated grid (6 per page).
- Use the **Prev** / **Next** buttons at the bottom to navigate pages.
- Click any card to open the full article.

### Single post (`/blog/:slug`)

Displays the full content of a Markdown file from `content/blog/[slug].md`.

- Shows the title, date, author, tags, and cover image (if provided).
- Renders the Markdown body using `ContentRenderer`.
- At the bottom, a **Related reading** section shows up to 3 other recent posts.

### About (`/about`)

Renders the `content/about.md` file. If the file is missing or empty, a placeholder message is shown.

### 404 page (`/anything-else`)

Any route not matched by the above falls through to the catch-all `pages/[...slug].vue`, which displays a “404 - Page not found” page with a link back home.

## Theme Toggle

A **ThemeToggle** component (visible in the header) switches between light and dark mode. The selection is stored in the browser via `useTheme` composable and persists across page loads.

## Editing Content

To add or modify blog posts or the about page:

- Create or edit Markdown files inside `content/blog/` (for posts) or `content/about.md` (for the about page).
- Use YAML frontmatter to set metadata: `title`, `description`, `date`, `author`, `tags`, `coverImage`, and `featured`.
- The development server will hot-reload content changes automatically.

### Example frontmatter

```yaml
---
title: "My New Post"
description: "A short description for listings."
date: 2024-05-20
author: "Jane Doe"
tags: ["vue", "nuxt"]
coverImage: "/images/covers/new-post.svg"
featured: true
---
```

## API / Curl Examples

The site does not expose a REST API; all content is served as rendered HTML. However, you can test the pages via curl:

```bash
# Home page
curl http://localhost:3000/

# Blog listing
curl http://localhost:3000/blog

# Paginated blog (page 2)
curl http://localhost:3000/blog?page=2

# Single post (replace with actual slug)
curl http://localhost:3000/blog/api-design-handbook

# About page
curl http://localhost:3000/about

# 404 page
curl http://localhost:3000/nonexistent
```