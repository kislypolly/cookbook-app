import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="profile" element={<div>Profile (скоро!)</div>} />
        <Route path="create" element={<div>Create Recipe (скоро!)</div>} />
        <Route path="recipe/:id" element={<div>Recipe (скоро!)</div>} />
      </Route>
    </Routes>
  )
}

export default App
