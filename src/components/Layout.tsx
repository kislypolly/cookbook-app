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
    <div className="app-root">
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            🍳 Cookbook
          </Link>

          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Главная
            </Link>

            {user && (
              <>
                <Link to="/profile" className="navbar-link">
                  Профиль
                </Link>
                <Link to="/favorites" className="navbar-link">
                  Избранное
                </Link>
              </>
            )}

            <Link to="/create" className="navbar-btn">
              + Рецепт
            </Link>

            {user ? (
              <button onClick={handleLogout} className="navbar-btn">
                Выйти
              </button>
            ) : (
              <Link to="/auth" className="navbar-link">
                Войти
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>

      {(isLoading || authLoading) && (
        <div
          className="loader-wrap"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 24,
              borderRadius: 20,
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              textAlign: 'center',
            }}
          >
            <div className="loader-circle" />
            <p>Загрузка...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout
