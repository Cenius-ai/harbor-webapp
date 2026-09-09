<script setup lang="ts">
const page = ref(parseInt(useRoute().query.page as string) || 1)
const perPage = 6

const { data: postsResult } = await useAsyncData(`blog-page-${page.value}`, () =>
  queryContent('blog')
    .sort({ date: -1 })
    .skip((page.value - 1) * perPage)
    .limit(perPage)
    .find()
)

const { data: totalCount } = await useAsyncData('blog-total', () =>
  queryContent('blog').count()
)

const totalPages = computed(() => Math.ceil((totalCount.value || 1) / perPage))

useHead({
  title: 'Blog — Harbor',
  meta: [
    { name: 'description', content: 'All articles from Harbor — a tech blog about software, design, and the web.' }
  ]
})

function pageLink(p: number) {
  return { path: '/blog', query: p > 1 ? { page: String(p) } : {} }
}
</script>

<template>
  <div>
    <section class="px-6 py-12 sm:py-16 bg-surface border-b border-border-light">
      <div class="max-w-[1152px] mx-auto">
        <h1 class="text-[2.25rem] font-bold m-0 mb-2 text-fg">Blog</h1>
        <p class="text-fg-muted text-[1.0625rem] m-0 mb-5">All articles, newest first.</p>
        <div class="w-12 h-0.5 bg-accent" />
      </div>
    </section>

    <section class="px-6 py-10">
      <div class="max-w-[1152px] mx-auto">
        <div v-if="postsResult && postsResult.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCard
            v-for="post in postsResult"
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

        <p v-else class="text-center text-fg-muted text-[1.0625rem] py-12">No posts found.</p>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" class="flex justify-center items-center gap-5 mt-10 pt-8 border-t border-border-light" aria-label="Blog pagination">
          <NuxtLink
            v-if="page > 1"
            :to="pageLink(page - 1)"
            class="px-4 py-2 text-sm font-medium text-accent no-underline border border-accent hover:bg-accent hover:text-accent-fg transition-colors duration-150"
            aria-label="Previous page"
          >
            &larr; Prev
          </NuxtLink>
          <span v-else class="px-4 py-2 text-sm text-border border border-border-light pointer-events-none">&larr; Prev</span>

          <span class="text-sm text-fg-muted">Page {{ page }} of {{ totalPages }}</span>

          <NuxtLink
            v-if="page < totalPages"
            :to="pageLink(page + 1)"
            class="px-4 py-2 text-sm font-medium text-accent no-underline border border-accent hover:bg-accent hover:text-accent-fg transition-colors duration-150"
            aria-label="Next page"
          >
            Next &rarr;
          </NuxtLink>
          <span v-else class="px-4 py-2 text-sm text-border border border-border-light pointer-events-none">Next &rarr;</span>
        </nav>
      </div>
    </section>
  </div>
</template>
