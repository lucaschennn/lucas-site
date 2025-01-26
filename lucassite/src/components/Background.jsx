import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';
import Intro from './Intro.jsx'


import '../App.css'

const ANIMALS = ['🐶','🐵','🐼','🐱','🦊','🦝','🐮','🐹','🐰','🐻'];

const getRandomLoadingIcons = () => {
  const shuffled = [...ANIMALS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const loadingIcons = getRandomLoadingIcons();

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
    const end = window.innerHeight / 1.5;
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


    //remove loading icons after period
    const clearLoad = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, false);
    }

    return () => {
            clearTimeout(clearLoad);
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
            <li style={{'--i': 1}}>{loadingIcons[0]}</li>
            <li style={{'--i': 2}}>{loadingIcons[1]}</li>
            <li style={{'--i': 3}}>{loadingIcons[2]}</li>
          </ul>
        </div>
      </div>
      <div id="goGoGo" className={opacity && page === 0 ? '':'hidden'}>
        <div id="scrollDown">
            <ul>
              <li style={{'--i': 1}}>⏬</li>
              <li style={{'--i': 2}}>⏬</li>
              <li style={{'--i': 3}}>⏬</li>
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
      <div className={`bg-color ${opacity === true ? "full-solid": ""}`}>
      </div>
    </div>
  )
}

export default Background
