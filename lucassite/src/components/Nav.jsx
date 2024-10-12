import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Intro({selected, setPage}) {
    /*
    selected: 0, 1, 2 (which page is selected)
    onSelect(update selected parent state)
    */

    const LIM =  Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    const page0 = 0;
    const page1 = LIM * .3;
    const page2 = LIM * .7;
    const SCROLL_LOCS = [page0, page1, page2];

   const scrollAndSetPage = (pg) => {
    window.scrollTo({top: SCROLL_LOCS[pg], behavior: 'smooth'})
    setPage(pg);
   }

    const PAGES = ["Home", "Work", "Projects"]
    const NAV_POSITIONS = [[0,0], [0,100], [0,200]]

    useEffect(() => {
        const end_scroll_loc = LIM * .15;
        const pg2 = LIM * .6
        const handleScroll = () => {
            if(window.scrollY > end_scroll_loc) {
                setTranslations([[0, 0], [100, 0], [200, 0]])
                setVertical(true);
                if(window.scrollY > pg2) {
                    setPage(2);
                } else {
                    setPage(1);
                }
            } else if (end_scroll_loc >= window.scrollY) {
                setTranslations(NAV_POSITIONS)
                setVertical(false);
                setPage(0);
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
                    className={idx === selected ? 'selected' : ''}
                    onClick={() => scrollAndSetPage(idx)}
                >
                    {page}
                </li>
            ))}
        </ul>
    </div>
    )
    }

export default Intro
