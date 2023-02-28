import { useEffect, useState } from 'react'
import type { Channels } from 'electron/types/types'
import { toggleTheme } from '../Utilities/theme'

async function sendMessage(channel: Channels,args: any[]) {
  return new Promise((res, rej) => {
    window.electron.ipcRenderer.sendMessage(channel, args)
    window.electron.ipcRenderer.on('test', (args) => { 
      res(args)
    })
  })
}

function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    console.log('Request Sent')
    sendMessage('test', ['this is my message from front-end']).then((arg) => setMessage(arg as string))
  }, [])
  return (
    <div>
      <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <h1 className='text-lg'>Welcome to Electron dude...</h1>
        <p>{message}</p>
        <button className='btn mt-2 btn-success-outline' onClick={() => toggleTheme()}>Change Theme</button>
      </div>
    </div>
  )
}

export default App
