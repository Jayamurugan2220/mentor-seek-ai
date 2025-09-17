import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { 
  Users, 
  Building2, 
  Target, 
  TrendingUp, 
  MapPin, 
  Award,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-accent/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time insights into the PM Internship Scheme performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Registrations"
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
            title="Active Internships"
            value="32,156"
            description="Currently ongoing"
            icon={<Activity className="h-6 w-6" />}
            trend="+18% from last month"
            trendUp={true}
          />
        </div>

        {/* AI Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                AI Matching Performance
              </CardTitle>
              <CardDescription>
                Algorithm efficiency and accuracy metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Match Accuracy</span>
                    <span className="text-sm text-success font-semibold">95.2%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{width: '95.2%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Processing Speed</span>
                    <span className="text-sm text-primary font-semibold">98.7%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '98.7%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Student Satisfaction</span>
                    <span className="text-sm text-saffron font-semibold">92.8%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-saffron h-2 rounded-full" style={{width: '92.8%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Sector Distribution
              </CardTitle>
              <CardDescription>
                Internship allocation across different sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technology & IT</span>
                  <span className="text-sm font-semibold">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manufacturing</span>
                  <span className="text-sm font-semibold">22%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Finance & Banking</span>
                  <span className="text-sm font-semibold">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Healthcare</span>
                  <span className="text-sm font-semibold">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Others</span>
                  <span className="text-sm font-semibold">17%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-card-border shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>
                State-wise internship allocation and participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Top Performing States</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Maharashtra</span>
                      <span className="text-sm font-semibold">8,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Karnataka</span>
                      <span className="text-sm font-semibold">6,789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tamil Nadu</span>
                      <span className="text-sm font-semibold">5,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gujarat</span>
                      <span className="text-sm font-semibold">4,321</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Rural Participation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Aspirational Districts</span>
                      <span className="text-sm font-semibold">687/687</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Rural Students</span>
                      <span className="text-sm font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tribal Areas</span>
                      <span className="text-sm font-semibold">12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Remote Locations</span>
                      <span className="text-sm font-semibold">8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Quality Metrics
              </CardTitle>
              <CardDescription>
                Program quality and effectiveness indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">4.6/5</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="text-sm font-semibold">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Job Conversion</span>
                    <span className="text-sm font-semibold">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Skill Improvement</span>
                    <span className="text-sm font-semibold">94%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Batch matching completed for 1,234 students</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New employer registered: TechCorp Solutions</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 bg-saffron rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AI model accuracy improved to 95.2%</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;