import React, { useState, useRef } from 'react'
import './chatbot.scss'
import { getBotResponse } from './chatbot'

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY
console.log("ENV KEY:", OPENAI_API_KEY)

const SYSTEM_PROMPT = `
You are an AI assistant for Praladh Chaulagain.

Use ONLY the information below. Do NOT guess or fabricate anything.

ABOUT:
- Software Engineer skilled in Java, Python, C++, JavaScript, React
- Works on embedded systems and full-stack applications

EXPERIENCE:
- Software Engineer at Raytheon Missiles & Defense
- Focus: C++ modernization, embedded systems, backend systems

PROJECTS:
- Weather App (React, OpenWeather API)
- Snake Game (Python, Pygame)
- Calculator (JS)
- Smart IoT system (React, Node, Firebase, ML)

CONTACT:
- Email: chaulagainpraladh@gmail.com
- Location: Tewksbury, Massachusetts

RULES:
- If information is not present above, say: "I don't have that information on Praladh's portfolio."
- Never guess or hallucinate.
`

const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi 👋 I'm Pral's AI assistant. Ask me anything!" },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesRef = useRef(messages)
  messagesRef.current = messages

  const scrollToBottom = () => {
    const el = document.querySelector('.chat-messages')
    if (el) el.scrollTop = el.scrollHeight
  }

  const askOpenAI = async (message) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },

            ...messagesRef.current.map((m) => ({
              role: m.from === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),

            { role: 'user', content: message },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      })

      if (!response.ok) return null

      const data = await response.json()
      return data.choices[0].message.content.trim()
    } catch (err) {
      return null
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userText = input.trim()

    setMessages((prev) => [...prev, { from: 'user', text: userText }])
    setInput('')
    setLoading(true)

    setTimeout(async () => {
      let reply = await askOpenAI(userText)

      // fallback if OpenAI fails
      if (!reply) {
        reply = getBotResponse(userText)
      }

      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      setLoading(false)
      scrollToBottom()
    }, 300)
  }

  return (
    <div className={`chatbot-container ${open ? 'open' : ''}`}>
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="chat-window" role="dialog">
          <div className="chat-header">
            <h3>Chat with Pral's AI</h3>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                Thinking...
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something..."
              disabled={loading}
            />

            <button onClick={sendMessage} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot