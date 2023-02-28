import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'Components/App'
import './index.css'
import { firstRun } from './Utilities/theme'

const themeSetter = (e: Event) => {
  firstRun()
  window.removeEventListener('DOMContentLoaded', themeSetter)
}

window.addEventListener('DOMContentLoaded', themeSetter)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
