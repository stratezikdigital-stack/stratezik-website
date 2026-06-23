import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './gbp/gbp-audit.css'

// createRoot replaces build-time HTML in #root; crawlers still see prerendered markup in View Source.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
