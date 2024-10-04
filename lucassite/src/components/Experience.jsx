import { useState } from 'react'
import { useEffect } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from 'react-scroll-parallax';


import '../App.css'

function Experience() {

  return (
    <div id="experience">
        <ul>
            <li className="experience-section">
                <div className="experience-left">
                    <h4>UMich Private Tutor</h4>
                    <h5>2024 – present</h5>
                </div>
                <div className="experience-right">
                    I assist students who benefit from personalized, 1-on-1 tutoring sessions in their computer science courses.
                    <div className="experience-pills">
                        <button className="experience-pill">Teaching 🎓</button>
                    </div>
                </div>
            </li>
            <li className="experience-section">
                <div className="experience-left">
                    <h4>The Michigan Daily</h4>
                    <h5>2021 – Present</h5>
                </div>
                <div className="experience-right">
                    I led collaborative discussion sections to review fundamental coding concepts.
                    <div className="experience-pills">
                        <button className="experience-pill">Adobe Suite 📸</button>
                    </div>
                </div>
            </li>
            <li className="experience-section">
                <div className="experience-left">
                    <h4>Charles Schwab Intern (SPIRAL)</h4>
                    <h5>June – August 2024</h5>
                </div>
                <div className="experience-right">
                    I built the support request pipeline for Schwab advisors to easily submit bugfix and feature request forms.
                    <div className="experience-pills">
                        <button className="experience-pill">Angular 💻</button>
                        <button className="experience-pill">Java 🚀</button>
                        <button className="experience-pill">Jira API ⚙️</button>
                    </div>
                </div>
            </li>
            <li className="experience-section">
                <div className="experience-left">
                    <h4>Charles Schwab Intern (SPIDER)</h4>
                    <h5>June – August 2023</h5>
                </div>
                <div className="experience-right">
                I led an intern project to reimagine Schwab's website where our business proposal stood out and was adopted and implemented by Schwab.
                <div className="experience-pills">
                        <button className="experience-pill">Angular 💻</button>
                        <button className="experience-pill">Atlassian Suite 🛠️</button>
                        <button className="experience-pill">Figma 🎨</button>
                    </div>
                </div>
            </li>
            <li className="experience-section">
                <div className="experience-left">
                    <h4>UMich Intro to Programming TA</h4>
                    <h5>2021 – 2022</h5>
                </div>
                <div className="experience-right">
                    I led collaborative discussion sections to review fundamental coding concepts.
                    <div className="experience-pills">
                        <button className="experience-pill">Teaching 🎓</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default Experience
