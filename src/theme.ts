// Автоматическая смена темы по времени суток (по локальному времени устройства).
// Тёмная тема включается вечером и держится до утра.
// ВАЖНО: те же часы продублированы в inline-скрипте в index.html (чтобы не было вспышки светлой темы при загрузке).
export type Theme = 'light' | 'dark'

export const DARK_FROM_HOUR = 19 // с 19:00
export const DARK_TO_HOUR = 7    // до 07:00

export function themeForDate(date: Date = new Date()): Theme {
  const hour = date.getHours()
  return hour >= DARK_FROM_HOUR || hour < DARK_TO_HOUR ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  if (root.dataset.theme !== theme) root.dataset.theme = theme
}

// Ставит тему сейчас и перепроверяет её раз в минуту, а также при возврате на вкладку
// (в фоне таймеры замедляются, а устройство могло "поспать"). Возвращает функцию остановки.
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
