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

  return (
    <>
      <Nav selected={page} setPage={setPage}/>
      <Background page={page}/>
      <div>
        <Intro/>
        <Experience/>
        <Projects/>
      </div>
    </>
  )
}

export default App
