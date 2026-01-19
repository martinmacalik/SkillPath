import { Route, Routes } from 'react-router-dom'

import LandingPage from '@/pages/LandingPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="*"
        element={
          <div className="page-container">
            <h1 className="text-2xl font-semibold tracking-tight">404</h1>
            <p className="mt-2 text-zinc-400">Tahle stránka neexistuje.</p>
          </div>
        }
      />
    </Routes>
  )
}
