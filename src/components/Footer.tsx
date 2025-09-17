import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">PM Internship Scheme</h3>
            <p className="text-primary-foreground/80 mb-4">
              An initiative by the Ministry of Corporate Affairs to provide 
              structured internship opportunities to students across India, 
              powered by AI-driven smart allocation.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                <span className="text-saffron-foreground font-bold text-sm">GoI</span>
              </div>
              <span className="text-sm">Government of India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="/student" className="hover:text-primary-foreground transition-colors">Student Registration</a></li>
              <li><a href="/employer" className="hover:text-primary-foreground transition-colors">Employer Portal</a></li>
              <li><a href="/about" className="hover:text-primary-foreground transition-colors">About Scheme</a></li>
              <li><a href="/guidelines" className="hover:text-primary-foreground transition-colors">Guidelines</a></li>
              <li><a href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Ministry of Corporate Affairs</p>
              <p>5th Floor, A Wing, Shastri Bhawan</p>
              <p>New Delhi - 110001</p>
              <p>Email: internship@mca.gov.in</p>
              <p>Phone: 1800-123-4567</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
            © 2024 Ministry of Corporate Affairs, Government of India. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-primary-foreground/80">
            <a href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Use</a>
            <a href="/accessibility" className="hover:text-primary-foreground transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;