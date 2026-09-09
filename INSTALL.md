# Installation

## 1. Prerequisites

- **Node.js** version 20 or later
- **npm** (comes with Node.js) or another package manager of your choice

## 2. Get the code

Clone the repository or download the source from the project location.

## 3. Install dependencies

From the project root, run:

```bash
npm install
```

This installs all packages listed in `package.json`, including Nuxt 3, @nuxt/content, Tailwind CSS, and TypeScript.

## 4. Environment variables

Create a `.env` file (or copy from an existing `.env.example`) to override defaults. Commonly used variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | 3000    | Port for the development server |

Other available server options are listed in the [README](README.md#environment-variables).

## 5. Run the development server

```bash
npm run dev
```

This starts the Nuxt development server on `http://localhost:3000` (or the port specified in `PORT`). The server supports hot module replacement and auto-reloads when you edit markdown files in `content/` or Vue components.

## 6. Build for production

To create an optimized production build:

```bash
npm run build
```

The output goes into `.output/`. To preview the production build locally:

```bash
npm run preview
```

Alternatively, generate a static site:

```bash
npm run generate
```

## 7. Troubleshooting

- **`npm install` fails** – Ensure you’re using Node.js 20 or later (`node -v`). Clear the npm cache (`npm cache clean --force`) and retry.
- **Port already in use** – Change the `PORT` environment variable or stop the process using the default port (3000).
- **markdown content not showing** – Verify that the files in `content/` are present and valid. The `pages/blog/[slug].vue` and `pages/about.vue` query for content with `queryContent()`; missing files will result in empty states or 404s.
- **Build errors** – Check for TypeScript errors. Run `npx nuxi typecheck` to validate types.