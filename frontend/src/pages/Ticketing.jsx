import React, { useState, useEffect } from 'react'
import { getAllTickets, createTicket } from '../services/ticketService'
import TicketForm from '../components/TicketForm'

const Ticketing = () => {
  const [tickets, setTickets] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All')

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const data = await getAllTickets()
      setTickets(data)
    } catch (error) {
      console.error('Failed to load tickets:', error)
    }
  }

  const handleTicketCreated = () => {
    loadTickets()
    setShowCreateForm(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'from-red-500 to-pink-500'
      case 'IN_PROGRESS': return 'from-yellow-500 to-orange-500'
      case 'RESOLVED': return 'from-green-500 to-emerald-500'
      case 'CLOSED': return 'from-gray-500 to-slate-500'
      default: return 'from-blue-500 to-purple-500'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'LOW': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const statuses = ['All', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']
  const filteredTickets = selectedStatus === 'All' ? tickets : tickets.filter(t => t.status === selectedStatus)

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-full overflow-y-auto">
      <div className="mb-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Support Tickets & Escalations
          </h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <span className="flex items-center space-x-2">
              <span>➕</span>
              <span>Create Ticket</span>
            </span>
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Manage support requests and escalations</p>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredTickets.map((ticket, index) => (
          <div key={ticket.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">#{ticket.id}</h3>
                  <span className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(ticket.status)} text-white text-sm rounded-full`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{ticket.subject}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{ticket.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>📧 {ticket.customerEmail}</span>
                  {ticket.assignedAgent && <span>👤 {ticket.assignedAgent}</span>}
                  <span>📅 {new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {ticket.status === 'OPEN' && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 text-lg">🚨</span>
                  <span className="text-red-700 dark:text-red-300 font-medium">Escalation Required</span>
                </div>
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">This ticket needs immediate attention from a live agent.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No tickets found</h3>
          <p className="text-gray-500 dark:text-gray-500">Create your first support ticket to get started</p>
        </div>
      )}

      {showCreateForm && (
        <TicketForm 
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleTicketCreated}
        />
      )}
    </div>
  )
}

export default Ticketing