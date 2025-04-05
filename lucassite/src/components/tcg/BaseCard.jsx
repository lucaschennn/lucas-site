import React from 'react';
import { useState, useEffect } from 'react'


const BaseCard = ({card, onClick}) => {
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
            <div className="card" onClick={onClick}>
                
                <div className="card-headings">
                    <h4>{card.name} {quality}</h4>
                    <h5>{card.collection}</h5>
                </div>
                {
                    Object.keys(card.attributes).map((key, index) => (
                        <li className="card-attribute" key={index}>{key} {card.attributes[key]}</li>
                    ))
                }
                <p className="card-description">{card.description}</p>
            </div>
        </>
    )
};

export default BaseCard;