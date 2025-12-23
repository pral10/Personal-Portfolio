import './index.scss'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudSun,
  faGamepad,
  faCalculator,
  faLaptopCode,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons'
import portfolioData from '../../data/portfolio.json'

const projectIcons = {
  'Weather App': faCloudSun,
  'Snake Game': faGamepad,
  'Calculator': faCalculator,
  'Portfolio Website': faLaptopCode,
  'Interest Calculator': faChartLine,
}

const projectGradients = {
  'Weather App': ['#4fc3f7', '#63a8ff', '#7ad7ff'],
  'Snake Game': ['#ff6b6b', '#ff8e53', '#ffa726'],
  'Calculator': ['#66bb6a', '#81c784', '#a5d6a7'],
  'Portfolio Website': ['#ab47bc', '#ba68c8', '#ce93d8'],
  'Interest Calculator': ['#42a5f5', '#64b5f6', '#90caf9'],
}

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <section className="container portfolio-page" aria-label="Portfolio projects">
        <div className="portfolio-header fade-in">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['P', 'r', 'o', 'j', 'e', 'c', 't', 's']}
              idx={15}
            />
          </h1>
          <p className="portfolio-subtitle">
            A curated selection of projects demonstrating expertise in full-stack development, embedded systems, and software engineering. 
            From modern web applications to performance-optimized solutions.
          </p>
        </div>

        <div className="images-container">
          {portfolioData.portfolio.map((port, idx) => (
            <article
              className="image-box"
              key={idx}
              tabIndex={0}
              aria-label={`Project titled ${port.title}. ${port.description}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.open(port.url, '_blank')
                }
              }}
            >
              <div className="icon-wrapper">
                <div 
                  className="icon-background"
                  style={{
                    background: `linear-gradient(135deg, ${projectGradients[port.title]?.[0] || '#4fc3f7'} 0%, ${projectGradients[port.title]?.[1] || '#63a8ff'} 50%, ${projectGradients[port.title]?.[2] || '#7ad7ff'} 100%)`
                  }}
                >
                  <div className="animated-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                  </div>
                  <FontAwesomeIcon 
                    icon={projectIcons[port.title] || faLaptopCode} 
                    className="project-icon"
                  />
                  <div className="icon-glow"></div>
                </div>
                <div className="view-overlay">
                  <span className="view-text">View Project →</span>
                </div>
              </div>
              <div className="content">
                <h3 className="title">{port.title}</h3>
                <p className="description">{port.description}</p>
                <div className="tech-stack">
                  {port.description.split(' - ')[0].split(', ').map((tech, i) => (
                    <span key={i} className="tech-badge">{tech.trim()}</span>
                  ))}
                </div>
                <button
                  className="btn"
                  aria-label={`View project: ${port.title}`}
                  onClick={() => window.open(port.url, '_blank')}
                >
                  View Live Demo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Loader type="pacman" />
    </>
  )
}

export default Portfolio
