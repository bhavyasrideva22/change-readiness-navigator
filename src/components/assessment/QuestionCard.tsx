import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/assessment';
import { useState } from 'react';
import { likertOptions } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string | number) => void;
  currentAnswer?: string | number;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>(currentAnswer || '');

  const handleAnswerChange = (value: string | number) => {
    setSelectedAnswer(value);
    onAnswer(value);
  };

  const renderQuestionContent = () => {
    if (question.scenario) {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
            <p className="text-sm font-medium text-muted-foreground mb-2">Scenario:</p>
            <p className="text-foreground">{question.scenario}</p>
          </div>
          <p className="text-lg font-medium">{question.question}</p>
        </div>
      );
    }
    return <p className="text-lg font-medium">{question.question}</p>;
  };

  const renderAnswerOptions = () => {
    if (question.type === 'likert') {
      return (
        <RadioGroup 
          value={selectedAnswer.toString()} 
          onValueChange={(value) => handleAnswerChange(Number(value))}
          className="space-y-3"
        >
          {likertOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
              <Label 
                htmlFor={`option-${option.value}`} 
                className="text-sm font-medium cursor-pointer flex-1 py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    if (question.type === 'multiple-choice' && question.options) {
      return (
        <RadioGroup 
          value={selectedAnswer.toString()} 
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-start space-x-3">
              <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
              <Label 
                htmlFor={`option-${index}`} 
                className="text-sm font-medium cursor-pointer flex-1 py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    return null;
  };

  return (
    <Card className="w-full shadow-medium border-0 bg-gradient-subtle">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </span>
          {question.subcategory && (
            <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
              {question.subcategory.charAt(0).toUpperCase() + question.subcategory.slice(1)}
            </span>
          )}
        </div>
        <CardTitle className="text-xl">
          {renderQuestionContent()}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {renderAnswerOptions()}
      </CardContent>
    </Card>
  );
};