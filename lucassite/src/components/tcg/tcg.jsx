import React from 'react';
import { useState, useEffect } from 'react'
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import Countdown from "./Countdown.jsx";
import Card from "./Card.jsx";
import Infuse from "./Infuse.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";


import './tcg.css';

function Tcg() {
    const auth = getAuth();
    const [userAuth, setUserAuth] = useState("");
    const [userData, setUserData] = useState("");
    const [InfuseOpen, setInfuseOpen] = useState(false);

    const functions = getFunctions();
    // if(import.meta.env.DEV) {
    //     connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    // }

    
    const getUserData = httpsCallable(functions, 'getUserData');
    const openPack = httpsCallable(functions, 'openPack');
    const infuse = httpsCallable(functions, 'infuse');
    const helloWorld = httpsCallable(functions, 'helloWorld');

    // sort by either (rarity, collection, name, quality, collection_date)
    const sortedCards = (sort_by="collection", limit=0, ascending=true) => {
        const cards = userData.data.cards;
        if(!cards) {
            return [];
        }
        cards.sort();
        return cards
    }

    const handlePackOpen = () => {
        console.log("BEFORE", userAuth.uid)
        openPack({uid: userAuth.uid})
        .then((res => {
            console.log(userData);
            console.log(res);

            setUserData((prev) => (
                {
                    data: {
                        ...res.data,
                        uid: prev.data.uid,
                    }
                }
            ));
        }))
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                setUserAuth(userAuth);
                const user_context = userAuth.toJSON();

                console.log("before helloWorld")
                helloWorld({})
                .then((res) => {
                    console.log("done")
                })
                console.log("right after helloWorld (inline)")

                
                getUserData({context: user_context})
                .then((user_data) => {
                    setUserData(user_data);
                    console.log(user_data.data)
                })

            } else {
                setUserAuth(null);
                setUserData(null);
                // User is signed out
                // ...
            }
        });

        return () => unsub();
    }, [])

    return (
    <div>
        {
            userAuth ? <Logout/> : <Login/>
        }
        {userData && (
            <div>
                <Countdown refreshes_at={userData.data.pack_refreshes}/>
                <button onClick={handlePackOpen}>open pack</button>
                <button onClick={() => setInfuseOpen(true)}>infuse</button>
                <ul>
                    {sortedCards().map((item, index) => (
                        <Card key={index} card={item}/>
                    ))}
                </ul>
                <Infuse isOpen={InfuseOpen} userData={userData} setUserData={setUserData} sortedCards={sortedCards} infuse={infuse} onClose={() => setInfuseOpen(false)}/>
            </div>
        )}
    </div>
    );
}

export default Tcg;
