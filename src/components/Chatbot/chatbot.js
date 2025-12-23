
import React, { useState } from 'react'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `
You are a helpful assistant that knows everything about Praladh Chaulagain.
Praladh is a recent graduate skilled in Java, Python, C/C++, front-end tools,
and passionate about tech and sports.
Answer questions about Praladh clearly and helpfully.
`


const ChatBot = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about Praladh’s skills or projects.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { from: 'user', text: input }
    setMessages((msgs) => [...msgs, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
              .filter(m => m.text.trim() !== '')
              .map(m => ({
                role: m.from === 'user' ? 'user' : 'assistant',
                content: m.text,
              })),
            { role: 'user', content: input },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error('OpenAI API error')
      }

      const data = await response.json()
      const botText = data.choices[0].message.content.trim()

      setMessages((msgs) => [...msgs, { from: 'bot', text: botText }])
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: 'Sorry, something went wrong. Please try again later.' },
      ])
    }
    setLoading(false)
  }

  return (
    <div className={`chatbot-container ${open ? 'open' : ''}`}>
      <button
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen(!open)}
        className="chatbot-toggle"
      >
        💬
      </button>

      {open && (
        <div className="chat-window" role="dialog" aria-modal="true" aria-label="Chatbot window">
          <div className="chat-messages" tabIndex={0} aria-live="polite" aria-atomic="false">
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
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
              onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
              disabled={loading}
              autoFocus
            />
            <button onClick={sendMessage} aria-label="Send message" disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot
