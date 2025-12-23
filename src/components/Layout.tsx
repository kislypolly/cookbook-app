import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useGetRecipesQuery } from '../store/api'

const Layout = () => {
  const { user, signOut, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { isLoading } = useGetRecipesQuery()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold hover:text-orange-200">
            🍳 Cookbook
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:underline">Главная</Link>
            {user && <Link to="/profile" className="hover:underline">Профиль</Link>}
            <Link to="/create" className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold hover:bg-orange-50 transition-all">
              + Рецепт
            </Link>
            
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <span className="text-sm">Привет, {user.user_metadata?.username || user.email}!</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold hover:bg-orange-50"
                >
                  Войти
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
        <div className="max-w-6xl mx-auto p-6">
          <Outlet />
        </div>
      </main>

      {(isLoading || authLoading) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-800">Загрузка...</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Layout
