<script setup lang="ts">
const { data: featuredPosts } = await useAsyncData('home-featured', () =>
  queryContent('blog')
    .where({ featured: true })
    .sort({ date: -1 })
    .limit(5)
    .find()
)

const heroPost = computed(() => featuredPosts.value?.[0] ?? null)
const gridPosts = computed(() => featuredPosts.value?.slice(1) ?? [])

const heroSlug = computed(() => (heroPost.value?._path || '').replace('/blog/', ''))

useHead({
  title: 'Harbor — A tech blog',
  meta: [
    { name: 'description', content: 'Harbor is a quiet place for thoughtful writing about software engineering, systems design, and the craft of building for the modern web.' }
  ]
})
</script>

<template>
  <div class="pb-8">
    <!-- Hero section -->
    <section class="px-6 py-16 sm:py-20 bg-surface border-b border-border-light">
      <div class="max-w-[720px] mx-auto text-center">
        <h1 class="text-[3.5rem] font-bold tracking-[-0.02em] m-0 mb-4 text-fg">Harbor</h1>
        <p class="text-[1.1875rem] leading-relaxed text-fg-muted max-w-[560px] mx-auto mb-8">
          A quiet place for thoughtful writing about software engineering, systems design,
          and the craft of building for the modern web.
        </p>
        <div class="w-16 h-0.5 bg-accent mx-auto" />

        <!-- Featured hero post -->
        <div v-if="heroPost" class="mt-10 pt-10 border-t border-border-light">
          <p class="text-xs font-medium text-fg-subtle uppercase tracking-wider mb-3">Featured article</p>
          <h2 class="text-2xl sm:text-[1.75rem] font-semibold mb-3">
            <NuxtLink :to="`/blog/${heroSlug}`" class="text-fg no-underline hover:text-accent transition-colors">
              {{ heroPost.title }}
            </NuxtLink>
          </h2>
          <p class="text-[1.0625rem] text-fg-muted leading-relaxed max-w-[560px] mx-auto mb-4">
            {{ heroPost.description }}
          </p>
          <NuxtLink
            :to="`/blog/${heroSlug}`"
            class="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent no-underline px-4 py-2 border border-accent hover:bg-accent hover:text-accent-fg transition-colors duration-150"
          >
            Read article &rarr;
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured posts grid -->
    <section v-if="gridPosts.length" class="px-6 py-12">
      <div class="max-w-[1152px] mx-auto">
        <div class="flex items-center gap-4 mb-8">
          <h2 class="text-2xl font-semibold text-fg m-0 whitespace-nowrap">More featured</h2>
          <div class="flex-1 h-px bg-border" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCard
            v-for="post in gridPosts"
            :key="post._path"
            :title="post.title"
            :description="post.description"
            :date="post.date"
            :author="post.author"
            :tags="post.tags"
            :cover-image="post.coverImage"
            :slug="(post._path || '').replace('/blog/', '')"
          />
        </div>

        <div class="mt-8 text-center">
          <NuxtLink to="/blog" class="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent no-underline px-4 py-2 border border-accent hover:bg-accent hover:text-accent-fg transition-colors duration-150">
            View all posts &rarr;
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Empty state -->
    <section v-else class="px-6 py-12">
      <div class="max-w-[1152px] mx-auto">
        <p class="text-center text-fg-muted text-[1.0625rem]">No posts yet. Check back soon.</p>
      </div>
    </section>
  </div>
</template>
