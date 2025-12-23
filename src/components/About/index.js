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
          icon: faRocket,
          title: 'UI Enhancement & Training Reduction',
          description: 'Delivered enhanced user interface through C++ modernization, reducing operator training time by 25%'
        },
        {
          icon: faCode,
          title: 'Defect Resolution Excellence',
          description: 'Resolved ~5 defects per sprint using advanced debugging techniques, improving system stability'
        },
        {
          icon: faChartLine,
          title: 'Build Tool Redesign',
          description: 'Rewrote legacy build tools, increasing team efficiency by 20% and streamlining workflows'
        },
        {
          icon: faCog,
          title: 'Legacy Code Refactoring',
          description: 'Transformed LynxOS embedded code into event-driven C++ architecture, achieving 30% CPU reduction'
        },
        {
          icon: faBriefcase,
          title: 'Release Management',
          description: 'Led build creation and testing for 5 successful software releases, ensuring on-time delivery'
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
          icon: faFlask,
          title: 'Visual Recognition Research',
          description: 'Conducted extensive research on visual recognition techniques for defect identification and decision-making processes'
        },
        {
          icon: faBrain,
          title: 'Machine Learning Implementation',
          description: 'Employed Python and ML algorithms to analyze visual data patterns and accurately predict outcomes'
        },
        {
          icon: faCode,
          title: 'ML Techniques Proficiency',
          description: 'Acquired proficiency in machine learning techniques for visual representation identification'
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
            Experienced Software Engineer at Raytheon with expertise in C++ modernization, embedded systems, and legacy code transformation. 
            Proven track record of improving system performance by 30%, reducing training time by 25%, and increasing team efficiency by 20%. 
            Passionate about building robust, scalable solutions and continuously learning new technologies.
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
              When I'm not coding, you'll find me exploring new technologies, working on side projects, 
              or enjoying sports. I believe in continuous learning and pushing boundaries to create 
              solutions that make a real impact.
            </p>
            </div>
        </div>
      </section>
      <Loader type="pacman" />
    </>
  )
}

export default About
