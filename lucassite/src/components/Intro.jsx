import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Intro() {

  return (
    <div id="intro">
      <div id="bio">
        <h1>Hi, I'm Lucas Chen!</h1>
        <p>I'm a student at the University of Michigan studying computer science and UX design. </p>
      </div>
      <div>
        <img id="headshot" src="headshot.jpg"></img>
      </div>
    </div>
  )
}

export default Intro
