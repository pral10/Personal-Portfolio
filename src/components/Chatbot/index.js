import React, { useState, useEffect, useRef } from 'react'
import './chatbot.scss'

const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hey! I'm Pral's AI assistant. Ask me about his skills, experience, or projects!" },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim()

    // Skills and technologies
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('what can')) {
      return "Pral is skilled in C++, React, JavaScript, Python, Java, and embedded systems. He's experienced with modern web development and legacy code modernization. Check out his About page for more details!"
    }

    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('raytheon')) {
      return "Pral is a Software Engineer at Raytheon (Jan 2024 - Present). He works on C++ modernization, embedded systems, and has improved system performance by 30%. He also did undergraduate research at UMass Boston. Check out the About page for full details!"
    }

    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('what has') || lowerMessage.includes('built')) {
      return "Pral has built several projects including a Weather App, Snake Game, Calculator, and more! Check out his Portfolio page to see all his work with live demos."
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
      return "You can reach Pral at chaulagainpraladh@gmail.com or use the contact form on the Contact page. He's always open to discussing opportunities!"
    }

    // About
    if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('tell me about')) {
      return "Pral is a Software Engineer and recent CS graduate. He's passionate about building robust systems, modernizing legacy code, and solving complex problems. He's currently working at Raytheon!"
    }

    // Location
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('live')) {
      return "Pral is based in Tewksbury, Massachusetts, USA. You can see his location on the Contact page map!"
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 Thanks for visiting Pral's portfolio. How can I help you today?"
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return "I can tell you about Pral's skills, work experience at Raytheon, projects, or how to contact him. Just ask me anything!"
    }

    // Default response
    const defaultResponses = [
      "That's interesting! Pral would love to hear from you directly. Feel free to use the contact form or email him at chaulagainpraladh@gmail.com",
      "Great question! For more details, check out the different sections of this portfolio. You can also reach out to Pral directly via email.",
      "I'm still learning, but I can tell you about Pral's skills, experience, and projects. Try asking about those, or contact him directly for more info!"
    ]
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = () => {
    if (!input.trim() || isTyping) return
    
    const userMessage = input.trim()
    setMessages((msgs) => [...msgs, { from: 'user', text: userMessage }])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage)
      setMessages((msgs) => [...msgs, { from: 'bot', text: botResponse }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className={`chatbot-container ${open ? 'open' : ''}`}>
      <button
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen(!open)}
        className="chatbot-toggle"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div
          className="chat-window"
          role="dialog"
          aria-modal="true"
          aria-label="Chatbot"
        >
          <div className="chat-header">
            <h3>Chat with Pral's Assistant</h3>
            <button 
              onClick={() => setOpen(false)}
              className="close-btn"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <div
            className="chat-messages"
            tabIndex={0}
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.from}`}
                role="article"
                aria-label={msg.from === 'bot' ? 'Bot message' : 'User message'}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              aria-label="Type your message"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              autoFocus
            />
            <button onClick={handleSend} aria-label="Send message" disabled={isTyping}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot

