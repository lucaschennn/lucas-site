import React from 'react';
import { useState, useEffect } from 'react'

import { useSpring, animated } from '@react-spring/web';
import { useGesture, useDrag } from '@use-gesture/react';

import BaseCard from './BaseCard.jsx';


const Card = ({card, onClick, index, topCard, setTopCard, numCards}) => {
    //card.attributes
    //card.name
    //card.description
    //card.collection
    //card.rarity
    const rotateCard = () => {
        setTopCard((prev) => {
            const nextIdx = (prev + 1) % numCards;
            // const nextIdx = prev;
            return nextIdx;
        })
    }

    
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
        () => ({
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          zoom: 0,
          x: 0,
          y: 0,
          config: { tension: 120, friction: 10 },
        })
      )
    // const target = useRef(null)
    const bind = useGesture(
        {
            onDrag: ({ active, down, movement: [mx], offset: [x], direction, velocity }) => {
                if(!down && velocity[0] > .2) {
                    api({ x: (window.innerWidth - 600) * direction[0], rotateX: 0, rotateY: 0, scale: active ? .9 : 1 });
                    rotateCard();
                    return;
                }
                x = down ? mx : 0
                api({ x, rotateX: 0, rotateY: 0, scale: active ? .9 : 1 });
            }
        },
        { eventOptions: { passive: false } }
    )

    const calcOffset = (constant) => {
        return constant - (constant / numCards) * getOrdering()
    };

    const getOrdering = () => {
        return ((numCards-1 - index) + topCard) % numCards-1
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            api.start({ x: 0, y: 0, scale: 1, immediate: true });
        }, 120); // delay in ms — adjust as needed to match your fly-out animation duration
      
        return () => clearTimeout(timeout); // cleanup in case topCard changes again quickly
      });

    
    return (
        <>
            <animated.div className="Card" onClick={onClick} {...bind()} style={{
                x,
                y,
                zIndex: getOrdering(),
                transform: `translate(${calcOffset(20)}px, ${calcOffset(5)}px)`,
                pointerEvents: index === topCard ? 'auto' : 'none',
                position: 'absolute',
                touchAction: 'none',
            }}>
                <BaseCard card={card}/>
            </animated.div>
        </>
    )
};

export default Card;