// Suggested code may be subject to a license. Learn more: ~LicenseLog:1279131874.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3200216879.
import { useState } from "react";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [display, setDisplay] = useState(false);

  // const auth = getAuth();

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("here")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google login failed:", error.message);
    }
  };

  return (
    <div>
      {display ? (
        <form id="signInForm">
          <button onClick={()=> setDisplay(false)} id="closeButton">Close ❌</button>
          <div id="modeSelector">
            <input type="radio" name="mode" value="login" checked={isLogin} onChange={() => setIsLogin(true)} /> Log in
            <input type="radio" name="mode" value="signup" checked={!isLogin} onChange={() => setIsLogin(false)} /> Sign Up
          </div>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          {
            isLogin ? <button onClick={handleLogin}>Login</button> : <button onClick={handleSignup}>Sign Up</button>
          }
          <button onClick={handleGoogleLogin}>Login with Google</button>
        </form>
      ) :
      <button onClick={() => setDisplay(true)}>Click here to log in</button>
      }
    </div>
  );
};

export default Login;