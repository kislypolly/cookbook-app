import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  
  const user = null; // или { id: 'test' }
  const authLoading = false;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="app-root">
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">🍳 Cookbook</Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Главная</Link>
            <Link to="/profile" className="navbar-link">👤 Профиль</Link>
            <Link to="/create" className="navbar-btn">➕ Рецепт</Link>
            <button onClick={handleLogout} className="navbar-btn">Выйти</button>
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
