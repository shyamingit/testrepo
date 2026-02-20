import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="glass nav">
      <h1>FounderFocus</h1>
      <div>
        <span>{user?.name} ({user?.role})</span>
        <button className="btn secondary" onClick={logout} type="button">Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
