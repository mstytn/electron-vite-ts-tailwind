const getIsOsDark = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const getIsDark = () => {
  const themeSet = window.localStorage.getItem('appTheme')
  return !themeSet ? getIsOsDark() : themeSet === 'dark'
}

const setIsDark = (isDark: boolean) => {
  const darkLiteral = isDark ? 'dark' : 'light'
  window.localStorage.setItem('appTheme', darkLiteral)
  window.electron.ipcRenderer.sendMessage('theme', [darkLiteral])
  if (isDark) {
    window.document.documentElement.classList.add('dark')
  } else {
    window.document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = () => {
  setIsDark(!getIsDark())
}

const firstRun = () => {
  setIsDark(getIsDark())
}

const firstTimeThemeSet = () => {
  const themeSetter = (e: Event) => {
    firstRun()
    window.removeEventListener('DOMContentLoaded', themeSetter)
  }
  
  window.addEventListener('DOMContentLoaded', themeSetter)
}

export { toggleTheme, setIsDark, firstTimeThemeSet }