import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Layers, 
  DollarSign, 
  Calendar,
  Building2,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GrantSetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states matching B-03
  const [programName, setProgramName] = useState('East Africa CleanTech Challenge 2026');
  const [funderName, setFunderName] = useState('Global Innovation & Tech Fund (GITF)');
  const [poolSize, setPoolSize] = useState<number>(1200000);
  const [grantSize, setGrantSize] = useState<number>(150000);
  const [cohortSize, setCohortSize] = useState<number>(8);
  const [trancheConfig, setTrancheConfig] = useState([
    { tranche: 1, pct: 30, amount: 45000, condition: 'Initial advance upon grant agreement execution' },
    { tranche: 2, pct: 35, amount: 52500, condition: 'Midterm milestone deliverables & 80% T1 reconciliation' },
    { tranche: 3, pct: 35, amount: 52500, condition: 'Final field deployment audit & complete report' }
  ]);

  const handleFinish = () => {
    navigate('/institution/programs');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header matching B-03 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Create Grant Program
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Configure funding envelope, disbursement tranche rules, and milestone validation criteria
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-[#DDD8CC] shadow-ledger">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
          currentStep >= 1 ? 'bg-[#0E6466] text-white' : 'bg-[#EAE6DD] text-[#5A6275]'
        }`}>
          1
        </div>
        <span className="text-xs font-medium text-[#16213A]">Program Envelope</span>
        <div className="w-12 h-0.5 bg-[#DDD8CC]"></div>

        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
          currentStep >= 2 ? 'bg-[#0E6466] text-white' : 'bg-[#EAE6DD] text-[#5A6275]'
        }`}>
          2
        </div>
        <span className="text-xs font-medium text-[#16213A]">Tranche Structure</span>
        <div className="w-12 h-0.5 bg-[#DDD8CC]"></div>

        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
          currentStep >= 3 ? 'bg-[#0E6466] text-white' : 'bg-[#EAE6DD] text-[#5A6275]'
        }`}>
          3
        </div>
        <span className="text-xs font-medium text-[#16213A]">Governance & Launch</span>
      </div>

      <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger">
        {currentStep === 1 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-xl font-serif font-normal text-[#16213A]">Program Overview</h2>
              <p className="text-[#5A6275] mt-0.5">Define high-level funding allocation and intended startup cohort.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-medium text-[#16213A] mb-1">Grant Program Title</label>
                <input 
                  type="text" 
                  value={programName} 
                  onChange={e => setProgramName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#16213A] mb-1">Funding Institution Name</label>
                <input 
                  type="text" 
                  value={funderName} 
                  onChange={e => setFunderName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#16213A] mb-1">Total Facility Envelope (USD)</label>
                <input 
                  type="number" 
                  value={poolSize} 
                  onChange={e => setPoolSize(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md font-mono text-[#16213A]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#16213A] mb-1">Grant Size per Startup (USD)</label>
                <input 
                  type="number" 
                  value={grantSize} 
                  onChange={e => setGrantSize(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md font-mono text-[#16213A]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#16213A] mb-1">Maximum Cohort Grantees</label>
                <input 
                  type="number" 
                  value={cohortSize} 
                  onChange={e => setCohortSize(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md font-mono text-[#16213A]"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 bg-[#0E6466] text-white rounded-md hover:bg-[#0B4F51] transition flex items-center gap-1.5"
              >
                <span>Continue to Tranche Structure</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5 text-xs">
            <div>
              <h2 className="text-xl font-serif font-normal text-[#16213A]">Tranche Disbursement Schedule</h2>
              <p className="text-[#5A6275] mt-0.5">Configure milestones and disbursement release conditions for each tranche.</p>
            </div>

            <div className="space-y-3">
              {trancheConfig.map((t, idx) => (
                <div key={t.tranche} className="p-4 border border-[#DDD8CC] rounded-lg bg-[#FAF8F5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#16213A]">Tranche {t.tranche} ({t.pct}%)</span>
                    <span className="font-mono font-medium text-[#0E6466]">${t.amount.toLocaleString()} USD</span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#5A6275] mb-1">Milestone Gate Condition</label>
                    <input 
                      type="text" 
                      value={t.condition}
                      onChange={e => {
                        const copy = [...trancheConfig];
                        copy[idx].condition = e.target.value;
                        setTrancheConfig(copy);
                      }}
                      className="w-full px-2.5 py-1.5 border border-[#DDD8CC] rounded bg-white text-[#16213A]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-[#DDD8CC] text-[#5A6275] rounded-md hover:bg-[#F1EEE7]"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 bg-[#0E6466] text-white rounded-md hover:bg-[#0B4F51] transition flex items-center gap-1.5"
              >
                <span>Review Governance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 text-center py-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-[#E8F3F1] text-[#0E6466] flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-2xl font-serif font-normal text-[#16213A]">
                Ready to Publish Program
              </h2>
              <p className="text-[#5A6275] mt-1 max-w-md mx-auto">
                Program envelope of <strong>${poolSize.toLocaleString()} USD</strong> configured with 3 gated tranches for <strong>{cohortSize} startups</strong>.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-[#DDD8CC] text-[#5A6275] rounded-md hover:bg-[#F1EEE7]"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="px-5 py-2 bg-[#0E6466] text-white rounded-md hover:bg-[#0B4F51] transition flex items-center gap-1.5"
              >
                <span>Publish Grant Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
