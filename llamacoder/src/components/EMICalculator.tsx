import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";
import type { PersonalLoanData, LoanOffer } from "../types";

interface EMICalculatorProps {
  loanData: PersonalLoanData;
  onOfferSelect: (offer: LoanOffer) => void;
}

export function EMICalculator({ loanData, onOfferSelect }: EMICalculatorProps) {
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [offers, setOffers] = useState<LoanOffer[]>([]);

  useEffect(() => {
    calculateEMI();
    generateOffers();
  }, [loanData]);

  const calculateEMI = () => {
    const principal = parseFloat(loanData.loanAmount);
    const rate = 10.49 / 12 / 100; // 10.49% annual rate
    const time = parseInt(loanData.loanTenure);

    const emiAmount = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const total = emiAmount * time;
    const interest = total - principal;

    setEmi(Math.round(emiAmount));
    setTotalAmount(Math.round(total));
    setTotalInterest(Math.round(interest));
  };

  const generateOffers = () => {
    const principal = parseFloat(loanData.loanAmount);
    const time = parseInt(loanData.loanTenure);
    
    const baseOffers: LoanOffer[] = [
      {
        id: '1',
        bankName: 'HDFC Bank',
        interestRate: 10.49,
        processingFee: 2,
        monthlyEMI: 0,
        totalAmount: 0,
        features: ['Instant approval', 'Zero foreclosure charges', 'Flexible tenure']
      },
      {
        id: '2',
        bankName: 'ICICI Bank',
        interestRate: 10.75,
        processingFee: 2.5,
        monthlyEMI: 0,
        totalAmount: 0,
        features: ['Quick disbursal', 'Minimal documentation', 'Online process']
      },
      {
        id: '3',
        bankName: 'SBI',
        interestRate: 9.85,
        processingFee: 1.5,
        monthlyEMI: 0,
        totalAmount: 0,
        features: ['Lowest interest', 'Government bank', 'Wide network']
      }
    ];

    const calculatedOffers = baseOffers.map(offer => {
      const rate = offer.interestRate / 12 / 100;
      const emiAmount = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const total = emiAmount * time + (principal * offer.processingFee / 100);
      
      return {
        ...offer,
        monthlyEMI: Math.round(emiAmount),
        totalAmount: Math.round(total)
      };
    });

    setOffers(calculatedOffers);
  };

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Button 
        onClick={handleBack}
        variant="outline" 
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Application</span>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Calculator className="h-8 w-8" />
              <span className="text-sm opacity-90">Monthly EMI</span>
            </div>
            <div className="text-3xl font-bold">₹{emi.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8" />
              <span className="text-sm opacity-90">Total Interest</span>
            </div>
            <div className="text-3xl font-bold">₹{totalInterest.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-8 w-8" />
              <span className="text-sm opacity-90">Total Amount</span>
            </div>
            <div className="text-3xl font-bold">₹{totalAmount.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">Available Loan Offers</CardTitle>
          <CardDescription>
            Compare and choose the best loan offer based on your requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 rounded-bl-lg text-sm font-semibold">
                  {offer.interestRate}% p.a.
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{offer.bankName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Monthly EMI</span>
                      <span className="font-semibold">₹{offer.monthlyEMI.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Processing Fee</span>
                      <span className="font-semibold">{offer.processingFee}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Total Amount</span>
                      <span className="font-semibold">₹{offer.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Features:</h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => onOfferSelect(offer)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Select This Offer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}