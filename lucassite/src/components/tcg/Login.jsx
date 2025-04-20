// Suggested code may be subject to a license. Learn more: ~LicenseLog:1279131874.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3200216879.
import { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [display, setDisplay] = useState(false);
  const [hasError, setHasError] = useState(false);

  // const auth = getAuth();

  const handleSignup = async (event) => {
    event.preventDefault();
    if(confirmPassword !== password) {
      setHasError("Passwords do not match!")
      return
    }

    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setHasError(errorMessage);
    });
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setHasError(errorMessage);
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
      <div className="login-container">
        {display ? (
          <form id="signInForm" onSubmit={isLogin ? handleLogin : handleSignup}>
            <div id="formHeader">
              <button type="button" onClick={()=> setDisplay(false)} className="top-button">Back</button>
              <button type="button" className="top-button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up here" : "Log in instead"}</button>
            </div>
            { hasError &&
              <p className="error-text">Error: {hasError}</p>
            }
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            {
              isLogin ?
              <button type="submit" className="form-submit-btn">Log in</button>
              :
              <>
                <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit" className="form-submit-btn">Sign Up</button>
              </>
            }
          </form>
        ) :
        <button id="playBtn" onClick={() => setDisplay(true)}>PLAY</button>
        }
      </div>
    </div>
  );
};

export default Login;