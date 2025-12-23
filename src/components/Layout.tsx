import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="app-root">
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            🍳 Cookbook
          </Link>

          <div className="navbar-links">
            <Link to="/" className="navbar-link">Главная</Link>
            
            {user && (
              <>
                <Link to="/profile" className="navbar-link">
                  👤 Профиль
                </Link>
              </>
            )}
            
            {user && (
              <Link to="/create" className="navbar-btn">
                ➕ Рецепт
              </Link>
            )}
            
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
    </div>
  );
};

export default Layout;
