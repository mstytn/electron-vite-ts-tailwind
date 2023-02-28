import { Link, useRouteError  } from "react-router-dom";

type RouterError = {
  statusText?: string,
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouterError
  const message = error.statusText || error.message
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl mb-4'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <pre className='dark:bg-slate-900 dark:border-transparent border-[1px] dark:text-yellow-300 text-yellow-800 shadow-lg p-6 mt-6 rounded-md w-1/3'>
        {message}
      </pre>
      <Link className='btn btn-success mt-5 mb-48 w-1/4 text-center uppercase' to={'/'}>Back</Link>
    </div>
  )
}