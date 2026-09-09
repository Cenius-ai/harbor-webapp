import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: true,

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/content'],

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      title: 'Harbor',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Harbor — a tech blog exploring software, design, and the craft of building for the web.' },
        { property: 'og:title', content: 'Harbor' },
        { property: 'og:description', content: 'A tech blog exploring software, design, and the craft of building for the web.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },

  compatibilityDate: '2025-03-10'
})
