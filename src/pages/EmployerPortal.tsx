import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Building2, MapPin, Users, Briefcase, FileText } from "lucide-react";

const EmployerPortal = () => {
  const [formData, setFormData] = useState({
    companyInfo: {
      name: "",
      email: "",
      phone: "",
      website: "",
      size: "",
      sector: "",
      registration: "",
    },
    internshipDetails: {
      positions: "",
      duration: "",
      locations: [],
      skills: "",
      description: "",
      stipend: "",
      workMode: "",
    },
    requirements: {
      qualifications: [],
      experience: "",
      additionalInfo: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful!",
      description: "Your company has been registered. You will receive a confirmation email shortly.",
    });
  };

  const sectors = [
    "Technology & IT",
    "Healthcare",
    "Finance & Banking",
    "Manufacturing",
    "Education",
    "Renewable Energy",
    "Agriculture",
    "Government",
    "Consulting",
    "Media & Entertainment",
  ];

  const qualifications = [
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
  ];

  return (
    <div className="min-h-screen bg-accent/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Employer Registration Portal
          </h1>
          <p className="text-lg text-muted-foreground">
            Partner with us to offer internship opportunities to talented students
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Company Information
              </CardTitle>
              <CardDescription>
                Basic details about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input 
                    id="company-name" 
                    placeholder="Enter company name"
                    value={formData.companyInfo.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, name: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Official Email *</Label>
                  <Input 
                    id="company-email" 
                    type="email"
                    placeholder="hr@company.com"
                    value={formData.companyInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, email: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Contact Number *</Label>
                  <Input 
                    id="company-phone" 
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.companyInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, phone: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input 
                    id="website" 
                    placeholder="https://www.company.com"
                    value={formData.companyInfo.website}
                    onChange={(e) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, website: e.target.value }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-size">Company Size *</Label>
                  <Select
                    value={formData.companyInfo.size}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, size: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-10)</SelectItem>
                      <SelectItem value="small">Small (11-50)</SelectItem>
                      <SelectItem value="medium">Medium (51-200)</SelectItem>
                      <SelectItem value="large">Large (201-1000)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Industry Sector *</Label>
                  <Select
                    value={formData.companyInfo.sector}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, sector: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '-')}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration">Registration Number</Label>
                  <Input 
                    id="registration" 
                    placeholder="CIN/Registration No."
                    value={formData.companyInfo.registration}
                    onChange={(e) => setFormData({
                      ...formData,
                      companyInfo: { ...formData.companyInfo, registration: e.target.value }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Internship Details */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Internship Opportunities
              </CardTitle>
              <CardDescription>
                Details about the internship positions you're offering
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="positions">Number of Positions *</Label>
                  <Input 
                    id="positions" 
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.internshipDetails.positions}
                    onChange={(e) => setFormData({
                      ...formData,
                      internshipDetails: { ...formData.internshipDetails, positions: e.target.value }
                    })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Internship Duration *</Label>
                  <Select
                    value={formData.internshipDetails.duration}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      internshipDetails: { ...formData.internshipDetails, duration: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 months</SelectItem>
                      <SelectItem value="6months">6 months</SelectItem>
                      <SelectItem value="12months">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stipend">Monthly Stipend (INR)</Label>
                  <Input 
                    id="stipend" 
                    placeholder="e.g., 15000"
                    value={formData.internshipDetails.stipend}
                    onChange={(e) => setFormData({
                      ...formData,
                      internshipDetails: { ...formData.internshipDetails, stipend: e.target.value }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-mode">Work Mode *</Label>
                  <Select
                    value={formData.internshipDetails.workMode}
                    onValueChange={(value) => setFormData({
                      ...formData,
                      internshipDetails: { ...formData.internshipDetails, workMode: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills *</Label>
                <Textarea 
                  id="skills"
                  placeholder="List the technical skills, tools, and technologies required for this internship"
                  rows={3}
                  value={formData.internshipDetails.skills}
                  onChange={(e) => setFormData({
                    ...formData,
                    internshipDetails: { ...formData.internshipDetails, skills: e.target.value }
                  })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Internship Description *</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe the role, responsibilities, and learning opportunities"
                  rows={4}
                  value={formData.internshipDetails.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    internshipDetails: { ...formData.internshipDetails, description: e.target.value }
                  })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Candidate Requirements
              </CardTitle>
              <CardDescription>
                Specify the qualifications and criteria for candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Minimum Qualifications (Select multiple) *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {qualifications.map((qualification) => (
                    <div key={qualification} className="flex items-center space-x-2">
                      <Checkbox id={qualification} />
                      <Label htmlFor={qualification} className="text-sm">{qualification}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience-required">Experience Requirements</Label>
                <Textarea 
                  id="experience-required"
                  placeholder="Specify any experience requirements or preferences"
                  rows={3}
                  value={formData.requirements.experience}
                  onChange={(e) => setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, experience: e.target.value }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea 
                  id="additional-info"
                  placeholder="Any additional requirements, benefits, or information about the internship"
                  rows={3}
                  value={formData.requirements.additionalInfo}
                  onChange={(e) => setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, additionalInfo: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="border-card-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm leading-relaxed">
                  I agree to the Terms and Conditions of the PM Internship Scheme and 
                  confirm that all information provided is accurate. I understand that 
                  false information may result in disqualification.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary-light text-primary-foreground px-12"
            >
              Register Company
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerPortal;