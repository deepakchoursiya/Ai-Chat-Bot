import React, { useState, useEffect } from 'react'
import { getFAQs } from '../services/faqService'

const FAQs = () => {
  const [faqs, setFaqs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openFAQs, setOpenFAQs] = useState({})

  useEffect(() => {
    loadFAQs()
  }, [])

  const loadFAQs = async () => {
    try {
      const data = await getFAQs()
      setFaqs(data)
    } catch (error) {
      console.error('Failed to load FAQs:', error)
      // Fallback data if API fails
      setFaqs([
        { id: 1, question: 'What are your business hours?', answer: 'Our business hours are Monday to Friday, 9 AM to 6 PM EST. We are closed on weekends and major holidays.', category: 'General' },
        { id: 2, question: 'How can I reset my password?', answer: 'You can reset your password by clicking "Forgot Password" on the login page and following the instructions sent to your email.', category: 'Account' },
        { id: 3, question: 'How do I contact support?', answer: 'You can contact support by creating a ticket through this chat, emailing support@botsphere.com, or calling 1-800-BOTSPHERE.', category: 'Support' },
        { id: 4, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments.', category: 'Billing' },
        { id: 5, question: 'How do I cancel my subscription?', answer: 'You can cancel your subscription anytime from your account settings under "Billing & Subscription" or contact our support team.', category: 'Billing' },
        { id: 6, question: 'Is my data secure?', answer: 'Yes, we use enterprise-grade encryption, secure data centers, and comply with GDPR, CCPA, and SOC 2 standards to protect your data.', category: 'Security' },
        { id: 7, question: 'How do I integrate the chatbot with my website?', answer: 'You can integrate our chatbot using our JavaScript widget, REST API, or WordPress plugin. Full documentation is available in your dashboard.', category: 'Integration' },
        { id: 8, question: 'What languages does the chatbot support?', answer: 'Our AI chatbot supports over 50 languages including English, Spanish, French, German, Chinese, Japanese, and many more.', category: 'Features' },
        { id: 9, question: 'Can I customize the chatbot responses?', answer: 'Yes, you can train the chatbot with custom responses, upload your own knowledge base, and configure conversation flows.', category: 'Features' },
        { id: 10, question: 'What is the response time for support tickets?', answer: 'We respond to support tickets within 2-4 hours during business hours. Premium customers get priority support with 1-hour response time.', category: 'Support' },
        { id: 11, question: 'Do you offer a free trial?', answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial.', category: 'General' },
        { id: 12, question: 'How do I upgrade my plan?', answer: 'You can upgrade your plan anytime from your account dashboard under "Billing". Changes take effect immediately.', category: 'Billing' },
        { id: 13, question: 'Can I export my chat data?', answer: 'Yes, you can export all your chat conversations, analytics, and customer data in CSV or JSON format from your dashboard.', category: 'Features' },
        { id: 14, question: 'What happens if I exceed my plan limits?', answer: 'If you exceed your plan limits, we\'ll notify you and you can upgrade your plan or purchase additional resources as needed.', category: 'Billing' },
        { id: 15, question: 'How do I set up automated responses?', answer: 'You can set up automated responses using our visual flow builder in the dashboard under "Automation" > "Response Flows".', category: 'Features' }
      ])
    }
  }

  const toggleFAQ = (faqId) => {
    setOpenFAQs(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }))
  }

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))]
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-full overflow-y-auto">
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Find quick answers to common questions</p>
      </div>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 shadow-lg"
        />
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <div key={faq.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
            <div 
              className="p-6 cursor-pointer"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex-1 pr-4">{faq.question}</h3>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full">
                    {faq.category}
                  </span>
                  <span className={`text-xl transform transition-transform duration-300 ${openFAQs[faq.id] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>
              {openFAQs[faq.id] && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No FAQs found</h3>
          <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  )
}

export default FAQs