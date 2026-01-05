import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { BikeCoverageOptions } from "./BikeCoverageOptions";
import { BikePremiumDisplay } from "./BikePremiumDisplay";
import type { BikeQuoteData, BikeCoveragePlan } from "../types";

export function BikeInsuranceForm() {
  const [currentStep, setCurrentStep] = useState<'details' | 'coverage' | 'summary'>('details');
  const [quoteData, setQuoteData] = useState<BikeQuoteData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<BikeCoveragePlan | null>(null);

  const [formData, setFormData] = useState<Partial<BikeQuoteData>>({
    bikeMake: '',
    bikeModel: '',
    bikeYear: '',
    registrationNumber: '',
    fuelType: '',
    name: '',
    email: '',
    phone: '',
    pincode: '',
    previousPolicy: 'no',
    ncb: '0'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.bikeMake && formData.bikeModel && formData.bikeYear && formData.name && formData.email && formData.phone) {
      const completeData = formData as BikeQuoteData;
      setQuoteData(completeData);
      setCurrentStep('coverage');
    }
  };

  const updateField = (field: keyof BikeQuoteData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanSelect = (plan: BikeCoveragePlan) => {
    setSelectedPlan(plan);
    setCurrentStep('summary');
  };

  if (currentStep === 'coverage' && quoteData) {
    return <BikeCoverageOptions quoteData={quoteData} onPlanSelect={handlePlanSelect} />;
  }

  if (currentStep === 'summary' && quoteData && selectedPlan) {
    return <BikePremiumDisplay quoteData={quoteData} selectedPlan={selectedPlan} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Bike Insurance Quote
        </h1>
        <p className="text-lg text-slate-600">
          Protect your ride with comprehensive two-wheeler insurance
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">Vehicle Details</CardTitle>
          <CardDescription>
            Tell us about your bike to get an instant quote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bikeMake">Bike Make</Label>
                <Select onValueChange={(value) => updateField('bikeMake', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="tvs">TVS</SelectItem>
                    <SelectItem value="bajaj">Bajaj</SelectItem>
                    <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="ktm">KTM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bikeModel">Bike Model</Label>
                <Input
                  id="bikeModel"
                  placeholder="e.g., Splendor, Activa, Pulsar"
                  value={formData.bikeModel}
                  onChange={(e) => updateField('bikeModel', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bikeYear">Manufacturing Year</Label>
                <Select onValueChange={(value) => updateField('bikeYear', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  placeholder="e.g., MH01AB1234"
                  value={formData.registrationNumber}
                  onChange={(e) => updateField('registrationNumber', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select onValueChange={(value) => updateField('fuelType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  placeholder="Enter your pincode"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Policy History</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Did you have previous insurance?</Label>
                  <RadioGroup 
                    value={formData.previousPolicy} 
                    onValueChange={(value) => updateField('previousPolicy', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="prev-yes" />
                      <Label htmlFor="prev-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="prev-no" />
                      <Label htmlFor="prev-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>No Claim Bonus (NCB)</Label>
                  <Select onValueChange={(value) => updateField('ncb', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select NCB %" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="20">20%</SelectItem>
                      <SelectItem value="25">25%</SelectItem>
                      <SelectItem value="35">35%</SelectItem>
                      <SelectItem value="45">45%</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3"
            >
              Get Instant Quote
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}