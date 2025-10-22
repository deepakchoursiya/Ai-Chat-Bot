import React, { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../services/chatService'
import TicketForm from './TicketForm'

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! I\'m your AI assistant. How can I help you today? I can answer FAQs, help create support tickets, or connect you with a live agent.', sender: 'bot', timestamp: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = { text: inputMessage, sender: 'user', timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')
    setIsLoading(true)

    // Check for ticket creation request
    if (currentMessage.toLowerCase().includes('create ticket')) {
      setShowTicketForm(true)
      setIsLoading(false)
      return
    }

    try {
      const response = await sendMessage(currentMessage)
      const botMessage = { text: response.response, sender: 'bot', timestamp: new Date() }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot', timestamp: new Date() }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTicketSuccess = (message) => {
    const successMessage = { text: message, sender: 'bot', timestamp: new Date() }
    setMessages(prev => [...prev, successMessage])
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-custom">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Assistant
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Always here to help</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`max-w-xs lg:max-w-md px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-12' 
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white mr-12 border border-gray-200 dark:border-gray-600'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white dark:bg-gray-700 px-6 py-4 rounded-2xl shadow-lg mr-12 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
          >
            <span className="flex items-center space-x-2">
              <span>Send</span>
              <span className="text-lg">➤</span>
            </span>
          </button>
        </div>
      </form>
      
      {showTicketForm && (
        <TicketForm 
          onClose={() => setShowTicketForm(false)}
          onSuccess={handleTicketSuccess}
        />
      )}
    </div>
  )
}

export default ChatInterface