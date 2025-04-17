import React from 'react';
import { useState, useEffect } from 'react'

import { useSpring, animated } from '@react-spring/web';

import BaseCard from './BaseCard.jsx';

const NewCard = ({card, onClick}) => {

    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
      })

    return (
        <div className="new-card-wrapper" onClick={() => setFlipped(flipped => !flipped)}>
            <animated.div className="card new-card" style={{ opacity: opacity.to(o => 1 - o), transform }}>
                
            </animated.div>
            <animated.div className="card new-card"
            style={{opacity, transform, rotateY: '180deg',}}>
                <BaseCard card={card} onClick={onClick} scale={.75}/>
            </animated.div>
        </div>
    )
};

export default NewCard;