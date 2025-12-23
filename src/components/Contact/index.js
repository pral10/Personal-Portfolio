import React, { useEffect, useState, useRef } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin as faLinkedinBrand, faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const sendEmail = async (e) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await emailjs.sendForm(
        'service_w7fw9jy',
        'template_vgj0qof',
        form.current,
        'kmk1Hp6ZCqJDwd3vM'
      )
      
      if (result.text === 'OK') {
        setSubmitStatus('success')
        form.current.reset()
        setTimeout(() => setSubmitStatus(null), 5000)
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section
        className="container contact-page theme-dark"
        aria-label="Contact me section"
      >
        <div className="text-zone fade-in">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I'm a Software Engineer at Raytheon, passionate about building robust systems and modernizing legacy code. 
            If you'd like to collaborate, discuss opportunities, or just connect, feel free to reach out!
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail} aria-label="Contact form">
              <ul>
                <li className="half">
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    required
                    aria-required="true"
                    aria-label="Name"
                  />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                    aria-required="true"
                    aria-label="Email"
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                    aria-required="true"
                    aria-label="Subject"
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                    aria-required="true"
                    aria-label="Message"
                  ></textarea>
                </li>
                <li>
                  <button
                    type="submit"
                    className="flat-button"
                    disabled={isSubmitting}
                    aria-label="Send message"
                  >
                    {isSubmitting ? 'SENDING...' : submitStatus === 'success' ? '✓ SENT!' : 'SEND'}
                  </button>
                  {submitStatus === 'success' && (
                    <p className="success-message">Message sent successfully! I'll get back to you soon.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="error-message">
                      Failed to send. Please email directly at{' '}
                      <a href="mailto:chaulagainpraladh@gmail.com">chaulagainpraladh@gmail.com</a>
                    </p>
                  )}
                </li>
              </ul>
            </form>
          </div>
        </div>

        {/* Right side: map + info stacked vertically */}
        <div className="right-side fade-in" aria-label="Map and contact info">
          <div
            className="map-wrap"
            role="region"
            aria-label="Location map"
          >
            <MapContainer
              center={[42.581704, -71.209762]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%', borderRadius: '12px' }}
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[42.581704, -71.209762]}>
                <Popup>
                  <div style={{ 
                    color: '#a8d1ff', 
                    fontFamily: 'Helvetica Neue, sans-serif',
                    textAlign: 'center',
                    padding: '5px'
                  }}>
                    <strong>Praladh Chaulagain</strong><br />
                    Tewksbury, MA
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <aside className="info-map" aria-label="Contact info">
            <div className="contact-info-card">
              <h3>Get In Touch</h3>
              <div className="contact-details">
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                  <a
                    href="mailto:chaulagainpraladh@gmail.com?subject=Portfolio%20Inquiry"
                    className="contact-link"
                    aria-label="Email address"
                  >
                    chaulagainpraladh@gmail.com
                  </a>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                  <a href="tel:+18577563364" className="contact-link">
                    857-756-3364
                  </a>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                  <span className="contact-text">Tewksbury, Massachusetts</span>
                </div>
              </div>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/in/praladh-chaulagain-7427a9224/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinBrand} />
                </a>
                <a
                  href="https://github.com/pral10"
                  target="_blank"
                  rel="noreferrer"
                  className="social-link"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithubBrand} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
