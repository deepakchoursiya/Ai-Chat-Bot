import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChatInterface from './components/ChatInterface'
import Dashboard from './pages/Dashboard'
import FAQs from './pages/FAQs'
import Ticketing from './pages/Ticketing'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate app loading
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse-custom">
            <span className="text-white text-3xl">🤖</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            BotSphere
          </h2>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
        <Router future={{ v7_relativeSplatPath: true }}>
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/ticketing" element={<Ticketing />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

export default App