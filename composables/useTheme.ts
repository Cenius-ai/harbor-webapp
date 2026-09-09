export function useTheme() {
  const isDark = ref(false)

  function applyTheme(dark: boolean) {
    isDark.value = dark
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function toggle() {
    const next = !isDark.value
    applyTheme(next)
    try { localStorage.setItem('harbor-theme', next ? 'dark' : 'light') } catch { /* storage blocked */ }
  }

  function init() {
    let preference: string | null = null
    try { preference = localStorage.getItem('harbor-theme') } catch { /* storage blocked */ }
    if (preference === 'dark') {
      applyTheme(true)
    } else if (preference === 'light') {
      applyTheme(false)
    } else {
      // respect system preference
      const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(sysDark)
    }
  }

  // Listen for system changes when no explicit preference is set
  function listen() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let stored: string | null = null
      try { stored = localStorage.getItem('harbor-theme') } catch { /* */ }
      if (stored === null) applyTheme(e.matches)
    })
  }

  return { isDark, toggle, init, listen }
}
