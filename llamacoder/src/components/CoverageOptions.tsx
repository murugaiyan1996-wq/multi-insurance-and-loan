import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, Star } from "lucide-react";
import type { QuoteData, CoveragePlan } from "../types";

interface CoverageOptionsProps {
  quoteData: QuoteData;
  onPlanSelect: (plan: CoveragePlan) => void;
}

const plans: CoveragePlan[] = [
  {
    id: 'third-party',
    name: 'Third Party Only',
    price: 2094,
    description: 'Basic coverage as per law',
    features: [
      'Third Party Liability',
      'Personal Accident Cover',
      'Legal Liability to Driver'
    ],
    recommended: false
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    price: 5487,
    description: 'Complete protection for your car',
    features: [
      'Third Party Liability',
      'Own Damage Cover',
      'Personal Accident Cover',
      'Natural Calamities',
      'Theft & Burglary',
      'Fire & Explosion'
    ],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium Comprehensive',
    price: 7823,
    description: 'All-inclusive coverage with add-ons',
    features: [
      'Everything in Comprehensive',
      'Zero Depreciation Cover',
      'Engine Protection',
      '24/7 Roadside Assistance',
      'Consumable Cover',
      'NCB Protection'
    ],
    recommended: false
  }
];

export function CoverageOptions({ quoteData, onPlanSelect }: CoverageOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative ${plan.recommended ? 'border-teal-500 shadow-xl' : 'shadow-lg'}`}
        >
          {plan.recommended && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current" />
                <span>Most Popular</span>
              </div>
            </div>
          )}
          
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-slate-900">{plan.name}</CardTitle>
            <CardDescription className="text-slate-600">
              {plan.description}
            </CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold text-slate-900">₹{plan.price.toLocaleString()}</span>
              <span className="text-slate-600">/year</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => onPlanSelect(plan)}
              className={`w-full ${plan.recommended ? 'bg-teal-600 hover:bg-teal-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-semibold`}
            >
              Select Plan
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}