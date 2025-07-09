import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { BusinessData, AIRecommendation, Question } from '../types'
import { generateRecommendations } from '../utils/aiEngine'

interface QuestionnaireProps {
  onComplete: (data: BusinessData, recommendations: AIRecommendation) => void
}

const questions: Question[] = [
  {
    id: 'industry',
    type: 'select',
    question: 'What industry is your business in?',
    options: [
      'Technology',
      'Healthcare',
      'Finance',
      'Retail',
      'Manufacturing',
      'Education',
      'Real Estate',
      'Transportation',
      'Media & Entertainment',
      'Food & Beverage',
      'Professional Services',
      'Other'
    ],
    required: true
  },
  {
    id: 'companySize',
    type: 'radio',
    question: 'How many employees does your company have?',
    options: [
      '1-10 (Startup)',
      '11-50 (Small Business)',
      '51-200 (Medium Business)',
      '201-1000 (Large Business)',
      '1000+ (Enterprise)'
    ],
    required: true
  },
  {
    id: 'currentTechLevel',
    type: 'radio',
    question: 'How would you describe your current technology adoption level?',
    options: [
      'Basic - Limited digital tools',
      'Intermediate - Some automation and digital processes',
      'Advanced - Well-integrated digital systems',
      'Leading edge - Already using some AI/ML'
    ],
    required: true
  },
  {
    id: 'primaryGoals',
    type: 'multiSelect',
    question: 'What are your primary goals for implementing AI? (Select all that apply)',
    options: [
      'Increase efficiency and productivity',
      'Reduce costs and operational expenses',
      'Improve customer experience',
      'Gain competitive advantage',
      'Automate repetitive tasks',
      'Better decision making',
      'Innovate new products/services',
      'Improve data analysis and insights'
    ],
    required: true
  },
  {
    id: 'budget',
    type: 'radio',
    question: 'What is your budget for AI implementation?',
    options: [
      'Under $10,000',
      '$10,000 - $50,000',
      '$50,000 - $200,000',
      '$200,000 - $1,000,000',
      '$1,000,000+'
    ],
    required: true
  },
  {
    id: 'timeline',
    type: 'radio',
    question: 'What is your preferred timeline for AI implementation?',
    options: [
      'Immediate (0-3 months)',
      'Short term (3-6 months)',
      'Medium term (6-12 months)',
      'Long term (1-2 years)',
      'Strategic (2+ years)'
    ],
    required: true
  },
  {
    id: 'teamSize',
    type: 'radio',
    question: 'How many people can you dedicate to AI implementation?',
    options: [
      '1-2 people (part-time)',
      '3-5 people (part-time)',
      '5-10 people (mix of full/part-time)',
      '10+ people (dedicated team)',
      'External consultants/partners'
    ],
    required: true
  },
  {
    id: 'currentChallenges',
    type: 'multiSelect',
    question: 'What are your biggest current business challenges? (Select all that apply)',
    options: [
      'Manual processes taking too much time',
      'Data scattered across multiple systems',
      'Customer service inefficiencies',
      'Supply chain management issues',
      'Quality control problems',
      'Market competition pressure',
      'Scaling operations',
      'Compliance and regulatory requirements',
      'Talent acquisition and retention',
      'Revenue growth challenges'
    ],
    required: true
  }
]

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Convert answers to BusinessData format
    const businessData: BusinessData = {
      industry: answers.industry || '',
      companySize: answers.companySize || '',
      currentTechLevel: answers.currentTechLevel || '',
      primaryGoals: answers.primaryGoals || [],
      budget: answers.budget || '',
      timeline: answers.timeline || '',
      teamSize: answers.teamSize || '',
      currentChallenges: answers.currentChallenges || []
    }

    // Generate AI recommendations
    const recommendations = generateRecommendations(businessData)
    
    // Simulate processing time
    setTimeout(() => {
      onComplete(businessData, recommendations)
      setIsSubmitting(false)
    }, 2000)
  }

  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestion.id]
    if (!answer) return false
    
    if (currentQuestion.type === 'multiSelect') {
      return Array.isArray(answer) && answer.length > 0
    }
    
    return answer !== ''
  }

  const renderQuestion = () => {
    const answer = answers[currentQuestion.id]

    switch (currentQuestion.type) {
      case 'select':
        return (
          <select
            value={answer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            className="input-field"
          >
            <option value="">Select an option...</option>
            {currentQuestion.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-secondary-700">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'multiSelect':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(answer) ? answer : []
                    if (e.target.checked) {
                      handleAnswer([...currentAnswers, option])
                    } else {
                      handleAnswer(currentAnswers.filter(a => a !== option))
                    }
                  }}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-secondary-700">{option}</span>
              </label>
            ))}
          </div>
        )

      default:
        return (
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="input-field"
          />
        )
    }
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-secondary-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
            {currentQuestion.question}
          </h2>
          {renderQuestion()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered() || isSubmitting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Recommendations...
              </>
            ) : currentQuestionIndex === questions.length - 1 ? (
              <>
                <Check className="w-4 h-4" />
                Get Recommendations
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Questionnaire 