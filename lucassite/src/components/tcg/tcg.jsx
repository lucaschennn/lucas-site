import React from 'react';
import { useState, useEffect } from 'react'
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";


import './tcg.css';

function Tcg() {
    const auth = getAuth();
    const [user, setUser] = useState("");

    const functions = getFunctions();
    if(import.meta.env.DEV) {
        connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    }

    
    const getUserData = httpsCallable(functions, 'getUserData');
    const helloWorld = httpsCallable(functions, 'helloWorld');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                const user_context = user.toJSON();

                helloWorld({})
                .then((res => {
                    console.log(res);
                }))
                
                getUserData({context: user_context})
                .then((res) => {
                    console.log(res);
                })

            } else {
                setUser(null);
                // User is signed out
                // ...
            }
        });

        return () => unsub();
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
