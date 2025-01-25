import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';
import Intro from './Intro.jsx'


import '../App.css'

function Background({page, min_page_height}) {
  /*
    props.useColorBG (bool)
    props.colorOpt
    props.picOpt
    props.slideshow (bool)
  */
  /*
  const BACKGROUND_IMGS = {
    "bg1": 3,
  }
  */
  useEffect(() => {
    window.scrollTo(0, 0);
    const end = window.innerHeight;
    console.log(end);
    const handleScroll = () => {
      setOpacity(window.scrollY > end);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(true);
    };

    window.addEventListener('load', handleLoad);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

 const urls = ["bg1/bg.jpg", "bg1/front.png"]
 const bgImgStyle = {
  backgroundImage: urls.map(img => `url(${img})`).join(", "),
 }

 const [opacity, setOpacity] = useState(false);
 const [loaded, setLoaded] = useState(false);

  return (
    <div id="background">
      <div id="loadScreen" className={loaded ? 'hidden':''}>
        <div id="spinner">
          <ul>
            <li style={{'--i': 1}}>🐶</li>
            <li style={{'--i': 2}}>🐶</li>
            <li style={{'--i': 3}}>🐶</li>
          </ul>
        </div>
      </div>

      <ParallaxBanner
        layers={[
          { image: 'bg1/bg_2.webp', translateY: [0, 60],},
          { image: 'bg1/middle_2.webp', translateY: [0, 40],},
          { image: 'bg1/front_2.webp', translateY: [0, 30],},
        ]}
        className={`bg-parallax ${!loaded ? "loading": ""}`}
      />
      {/* <div className={`bg-filter ${page > 0 ? "blur": ""}`}></div> */}
      <div className={`bg-color ${opacity === true ? "full-solid": ""}`}></div>
    </div>
  )
}

export default Background
