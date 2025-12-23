import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import './index.scss'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCode, faRocket, faCog } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  const highlights = [
    { icon: faCode, text: 'C++ Modernization', subtext: 'Legacy code transformation' },
    { icon: faRocket, text: '30% Performance', subtext: 'CPU usage optimization' },
    { icon: faCog, text: 'Embedded Systems', subtext: 'Real-time solutions' }
  ]

  return (
    <>
      <div className="container home-page">
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={['H', 'e', 'l', 'l', 'o', ',', ' ', 'I', "'", 'm']}
                idx={1}
              />
            </div>
            <h1 className="name">
              <AnimatedLetters
                letterClass={letterClass}
                strArray={['P', 'r', 'a', 'l', 'a', 'd', 'h']}
                idx={12}
              />
            </h1>
            <div className="role">
              <span className="role-text">Software Engineer</span>
              <span className="role-divider">•</span>
              <span className="role-company">Raytheon</span>
            </div>
            <p className="tagline">
              Transforming legacy systems into modern, efficient solutions. 
              Passionate about embedded systems, performance optimization, and building robust software.
            </p>
            <div className="cta-buttons">
              <Link to="/about" className="btn-primary">
                View My Work
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <Logo />
          </div>
        </div>

        <div className="highlights-section">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="highlight-card">
              <FontAwesomeIcon icon={highlight.icon} className="highlight-icon" />
              <div className="highlight-content">
                <h3>{highlight.text}</h3>
                <p>{highlight.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
