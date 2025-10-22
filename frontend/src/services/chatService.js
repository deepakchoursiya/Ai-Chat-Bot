import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081/api'

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/message`, {
      message: message,
      sessionId: 'default-session'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to send message')
  }
}