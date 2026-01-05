import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Check, Clock, FileText, Users } from "lucide-react";
import type { PersonalLoanData, LoanOffer } from "../types";

interface LoanOfferDisplayProps {
  loanData: PersonalLoanData;
  selectedOffer: LoanOffer;
}

export function LoanOfferDisplay({ loanData, selectedOffer }: LoanOfferDisplayProps) {
  const handleBack = () => {
    window.location.reload();
  };

  const handleProceed = () => {
    alert('Thank you for your application! Our representative will contact you soon.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        onClick={handleBack}
        variant="outline" 
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Offers</span>
      </Button>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl text-slate-900">Congratulations!</CardTitle>
          <CardDescription className="text-lg">
            Your loan has been pre-approved with {selectedOffer.bankName}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Loan Amount</span>
              <span className="font-semibold">₹{parseInt(loanData.loanAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Tenure</span>
              <span className="font-semibold">{loanData.loanTenure} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Interest Rate</span>
              <span className="font-semibold">{selectedOffer.interestRate}% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Monthly EMI</span>
              <span className="font-semibold text-emerald-600">₹{selectedOffer.monthlyEMI.toLocaleString('en-IN')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Applicant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Name</span>
              <span className="font-semibold">{loanData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Email</span>
              <span className="font-semibold">{loanData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Phone</span>
              <span className="font-semibold">{loanData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Employment</span>
              <span className="font-semibold">{loanData.employmentType}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Document Submission</h4>
                <p className="text-sm text-slate-600">Upload required documents online</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Verification</h4>
                <p className="text-sm text-slate-600">Quick verification process (24-48 hours)</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Loan Disbursal</h4>
                <p className="text-sm text-slate-600">Amount credited to your account</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={handleProceed}
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-lg"
        >
          Proceed with Application
        </Button>
        <p className="text-sm text-slate-600 mt-4">
          By proceeding, you agree to the terms and conditions of {selectedOffer.bankName}
        </p>
      </div>
    </div>
  );
}