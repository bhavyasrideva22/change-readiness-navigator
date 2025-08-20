import { AssessmentResponse, AssessmentResults, Question } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateAssessmentResults = (responses: AssessmentResponse[]): AssessmentResults => {
  const responseMap = new Map(responses.map(r => [r.questionId, r]));
  
  // Calculate psychometric score
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychometricScore = calculateCategoryScore(psychometricQuestions, responseMap);

  // Calculate technical score
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const technicalScore = calculateCategoryScore(technicalQuestions, responseMap);

  // Calculate WISCAR scores
  const wiscarScores = {
    will: calculateWISCARSubcategory('will', responseMap),
    interest: calculateWISCARSubcategory('interest', responseMap),
    skill: calculateWISCARSubcategory('skill', responseMap),
    cognitive: calculateWISCARSubcategory('cognitive', responseMap),
    ability: calculateWISCARSubcategory('ability', responseMap),
    realWorld: calculateWISCARSubcategory('realWorld', responseMap)
  };

  // Calculate overall score
  const overallScore = Math.round(
    (psychometricScore * 0.3 + technicalScore * 0.3 + 
     Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.4)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallScore >= 75) recommendation = 'yes';
  else if (overallScore >= 55) recommendation = 'maybe';
  else recommendation = 'no';

  // Generate personalized insights
  const { strengths, improvements, nextSteps, careerPaths } = generateInsights(
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation
  );

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    strengths,
    improvements,
    nextSteps,
    careerPaths
  };
};

const calculateCategoryScore = (questions: Question[], responseMap: Map<string, AssessmentResponse>): number => {
  let totalScore = 0;
  let totalWeight = 0;

  questions.forEach(question => {
    const response = responseMap.get(question.id);
    if (!response) return;

    const weight = question.weight || 1;
    let score = 0;

    if (question.type === 'likert') {
      score = (Number(response.answer) / 5) * 100;
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      if (question.correctAnswer) {
        score = response.answer === question.correctAnswer ? 100 : 0;
      } else {
        // For non-graded questions, assume good answers
        score = 75;
      }
    }

    totalScore += score * weight;
    totalWeight += weight;
  });

  return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
};

const calculateWISCARSubcategory = (subcategory: string, responseMap: Map<string, AssessmentResponse>): number => {
  const questions = assessmentQuestions.filter(q => 
    q.category === 'wiscar' && q.subcategory === subcategory
  );
  
  return calculateCategoryScore(questions, responseMap);
};

const generateInsights = (
  psychometricScore: number,
  technicalScore: number,
  wiscarScores: any,
  overallScore: number,
  recommendation: 'yes' | 'maybe' | 'no'
) => {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];
  const careerPaths: string[] = [
    'Change Management Advisor',
    'Organizational Development Specialist',
    'Business Transformation Consultant',
    'HR Change Agent',
    'Project Manager with Change Focus'
  ];

  // Analyze strengths
  if (psychometricScore >= 75) {
    strengths.push('Strong personality fit for change management roles');
  }
  if (technicalScore >= 75) {
    strengths.push('Solid foundation in change management frameworks');
  }
  if (wiscarScores.will >= 75) {
    strengths.push('High motivation and commitment to the field');
  }
  if (wiscarScores.cognitive >= 75) {
    strengths.push('Excellent analytical and problem-solving abilities');
  }

  // Identify improvement areas
  if (psychometricScore < 60) {
    improvements.push('Develop emotional intelligence and stress management skills');
  }
  if (technicalScore < 60) {
    improvements.push('Study change management frameworks (ADKAR, Kotter\'s 8 Steps)');
  }
  if (wiscarScores.skill < 60) {
    improvements.push('Practice communication and conflict resolution skills');
  }

  // Generate next steps based on recommendation
  if (recommendation === 'yes') {
    nextSteps.push('Consider pursuing change management certification (Prosci, CCMP)');
    nextSteps.push('Seek opportunities to lead change initiatives in your current role');
    nextSteps.push('Network with change management professionals');
  } else if (recommendation === 'maybe') {
    nextSteps.push('Focus on developing identified improvement areas');
    nextSteps.push('Gain experience in project management or team leadership');
    nextSteps.push('Take introductory courses in organizational behavior');
  } else {
    nextSteps.push('Consider building foundational skills in communication and leadership');
    nextSteps.push('Explore related fields like HR, project management, or training');
    nextSteps.push('Reassess after gaining more professional experience');
  }

  return { strengths, improvements, nextSteps, careerPaths };
};