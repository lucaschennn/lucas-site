import { useAuth } from "../AuthContext.jsx";

const Logout = () => {
  const { user, logout } = useAuth();

  return user ? <button onClick={logout}>Logout</button> : null;
};

export default Logout;