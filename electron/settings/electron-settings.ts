import settings from 'electron-settings'

settings.configure({ atomicSave: true, prettify: true })

type WindowSettings = {
  width: number,
  height: number,
  x?: number
  y?: number
}

const defaultSettings = {
  width: 640,
  height: 300,
}

function getConfig() {
  const savedSettings = settings.getSync() as WindowSettings
  if (!savedSettings.width || !savedSettings.height) {
    settings.setSync(defaultSettings)
    return { ...defaultSettings }
  }
  return { ...savedSettings }
}

function setConfig(windowSettings: WindowSettings) {
  settings.setSync(windowSettings)
}

function resetConfig() {
  settings.reset()
}

export { getConfig, setConfig, resetConfig }