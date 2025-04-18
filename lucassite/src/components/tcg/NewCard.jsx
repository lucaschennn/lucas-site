import React from 'react';
import { useState, useEffect } from 'react'

import { useSpring, animated } from '@react-spring/web';

import BaseCard from './BaseCard.jsx';

const NewCard = ({card, onClick, position}) => {

    const [flipped, setFlipped] = useState(false);
    const springs = useSpring({
        from: {
            x: 0
        },
        to: {
            transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
            x: position,
        },
        config: { mass: 1, tension: 500, friction: 80 },
      })

    return (
        <div className="new-card-wrapper">
            <animated.div className="card new-card" style={{ ...springs}} onClick={() => setFlipped(flipped => !flipped)}>
                
            </animated.div>
            <animated.div className="card new-card"
            style={{...springs, rotateY: '180deg',}} onClick={() => setFlipped(flipped => !flipped)}>
                <BaseCard card={card} onClick={onClick} scale={.75}/>
            </animated.div>
        </div>
    )
};

export default NewCard;