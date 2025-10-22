import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export const getFAQs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faq`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch FAQs:', error)
    throw new Error('Failed to fetch FAQs')
  }
}