import { useEffect, useState } from 'react'
import type { Channels } from 'electron/types/types'

async function sendMessage(channel: Channels,args: any[]) {
  return new Promise((res, rej) => {
    window.electron.ipcRenderer.sendMessage(channel, args)
    window.electron.ipcRenderer.on('test', (args) => { 
      res(args)
    })
  })
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log('dark')
} else { 'light' }

function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    console.log('Request Sent')
    sendMessage('test', ['this is my message from front-end']).then((arg) => setMessage(arg as string))
  }, [])
  return (
    <div>
      <div className='w-screen h-screen flex flex-col items-center justify-center dark:bg-slate-800 dark:text-white'>
        <h1 className='text-lg'>Welcome to Electron dude...</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default App
