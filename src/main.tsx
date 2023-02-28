import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { firstTimeThemeSet } from './Utilities/theme'
import Router from './router/router'

firstTimeThemeSet()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
