import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Root() {
  return (
    <div className='w-screen min-h-screen flex flex-col justify-stretch'>
      <Navigation />
      <div className="flex flex-col w-full border-box items-center justify-center overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  )
}
