import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AutenticacionProvider } from './contexto/AutenticacionContext'
import './index.css'

createRoot(document.getElementById('raiz')).render(
  <StrictMode>
    <BrowserRouter>
      <AutenticacionProvider>
        <App />
      </AutenticacionProvider>
    </BrowserRouter>
  </StrictMode>,
)
