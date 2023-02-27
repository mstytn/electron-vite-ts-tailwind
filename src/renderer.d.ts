import type { ElectronHandler } from '../electron/types/types'
declare global {
  interface Window {
    electron: ElectronHandler
  }
}
