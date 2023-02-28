import { useEffect, useState } from 'react'
import type { Channels } from 'electron/types/types'
import { toggleTheme } from '../Utilities/theme'
import { useNavigate } from 'react-router-dom'

async function sendMessage(channel: Channels, args: any[]) {
  return new Promise((res, rej) => {
    window.electron.ipcRenderer.sendMessage(channel, args)
    window.electron.ipcRenderer.on('test', (args) => {
      res(args)
    })
  })
}

function App() {
  const [message, setMessage] = useState('')
  const nav = useNavigate()
  // setTimeout(() => {
  //   nav('/some-page')
  // }, 4000)
  useEffect(() => {
    console.log('Request Sent')
    sendMessage('test', ['this is my message from front-end']).then((arg) =>
      setMessage(arg as string)
    )
  }, [])

  return (
    <div className='h-screen border-box flex flex-col items-center justify-center gap-3'>
      <h1 className="text-3xl">Welcome to Electron dude...</h1>
      <p>{message}</p>
      <button
        className="btn mt-2 btn-success-outline"
        onClick={() => toggleTheme()}
      >
        Change Theme
      </button>
    </div>
  )
}

export default App
