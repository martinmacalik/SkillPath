import { Route, Routes } from 'react-router-dom'

import LandingPage from '@/pages/LandingPage.tsx'
import SignInPage from './pages/SignInPage'
import AuthCallback from './pages/AuthCallback.tsx'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/profile" element={<ProfilePage />} />
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
