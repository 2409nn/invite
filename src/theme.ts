
export type Theme = 'light' | 'dark'

export const DARK_FROM_HOUR = 18
export const DARK_TO_HOUR = 7

export function themeForDate(date: Date = new Date()): Theme {
  const hour = date.getHours()
  return hour >= DARK_FROM_HOUR || hour < DARK_TO_HOUR ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  if (root.dataset.theme !== theme) root.dataset.theme = theme
}

export function startAutoTheme(): () => void {
  const update = () => applyTheme(themeForDate())
  update()

  const timer = window.setInterval(update, 60 * 1000)
  const onVisibility = () => { if (!document.hidden) update() }
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    window.clearInterval(timer)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
