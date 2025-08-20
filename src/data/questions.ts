import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions - Interest & Motivation
  {
    id: 'psych-1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find it energizing to help organizations navigate through periods of change.',
    weight: 1.2
  },
  {
    id: 'psych-2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I remain calm and composed when facing unexpected challenges or resistance.',
    weight: 1.1
  },
  {
    id: 'psych-3',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I prefer working on long-term projects that may take months to show results.',
    weight: 1.0
  },
  {
    id: 'psych-4',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'working-style',
    question: 'When leading a team through change, which approach do you naturally gravitate toward?',
    options: [
      'Detailed planning with clear timelines and milestones',
      'Flexible approach that adapts based on team feedback',
      'Strong communication focus with frequent check-ins',
      'Data-driven approach with metrics and analysis'
    ]
  },
  {
    id: 'psych-5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'empathy',
    question: 'I can easily understand why people might resist organizational changes.',
    weight: 1.3
  },

  // Technical & Domain Knowledge
  {
    id: 'tech-1',
    type: 'multiple-choice',
    category: 'technical',
    question: 'Which of the following is a key component of the ADKAR change management model?',
    options: [
      'Awareness of the need for change',
      'Analysis of market conditions',
      'Assessment of technical capabilities',
      'Allocation of financial resources'
    ],
    correctAnswer: 'Awareness of the need for change',
    weight: 1.0
  },
  {
    id: 'tech-2',
    type: 'scenario',
    category: 'technical',
    scenario: 'A department is implementing new software, but 60% of employees are avoiding training sessions.',
    question: 'What would be your primary approach to address this resistance?',
    options: [
      'Mandate attendance at training sessions',
      'Investigate the root causes of avoidance',
      'Offer incentives for training completion',
      'Replace resistant employees with new hires'
    ],
    correctAnswer: 'Investigate the root causes of avoidance'
  },
  {
    id: 'tech-3',
    type: 'multiple-choice',
    category: 'technical',
    question: 'In stakeholder analysis, who would typically be classified as a "Champion"?',
    options: [
      'Someone with high influence but low support for the change',
      'Someone with low influence but high support for the change',
      'Someone with high influence and high support for the change',
      'Someone with low influence and low support for the change'
    ],
    correctAnswer: 'Someone with high influence and high support for the change'
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar-will-1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I am willing to invest significant time and effort to develop expertise in change management.',
    weight: 1.2
  },
  {
    id: 'wiscar-interest-1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I actively seek out articles, books, or courses about organizational behavior and change.',
    weight: 1.1
  },
  {
    id: 'wiscar-skill-1',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'How would you rate your current communication skills in difficult conversations?',
    options: [
      'Excellent - I can handle any challenging conversation',
      'Good - I can manage most difficult situations',
      'Fair - I sometimes struggle but can get through it',
      'Poor - I tend to avoid difficult conversations'
    ]
  },
  {
    id: 'wiscar-cognitive-1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    scenario: 'Your change initiative is behind schedule. Leadership is pressuring for faster results, but your team is showing signs of burnout.',
    question: 'How would you analyze and address this situation?',
    options: [
      'Push the team harder to meet leadership expectations',
      'Request a deadline extension without team input',
      'Analyze workload, assess team capacity, and propose realistic alternatives',
      'Focus only on the most critical deliverables'
    ],
    correctAnswer: 'Analyze workload, assess team capacity, and propose realistic alternatives'
  },
  {
    id: 'wiscar-ability-1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I actively seek feedback on my performance and use it to improve my approach.',
    weight: 1.1
  },
  {
    id: 'wiscar-real-world-1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'realWorld',
    scenario: 'You are consulting for a manufacturing company implementing lean processes. The floor supervisors are openly skeptical.',
    question: 'What would be your first priority?',
    options: [
      'Present data showing the benefits of lean processes',
      'Build relationships and understand their concerns',
      'Work with management to enforce compliance',
      'Find quick wins to demonstrate value'
    ],
    correctAnswer: 'Build relationships and understand their concerns'
  }
];

export const likertOptions = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];