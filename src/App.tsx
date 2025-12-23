import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store'; 
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import AuthPage from './pages/AuthPage';
import CreateRecipePage from './pages/CreateRecipePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const user = useSelector((state: RootState) => state.auth?.user);
    return user ? children : <Navigate to="/auth?mode=login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Публичные страницы */}
        <Route index element={<HomePage />} />
        <Route path="recipe/:id" element={<RecipePage />} />
        <Route path="auth" element={<AuthPage />} />
        
        {/* Защищенные страницы */}
        <Route 
          path="create" 
          element={
            <ProtectedRoute>
              <CreateRecipePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="edit/:id" 
          element={
            <ProtectedRoute>
              <CreateRecipePage />
            </ProtectedRoute>
          } 
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
