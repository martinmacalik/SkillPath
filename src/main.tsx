import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Fonts
import "@fontsource/montserrat/500.css"; // Montserrat Medium
import "@fontsource/montserrat/400.css"; // optional normal

import "@fontsource/literata/500.css";   // Literata Medium
import "@fontsource/literata/400.css";   // optional normal


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
