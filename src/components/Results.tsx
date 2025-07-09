import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  Target, 
  ArrowRight,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react'
import { BusinessData, AIRecommendation } from '../types'
import { AnimatePresence } from 'framer-motion'

interface ResultsProps {
  businessData: BusinessData
  recommendations: AIRecommendation
  onRestart: () => void
}

const Results: React.FC<ResultsProps> = ({ businessData, recommendations, onRestart }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'implementation' | 'transformation'>('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'implementation', label: 'Implementation', icon: TrendingUp },
    { id: 'transformation', label: 'Industry Transformation', icon: Lightbulb }
  ]

  const generateReport = () => {
    const report = `
AI Implementation Report for ${businessData.industry} Business

BUSINESS PROFILE:
- Industry: ${businessData.industry}
- Company Size: ${businessData.companySize}
- Current Tech Level: ${businessData.currentTechLevel}
- Budget: ${businessData.budget}
- Timeline: ${businessData.timeline}

IMMEDIATE ACTIONS:
${recommendations.immediateActions.map(action => `• ${action}`).join('\n')}

SHORT-TERM GOALS:
${recommendations.shortTermGoals.map(goal => `• ${goal}`).join('\n')}

IMPLEMENTATION TIMELINE: ${recommendations.estimatedTimeline}
ESTIMATED BUDGET: ${recommendations.estimatedBudget}

INDUSTRY TRANSFORMATION OPPORTUNITIES:
${recommendations.industryTransformation.map(opportunity => `• ${opportunity}`).join('\n')}

RISK FACTORS:
${recommendations.riskFactors.map(risk => `• ${risk}`).join('\n')}

SUCCESS METRICS:
${recommendations.successMetrics.map(metric => `• ${metric}`).join('\n')}
    `
    
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-implementation-report.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Implementation Recommendations',
        text: `Check out my AI implementation recommendations for ${businessData.industry}!`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
              <Brain className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Your AI Implementation Plan
          </h1>
          <p className="text-secondary-600">
            Personalized recommendations for {businessData.industry} industry
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={generateReport}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button
            onClick={shareResults}
            className="btn-secondary flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share Results
          </button>
          <button
            onClick={onRestart}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-900">Timeline</span>
                  </div>
                  <p className="text-primary-700">{recommendations.estimatedTimeline}</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-900">Budget</span>
                  </div>
                  <p className="text-primary-700">{recommendations.estimatedBudget}</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-900">Goals</span>
                  </div>
                  <p className="text-primary-700">{businessData.primaryGoals.length} objectives</p>
                </div>
              </div>

              {/* Immediate Actions */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-primary-600" />
                  Immediate Actions (Next 30 Days)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.immediateActions.map((action, index) => (
                    <div key={index} className="bg-secondary-50 p-4 rounded-lg">
                      <p className="text-secondary-800">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Short-term Goals */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Short-term Goals (3-6 Months)
                </h3>
                <div className="space-y-3">
                  {recommendations.shortTermGoals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-secondary-700">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Factors */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Risk Factors to Consider
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {recommendations.riskFactors.map((risk, index) => (
                    <div key={index} className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <p className="text-orange-800 text-sm">{risk}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'implementation' && (
            <motion.div
              key="implementation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Implementation Steps */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Implementation Roadmap
                </h3>
                <div className="space-y-6">
                  {recommendations.implementationSteps.map((step, index) => (
                    <div key={index} className="border border-secondary-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-secondary-900">{step.phase}</h4>
                          <p className="text-secondary-600 text-sm">{step.duration}</p>
                        </div>
                      </div>
                      <p className="text-secondary-700 mb-4">{step.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <h5 className="font-medium text-secondary-900 mb-2">Key Activities</h5>
                          <ul className="space-y-1">
                            {step.keyActivities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-secondary-600">• {activity}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-secondary-900 mb-2">Resources Needed</h5>
                          <ul className="space-y-1">
                            {step.resources.map((resource, idx) => (
                              <li key={idx} className="text-sm text-secondary-600">• {resource}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-secondary-900 mb-2">Expected Outcomes</h5>
                          <ul className="space-y-1">
                            {step.expectedOutcomes.map((outcome, idx) => (
                              <li key={idx} className="text-sm text-secondary-600">• {outcome}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Success Metrics
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {recommendations.successMetrics.map((metric, index) => (
                    <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-green-800 text-sm">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'transformation' && (
            <motion.div
              key="transformation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Industry Transformation */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  How AI Could Transform Your Industry
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.industryTransformation.map((transformation, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800">{transformation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long-term Vision */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Long-term Vision (2-5 Years)
                </h3>
                <div className="space-y-3">
                  {recommendations.longTermVision.map((vision, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-secondary-700">{vision}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive Advantage */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Competitive Advantage Opportunities
                </h3>
                <p className="text-secondary-700 mb-4">
                  By implementing AI strategically, your business can gain significant competitive advantages:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 mb-2">Operational Excellence</h4>
                    <p className="text-secondary-600 text-sm">
                      Automate processes, reduce costs, and improve efficiency across all operations
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 mb-2">Customer Experience</h4>
                    <p className="text-secondary-600 text-sm">
                      Deliver personalized, responsive, and intelligent customer interactions
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 mb-2">Innovation Leadership</h4>
                    <p className="text-secondary-600 text-sm">
                      Develop new AI-powered products and services that differentiate your business
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900 mb-2">Data-Driven Decisions</h4>
                    <p className="text-secondary-600 text-sm">
                      Make better, faster decisions based on AI-powered insights and predictions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Results 