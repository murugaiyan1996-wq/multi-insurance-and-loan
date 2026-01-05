import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, Shield, Clock, Users } from "lucide-react";
import type { BikeQuoteData, BikeCoveragePlan } from "../types";

interface BikePremiumDisplayProps {
  quoteData: BikeQuoteData;
  selectedPlan: BikeCoveragePlan;
}

export function BikePremiumDisplay({ quoteData, selectedPlan }: BikePremiumDisplayProps) {
  const addOns = [
    { name: 'Zero Depreciation', price: 450 },
    { name: 'Roadside Assistance', price: 200 },
    { name: 'Consumable Cover', price: 250 },
    { name: 'Engine Protection', price: 350 }
  ];

  const selectedAddOns = addOns.slice(0, 2);
  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  const totalPremium = selectedPlan.price + addOnsTotal;
  const gst = Math.round(totalPremium * 0.18);
  const finalAmount = totalPremium + gst;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Your Bike Insurance Summary
        </h2>
        <p className="text-lg text-slate-600">
          Review your details and proceed to purchase
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Vehicle Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-slate-600">Bike Make & Model:</span>
                  <p className="font-semibold text-slate-900 capitalize">
                    {quoteData.bikeMake} {quoteData.bikeModel}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Year:</span>
                  <p className="font-semibold text-slate-900">{quoteData.bikeYear}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Registration:</span>
                  <p className="font-semibold text-slate-900">{quoteData.registrationNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Fuel Type:</span>
                  <p className="font-semibold text-slate-900 capitalize">{quoteData.fuelType}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">NCB:</span>
                  <p className="font-semibold text-slate-900">{quoteData.ncb}%</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Previous Policy:</span>
                  <p className="font-semibold text-slate-900 capitalize">{quoteData.previousPolicy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Selected Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-indigo-900 mb-2">{selectedPlan.name}</h4>
                <ul className="space-y-1">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-indigo-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <h4 className="font-semibold text-slate-900 mb-3">Selected Add-ons</h4>
              <div className="space-y-2">
                {selectedAddOns.map((addOn, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-700">{addOn.name}</span>
                    <span className="font-semibold text-slate-900">₹{addOn.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Why Choose FinanceHub?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900">100% Secure</h4>
                  <p className="text-sm text-slate-600">Your data is protected with bank-level security</p>
                </div>
                <div className="text-center">
                  <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900">Instant Policy</h4>
                  <p className="text-sm text-slate-600">Get your policy issued within minutes</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-slate-900">24/7 Support</h4>
                  <p className="text-sm text-slate-600">Round the clock assistance for all your needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Premium Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Premium</span>
                  <span className="font-semibold text-slate-900">₹{selectedPlan.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Add-ons</span>
                  <span className="font-semibold text-slate-900">₹{addOnsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{totalPremium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">GST (18%)</span>
                  <span className="font-semibold text-slate-900">₹{gst.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-bold text-indigo-600">₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3">
                Proceed to Payment
              </Button>
              
              <p className="text-xs text-center text-slate-500">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}