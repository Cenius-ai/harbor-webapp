<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () =>
  queryContent('blog', slug).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

const formattedDate = computed(() => {
  const d = new Date(post.value!.date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

useHead({
  title: `${post.value.title} — Harbor`,
  meta: [
    { name: 'description', content: post.value.description },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: post.value.coverImage || '' },
    { property: 'article:published_time', content: post.value.date },
    { property: 'article:author', content: post.value.author },
    { name: 'twitter:card', content: post.value.coverImage ? 'summary_large_image' : 'summary' }
  ]
})

// Find related posts
const { data: related } = await useAsyncData(`related-${slug}`, () =>
  queryContent('blog')
    .where({ _path: { $ne: `/blog/${slug}` } })
    .sort({ date: -1 })
    .limit(3)
    .find()
)
</script>

<template>
  <article v-if="post" class="pb-8">
    <!-- Header -->
    <header class="px-6 pt-12 pb-0 bg-surface">
      <div class="max-w-[720px] mx-auto">
        <div class="flex items-center gap-1.5 text-sm text-fg-subtle mb-4">
          <time :datetime="post.date">{{ formattedDate }}</time>
          <span class="text-border">&middot;</span>
          <span>{{ post.author }}</span>
        </div>
        <h1 class="text-[2.75rem] font-bold leading-[1.15] tracking-[-0.015em] m-0 mb-3 text-fg">{{ post.title }}</h1>
        <p class="text-[1.1875rem] leading-relaxed text-fg-muted m-0 mb-4">{{ post.description }}</p>
        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-6">
          <span v-for="tag in post.tags" :key="tag" class="inline-block px-3 py-0.5 text-xs font-medium text-fg-muted bg-bg border border-border-light">{{ tag }}</span>
        </div>
        <div class="w-12 h-0.5 bg-accent" />
      </div>
    </header>

    <!-- Cover image -->
    <div v-if="post.coverImage" class="max-w-[960px] mx-auto mt-8 px-6">
      <img :src="post.coverImage" :alt="post.title" class="w-full max-h-[480px] object-cover border border-border-light" />
    </div>

    <!-- Body -->
    <div class="px-6 py-10">
      <div class="max-w-[680px] mx-auto">
        <ContentRenderer :value="post" class="prose" />
      </div>
    </div>

    <!-- Related posts -->
    <footer v-if="related && related.length" class="px-6 py-8">
      <div class="max-w-[1152px] mx-auto">
        <div class="flex items-center gap-4 mb-6">
          <h2 class="text-xl font-semibold text-fg m-0 whitespace-nowrap">Related reading</h2>
          <div class="flex-1 h-px bg-border" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCard
            v-for="rp in related"
            :key="rp._path"
            :title="rp.title"
            :description="rp.description"
            :date="rp.date"
            :author="rp.author"
            :tags="rp.tags"
            :cover-image="rp.coverImage"
            :slug="(rp._path || '').replace('/blog/', '')"
          />
        </div>
      </div>
    </footer>
  </article>
</template>

<style scoped>
:deep(.prose) {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-fg);
}
:deep(.prose h2) {
  font-size: 1.625rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-fg);
}
:deep(.prose h3) {
  font-size: 1.375rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
:deep(.prose p) {
  margin-bottom: 1.25rem;
}
:deep(.prose a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
:deep(.prose blockquote) {
  border-left: 3px solid var(--color-accent);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: var(--color-fg-muted);
  font-style: italic;
}
:deep(.prose code) {
  font-family: var(--font-family-mono);
  font-size: 0.875em;
  background-color: var(--color-surface-alt);
  padding: 0.125rem 0.375rem;
  border-radius: 2px;
}
:deep(.prose pre) {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  padding: 1.25rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 1.5rem 0;
}
:deep(.prose pre code) {
  background: none;
  padding: 0;
}
:deep(.prose ul),
:deep(.prose ol) {
  margin: 1rem 0 1.5rem;
  padding-left: 1.5rem;
}
:deep(.prose li) {
  margin-bottom: 0.375rem;
}
:deep(.prose img) {
  max-width: 100%;
  margin: 1.5rem 0;
}
:deep(.prose hr) {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 2rem 0;
}
</style>
