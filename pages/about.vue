<script setup lang="ts">
const { data: about } = await useAsyncData('about', () =>
  queryContent('/about').findOne()
)

useHead({
  title: 'About — Harbor',
  meta: [
    { name: 'description', content: 'About Harbor — a tech blog about software, design, and the web.' }
  ]
})
</script>

<template>
  <div class="pb-8">
    <section class="px-6 py-12 sm:py-16 bg-surface border-b border-border-light">
      <div class="max-w-[720px] mx-auto">
        <h1 class="text-[2.25rem] font-bold m-0 mb-4 text-fg">{{ about?.title || 'About' }}</h1>
        <div class="w-12 h-0.5 bg-accent" />
      </div>
    </section>

    <section v-if="about" class="px-6 py-10">
      <div class="max-w-[680px] mx-auto">
        <ContentRenderer :value="about" class="prose" />
      </div>
    </section>

    <section v-else class="px-6 py-10">
      <div class="max-w-[680px] mx-auto">
        <p class="text-center text-fg-muted text-[1.0625rem] py-12">About page content coming soon.</p>
      </div>
    </section>
  </div>
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
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
:deep(.prose p) {
  margin-bottom: 1.25rem;
}
:deep(.prose a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
:deep(.prose hr) {
  border: none;
  border-top: 1px solid var(--color-border-light);
  margin: 2rem 0;
}
</style>
