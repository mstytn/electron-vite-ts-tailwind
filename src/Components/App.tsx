import { useState } from 'react'

console.log(
  '[App.tsx]',
  `Hello world from Electron ${process.versions.electron}!`
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className='w-screen h-screen flex items-center justify-center'>
        <h1 className='text-lg'>Welcome to Electron dude...</h1>
      </div>
    </div>
  )
}

export default App
