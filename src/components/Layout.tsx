import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Layout = () => {
  const { user, signOut, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="app-root">
      <nav className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold hover:text-orange-200">
            🍳 Cookbook
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-orange-200">Главная</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="hover:text-orange-200">
                  👤 {user.email?.split('@')[0]}
                </Link>
                <Link to="/create" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-100">
                  ➕ Рецепт
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link to="/auth" className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-100">
                Войти
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="page">
        <Outlet />
      </main>

      {authLoading && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <div className="loader-circle mx-auto mb-4" />
            <p>Загрузка...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout
