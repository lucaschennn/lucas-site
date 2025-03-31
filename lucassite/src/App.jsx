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
import { AuthProvider } from './components/AuthContext.jsx'

import './App.css'

function App() {

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
    <AuthProvider>
      <Nav selected={page} setPage={setPage} min_page_height={min_page_height()}/>
      <Background page={page}/>
      <div>
        <Intro/>
        <Experience top={min_page_height()} page={page}/>
        <Projects top={min_page_height() * 2} page={page}/>
      </div>
    </AuthProvider>
  )
}

export default App
