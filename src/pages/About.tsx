import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Users, Brain, Award, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-accent/20 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            About PM Internship Scheme
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering India's youth through industry exposure and skill development 
            with cutting-edge AI-powered smart allocation technology.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="border-card-border shadow-sm mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary mb-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
              To bridge the gap between academic learning and industry requirements by providing 
              structured internship opportunities to students across India, ensuring optimal 
              matching through artificial intelligence while promoting inclusive participation 
              from all regions and communities.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI-Powered Matching</CardTitle>
                <CardDescription>
                  Advanced machine learning algorithms analyze student profiles, skills, 
                  and preferences to find the most suitable internship opportunities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-saffron" />
                </div>
                <CardTitle className="text-xl">Inclusive Participation</CardTitle>
                <CardDescription>
                  Ensures representation from rural areas, aspirational districts, 
                  and different social categories through affirmative action policies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="text-xl">High Success Rate</CardTitle>
                <CardDescription>
                  Achieves 95%+ matching accuracy with continuous learning and 
                  optimization of allocation algorithms based on feedback.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Secure & Transparent</CardTitle>
                <CardDescription>
                  Government-grade security measures with transparent allocation 
                  process and real-time tracking of applications and placements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-saffron" />
                </div>
                <CardTitle className="text-xl">Real-time Processing</CardTitle>
                <CardDescription>
                  Instant matching and allocation with automated notifications 
                  and updates to both students and employers throughout the process.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="text-xl">Quality Assurance</CardTitle>
                <CardDescription>
                  Continuous monitoring of internship quality, mentor feedback, 
                  and skill development progress with certification upon completion.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Registration</h3>
              <p className="text-muted-foreground">
                Students and employers register on the platform with detailed profiles 
                including skills, preferences, and requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center text-saffron-foreground text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Matching</h3>
              <p className="text-muted-foreground">
                Our AI algorithm analyzes all data points to create optimal matches 
                considering skills, location, sector preferences, and diversity factors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center text-success-foreground text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Allocation</h3>
              <p className="text-muted-foreground">
                Successful matches are allocated and both parties are notified. 
                The internship begins with continuous monitoring and support.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <Card className="border-card-border shadow-sm mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary mb-4">Our Impact</CardTitle>
            <CardDescription>
              Transforming lives through meaningful internship experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">50,000+</div>
                <div className="text-sm text-muted-foreground">Students Placed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-saffron">5,000+</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">687</div>
                <div className="text-sm text-muted-foreground">Districts Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the PM Internship Scheme and be part of India's largest skill development initiative.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-light text-primary-foreground"
              asChild
            >
              <Link to="/student">Apply as Student</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
            >
              <Link to="/employer">Register as Employer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;