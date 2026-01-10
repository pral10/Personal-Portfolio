import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCode,
  faRocket,
  faCog,
  faChartLine,
  faBriefcase,
  faCalendarAlt,
  faMapMarkerAlt,
  faGraduationCap,
  faFlask,
  faBrain,
} from '@fortawesome/free-solid-svg-icons'
import {
  faCuttlefish,
  faReact,
  faPython,
  faJava,
  faJs,
  faHtml5,
  faCss3,
  faAngular,
} from '@fortawesome/free-brands-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  const skills = {
    'Core Languages': [
      { name: 'C++', icon: faCuttlefish, level: 95 },
      { name: 'Python', icon: faPython, level: 85 },
      { name: 'Java', icon: faJava, level: 80 },
      { name: 'JavaScript', icon: faJs, level: 85 },
    ],
    'Web Technologies': [
      { name: 'React', icon: faReact, level: 85 },
      { name: 'Angular', icon: faAngular, level: 75 },
      { name: 'HTML5', icon: faHtml5, level: 90 },
      { name: 'CSS3', icon: faCss3, level: 90 },
    ],
    'Specializations': [
      { name: 'Embedded Systems', icon: faCog, level: 90 },
      { name: 'Legacy Code Modernization', icon: faCode, level: 85 },
      { name: 'Performance Optimization', icon: faChartLine, level: 88 },
      { name: 'Object-Oriented Design', icon: faRocket, level: 85 },
    ]
  }

  const experiences = [
    {
      company: 'Raytheon',
      position: 'Software Engineer',
      location: 'Tewksbury, MA',
      period: 'January 2024 - Present',
      achievements: [
        {
          icon: faCog,
          title: 'Legacy System Modernization',
          description: 'Refactored LynxOS embedded codebase into event-driven C++ architecture, reducing CPU usage by 30% and improving maintainability'
        },
        {
          icon: faRocket,
          title: 'UI Modernization',
          description: 'Modernized C++ UI components, resulting in 25% reduction in operator training time and improved user experience'
        },
        {
          icon: faChartLine,
          title: 'Build System Redesign',
          description: 'Redesigned legacy build tooling from scratch, cutting build times and increasing team productivity by 20%'
        },
        {
          icon: faCode,
          title: 'Quality & Stability',
          description: 'Resolved critical system defects averaging 5 per sprint, improving overall system reliability through systematic debugging'
        },
        {
          icon: faBriefcase,
          title: 'Release Delivery',
          description: 'Owned build pipeline and testing for 5 software releases, maintaining on-time delivery with zero deployment issues'
        }
      ]
    },
    {
      company: 'University of Massachusetts Boston',
      position: 'Undergraduate Research Assistant',
      location: 'Boston, MA',
      period: 'September 2022 - January 2023',
      achievements: [
        {
          icon: faBrain,
          title: 'ML-Based Visual Recognition',
          description: 'Developed Python-based ML models for automated defect identification from visual data, achieving accurate pattern recognition and prediction'
        },
        {
          icon: faFlask,
          title: 'Research & Data Analysis',
          description: 'Conducted research on visual recognition algorithms, implemented data processing pipelines, and documented findings for academic review'
        }
      ]
    }
  ]

  const education = {
    institution: 'University of Massachusetts Boston',
    degree: 'Bachelor of Science in Computer Science',
    location: 'Boston, MA',
    period: 'September 2019 - May 2023',
    gpa: '3.5'
  }

  return (
    <>
      <section className="container about-page" aria-label="About me section">
        <div className="about-header fade-in">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't']}
              idx={15}
            />
          </h1>
          <p className="intro-text">
            Software Engineer working on embedded systems and C++ modernization at Raytheon. 
            I focus on refactoring legacy code, optimizing performance, and improving developer workflows. 
            Previously did research on ML-based visual recognition at UMass Boston.
          </p>
        </div>

        <div className="about-content">
          {/* Experience Section */}
          <div className="experience-section fade-in">
            <div className="section-header">
              <FontAwesomeIcon icon={faBriefcase} className="section-icon" />
              <h2>Professional Experience</h2>
            </div>
            
            {experiences.map((experience, expIdx) => (
              <div key={expIdx} className="experience-card">
                <div className="experience-header">
                  <div>
                    <h3 className="company">{experience.company}</h3>
                    <h4 className="position">{experience.position}</h4>
                  </div>
                  <div className="experience-meta">
                    <span><FontAwesomeIcon icon={faCalendarAlt} /> {experience.period}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {experience.location}</span>
                  </div>
                </div>

                <div className="achievements-grid">
                  {experience.achievements.map((achievement, idx) => (
                    <div key={idx} className="achievement-card">
                      <FontAwesomeIcon icon={achievement.icon} className="achievement-icon" />
                      <div>
                        <h5>{achievement.title}</h5>
                        <p>{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="education-section fade-in">
            <div className="section-header">
              <FontAwesomeIcon icon={faGraduationCap} className="section-icon" />
              <h2>Education</h2>
            </div>
            
            <div className="education-card">
              <div className="education-header">
                <div>
                  <h3 className="institution">{education.institution}</h3>
                  <h4 className="degree">{education.degree}</h4>
                </div>
                <div className="education-meta">
                  <span><FontAwesomeIcon icon={faCalendarAlt} /> {education.period}</span>
                  <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {education.location}</span>
                  <span className="gpa">GPA: {education.gpa}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="skills-section fade-in">
            <div className="section-header">
              <FontAwesomeIcon icon={faCode} className="section-icon" />
              <h2>Technical Skills</h2>
            </div>

            {Object.entries(skills).map(([category, items], catIdx) => (
              <div key={catIdx} className="skill-category">
                <h3 className="category-title">{category}</h3>
                <div className="skills-grid">
                  {items.map((skill, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-header">
                        <FontAwesomeIcon icon={skill.icon} className="skill-icon" />
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Personal Note */}
          <div className="personal-note fade-in">
            <p>
              I enjoy working on side projects, learning new technologies, and occasionally watching sports. 
              Always looking for opportunities to solve interesting problems and build things that matter.
            </p>
            </div>
        </div>
      </section>
      <Loader type="pacman" />
    </>
  )
}

export default About
