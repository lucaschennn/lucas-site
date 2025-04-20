import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Projects({top, page}) {

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
    <div id="projects" style={{top: `${top}px`}}>
        <ul>
            <li className={page === 2 ? 'project-section':'project-section hidden'}>
                <div className="project-left">
                    <h4>
                      <a aria-label="Visit external project site" title="Visit external project site" target="_blank" href="https://specials.michigandaily.com/2024/photographers-favorites/">
                        Photographers' Favorites 2024🔗
                      </a>
                    </h4>
                    <h5 className="subtitle">Project Lead | Developer</h5>
                    <div className="thumbnail-container" onMouseLeave={() => replay()} style={{
                        backgroundImage: 'url(thumbnails/photog_fav.png)',
                        backgroundPosition: `${offset.x + 50}% ${offset.y + 50}%`,
                        backgroundSize: '110%',
                      }}>
                      <img className="project-gif" key={gifUpdate} src="thumbnails/photog_fav.gif"/>
                    </div>
                </div>
                <img>
                </img>
                <div className="project-right">
                    <em>Photographers' Favorites</em> is an annual special edition published by the Michigan Daily that celebrates the work of its photographers' throughout the year.
                    <br/><br/> I led the effort for the 2024 edition, collaborating with the Video staff, Copy Editors, Engineering, and of course the Photo staff to create an eye-catching display of the Daily's talent.
                    <br/><br/> Click the link to read!
                    <div className="experience-pills">
                      <button className="experience-pill">Wordpress📖</button>
                      <button className="experience-pill">React⚛️</button>
                      <button className="experience-pill">Tailwind CSS🌀</button>
                    </div>
                </div>
            </li>
            <li className={page === 2 ? 'project-section':'project-section hidden'}>
                <div className="project-left">
                    <h4><a aria-label="Visit external project site" title="Visit external project site" target="_blank" href="https://lucaschennn.github.io">Lucas Chen Photo Portfolio 🔗</a></h4>
                    <h5 className="subtitle">Developer</h5>
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
                      <button className="experience-pill">Vite✌️</button>
                      <button className="experience-pill">React⚛️</button>
                      <button className="experience-pill">Cloudinary☁️</button>
                    </div>
                </div>
            </li>
            <li className={page === 2 ? 'project-section':'project-section hidden'}>
                <div className="project-left">
                    <h4>Learning Dog Breeds</h4>
                    <h5 className="subtitle">for EECS 445 Machine Learning course</h5>
                    <img src="https://brand.umich.edu/assets/email-logo.png" className="experience-thumbnail"/>
                </div>
                <img>
                </img>
                <div className="project-right">
                    Using Convolutional Neural Networks, Transfer Leraning and Transformers, we were tasked to optimize a network that could classify images of dog breeds 🐶.
                    <br/><br/>
                    The project involved data cleaning, manipulating features, bootstrapping and cross validating samples, and developing a model from scratch to achieve this task. I was able to achieve a test accuracy of .71.
                    <div className="experience-pills">
                      <button className="experience-pill">Python🐍</button>
                      <button className="experience-pill">PyTorch🔥</button>
                      <button className="experience-pill">NumPy🔢</button>
                    </div>
                </div>
            </li>
            <li className={page === 2 ? 'project-section':'project-section hidden'}>
                <div className="project-left">
                    <h4>Network File Server</h4>
                    <h5 className="subtitle">for EECS 482 Operating Systems course</h5>
                    <img src="https://brand.umich.edu/assets/email-logo.png" className="experience-thumbnail"/>
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
