import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { EMICalculator } from "./EMICalculator";
import { LoanOfferDisplay } from "./LoanOfferDisplay";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";
import type { PersonalLoanData, LoanOffer } from "../types";

export function PersonalLoanForm() {
  const [currentStep, setCurrentStep] = useState<'details' | 'calculator' | 'offers'>('details');
  const [loanData, setLoanData] = useState<PersonalLoanData | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<LoanOffer | null>(null);

  const [formData, setFormData] = useState<Partial<PersonalLoanData>>({
    loanAmount: '',
    loanTenure: '',
    employmentType: '',
    monthlyIncome: '',
    companyType: '',
    name: '',
    email: '',
    phone: '',
    pincode: '',
    existingEMI: '',
    creditScore: '750'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.loanAmount && formData.loanTenure && formData.employmentType && formData.monthlyIncome && formData.name && formData.email && formData.phone) {
      const completeData = formData as PersonalLoanData;
      setLoanData(completeData);
      setCurrentStep('calculator');
    }
  };

  const updateField = (field: keyof PersonalLoanData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOfferSelect = (offer: LoanOffer) => {
    setSelectedOffer(offer);
    setCurrentStep('offers');
  };

  if (currentStep === 'calculator' && loanData) {
    return <EMICalculator loanData={loanData} onOfferSelect={handleOfferSelect} />;
  }

  if (currentStep === 'offers' && loanData && selectedOffer) {
    return <LoanOfferDisplay loanData={loanData} selectedOffer={selectedOffer} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Personal Loan Application
        </h1>
        <p className="text-lg text-slate-600">
          Get instant approval on personal loans with competitive interest rates
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">Loan Requirements</CardTitle>
          <CardDescription>
            Tell us about your loan requirements and financial details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <Select onValueChange={(value) => updateField('loanAmount', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50000">₹50,000</SelectItem>
                    <SelectItem value="100000">₹1,00,000</SelectItem>
                    <SelectItem value="200000">₹2,00,000</SelectItem>
                    <SelectItem value="300000">₹3,00,000</SelectItem>
                    <SelectItem value="500000">₹5,00,000</SelectItem>
                    <SelectItem value="1000000">₹10,00,000</SelectItem>
                    <SelectItem value="1500000">₹15,00,000</SelectItem>
                    <SelectItem value="2000000">₹20,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTenure">Loan Tenure</Label>
                <Select onValueChange={(value) => updateField('loanTenure', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="48">48 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                    <SelectItem value="72">72 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select onValueChange={(value) => updateField('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyType">Company Type</Label>
                <Select onValueChange={(value) => updateField('companyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mnc">MNC</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private Limited</SelectItem>
                    <SelectItem value="proprietorship">Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Select onValueChange={(value) => updateField('monthlyIncome', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select monthly income" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25000">₹25,000 - ₹35,000</SelectItem>
                    <SelectItem value="35000">₹35,000 - ₹50,000</SelectItem>
                    <SelectItem value="50000">₹50,000 - ₹75,000</SelectItem>
                    <SelectItem value="75000">₹75,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100000">Above ₹1,00,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingEMI">Existing EMI (₹)</Label>
                <Input
                  id="existingEMI"
                  placeholder="Enter total existing EMI"
                  value={formData.existingEMI}
                  onChange={(e) => updateField('existingEMI', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditScore">Credit Score</Label>
                <Select onValueChange={(value) => updateField('creditScore', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="750">750+ (Excellent)</SelectItem>
                    <SelectItem value="700">700-749 (Good)</SelectItem>
                    <SelectItem value="650">650-699 (Fair)</SelectItem>
                    <SelectItem value="600">600-649 (Poor)</SelectItem>
                    <SelectItem value="below">Below 600</SelectItem>
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
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 flex items-center justify-center space-x-2"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate EMI & Check Offers</span>
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <DollarSign className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Low Interest Rates</h3>
            <p className="text-sm text-slate-600">Starting from 10.49% p.a.</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Quick Approval</h3>
            <p className="text-sm text-slate-600">Get approved in 24 hours</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Calculator className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Flexible Tenure</h3>
            <p className="text-sm text-slate-600">Choose tenure up to 72 months</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}