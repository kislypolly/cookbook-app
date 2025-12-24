import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import AuthPage from './pages/AuthPage'
import CreateRecipePage from './pages/CreateRecipePage'
import ProfilePage from './pages/ProfilePage'
import EditRecipePage from './pages/EditRecipePage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="recipe/:id/edit" element={<EditRecipePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="create" element={<CreateRecipePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  )
}

export default App
