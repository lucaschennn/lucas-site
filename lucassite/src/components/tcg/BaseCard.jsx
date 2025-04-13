import React from 'react';
import { useState, useEffect } from 'react'


const BaseCard = ({card, onClick, scale=1}) => {
    //card.attributes
    //card.name
    //card.description
    //card.collection
    //card.rarity

    let quality = 0;

    for (let key in card.attributes) {
        quality += Number(card.attributes[key]);
    }

    return (
        <>
            <div className="card" onClick={onClick} style={{
                    "width": `${200 * scale}px`,
                    "height": `${300 * scale}px`,
                    "padding": `${10 * scale}px`,
            }}>
                <div>
                    <div className="card-headings" style={{
                    "transform": `scale(${scale})`,
                    "transform-origin": "top left",
                    }}>
                        <h4>{card.name} {quality}</h4>
                        <h5>{card.collection}</h5>
                    </div>
                    {
                        Object.keys(card.attributes).map((key, index) => (
                            <li className="card-attribute" key={index} style={{
                                "font-size": `${16 * scale}px`,
                                }}>{key} {card.attributes[key]}</li>
                        ))
                    }
                    <p className="card-description" style={{
                    "font-size": `${10 * scale}px`,
                    }}>{card.description}</p>
                </div>
            </div>
        </>
    )
};

export default BaseCard;