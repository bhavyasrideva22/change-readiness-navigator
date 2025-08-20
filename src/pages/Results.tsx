import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ResultsRadarChart } from '@/components/assessment/ResultsRadarChart';
import { AssessmentResponse, AssessmentResults } from '@/types/assessment';
import { calculateAssessmentResults } from '@/utils/assessment-scoring';
import { CheckCircle, TrendingUp, BookOpen, Users, ArrowRight, RotateCcw } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedResponses = localStorage.getItem('assessmentResponses');
    if (!savedResponses) {
      navigate('/');
      return;
    }

    try {
      const responses: AssessmentResponse[] = JSON.parse(savedResponses);
      const calculatedResults = calculateAssessmentResults(responses);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Error calculating results:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRetakeAssessment = () => {
    localStorage.removeItem('assessmentState');
    localStorage.removeItem('assessmentResponses');
    navigate('/assessment');
  };

  if (loading || !results) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'bg-success text-success-foreground';
      case 'maybe': return 'bg-warning text-warning-foreground';
      case 'no': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Proceed with Preparation';
      case 'no': return 'Consider Alternative Paths';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Your Assessment Results
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive analysis of your readiness for Change Management
            </p>
          </div>

          {/* Overall Score & Recommendation */}
          <Card className="shadow-strong border-0 bg-gradient-subtle">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-primary">
                    {results.overallScore}
                  </div>
                  <div className="text-lg text-muted-foreground">Overall Readiness Score</div>
                  <Progress value={results.overallScore} className="h-3" />
                </div>
                <div className="space-y-4">
                  <Badge className={`text-lg py-2 px-4 ${getRecommendationColor(results.recommendation)}`}>
                    {getRecommendationText(results.recommendation)}
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    {results.recommendation === 'yes' && 
                      "Excellent! You demonstrate strong potential for success in change management roles. Your skills and mindset align well with industry requirements."}
                    {results.recommendation === 'maybe' && 
                      "Good foundation with room for growth. With focused development in key areas, you can build a successful change management career."}
                    {results.recommendation === 'no' && 
                      "Consider building foundational skills or exploring related fields before pursuing change management roles."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Psychometric Fit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-primary">{results.psychometricScore}</div>
                  <Progress value={results.psychometricScore} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Personality traits and behavioral patterns for change management success.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-secondary">{results.technicalScore}</div>
                  <Progress value={results.technicalScore} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Knowledge of frameworks, methodologies, and best practices.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  WISCAR Average
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-success">
                    {Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}
                  </div>
                  <Progress 
                    value={Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6} 
                    className="h-2" 
                  />
                  <p className="text-sm text-muted-foreground">
                    Comprehensive readiness across six key dimensions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Radar Chart */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl">WISCAR Framework Analysis</CardTitle>
              <p className="text-muted-foreground">
                Your readiness across six critical dimensions for change management success
              </p>
            </CardHeader>
            <CardContent>
              <ResultsRadarChart wiscarScores={results.wiscarScores} />
            </CardContent>
          </Card>

          {/* Insights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  Your Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-warning">
                  <TrendingUp className="w-5 h-5" />
                  Growth Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <ArrowRight className="w-5 h-5" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Career Paths */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-secondary">
                  <Users className="w-5 h-5" />
                  Career Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.careerPaths.map((path, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {path}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={handleRetakeAssessment}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;