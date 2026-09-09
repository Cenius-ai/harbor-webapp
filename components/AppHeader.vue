<script setup lang="ts">
const mobileOpen = ref(false)
const route = useRoute()

const links = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' }
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

watch(() => route.path, () => { mobileOpen.value = false })
</script>

<template>
  <header class="sticky top-0 z-50 bg-bg border-b border-border-light">
    <div class="flex items-center justify-between max-w-[1152px] mx-auto px-6 h-[60px]">
      <NuxtLink to="/" class="flex items-center gap-2 no-underline text-fg font-display" aria-label="Harbor home">
        <span class="flex items-center justify-center w-8 h-8 bg-accent text-accent-fg font-bold text-base">H</span>
        <span class="text-lg font-semibold tracking-tight">Harbor</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden sm:flex items-center gap-1" aria-label="Main navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-3.5 py-2 text-[0.9375rem] font-medium text-fg-muted no-underline transition-colors duration-150 hover:text-fg"
          :class="{ '!text-fg underline underline-offset-4 decoration-accent': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
        <ThemeToggle />
      </nav>

      <!-- Mobile controls -->
      <div class="flex sm:hidden items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          class="flex items-center justify-center w-10 h-10 min-w-10 min-h-10 bg-transparent border-none cursor-pointer p-0"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="relative block w-[22px] h-0.5 bg-fg transition-colors duration-150" :class="{ '!bg-transparent': mobileOpen }">
            <span class="absolute left-0 w-full h-0.5 bg-fg transition-transform duration-200" :class="mobileOpen ? 'top-0 rotate-45' : '-top-[7px]'" />
            <span class="absolute left-0 w-full h-0.5 bg-fg transition-transform duration-200" :class="mobileOpen ? 'top-0 -rotate-45' : 'top-[7px]'" />
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile nav drawer -->
    <Transition name="slide">
      <nav v-if="mobileOpen" class="flex flex-col px-6 pb-6 pt-4 border-t border-border-light bg-bg sm:hidden" aria-label="Mobile navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="py-3 text-base font-medium text-fg-muted no-underline border-b border-border-light last:border-b-0"
          :class="{ '!text-fg': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 200ms ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>
