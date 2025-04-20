import React, { useState, useEffect } from "react";
import BaseCard from "./BaseCard.jsx";
import NewCard from "./NewCard.jsx";

const OpenPack = ({ isOpen, onClose, setUserData, uid, openPack }) => {
    if (!isOpen) return null; // Prevents rendering when closed

    const [newCards, setNewCards] = useState(false);
    const [topCard, setTopCard] = useState(0);
    const [viewState, setViewState] = useState(0);
    const [hasFlipped, setHasFlipped] = useState([]);

    useEffect(() => {
        if(hasFlipped.length && hasFlipped.every(card => card === true)) {
            setViewState(2);
        }
    }, [hasFlipped])

    const calculatePosition = (index, length) => {
        const width = 800;

        return width / (length - 1) * index - (width / 2);
    }
    

    const handlePackOpen = () => {
        openPack({uid: uid})
            .then((res => {
                setUserData((prev) => (
                    {
                        ...res.data,
                        uid: prev.data.uid,
                    }
                ));
                setNewCards(res.data.new_cards)
                setHasFlipped(Array(res.data.new_cards.length).fill(false));
                setViewState(1);
            }))
        // setNewCards([
        //     {
        //         "collection": "mammal",
        //         "description": "Sheep are known for their gentle nature and strong sense of community. While not the fastest or the strongest, they rely on their flock for protection. Their unity allows them to resist attacks better when together. Though easily startled, their perseverance and teamwork make them a resilient presence on the field.",
        //         "name": "🐑",
        //         "attributes": {
        //             "calm": 8,
        //             "fluffiness": 8,
        //             "passivity": 10
        //         },
        //         "rarity": 1
        //     },
        //     {
        //         "name": "🦄",
        //         "description": "Unicorns are legendary creatures of grace, strength, and untamed magic. With their shimmering coats, flowing manes, and iconic spiraled horns, they radiate an aura of purity and power. Known for their ability to heal and protect, unicorns are rare beings that few are lucky enough to witness.",
        //         "collection": "mammal",
        //         "rarity": 4,
        //         "attributes": {
        //             "purity": 40,
        //             "elegance": 46,
        //             "iridescence": 41
        //         }
        //     },
        //     {
        //         "name": "🐄",
        //         "collection": "mammal",
        //         "rarity": 1,
        //         "description": "Cows are sturdy, resilient creatures known for their calm demeanor and impressive endurance. With their strong legs and hefty build, they stand their ground against any challenge. Though not the fastest, their steady pace and unwavering nature make them a force to be reckoned with",
        //         "attributes": {
        //             "serenity": 4,
        //             "digestive efficiency": 1,
        //             "grazing": 5
        //         }
        //     },
        //     {
        //         "name": "🐄",
        //         "collection": "mammal",
        //         "rarity": 1,
        //         "description": "Cows are sturdy, resilient creatures known for their calm demeanor and impressive endurance. With their strong legs and hefty build, they stand their ground against any challenge. Though not the fastest, their steady pace and unwavering nature make them a force to be reckoned with",
        //         "attributes": {
        //             "serenity": 4,
        //             "digestive efficiency": 1,
        //             "grazing": 5
        //         }
        //     },
        //     {
        //         "name": "🐄",
        //         "collection": "mammal",
        //         "rarity": 1,
        //         "description": "Cows are sturdy, resilient creatures known for their calm demeanor and impressive endurance. With their strong legs and hefty build, they stand their ground against any challenge. Though not the fastest, their steady pace and unwavering nature make them a force to be reckoned with",
        //         "attributes": {
        //             "serenity": 4,
        //             "digestive efficiency": 1,
        //             "grazing": 5
        //         }
        //     }
        // ])
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content open-pack" onClick={(e) => e.stopPropagation()}>
                <div id="openPackView">
                    {viewState === 0 &&
                        <button id="openPackBtn" onClick={() => handlePackOpen()}>Open!</button>
                    }
                    {viewState >= 1 &&
                    <div id="newCardStack">
                        {newCards.map((item, index) => (
                            <NewCard key={index} index={index} card={item} position={calculatePosition(index, newCards.length)} setHasFlipped={setHasFlipped}/>
                        ))}
                    </div>
                    }
                </div>
                <div className="done-container">
                    <button className={`done-button ${viewState === 2 ? '' : 'grayed'}`} onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default OpenPack;