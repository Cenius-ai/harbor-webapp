<template>
  <footer class="mt-12 border-t border-border-light bg-surface">
    <div class="max-w-[1152px] mx-auto px-6 py-10">
      <div class="flex flex-col gap-2 mb-8">
        <NuxtLink to="/" class="flex items-center gap-2 font-display font-semibold text-[1.0625rem] text-fg no-underline">
          <span class="flex items-center justify-center w-7 h-7 bg-accent text-accent-fg font-bold text-[0.8125rem]">H</span>
          <span>Harbor</span>
        </NuxtLink>
        <p class="text-fg-muted text-[0.9375rem] max-w-[360px]">
          A quiet place for thoughtful writing about software, design, and the web.
        </p>
      </div>
      <div class="flex justify-between items-center pt-6 border-t border-border-light text-sm text-fg-subtle">
        <span>&copy; {{ new Date().getFullYear() }} Harbor. All rights reserved.</span>
        <nav class="flex gap-5" aria-label="Footer navigation">
          <NuxtLink to="/" class="text-fg-subtle no-underline text-sm hover:text-fg-muted">Home</NuxtLink>
          <NuxtLink to="/blog" class="text-fg-subtle no-underline text-sm hover:text-fg-muted">Blog</NuxtLink>
          <NuxtLink to="/about" class="text-fg-subtle no-underline text-sm hover:text-fg-muted">About</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
