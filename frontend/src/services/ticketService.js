import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tickets`, ticketData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Ticket creation error:', error)
    throw new Error('Failed to create ticket')
  }
}

export const getAllTickets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch tickets:', error)
    throw new Error('Failed to fetch tickets')
  }
}