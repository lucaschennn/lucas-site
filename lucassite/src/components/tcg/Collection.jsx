import React from 'react';
import { useState, useEffect } from 'react'

import BaseCard from "./BaseCard.jsx";

const Collection = ({isOpen, userData, getCardData, onClose}) => {
    if (!isOpen) return null; // Prevents rendering when closed

    const [cards, setCards] = useState(null);

    useEffect(() => {
        getCardData()
        .then((res) => {
            console.log(res.data)
            setCards(res.data);
        })
    }, [])

    const Capluralize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1) + "s";
    }

    const getUserCardCounts = (card_name) => {
        let count = 0;
        for (const card of userData.data.cards) {
            if(card.name === card_name) count++;
        }
        return count;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content collection" onClick={(e) => e.stopPropagation()}>
                {cards && 
                    Object.keys(cards).map((item, index) => (
                        <>
                            <p className="collection-title">{Capluralize(item)}</p>
                            <div className="collection-group">
                                {
                                    cards[item].map((card, card_index) => (
                                        <div className="card-group">
                                            <BaseCard card={card} scale={.5}/>
                                            x{getUserCardCounts(card.name)}
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    ))
                }
                { /* TEMP */
                <p className="collection-title">More Collections coming soon!</p>
                }
            </div>
        </div>
    )
};

export default Collection;