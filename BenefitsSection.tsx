import { Shield, Clock, Award, Users, FileText, Headphones } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const benefits = [
  {
    icon: Shield,
    title: "Comprehensive Coverage",
    description: "Complete protection for your vehicle against all risks"
  },
  {
    icon: Clock,
    title: "Quick Claims",
    description: "Fast and hassle-free claim settlement process"
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive premiums with maximum benefits"
  },
  {
    icon: Users,
    title: "10M+ Happy Customers",
    description: "Trusted by millions of vehicle owners"
  },
  {
    icon: FileText,
    title: "Paperless Process",
    description: "Digital documentation and instant policy issuance"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round the clock assistance for emergencies"
  }
];

export function BenefitsSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Choose SafeDrive Insurance?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We provide comprehensive car insurance solutions with unmatched benefits and service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}