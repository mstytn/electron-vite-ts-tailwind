import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <>
      <ul className='w-20 p-2 border-box bg-slate-200 dark:bg-slate-900 shadow-xl border-r-[1px] dark:border-slate-700 border-slate-100 fixed h-screen'>
        <li className='mt-3 text-center'>
          <Link to={'/'} > Home </Link>
        </li>
        <li className='mt-3 text-center'>
          <Link to={'/nowhere'}> Error </Link>
        </li>
      </ul>
    </>
  )
}

export default Navigation