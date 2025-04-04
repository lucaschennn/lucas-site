import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";

const Infuse = ({ isOpen, onClose, userData, setUserData, sortedCards, infuse }) => {
    if (!isOpen) return null; // Prevents rendering when closed

    const [originalIdx, setOriginalIdx] = useState(-1);
    const [sacrificeIdx, setSacrificeIdx] = useState(-1);

    const handleInfuse = () => {
        infuse({uid: userData.data.uid, original_idx: originalIdx, sacrifice_idx: sacrificeIdx})
        .then((user_data) => {
            setUserData(user_data);
            console.log(user_data.data)
            setOriginalIdx(-1);
            setSacrificeIdx(-1);
        })
    }

    useEffect(() => {
        console.log("rerender!", userData)
    })


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>Close</button>
                    <button id="infuseBtn" onClick={() => handleInfuse()}>Infuse</button>
                </div>
                <div className="card-selector">
                    <div id="originalSelector">
                        Selected original card:
                        <div className="selected-card">
                        {
                            originalIdx >= 0 &&
                            <Card card={userData.data.cards[originalIdx]}/>
                        }
                        </div>
                        <ul>
                            {userData.data.cards.map((item, index) => (
                                <Card key={index} card={item} onClick={() => setOriginalIdx(Number(index))}/>
                            ))}
                        </ul>
                    </div>
                    <div id="sacrificeSelector">
                        Selected sacrifice card:

                            <div className="selected-card">
                                {
                                sacrificeIdx >= 0 && 
                                <Card card={userData.data.cards[sacrificeIdx]}/>
                                }
                            </div>
                        <ul>
                            {userData.data.cards.map((item, index) => (
                                <Card key={index} card={item} onClick={() => setSacrificeIdx(index)}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Infuse;