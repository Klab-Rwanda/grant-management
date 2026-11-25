import React, { useState } from 'react';
import { 
  Building2, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  BookOpen, 
  Sparkles, 
  Users, 
  FileText,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states matching G-04 & G-05
  const [legalName, setLegalName] = useState('Tembo Agritech Ltd');
  const [regNumber, setRegNumber] = useState('PVT-2023-89412');
  const [country, setCountry] = useState('Kenya');
  const [currency, setCurrency] = useState('USD');
  const [taxId, setTaxId] = useState('P051982341M');
  const [template, setTemplate] = useState<'TECH_SAAS' | 'AGRITECH' | 'BIOTECH' | 'CUSTOM'>('TECH_SAAS');

  const templates = [
    {
      id: 'TECH_SAAS',
      title: 'Technology & Growth Startup',
      description: 'Standard 42-account chart with R&D personnel, AWS cloud, contractors, and deferred grant revenue.',
      accountsCount: 42
    },
    {
      id: 'AGRITECH',
      title: 'AgriTech & Climate Field Operations',
      description: 'Includes field equipment, mobile money float accounts, sensor inventory, and agronomist payroll.',
      accountsCount: 48
    },
    {
      id: 'BIOTECH',
      title: 'Life Sciences & Lab Grants',
      description: 'Configured for specialized consumables, clinical trials, equipment amortization, and lab facilities.',
      accountsCount: 52
    }
  ];

  const handleFinish = () => {
    navigate('/startup/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded bg-[#16213A] flex items-center justify-center font-bold text-white text-sm">
            G
          </div>
          <span className="font-serif text-xl tracking-tight text-[#16213A] font-semibold">
            Grant Ledger
          </span>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              step >= 1 ? 'bg-[#0E6466] text-white' : 'bg-[#EAE6DD] text-[#5A6275]'
            }`}>
              1
            </div>
            <span className="text-xs font-medium text-[#16213A]">Organization Profile</span>
            <div className="w-8 h-0.5 bg-[#DDD8CC]"></div>

            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              step >= 2 ? 'bg-[#0E6466] text-white' : 'bg-[#EAE6DD] text-[#5A6275]'
            }`}>
              2
            </div>
            <span className="text-xs font-medium text-[#16213A]">Chart of Accounts</span>
            <div className="w-8 h-0.5 bg-[#DDD8CC]"></div>

            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              step >= 3 ? 'bg-[#0E6466] text-white' : 'bg-[#EAE6DD] text-[#5A6275]'
            }`}>
              3
            </div>
            <span className="text-xs font-medium text-[#16213A]">Ready</span>
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-8 shadow-ledger">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-serif font-normal text-[#16213A]">
                  Organization Profile
                </h2>
                <p className="text-xs text-[#5A6275] mt-1">
                  Enter your official legal registration for grant agreements and formal financial reporting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-[#16213A] mb-1">Legal Entity Name</label>
                  <input
                    type="text"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#16213A] mb-1">Registration Number</label>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#16213A] mb-1">Country of Registration</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#16213A] mb-1">Reporting Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="KES">KES (KSh)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-[#16213A] mb-1">Tax ID / PIN</label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
                >
                  <span>Continue to Chart of Accounts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-serif font-normal text-[#16213A]">
                  Select Chart of Accounts Template
                </h2>
                <p className="text-xs text-[#5A6275] mt-1">
                  Choose a pre-configured template tailored to your startup's sector. You can customize accounts anytime.
                </p>
              </div>

              <div className="space-y-3">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setTemplate(tpl.id as any)}
                    className={`p-4 rounded-lg border cursor-pointer transition ${
                      template === tpl.id 
                        ? 'border-[#0E6466] bg-[#E8F3F1]/40 ring-1 ring-[#0E6466]' 
                        : 'border-[#DDD8CC] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-xs text-[#16213A]">{tpl.title}</div>
                      <span className="text-[11px] text-[#0E6466] font-mono font-medium">
                        {tpl.accountsCount} preloaded accounts
                      </span>
                    </div>
                    <p className="text-xs text-[#5A6275]">{tpl.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium rounded-md border border-[#DDD8CC] text-[#5A6275] hover:bg-[#F1EEE7] transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
                >
                  <span>Confirm & Provision Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F3F1] text-[#0E6466] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-serif font-normal text-[#16213A]">
                  Workspace Ready
                </h2>
                <p className="text-xs text-[#5A6275] mt-1 max-w-md mx-auto">
                  Your double-entry general ledger, chart of accounts, and evidence vault have been initialized for {legalName}.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#DDD8CC] rounded-lg max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#5A6275]">Entity:</span>
                  <span className="font-medium text-[#16213A]">{legalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6275]">Ledger standard:</span>
                  <span className="font-mono text-[#0E6466]">US GAAP / IFRS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A6275]">Active Template:</span>
                  <span className="font-medium text-[#16213A]">Technology & Growth (42 acc)</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-6 py-2.5 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition inline-flex items-center gap-1.5"
              >
                <span>Enter Startup Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
