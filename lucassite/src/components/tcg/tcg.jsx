import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import Countdown from "./Countdown.jsx";
import Card from "./Card.jsx";
import BaseCard from "./BaseCard.jsx";
import Infuse from "./Infuse.jsx";
import OpenPack from "./OpenPack.jsx";
import Collection from "./Collection.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

import './tcg.css';

function Tcg() {
    const auth = getAuth();
    const [userAuth, setUserAuth] = useState("");
    const [userData, setUserData] = useState("");
    const [InfuseOpen, setInfuseOpen] = useState(false);
    const [CollectionOpen, setCollectionOpen] = useState(false);
    const [OpenPackOpen, setOpenPackOpen] = useState(false);
    const [cardView, setCardView] = useState(0);
    const [topCard, setTopCard] = useState(0);

    const [popup, setPopup] = useState(true);

    const functions = getFunctions();
    // if(import.meta.env.DEV) {
    //     connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    // }

    
    const getUserData = httpsCallable(functions, 'getUserData');
    const openPack = httpsCallable(functions, 'openPack');
    const infuse = httpsCallable(functions, 'infuse');
    const getCardData = httpsCallable(functions, 'getCardData');
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
    const handleCardView = () => {
        setCardView((prev) => (prev + 1) % 2)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                setUserAuth(userAuth);
                const user_context = userAuth.toJSON();
                getUserData({context: user_context})
                .then((user_data) => {
                    setUserData(user_data);
                })

            } else {
                setUserAuth(null);
                setUserData(null);
                // User is signed out
            }
        });

        return () => unsub();
    }, [])

    return (
    <div id="Tcg">
        {
            userAuth ? <Logout/> : <Login/>
        }
        {userData &&
            <div className="main-content">
                
                <button id="openPackBtn" onClick={handlePackOpen}>
                    <Countdown refreshes_at={userData.data.pack_refreshes}/>
                </button>
                <div id="homeButtons">
                    <div id="actionButtons">
                        <button onClick={() => setInfuseOpen(true)}>Infuse</button>
                        <button>Trade up</button>
                    </div>
                    <button id="collectionBtn" onClick={() => setCollectionOpen(true)}>Collection</button>
                </div>
                <button id="filterBtn">
                    Filter and sort
                </button>
                {
                    cardView === 0 ?
                    <div>
                        <p className="card-counter">{Math.min(userData.data.cards.length, topCard+1)} / {userData.data.cards.length}</p>
                        <ul id="cardStack">
                            {
                                userData.data.cards.length > 0 ?
                                <>
                                    {sortedCards("collection", 0).map((item, index) => (
                                    <Card key={index} index={index} card={item} topCard={topCard} setTopCard={setTopCard} numCards={userData.data.cards.length}/>
                                    ))}
                                </>
                                :
                                <div className="empty-card">
                                    You have no cards. Open your first pack!
                                </div>
                            }
                        </ul>
                    </div>
                    :
                    <div className="card-grid-container">
                        <div className="card-grid">
                            {sortedCards("collection", 0, topCard).map((item, index) => (
                                <BaseCard key={index}  card={item} scale={.7}/>
                            ))}
                        </div>
                    </div>

                }
                <div className="view-buttons">
                    <label>
                        <input type="radio" name="fruit" value="stack" checked={cardView === 0} onChange={handleCardView}/>
                        Stack
                    </label>
                    <label>
                        <input type="radio" name="fruit" value="grid" checked={cardView === 1} onChange={handleCardView}/>
                        Grid
                    </label>
                </div>
                <Infuse isOpen={InfuseOpen} userData={userData} setUserData={setUserData} sortedCards={sortedCards} infuse={infuse} onClose={() => setInfuseOpen(false)}/>
                <OpenPack isOpen={OpenPackOpen} setUserData={setUserData} uid={userAuth.uid} openPack={openPack} onClose={() => setOpenPackOpen(false)}/>
                <Collection isOpen={CollectionOpen} userData={userData} uid={userAuth.uid} getCardData={getCardData} onClose={() => setCollectionOpen(false)}/>
            </div>
        }
        {
            popup && (
                <div id="slidingPopup">
                    <button onClick={() =>setPopup(false)}>x</button>
                    Hey there it's Lucas! While the game is quite bare-bones right now, feel free to mess around and stress test the game as much as you want. I'm continually integrating and refining new features, and I would love to hear any feedback!
                </div>
            )
        }

    </div>
    );
}

export default Tcg;
