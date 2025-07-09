import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Lightbulb, TrendingUp, Users, Building, Zap } from 'lucide-react'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import { BusinessData, AIRecommendation } from './types'

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'questionnaire' | 'results'>('welcome')
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null)

  const handleStartQuestionnaire = () => {
    setCurrentStep('questionnaire')
  }

  const handleQuestionnaireComplete = (data: BusinessData, recs: AIRecommendation) => {
    setBusinessData(data)
    setRecommendations(recs)
    setCurrentStep('results')
  }

  const handleRestart = () => {
    setCurrentStep('welcome')
    setBusinessData(null)
    setRecommendations(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="card mb-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <Brain className="w-12 h-12 text-primary-600" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">
                  AI Implementation Helper
                </h1>
                <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
                  Discover how AI can transform your business and get personalized recommendations 
                  for implementation strategies that fit your industry and goals.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="p-3 bg-secondary-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Building className="w-8 h-8 text-secondary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Industry Analysis</h3>
                    <p className="text-secondary-600 text-sm">Understand AI opportunities in your sector</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-secondary-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-secondary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Strategic Insights</h3>
                    <p className="text-secondary-600 text-sm">Get actionable implementation strategies</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-secondary-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-secondary-600" />
                    </div>
                    <h3 className="font-semibold text-secondary-900 mb-2">Growth Roadmap</h3>
                    <p className="text-secondary-600 text-sm">Plan your AI transformation journey</p>
                  </div>
                </div>

                <button
                  onClick={handleStartQuestionnaire}
                  className="btn-primary text-lg px-8 py-3 flex items-center gap-2 mx-auto"
                >
                  <Zap className="w-5 h-5" />
                  Start Your AI Assessment
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'questionnaire' && (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Questionnaire onComplete={handleQuestionnaireComplete} />
            </motion.div>
          )}

          {currentStep === 'results' && businessData && recommendations && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Results 
                businessData={businessData} 
                recommendations={recommendations}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App 