import { Shield, DollarSign, Phone, Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

interface HeaderProps {
  selectedProduct: 'bike-insurance' | 'personal-loan';
  onProductChange: (product: 'bike-insurance' | 'personal-loan') => void;
}

export function Header({ selectedProduct, onProductChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-slate-900">FinanceHub</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onProductChange('bike-insurance')}
              className={`font-medium transition-colors ${
                selectedProduct === 'bike-insurance' 
                  ? 'text-indigo-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bike Insurance
            </button>
            <button
              onClick={() => onProductChange('personal-loan')}
              className={`font-medium transition-colors ${
                selectedProduct === 'personal-loan' 
                  ? 'text-indigo-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Personal Loan
            </button>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Car Insurance
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home Loan
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-slate-600">
              <Phone className="h-4 w-4" />
              <span className="text-sm">1800-123-4567</span>
            </div>
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="space-y-3">
              <button
                onClick={() => {
                  onProductChange('bike-insurance');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 font-medium ${
                  selectedProduct === 'bike-insurance' 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Bike Insurance
              </button>
              <button
                onClick={() => {
                  onProductChange('personal-loan');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 font-medium ${
                  selectedProduct === 'personal-loan' 
                    ? 'text-indigo-600 bg-indigo-50' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Personal Loan
              </button>
              <a href="#" className="block px-4 py-2 text-slate-600 hover:bg-slate-50">
                Car Insurance
              </a>
              <a href="#" className="block px-4 py-2 text-slate-600 hover:bg-slate-50">
                Home Loan
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}