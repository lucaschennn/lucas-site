import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Projects() {

  return (
    <div id="projects">
        <ul>
            <li className="project-section">
                <div className="project-left">
                    <h4>Photographers' Favorites 2024 <a aria-label="Visit external project site" title="Visit external project site" target="_blank" href="https://specials.michigandaily.com/2024/photographers-favorites/">🔗</a></h4>
                    <h5>Project Lead | developer</h5>
                    <div id="thumbnail-container" style={{backgroundImage: 'url(thumbnails/photog_fav.png)'}}>
                      <img src="thumbnails/photog_fav.gif"/>
                    </div>
                </div>
                <img>
                </img>
                <div className="project-right">
                    <div className="experience-pills">
                      <button className="experience-pill">Wordpress 📖</button>
                      <button className="experience-pill">React 🟨</button>
                      <button className="experience-pill">Tailwind CSS 🌀</button>
                    </div>
                    <em>Photographers' Favorites</em> is an annual special edition published by the Michigan Daily that celebrates the work of its photographers' throughout the year. <br/>
                    <br/> I led the effort for the 2024 edition, collaborating with the Video staff, Copy Editors, Engineering, and of course the Photo staff to create an eye-catching and display of the Daily's talent.
                </div>
            </li>
          </ul>
    </div>
  )
}

export default Projects
