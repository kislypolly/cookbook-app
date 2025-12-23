import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="loader">Загрузка...</div>;
  }

  return (
    <div className="app-root">
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">🍳 Cookbook</Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Главная</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="navbar-link">👤 {user.email?.split('@')[0]}</Link>
                <Link to="/create" className="navbar-btn">➕ Рецепт</Link>
                <button onClick={handleLogout} className="navbar-btn">Выйти</button>
              </>
            ) : (
              <Link to="/auth" className="navbar-btn">Войти</Link>
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
