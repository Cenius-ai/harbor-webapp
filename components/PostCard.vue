<script setup lang="ts">
interface Props {
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  coverImage?: string
  slug: string
  featured?: boolean
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  const d = new Date(props.date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>

<template>
  <article
    class="flex flex-col border border-border-light bg-bg transition-colors duration-200 overflow-hidden hover:border-border"
    :class="{ 'border-border': featured }"
  >
    <div v-if="coverImage" class="aspect-video overflow-hidden bg-surface">
      <NuxtLink :to="`/blog/${slug}`" :aria-label="`Read ${title}`">
        <img :src="coverImage" :alt="title" loading="lazy" class="w-full h-full object-cover transition-transform duration-400 ease-out" :class="{ 'hover:scale-[1.03]': true }" />
      </NuxtLink>
    </div>
    <div class="p-6 flex flex-col gap-2.5 flex-1">
      <div class="flex items-center gap-1.5 text-[0.8125rem] text-fg-subtle">
        <time :datetime="date">{{ formattedDate }}</time>
        <span class="text-border">&middot;</span>
        <span>{{ author }}</span>
      </div>
      <h3 class="text-xl font-semibold leading-[1.3] m-0">
        <NuxtLink :to="`/blog/${slug}`" class="text-fg no-underline hover:text-accent">{{ title }}</NuxtLink>
      </h3>
      <p class="text-[0.9375rem] text-fg-muted leading-[1.6] m-0 flex-1">{{ description }}</p>
      <div v-if="tags && tags.length" class="flex flex-wrap gap-2 mt-1">
        <span v-for="tag in tags" :key="tag" class="inline-block px-2.5 py-0.5 text-xs font-medium text-fg-muted bg-surface-alt border border-border-light">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>
