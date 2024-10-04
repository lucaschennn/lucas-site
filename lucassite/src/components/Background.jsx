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
  useEffect(() => {
    window.scrollTo(0, 0);

    const start_scroll_loc = (document.body.scrollHeight) * .3;
    const end_scroll_loc = (document.body.scrollHeight) * .7;
    const max_blur = 70;
    const m = max_blur / (end_scroll_loc - start_scroll_loc);
    const handleScroll = () => {
      if(window.scrollY < start_scroll_loc) {
        setBlur(0);
        setOpacity(0);
      } else {
        const pos_after_start = window.scrollY-start_scroll_loc
        setBlur(Math.min(max_blur, m * pos_after_start))
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

 const [blur, setBlur] = useState(0);
 const [opacity, setOpacity] = useState(0);

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
        className="bg-parallax"
      />
      <div className={`bg-filter ${page > 0 ? "blur": ""}`}></div>
      <div className={`bg-color ${opacity === 1 ? "full-solid": ""}`}></div>
    </div>
  )
}

export default Background
