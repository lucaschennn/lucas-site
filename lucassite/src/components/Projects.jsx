import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Projects() {

  const [gifUpdate, setGifUpdate] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0})

  const replay = () => {
    setGifUpdate((prev) => prev + 1);
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (clientX - centerX) / 50; // Adjust divisor for intensity
      const offsetY = (clientY - centerY) / 50;

      setOffset({ x: offsetX, y: offsetY });
    };

    // Add the event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="projects">
        <ul>
            <li className="project-section">
                <div className="project-left">
                    <h4>Photographers' Favorites 2024 <a aria-label="Visit external project site" title="Visit external project site" target="_blank" href="https://specials.michigandaily.com/2024/photographers-favorites/">🔗</a></h4>
                    <h5>Project Lead | Developer</h5>
                    <div className="thumbnail-container" onMouseLeave={() => replay()} style={{
                        backgroundImage: 'url(thumbnails/photog_fav.png)',
                        backgroundPosition: `${offset.x + 50}% ${offset.y + 50}%`,
                        backgroundSize: '120%',
                      }}>
                      <img className="project-gif" key={gifUpdate} src="thumbnails/photog_fav.gif"/>
                    </div>
                </div>
                <img>
                </img>
                <div className="project-right">
                    <em>Photographers' Favorites</em> is an annual special edition published by the Michigan Daily that celebrates the work of its photographers' throughout the year.
                    <br/><br/> I led the effort for the 2024 edition, collaborating with the Video staff, Copy Editors, Engineering, and of course the Photo staff to create an eye-catching and display of the Daily's talent.
                    <br/><br/> Click the link to read! :)
                    <div className="experience-pills">
                      <button className="experience-pill">Wordpress 📖</button>
                      <button className="experience-pill">React ⚛️</button>
                      <button className="experience-pill">Tailwind CSS 🌀</button>
                    </div>
                </div>
            </li>
            <li className="project-section">
                <div className="project-left">
                    <h4>Lucas Chen Photo Portfolio <a aria-label="Visit external project site" title="Visit external project site" target="_blank" href="https://lucaschennn.github.io">🔗</a></h4>
                    <h5>Developer</h5>
                    <div className="thumbnail-container" onMouseLeave={() => replay()} style={{
                        backgroundImage: 'url(thumbnails/photosite.png)',
                        backgroundPosition: `${offset.x + 50}% ${offset.y + 50}%`,
                        backgroundSize: '120%',
                      }}>
                      <img className="project-gif" key={gifUpdate} src="thumbnails/photosite.gif"/>
                    </div>
                </div>
                <img>
                </img>
                <div className="project-right">
                    It's important for every photographer to have a point of contact for their clients. As a web developer, I figured why not build one from scratch.
                    <div className="experience-pills">
                      <button className="experience-pill">Vite ✌️</button>
                      <button className="experience-pill">React ⚛️</button>
                      <button className="experience-pill">Cloudinary ☁️</button>
                    </div>
                </div>
            </li>
            <li className="project-section">
                <div className="project-left">
                    <h4>Network File Server</h4>
                    <h5><em>for EECS 482 Operating Systems course</em></h5>

                </div>
                <img>
                </img>
                <div className="project-right">
                    For project 4 of the Operating Course, we were tasked with implementing a remote file server from scratch. Using all the tools we had learned and the design patterns involved in efficient, low level computing,
                    we created a file server that could create, read, update and delete files within a file system while handling multiple requests concurrently.
                    <div className="experience-pills">
                      <button className="experience-pill">C++ ©️</button>
                      <button className="experience-pill">Multithreading 🧵</button>
                      <button className="experience-pill">Sockets 🖧</button>
                    </div>
                </div>
            </li>
          </ul>
    </div>
  )
}

export default Projects
