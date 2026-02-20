import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  const { token } = useAuth();
  const [authMode, setAuthMode] = useState('login');

  if (!token) {
    return authMode === 'login' ? (
      <LoginPage onToggle={() => setAuthMode('register')} />
    ) : (
      <RegisterPage onToggle={() => setAuthMode('login')} />
    );
  }

  return <DashboardPage />;
};

export default App;
