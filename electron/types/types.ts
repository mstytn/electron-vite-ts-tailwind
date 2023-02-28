export type Channels = 'test' | 'theme'
export type ElectronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]): void
    on(channel: Channels, func: (...args: unknown[]) => void): () => void
    once(channel: Channels, func: (...args: unknown[]) => void): void
  }
}
