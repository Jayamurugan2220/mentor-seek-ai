import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { ArrowRight, Users, Building2, Target, TrendingUp, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                PM Internship Scheme
              </h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6 text-primary-foreground/90">
                AI-Powered Smart Allocation Engine
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/80 leading-relaxed">
                Bridging the gap between students and industry through intelligent matching. 
                Our AI-driven platform ensures optimal allocation of internship opportunities 
                based on skills, qualifications, and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-saffron hover:bg-saffron-light text-saffron-foreground font-semibold"
                  asChild
                >
                  <Link to="/student">
                    Apply as Student <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <Link to="/employer">Register as Employer</Link>
                </Button>
              </div>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="relative">
              <div className="bg-primary-foreground/10 rounded-lg p-8 backdrop-blur-sm border border-primary-foreground/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-saffron/20 rounded-lg p-4 flex flex-col items-center text-center">
                    <Users className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">50,000+ Students</span>
                  </div>
                  <div className="bg-success/20 rounded-lg p-4 flex flex-col items-center text-center">
                    <Building2 className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">5,000+ Companies</span>
                  </div>
                  <div className="bg-primary-foreground/20 rounded-lg p-4 flex flex-col items-center text-center">
                    <Target className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">95% Match Rate</span>
                  </div>
                  <div className="bg-saffron/20 rounded-lg p-4 flex flex-col items-center text-center">
                    <Award className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">AI-Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Scheme Performance Dashboard
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-time statistics of the PM Internship Scheme
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Applications"
              value="52,847"
              description="Students registered"
              icon={<Users className="h-6 w-6" />}
              trend="+12% from last month"
              trendUp={true}
            />
            <StatCard
              title="Active Employers"
              value="5,234"
              description="Companies participating"
              icon={<Building2 className="h-6 w-6" />}
              trend="+8% from last month"
              trendUp={true}
            />
            <StatCard
              title="Successful Matches"
              value="48,901"
              description="AI-powered allocations"
              icon={<Target className="h-6 w-6" />}
              trend="95.2% success rate"
              trendUp={true}
            />
            <StatCard
              title="Rural Coverage"
              value="687"
              description="Aspirational districts"
              icon={<MapPin className="h-6 w-6" />}
              trend="100% coverage achieved"
              trendUp={true}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Advanced AI algorithms for optimal internship matching
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Matching</CardTitle>
                <CardDescription>
                  AI-powered algorithm matches students with the most suitable internship 
                  opportunities based on skills, qualifications, and preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-saffron" />
                </div>
                <CardTitle className="text-xl">Inclusive Allocation</CardTitle>
                <CardDescription>
                  Ensures representation from rural areas, aspirational districts, 
                  and different social categories through affirmative action.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-card-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <CardTitle className="text-xl">Real-time Analytics</CardTitle>
                <CardDescription>
                  Comprehensive dashboard providing insights into allocation patterns, 
                  success rates, and scheme performance metrics.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-saffron to-saffron-light text-saffron-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-saffron-foreground/90">
            Join thousands of students and employers already benefiting from our smart allocation system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-light text-primary-foreground"
              asChild
            >
              <Link to="/student">Student Registration</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-saffron-foreground text-saffron-foreground hover:bg-saffron-foreground hover:text-saffron"
              asChild
            >
              <Link to="/employer">Employer Portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;