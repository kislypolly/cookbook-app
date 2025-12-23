import { Routes, Route, Link } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import CreateRecipePage from './pages/CreateRecipePage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout'

function App() {
  const loading = useAppSelector(state => state.recipes.loading)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
      <Layout>
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-lg font-medium">Загрузка рецептов...</p>
            </div>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/create" element={<CreateRecipePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
