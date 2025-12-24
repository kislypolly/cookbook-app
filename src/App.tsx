import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import AuthPage from './pages/AuthPage'
import CreateRecipePage from './pages/CreateRecipePage'
import ProfilePage from './pages/ProfilePage'
import EditRecipePage from './pages/EditRecipePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipes/:id" element={<RecipePage />} />
        <Route path="recipes/:id/edit" element={<EditRecipePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="create" element={<CreateRecipePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App
