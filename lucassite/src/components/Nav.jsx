import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Intro(props) {
    /*
    selected: 0, 1, 2 (which page is selected)
    onSelect(update selected parent state)
    */

    const PAGES = ["Home", "Work", "Projects"]
    const NAV_POSITIONS = [[0,0], [0,100], [0,200]]

    useEffect(() => {
        const end_scroll_loc = (document.body.scrollHeight) * .3;
        const pg2 = (document.body.scrollHeight) * .65;
        const handleScroll = () => {
            if(window.scrollY > end_scroll_loc) {
                setTranslations([[0, 0], [100, 0], [200, 0]])
                setVertical(true);
                if(window.scrollY > pg2) {
                    props.setPage(2);
                } else {
                    props.setPage(1);
                }
            } else if (end_scroll_loc >= window.scrollY) {
                setTranslations(NAV_POSITIONS)
                setVertical(false);
                props.setPage(0);
            }
            //0 -> sh *.3 -> sh*.65
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const [translations, setTranslations] = useState(NAV_POSITIONS)
    const [vertical, setVertical] = useState(false);


    return (
    <div id="nav">
        <ul className={vertical ? 'vertical' : 'horizontal'}>
            {PAGES.map((page, idx) => (
                <li
                    key={idx}
                    style={{top: translations[idx][0] + 'px', left: translations[idx][1] + 'px'}}
                    className={idx === props.selected ? 'selected' : ''}
                    onClick={() => props.onSelect(idx)}
                >
                    {page}
                </li>
            ))}
        </ul>
    </div>
    )
    }

export default Intro
