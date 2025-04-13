import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      //Signed out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <button className="top-button" onClick={handleLogout}>Logout</button>;
};

export default Logout;