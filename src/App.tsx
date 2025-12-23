import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, type RootState } from './store';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import AuthPage from './pages/AuthPage';
import CreateRecipePage from './pages/CreateRecipePage';
import ProfilePage from './pages/ProfilePage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth?.user);
  return user ? children : <Navigate to="/auth?mode=login" />;
};

const AppContent = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="recipe/:id" element={<RecipePage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="create" element={<ProtectedRoute><CreateRecipePage /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="edit/:id" element={<ProtectedRoute><CreateRecipePage /></ProtectedRoute>} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
