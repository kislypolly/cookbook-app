import { Outlet, Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

const Layout = () => {
  const loading = useAppSelector(state => state.recipes.loading)

  return (
    <>
      <nav className="bg-orange-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🍳 Cookbook
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Главная</Link>
            <Link to="/create" className="hover:underline">Добавить рецепт</Link>
            <Link to="/about" className="hover:underline">О проекте</Link>
          </div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl animate-pulse">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-800">Загрузка рецептов...</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout
