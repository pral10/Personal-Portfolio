const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const OpenAI = require("openai")

// MUST be first
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// 🔍 DEBUG (remove later if everything works)
console.log("Loaded API KEY:", process.env.OPENAI_API_KEY ? "YES" : "NO")

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// AI rules
const SYSTEM_PROMPT = `
You are an AI assistant for Praladh Chaulagain.

Only answer using known facts:
- CS graduate
- Skills: Java, Python, C/C++, React, JavaScript
- Experience: software + embedded systems
- Projects: web apps and tools

If unrelated → say:
"I'm only able to answer questions about Praladh Chaulagain."
`

// API route
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
      ],
      temperature: 0.2,
      max_tokens: 200,
    })

    res.json({
      reply: response.choices[0].message.content,
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ reply: "Server error" })
  }
})

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
})