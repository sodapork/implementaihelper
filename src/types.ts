export interface BusinessData {
  industry: string
  companySize: string
  currentTechLevel: string
  primaryGoals: string[]
  budget: string
  timeline: string
  teamSize: string
  currentChallenges: string[]
}

export interface AIRecommendation {
  immediateActions: string[]
  shortTermGoals: string[]
  longTermVision: string[]
  industryTransformation: string[]
  implementationSteps: ImplementationStep[]
  estimatedTimeline: string
  estimatedBudget: string
  riskFactors: string[]
  successMetrics: string[]
}

export interface ImplementationStep {
  phase: string
  duration: string
  description: string
  keyActivities: string[]
  resources: string[]
  expectedOutcomes: string[]
}

export interface Question {
  id: string
  type: 'text' | 'select' | 'multiSelect' | 'radio'
  question: string
  options?: string[]
  required: boolean
  placeholder?: string
} 