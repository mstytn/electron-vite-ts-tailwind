import { app, BrowserWindow, shell, ipcMain, nativeTheme } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { getConfig, resetConfig, setConfig } from '../settings/electron-settings'
import { addProtocols } from './protocols'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// SECTION: Configuration Load
const config = getConfig()

let win: BrowserWindow | null = null
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    width: config.width,
    height: config.height,
    x: config.x,
    y: config.y,
    webPreferences: {
      preload,
      webSecurity: true,
      contextIsolation: true,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Make all links open with the browser, not with the application
  // win.webContents.setWindowOpenHandler(({ url }) => {
  //   if (url.startsWith('https:')) shell.openExternal(url)
  //   return { action: 'deny' }
  // })
}

app.whenReady().then(() => {
  addProtocols()
  ipcMain.on('test', (e, args) => {
    console.log(args)
    e.reply('test','This is my response to test')
  })
  ipcMain.on('theme', (_ev, args) => {
    const requestedTheme = (args as string[])[0] === 'dark'
    nativeTheme.themeSource = requestedTheme ? 'dark' : 'light'
  })
  createWindow()

  if (win) { 
    win.menuBarVisible = false
    // SECTION: Configuration update on resize or move
    win.on('resized', function() {
      const [width, height] = win!.getSize()!
      const [x, y] = win!.getPosition()!
      setConfig({ width, height, x, y })
    } )
    win.on('moved', function() {
      const [width, height] = win!.getSize()!
      const [x, y] = win!.getPosition()!
      setConfig({ width, height, x, y })
    })
  }
})

app.on('window-all-closed', () => {
  
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
// ipcMain.handle('open-win', (_, arg) => {
//   const childWindow = new BrowserWindow({
//     webPreferences: {
//       preload,
//       nodeIntegration: true,
//       contextIsolation: false,
//     },
//   })

//   if (process.env.VITE_DEV_SERVER_URL) {
//     childWindow.loadURL(`${url}#${arg}`)
//   } else {
//     childWindow.loadFile(indexHtml, { hash: arg })
//   }
// })
