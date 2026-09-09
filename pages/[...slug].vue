<script setup lang="ts">
setResponseStatus(404)

useHead({
  title: 'Page not found — Harbor'
})
</script>

<template>
  <div class="flex items-center justify-center min-h-[60vh] px-6 py-8">
    <div class="max-w-[480px] text-center">
      <span class="block font-display text-[6rem] font-bold text-accent leading-none mb-2">404</span>
      <h1 class="text-[1.75rem] font-semibold text-fg m-0 mb-3">Page not found</h1>
      <p class="text-[1.0625rem] text-fg-muted leading-relaxed m-0 mx-auto mb-6 max-w-[360px]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="w-12 h-0.5 bg-accent mx-auto mb-6" />
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent no-underline px-4 py-2 border border-accent hover:bg-accent hover:text-accent-fg transition-colors duration-150">
        &larr; Back to home
      </NuxtLink>
    </div>
  </div>
</template>
