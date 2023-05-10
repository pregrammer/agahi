import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/shared.scss'
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
