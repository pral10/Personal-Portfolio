export const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase().trim()

  // Skills
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('technology')) {
    return "Pral is skilled in Java, Python, C/C++, React, JavaScript, and system design."
  }

  // Experience
  if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('raytheon')) {
    return "Pral works as a Software Engineer focusing on embedded systems and backend development."
  }

  // Projects
  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('built')) {
    return "He has built Weather App, Snake Game, Calculator, Smart IoT system, and more."
  }

  // Contact
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return "You can reach Pral at chaulagainpraladh@gmail.com"
  }

  // Greeting
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hey 👋 Ask me about skills, experience, or projects!"
  }

  return "I'm not fully sure yet — try asking about skills, experience, or projects."
}