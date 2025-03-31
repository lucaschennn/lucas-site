import { useState } from "react";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  };

  return user ? (
    <p>Welcome, {user.email}!</p>
  ) : (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;