import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressIndicator = ({ currentStep, totalSteps, steps }: ProgressIndicatorProps) => {
  const progressPercentage = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          Assessment Progress
        </h3>
        <span className="text-sm font-medium text-primary">
          {currentStep - 1} of {totalSteps} completed
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="flex justify-between items-center text-xs">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
              index < currentStep - 1 
                ? 'bg-primary border-primary text-white' 
                : index === currentStep - 1
                ? 'border-primary text-primary bg-primary/10'
                : 'border-muted-foreground/30 text-muted-foreground'
            }`}>
              {index < currentStep - 1 ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={`text-center max-w-16 leading-tight ${
              index < currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};