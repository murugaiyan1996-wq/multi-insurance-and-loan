export interface PersonalLoanData {
  loanAmount: string;
  loanTenure: string;
  employmentType: string;
  monthlyIncome: string;
  companyType: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  existingEMI: string;
  creditScore: string;
}

export interface LoanOffer {
  id: string;
  bankName: string;
  interestRate: number;
  processingFee: number;
  monthlyEMI: number;
  totalAmount: number;
  features: string[];
}