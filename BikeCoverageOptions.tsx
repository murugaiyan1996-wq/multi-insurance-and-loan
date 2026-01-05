import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, Star } from "lucide-react";
import type { BikeQuoteData, BikeCoveragePlan } from "../types";

interface BikeCoverageOptionsProps {
  quoteData: BikeQuoteData;
  onPlanSelect: (plan: BikeCoveragePlan) => void;
}

const bikePlans: BikeCoveragePlan[] = [
  {
    id: 'third-party',
    name: 'Third Party Only',
    price: 548,
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
    price: 1847,
    description: 'Complete protection for your bike',
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
    price: 2856,
    description: 'All-inclusive coverage with add-ons',
    features: [
      'Everything in Comprehensive',
      'Zero Depreciation Cover',
      'Roadside Assistance',
      'Consumable Cover',
      'NCB Protection',
      'Engine Protection'
    ],
    recommended: false
  }
];

export function BikeCoverageOptions({ quoteData, onPlanSelect }: BikeCoverageOptionsProps) {
  const ncbDiscount = quoteData.ncb === '0' ? 0 : parseInt(quoteData.ncb);
  
  const adjustedPlans = bikePlans.map(plan => ({
    ...plan,
    price: Math.round(plan.price * (1 - ncbDiscount / 100))
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Choose Your Coverage Plan
        </h2>
        <p className="text-lg text-slate-600">
          {ncbDiscount > 0 && (
            <span className="text-green-600 font-semibold">
              You're eligible for {ncbDiscount}% NCB discount!
            </span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adjustedPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.recommended ? 'border-indigo-500 shadow-xl' : 'shadow-lg'}`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
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
                {ncbDiscount > 0 && (
                  <div className="text-sm text-green-600 mt-1">
                    Save {ncbDiscount}% with NCB
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => onPlanSelect(plan)}
                className={`w-full ${plan.recommended ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-900 hover:bg-slate-800'} text-white font-semibold`}
              >
                Select Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}