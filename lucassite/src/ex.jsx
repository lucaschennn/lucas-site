import { useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { useParallax } from 'react-scroll-parallax'
import { Parallax } from 'react-scroll-parallax'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const vite_logo_parallax = useParallax({
    rotateY: [0, 360],
    scale: [0.5, 1, 'easeInQuad'],
  });

  const react_logo_parallax = useParallax<HTMLDivElement>({
    rotateY: [0, 360],
    scale: [0.5, 1, 'easeInQuad'],
  });

  return (
    <>
      <div>
        <div ref={vite_logo_parallax.ref}>
          <div className="test"></div>
          {/* <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a> */}
        </div>
        <Parallax translateY={[-20, 20]}>
          <div className="test" />
        </Parallax>
        <div ref={react_logo_parallax.ref}>
          <div className="test"></div>
          {/* <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a> */}
        </div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
