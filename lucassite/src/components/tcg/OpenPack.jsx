import React, { useState, useEffect } from "react";
import BaseCard from "./BaseCard.jsx";
import Card from "./Card.jsx";

const OpenPack = ({ isOpen, onClose, setUserData, uid, openPack }) => {
    if (!isOpen) return null; // Prevents rendering when closed

    const [newCards, setNewCards] = useState(false);
    const [topCard, setTopCard] = useState(0);
    

    const handlePackOpen = () => {
        openPack({uid: uid})
            .then((res => {
                setUserData((prev) => (
                    {
                        data: {
                            ...res.data,
                            uid: prev.data.uid,
                        }
                    }
                ));
                setNewCards(res.data.new_cards)
            }))
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>Close</button>
                    <button id="openPackBtn" onClick={() => handlePackOpen()}>Confirm pack open</button>
                    <div>
                        {newCards && 
                        <ul id="newCardStack">
                        {newCards.map((item, index) => (
                            <Card key={index} index={index} card={item} topCard={topCard} setTopCard={setTopCard} numCards={newCards.length}/>
                        ))}
                        </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenPack;