import { useState } from 'react'
import { useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { useParallax } from 'react-scroll-parallax'
import Background from './components/Background.jsx'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx';
import { ParallaxBanner } from 'react-scroll-parallax';

import './App.css'

function App() {
  /*

  will call components such as <Background/>, <KebabMenu/>

  on load: header, bio, avatar will transition in!

  state:
    settings: {useColorBG: bool, colorOpt: a | b | c | d, picOpt: e | f | g, slideshow: bool}
    scrollYPos: if scrollYPos > thresh, stop slideshow transitions; use for parallax and stuff
    page: 0,1,2 depending on if home, work, or projects
  */



  const [page, setPage] = useState(0);
  const MIN_PAGE_HEIGHTS = {
    xs: 1200,
    s: 1400,
    md: 1600,
  }
  const min_page_height = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      return MIN_PAGE_HEIGHTS.xs;
    } else if (screenWidth <= 900) {
      return MIN_PAGE_HEIGHTS.s;
    }
    return MIN_PAGE_HEIGHTS.md;
  }

  return (
    <>
      <Nav selected={page} setPage={setPage} min_page_height={min_page_height()}/>
      <Background page={page}/>
      <div>
        <Intro/>
        <Experience top={min_page_height()}/>
        <Projects top={min_page_height() * 2}/>
      </div>
    </>
  )
}

export default App
