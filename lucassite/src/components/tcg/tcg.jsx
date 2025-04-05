import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import Countdown from "./Countdown.jsx";
import Card from "./Card.jsx";
import Infuse from "./Infuse.jsx";
import OpenPack from "./OpenPack.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

import { useSpring, animated } from '@react-spring/web';
import { useGesture, useDrag } from '@use-gesture/react';

import './tcg.css';

function Tcg() {
    const auth = getAuth();
    const [userAuth, setUserAuth] = useState("");
    const [userData, setUserData] = useState("");
    const [InfuseOpen, setInfuseOpen] = useState(false);
    const [OpenPackOpen, setOpenPackOpen] = useState(false);

    const [topCard, setTopCard] = useState(0);

    const functions = getFunctions();
    // if(import.meta.env.DEV) {
    //     connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    // }

    
    const getUserData = httpsCallable(functions, 'getUserData');
    const openPack = httpsCallable(functions, 'openPack');
    const infuse = httpsCallable(functions, 'infuse');
    const helloWorld = httpsCallable(functions, 'helloWorld');

    // sort by either (rarity, collection, name, quality, collection_date)
    const sortedCards = (sort_by="collection", limit=0, start_from=0, ascending=true) => {
        const cards = userData.data.cards;
        if(!cards) {
            return [];
        }
        cards.sort();
        if(start_from === 0) {
            return cards;
        }
        return [...cards.slice(start_from), ...cards.slice(0, start_from)]
    }

    const handlePackOpen = () => {
        setOpenPackOpen(true);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                console.log("detected userAuth")
                setUserAuth(userAuth);
                const user_context = userAuth.toJSON();
                console.log("calling getUserData")
                getUserData({context: user_context})
                .then((user_data) => {
                    setUserData(user_data);
                    console.log("done calling getUserData")
                    console.log(user_data.data)
                })

            } else {
                setUserAuth(null);
                setUserData(null);
                // User is signed out
            }
        });

        return () => unsub();
    }, [])



    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         api.start({ x: 0, rotateX: 0, rotateY: 0, scale: 1, immediate: true });
    //     }, 20); // delay in ms — adjust as needed to match your fly-out animation duration
      
    //     return () => clearTimeout(timeout); // cleanup in case topCard changes again quickly
    //   }, [topCard]);

    return (
    <div>
        {
            userAuth ? <Logout/> : <Login/>
        }
        {userData && (
            <div className="main-content">
                <Countdown refreshes_at={userData.data.pack_refreshes}/>
                <button onClick={handlePackOpen}>open pack</button>
                <button onClick={() => setInfuseOpen(true)}>infuse</button>
                { !InfuseOpen && !OpenPackOpen &&
                    <ul id="cardStack">
                        {sortedCards("collection", 0, topCard).map((item, index) => (
                            <Card key={index} index={index} card={item} topCard={topCard} setTopCard={setTopCard} numCards={userData.data.cards.length}/>
                        ))}
                    </ul>
                }
                <Infuse isOpen={InfuseOpen} userData={userData} setUserData={setUserData} sortedCards={sortedCards} infuse={infuse} onClose={() => setInfuseOpen(false)}/>
                <OpenPack isOpen={OpenPackOpen} setUserData={setUserData} uid={userAuth.uid} openPack={openPack} onClose={() => setOpenPackOpen(false)}/>
            </div>
        )}
    </div>
    );
}

export default Tcg;
