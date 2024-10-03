import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';
import Intro from './Intro.jsx'


import '../App.css'

function Background(props) {
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
    const max_blur = 100;
    const m = 100 / (end_scroll_loc - start_scroll_loc);
    const handleScroll = () => {
      if(window.scrollY < start_scroll_loc) {
        setBlur(0);
      } else {
        const pos_after_start = window.scrollY-start_scroll_loc
        setBlur(Math.min(max_blur, m * pos_after_start))
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, [])

 const urls = ["bg1/bg.jpg", "bg1/front.png"]
 const bgImgStyle = {
  backgroundImage: urls.map(img => `url(${img})`).join(", "),
 }

 const [blur, setBlur] = useState(0);

  return (
    <div id="background">

      <ParallaxBanner
        layers={[
          { image: 'bg1/bg.jpg', translateY: [0, 60], style: {filter: `blur(${blur}px)`}},
          {
            translateY: [0, 0],
            children: (
              <Intro/>
            ),
          },
          { image: 'bg1/middle.png', translateY: [0, 40], style: {filter: `blur(${blur}px)`}},
          { image: 'bg1/front.png', translateY: [0, 30], style: {filter: `blur(${blur}px)`}},
        ]}
        className="bg-parallax"
      />
    </div>
  )
}

export default Background
