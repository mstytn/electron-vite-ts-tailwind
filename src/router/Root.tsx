import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

export default function Root() {
  return (
    <div className='w-screen min-h-screen flex justify-stretch'>
      <Navigation />
      <div className='w-20'>
         {/* This pushes the main outlet as the space of navigation */}
      </div>
      <div className="flex flex-col w-full border-box items-center justify-center overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  )
}
