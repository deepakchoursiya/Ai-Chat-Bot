import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const stats = [
    { title: 'Total Conversations', value: '0', color: 'from-blue-500 to-cyan-500', icon: '💬', delay: '0s' },
    { title: 'Active Users', value: '1', color: 'from-green-500 to-emerald-500', icon: '👥', delay: '0.1s' },
    { title: 'Response Time', value: '~2s', color: 'from-purple-500 to-pink-500', icon: '⚡', delay: '0.2s' }
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-full overflow-y-auto">
      <div className="mb-12 animate-fadeIn">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Welcome to BotSphere - Your AI-Powered Virtual Assistant Platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 animate-fadeIn"
            style={{ animationDelay: stat.delay }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-2xl group-hover:animate-bounce-custom`}>
                {stat.icon}
              </div>
              <div className={`w-3 h-3 bg-gradient-to-r ${stat.color} rounded-full animate-pulse`}></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{stat.title}</h3>
            <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <span className="mr-3 text-3xl">🚀</span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/chat"
            className="group block p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Start Chat</h3>
                <p className="text-blue-100">AI-powered conversations</p>
              </div>
              <span className="text-3xl group-hover:animate-bounce-custom">💬</span>
            </div>
          </Link>
          
          <Link
            to="/faqs"
            className="group block p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Browse FAQs</h3>
                <p className="text-green-100">Quick answers & solutions</p>
              </div>
              <span className="text-3xl group-hover:animate-bounce-custom">❓</span>
            </div>
          </Link>
          
          <Link
            to="/ticketing"
            className="group block p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Support Tickets</h3>
                <p className="text-orange-100">Escalations & tracking</p>
              </div>
              <span className="text-3xl group-hover:animate-bounce-custom">🎫</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard