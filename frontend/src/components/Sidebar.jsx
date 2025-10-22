import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ darkMode, setDarkMode }) => {
  const location = useLocation()

  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 shadow-xl animate-slideIn">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-pulse-custom"></div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BotSphere
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">AI Assistant Platform</p>
      </div>
      
      <nav className="mt-8 px-4">
        <Link
          to="/"
          className={`group flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
            location.pathname === '/' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className="text-xl mr-3 group-hover:animate-bounce-custom">📊</span>
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link
          to="/chat"
          className={`group flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
            location.pathname === '/chat' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className="text-xl mr-3 group-hover:animate-bounce-custom">💬</span>
          <span className="font-medium">Chat</span>
        </Link>
        <Link
          to="/faqs"
          className={`group flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
            location.pathname === '/faqs' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className="text-xl mr-3 group-hover:animate-bounce-custom">❓</span>
          <span className="font-medium">FAQs</span>
        </Link>
        <Link
          to="/ticketing"
          className={`group flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
            location.pathname === '/ticketing' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
        >
          <span className="text-xl mr-3 group-hover:animate-bounce-custom">🎫</span>
          <span className="font-medium">Ticketing</span>
        </Link>
      </nav>

      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar