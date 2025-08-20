import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, TrendingUp, BookOpen, ArrowRight, Clock, Award } from 'lucide-react';
import heroImage from '@/assets/hero-change-management.jpg';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Change Readiness Navigator
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Discover Your Potential in Change Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take our comprehensive assessment to evaluate your readiness for a successful career 
              as a Change Management Advisor and receive personalized guidance for your journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={handleStartAssessment}
              className="flex items-center gap-3 group"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2"
            >
              Learn More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">20-30 min</div>
              <div className="text-sm text-muted-foreground">Assessment Duration</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-foreground">15 Questions</div>
              <div className="text-sm text-muted-foreground">Expertly Designed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">Personalized</div>
              <div className="text-sm text-muted-foreground">Career Guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What is Change Management?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Change Management is the practice of guiding organizations and individuals through 
              transitions to achieve desired outcomes while minimizing resistance and maximizing adoption.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={heroImage} 
                alt="Change management professionals collaborating on business transformation" 
                className="rounded-xl shadow-strong w-full object-cover"
              />
            </div>
            
            <div className="space-y-6 order-1 lg:order-2">
              <Card className="shadow-medium border-0 bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-sm">Stakeholder engagement and communication planning</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-sm">Change impact analysis and risk assessment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-sm">Training design and delivery</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-sm">Resistance identification and mitigation</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium border-0 bg-gradient-subtle">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    Career Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="secondary" className="mb-2">Change Management Consultant</Badge>
                  <Badge variant="outline" className="mb-2 ml-2">Organizational Development</Badge>
                  <Badge variant="secondary" className="mb-2">Business Transformation Lead</Badge>
                  <Badge variant="outline" className="mb-2 ml-2">HR Change Specialist</Badge>
                  <Badge variant="secondary" className="mb-2">Project Manager</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-strong border-0 bg-gradient-subtle">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Ready to Begin Your Assessment?</CardTitle>
              <p className="text-muted-foreground">
                Our comprehensive evaluation covers personality fit, technical knowledge, 
                and career readiness using the proven WISCAR framework.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Psychometric</h4>
                  <p className="text-sm text-muted-foreground">Personality traits and behavioral patterns</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                  <h4 className="font-semibold text-secondary mb-2">Technical</h4>
                  <p className="text-sm text-muted-foreground">Knowledge and methodologies</p>
                </div>
                <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                  <h4 className="font-semibold text-success mb-2">WISCAR</h4>
                  <p className="text-sm text-muted-foreground">Comprehensive readiness framework</p>
                </div>
              </div>

              <Button
                variant="hero"
                size="xl"
                onClick={handleStartAssessment}
                className="flex items-center gap-3 group"
              >
                Start Your Assessment Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;