export interface Question {
  id: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'ranking';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  scenario?: string;
  correctAnswer?: string | number;
  weight?: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number | string[];
  timeSpent?: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  careerPaths: string[];
}

export interface AssessmentState {
  currentStep: number;
  responses: AssessmentResponse[];
  timeStarted: Date;
  isComplete: boolean;
}