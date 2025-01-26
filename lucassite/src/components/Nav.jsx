import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Intro({selected, setPage, min_page_height}) {
    /*
    selected: 0, 1, 2 (which page is selected)
    onSelect(update selected parent state)
    */

    const page0 = 0;
    const page1 = min_page_height - 200;
    const page2 = min_page_height * 2 - 200;
    const SCROLL_LOCS = [page0, page1, page2];

   const scrollAndSetPage = (pg) => {
    window.scrollTo({top: SCROLL_LOCS[pg] + 1, behavior: 'smooth'})
    setPage(pg);
   }

    const PAGES = ["Home", "Work", "Projects"]
    const NAV_POSITIONS = [[0,0], [0,100], [0,200]]

    useEffect(() => {
        const begin_vert_nav = 100;
        const handleScroll = () => {
            const end_scroll = min_page_height * 2;
            setNavGradient((window.scrollY / end_scroll) * 100);

            if(window.scrollY > begin_vert_nav) {
                setTranslations([[0, 0], [100, 0], [200, 0]])
                setVertical(true);
            } else {
                setTranslations(NAV_POSITIONS)
                setVertical(false);
            }

            if(window.scrollY >= page2) {
                setPage(2);
                return;
            } else if (window.scrollY >= page1) {
                setPage(1);
                return;
            } else {
                setPage(0);
                return;
            }

        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const [translations, setTranslations] = useState(NAV_POSITIONS)
    const [vertical, setVertical] = useState(false);
    const [navGradient, setNavGradient] = useState(0);


    return (
    <div id="nav">
        <div style={{
            position: 'absolute',
            width: '200px',
            height: '215px',
            top: '20px',
        }}>
            <div style={{
                position: 'relative',
                top: `${navGradient}%`,
                boxShadow: '-60px 0px 75px 15px #ccc',
                display: `${vertical ? '' : 'none'}`,
            }}>
                
            </div>
        </div>
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
