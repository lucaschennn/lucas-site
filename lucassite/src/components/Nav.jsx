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

    // const LIM =  Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    //     document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    const page0 = 0;
    // const page1 = LIM * .3;
    // const page2 = LIM * .7;
    const page1 = document.body.scrollHeight;
    const page2 = document.body.scrollHeight * 2;
    const SCROLL_LOCS = [page0, page1, page2];

   const scrollAndSetPage = (pg) => {
    window.scrollTo({top: SCROLL_LOCS[pg], behavior: 'smooth'})
    setPage(pg);
   }

    const PAGES = ["Home", "Work", "Projects"]
    const NAV_POSITIONS = [[0,0], [0,100], [0,200]]

    useEffect(() => {
        const begin_vert_nav = 100;
        const handleScroll = () => {
            if(window.scrollY > begin_vert_nav) {
                setTranslations([[0, 0], [100, 0], [200, 0]])
                setVertical(true);
            } else {
                setTranslations(NAV_POSITIONS)
                setVertical(false);
            }

            if(window.scrollY > page2) {
                setPage(2);
            } else if (window.scrollY > page1) {
                setPage(1);
            } else {
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
