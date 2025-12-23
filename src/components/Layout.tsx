import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGetRecipesQuery } from '../store/api';

const Layout = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const { isLoading: recipesLoading } = useGetRecipesQuery(undefined, { 
    skip: true  // Отключаем запрос в Layout!
  });

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

      {(recipesLoading || authLoading) && (
        <div className="loader-wrap" style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ 
            background: '#fff', 
            padding: 24, 
            borderRadius: 20, 
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)', 
            textAlign: 'center',
            minWidth: 200
          }}>
            <div className="loader-circle" style={{
              width: 40,
              height: 40,
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }} />
            <p>Загрузка...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
