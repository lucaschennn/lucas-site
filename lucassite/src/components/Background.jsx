import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';
import Intro from './Intro.jsx'


import '../App.css'

function Background({page}) {
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
  const LIM =  Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
  useEffect(() => {
    window.scrollTo(0, 0);
    const start_scroll_loc = (document.body.scrollHeight) * .4;
    const end_scroll_loc = (document.body.scrollHeight) * .7;
    console.log(start_scroll_loc, end_scroll_loc, LIM)
    const handleScroll = () => {
      if(window.scrollY < start_scroll_loc) {
        setOpacity(0);
      } else {
        window.scrollY > end_scroll_loc ? setOpacity(1) : setOpacity(.5);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  // useEffect(() => {
  //   setOpacity(1 - (page  / 2));
  // }, [page])

 const urls = ["bg1/bg.jpg", "bg1/front.png"]
 const bgImgStyle = {
  backgroundImage: urls.map(img => `url(${img})`).join(", "),
 }

 const [opacity, setOpacity] = useState(0);
 const [loaded ,setLoaded] = useState(false);

 const handleImageLoad = () => {
  console.log("what")
  setLoaded(true);
 }

  return (
    <div id="background">

      <ParallaxBanner
        layers={[
          { image: 'bg1/bg.jpg', translateY: [0, 60],},
          {
            translateY: [0, 0],
            children: (
              <Intro/>
            ),
          },
          { image: 'bg1/middle.png', translateY: [0, 40],},
          { image: 'bg1/front.png', translateY: [0, 30],},
        ]}
        className={`bg-parallax ${!loaded ? "loading": ""}`}
        onLoad={handleImageLoad}
      />
      <div className={`bg-filter ${page > 0 ? "blur": ""}`}></div>
      <div className={`bg-color ${opacity === 1 ? "full-solid": ""}`}></div>
    </div>
  )
}

export default Background
