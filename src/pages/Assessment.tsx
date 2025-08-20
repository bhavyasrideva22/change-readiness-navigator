import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressIndicator } from '@/components/assessment/ProgressIndicator';
import { assessmentQuestions } from '@/data/questions';
import { AssessmentResponse, AssessmentState } from '@/types/assessment';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Assessment = () => {
  const navigate = useNavigate();
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentStep: 1,
    responses: [],
    timeStarted: new Date(),
    isComplete: false
  });

  const steps = ['Introduction', 'Psychometric', 'Technical', 'WISCAR', 'Results'];
  const currentQuestion = assessmentQuestions[assessmentState.currentStep - 2] || null;

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('assessmentState', JSON.stringify(assessmentState));
  }, [assessmentState]);

  const handleAnswer = (answer: string | number) => {
    if (!currentQuestion) return;

    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer: answer,
      timeSpent: Date.now() - assessmentState.timeStarted.getTime()
    };

    setAssessmentState(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== currentQuestion.id),
        newResponse
      ]
    }));
  };

  const handleNext = () => {
    if (assessmentState.currentStep === 1) {
      // Introduction to first question
      setAssessmentState(prev => ({ ...prev, currentStep: 2 }));
    } else if (assessmentState.currentStep - 1 < assessmentQuestions.length) {
      // Next question
      setAssessmentState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      // Complete assessment
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (assessmentState.currentStep > 1) {
      setAssessmentState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const completeAssessment = () => {
    const finalState = { ...assessmentState, isComplete: true };
    localStorage.setItem('assessmentState', JSON.stringify(finalState));
    localStorage.setItem('assessmentResponses', JSON.stringify(assessmentState.responses));
    
    toast({
      title: "Assessment Complete!",
      description: "Calculating your results...",
    });
    
    navigate('/results');
  };

  const getCurrentAnswer = (): string | number | undefined => {
    if (!currentQuestion) return undefined;
    const response = assessmentState.responses.find(r => r.questionId === currentQuestion.id);
    const answer = response?.answer;
    
    // Filter out array types since our UI only handles string | number
    if (Array.isArray(answer)) return undefined;
    return answer;
  };

  const canProceed = () => {
    if (assessmentState.currentStep === 1) return true;
    return getCurrentAnswer() !== undefined;
  };

  const renderContent = () => {
    if (assessmentState.currentStep === 1) {
      return (
        <Card className="max-w-4xl mx-auto shadow-strong bg-gradient-subtle border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Change Management Advisor Assessment
            </CardTitle>
            <p className="text-xl text-muted-foreground mt-4">
              Evaluate Your Readiness and Fit to Become a Change Management Advisor
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">What is Change Management Advising?</h3>
                <p className="text-muted-foreground">
                  A professional practice focused on managing the human side of change—ensuring stakeholders 
                  understand, accept, and implement changes effectively through communication, training, and support.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Assessment Overview</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• <strong>Duration:</strong> 20-30 minutes</li>
                  <li>• <strong>Questions:</strong> {assessmentQuestions.length} thoughtfully designed</li>
                  <li>• <strong>Areas:</strong> Personality, Skills, Knowledge, Readiness</li>
                  <li>• <strong>Results:</strong> Personalized insights and recommendations</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Career Paths You'll Explore</h3>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Change Management Advisor/Consultant
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Organizational Change Manager
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Business Transformation Lead
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  HR Change Specialist
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (currentQuestion) {
      return (
        <div className="max-w-4xl mx-auto space-y-6">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={getCurrentAnswer()}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <ProgressIndicator
            currentStep={assessmentState.currentStep}
            totalSteps={assessmentQuestions.length + 2}
            steps={steps}
          />
        </div>

        {renderContent()}

        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={assessmentState.currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            variant="hero"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {assessmentState.currentStep === assessmentQuestions.length + 1 ? 'View Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;