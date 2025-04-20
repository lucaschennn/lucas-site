import React, { useState, useEffect } from "react";
import BaseCard from "./BaseCard.jsx";

const Infuse = ({ isOpen, onClose, userData, setUserData, sortedCards, infuse }) => {
    if (!isOpen) return null; // Prevents rendering when closed

    const [originalIdx, setOriginalIdx] = useState(-1);
    const [sacrificeIdx, setSacrificeIdx] = useState(-1);
    const [cardsList, setCardsList] = useState(sortedCards());
    const [previewCard, setPreviewCard] = useState({});
    const [filter, setFilter] = useState(() => (item) => true);
    const [infused, setInfused] = useState(false);

    const handleCardSelect = (index) => {
        if(sacrificeIdx !== -1 && originalIdx !== -1) {
            return;
        }

        setPreviewCard({})
        let indices = [-1,-1];
        if (originalIdx === -1) {
            setOriginalIdx(index);
            setFilter(() => (item, idx) => {
                return item.name === cardsList[index].name && idx !== index;
            })
            if(sacrificeIdx !== -1) {
                indices = [index, sacrificeIdx];
            }
        } else {
            setSacrificeIdx(index);
            setFilter((prev) => (item, idx) => {
                return prev(item, idx) && idx !== index;
            })
            if(originalIdx !== -1) {
                indices = [originalIdx, index];
            }
        }
        if(indices[0] !== -1 && indices[1] !== -1) {
            const og = cardsList[indices[0]];
            const preview = JSON.parse(JSON.stringify(og)); // deep copy
            const sac = cardsList[indices[1]];
            if(!og || !sac) {
                return;
            }

            if(og.name !== sac.name) {
                return;
            }

            for(let key of Object.keys(og.attributes)) {
                preview.attributes[key] = Math.max(og.attributes[key], sac.attributes[key])
            }
            setPreviewCard(preview);
        }
    }

    const handleCardRemove = (mode, index) => {
        setPreviewCard({});
        if(mode === 0) {
            setOriginalIdx(-1);
            if(sacrificeIdx === -1) {
                setFilter(() => (item, idx) => true);
            } else {
                setFilter((prev) => (item, idx) => {
                    return prev(item, idx) || idx == index;
                })
            }
        } else if(mode === 1) {
            setSacrificeIdx(-1);
            if(originalIdx === -1) {
                setFilter(() => (item, idx) => true);
            } else {
                setFilter((prev) => (item, idx) => {
                    return prev(item, idx) || idx == index;
                })
            }
        }
    }

    const handleInfuse = () => {
        infuse({uid: userData.data.uid, original_idx: originalIdx, sacrifice_idx: sacrificeIdx})
        .then((user_data) => {
            setUserData(user_data);
            setOriginalIdx(-1);
            setSacrificeIdx(-1);
            setInfused(true);
        })
    }

    return (

        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
                {
                infused?
                <div id="infuseSuccess">
                    <div className="card">
                        { (previewCard && Object.keys(previewCard).length > 0) &&
                            <BaseCard card={previewCard}/>
                        }
                    </div>
                </div>
                :
                <div id="infuseContent">
                    <div className="card-selector">
                        {
                            <div className="card-grid-container">
                                <div className="card-grid infuse">
                                    {sortedCards("collection", 0).map((item, index) => ( filter(item, index) &&
                                        <BaseCard key={index}  card={item} scale={.5} onClick={() => handleCardSelect(index)}/>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div id="infuseCards">
                        <div className="card small" onClick={() => handleCardRemove(0, originalIdx)}>
                            { originalIdx !== -1 &&
                                <BaseCard card={cardsList[originalIdx]} scale={.5}/>
                            }
                        </div>
                        <div className="card small" onClick={() => handleCardRemove(1, sacrificeIdx)}>
                            { sacrificeIdx !== -1 &&
                                <BaseCard card={cardsList[sacrificeIdx]} scale={.5}/>
                            }
                        </div>
                    </div>
                    <div id="infusePreview">
                        <div className="card smaller">
                            { (previewCard && Object.keys(previewCard).length > 0) &&
                                <BaseCard card={previewCard} scale={.75}/>
                            }
                        </div>
                        <button id="infuseBtn" onClick={() => handleInfuse()}>Infuse</button>
                    </div>
                </div>
                }

            </div>
        </div>
    );
};

export default Infuse;