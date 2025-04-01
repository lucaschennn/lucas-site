import React from 'react';
import { useState, useEffect } from 'react'
import { useAuth } from "../AuthContext.jsx";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './tcg.css';

function Tcg() {
    const auth = getAuth();
    const [user, setUser] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                console.log(user)
                const uid = user.uid;
                // ...
            } else {
                setUser(null)
                // User is signed out
                // ...
            }
        });
    })

    return (
    <div>
        {
            user ? <Logout/> : <Login/>
        }
    </div>
    );
}

export default Tcg;
