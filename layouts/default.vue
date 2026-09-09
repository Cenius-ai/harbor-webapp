<script setup lang="ts">
const theme = useTheme()

onMounted(() => {
  theme.init()
  theme.listen()
})

useHead({
  bodyAttrs: {
    class: ''
  }
})
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
