import React, { useState } from 'react';
import { 
  ChevronDown, 
  AlertTriangle, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Screen B-02: Create grant program
export const CreateGrantProgram: React.FC = () => {
  const navigate = useNavigate();

  // Form fields matching B-02
  const [title, setTitle] = useState('Health Innovation Pilot 2027');
  const [poolAmount, setPoolAmount] = useState<number>(0);
  const [currency, setCurrency] = useState('USD — US dollar');
  const [startDate, setStartDate] = useState('2027-02-01');
  const [endDate, setEndDate] = useState('2028-01-31');
  const [description, setDescription] = useState('Early-stage health-tech pilots in primary-care settings.');

  // Default rules for new grants matching B-02
  const [numTranches, setNumTranches] = useState('3');
  const [varianceTolerance, setVarianceTolerance] = useState('5%');
  const [reviewSla, setReviewSla] = useState('10');
  const [categories, setCategories] = useState({
    rdPersonnel: true,
    equipment: true,
    contractors: true,
    cloud: false,
    marketing: false,
    directPayroll: false
  });
  const [requireMilestone, setRequireMilestone] = useState(true);

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (poolAmount <= 0) return;
    navigate('/institution/programs');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Create grant program
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            Programs hold the funding pool and the default rules new grants start from
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/institution/programs"
            className="px-4 py-2 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition"
          >
            Cancel
          </Link>
          <button
            onClick={handleSaveProgram}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition"
          >
            Save program
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveProgram} className="space-y-6">
        {/* Card 1: Basics */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
          <h2 className="text-base font-serif font-normal text-[#16213A]">
            Basics
          </h2>

          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1.5">
              Program title <span className="text-[#C0392B]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                Total pool amount <span className="text-[#C0392B]">*</span>
              </label>
              <input
                type="number"
                value={poolAmount}
                onChange={(e) => setPoolAmount(Number(e.target.value))}
                className={`w-full bg-white border rounded-lg px-3.5 py-2 text-xs font-mono text-right ${
                  poolAmount <= 0 ? 'border-[#C0392B]' : 'border-[#DDD8CC] text-[#16213A]'
                }`}
              />
              {poolAmount <= 0 && (
                <div className="text-[11px] text-[#C0392B] mt-1 flex items-center gap-1">
                  ⊗ Enter an amount greater than 0
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                Currency <span className="text-[#C0392B]">*</span>
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 pr-8 text-xs text-[#16213A] focus:outline-none cursor-pointer"
                >
                  <option value="USD — US dollar">USD — US dollar</option>
                  <option value="EUR — Euro">EUR — Euro</option>
                  <option value="GBP — British Pound">GBP — British Pound</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="text-[11px] text-[#5A6275] mt-1">
                Locked once the first grant is created
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs font-mono text-[#16213A]"
              />
            </div>
          </div>

          <div className="w-full sm:w-1/3">
            <label className="block text-xs font-medium text-[#16213A] mb-1.5">
              End date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs font-mono text-[#16213A]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-[#DDD8CC] rounded-lg p-3 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
        </div>

        {/* Card 2: Default rules for new grants */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
          <div>
            <h2 className="text-base font-serif font-normal text-[#16213A]">
              Default rules for new grants
            </h2>
            <p className="text-xs text-[#5A6275] mt-0.5">
              Each grant can override these during setup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                Default number of tranches
              </label>
              <div className="relative">
                <select
                  value={numTranches}
                  onChange={(e) => setNumTranches(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 pr-8 text-xs text-[#16213A] focus:outline-none cursor-pointer"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                Budget variance tolerance
              </label>
              <input
                type="text"
                value={varianceTolerance}
                onChange={(e) => setVarianceTolerance(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 text-xs font-mono text-right text-[#16213A]"
              />
              <div className="text-[11px] text-[#5A6275] mt-1">
                Per category, per tranche
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                Review SLA (business days)
              </label>
              <input
                type="number"
                value={reviewSla}
                onChange={(e) => setReviewSla(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 text-xs font-mono text-right text-[#16213A]"
              />
            </div>
          </div>

          {/* Eligible cost categories checkboxes */}
          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-2">
              Eligible cost categories
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A]">
                <input
                  type="checkbox"
                  checked={categories.rdPersonnel}
                  onChange={(e) => setCategories({ ...categories, rdPersonnel: e.target.checked })}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                />
                <span>R&D Personnel</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A]">
                <input
                  type="checkbox"
                  checked={categories.equipment}
                  onChange={(e) => setCategories({ ...categories, equipment: e.target.checked })}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                />
                <span>Equipment</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A]">
                <input
                  type="checkbox"
                  checked={categories.contractors}
                  onChange={(e) => setCategories({ ...categories, contractors: e.target.checked })}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                />
                <span>Contractors</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A]">
                <input
                  type="checkbox"
                  checked={categories.cloud}
                  onChange={(e) => setCategories({ ...categories, cloud: e.target.checked })}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                />
                <span>Cloud Infrastructure</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A]">
                <input
                  type="checkbox"
                  checked={categories.marketing}
                  onChange={(e) => setCategories({ ...categories, marketing: e.target.checked })}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                />
                <span>Marketing</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A]">
                <input
                  type="checkbox"
                  checked={categories.directPayroll}
                  onChange={(e) => setCategories({ ...categories, directPayroll: e.target.checked })}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                />
                <span>Direct Payroll</span>
              </label>
            </div>
          </div>

          {/* Milestone lock checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#16213A]">
              <input
                type="checkbox"
                checked={requireMilestone}
                onChange={(e) => setRequireMilestone(e.target.checked)}
                className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
              />
              <span>Require a verified milestone before each next tranche unlocks</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

// Screen B-03: Grant setup wizard (Set up grant · Tembo Agritech Ltd)
export const GrantSetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3);

  // Exact data from B-03:
  const tranches = [
    { num: 1, name: 'Setup & prototype', amount: '40,000.00', target: '2026-06-30', milestones: ['M-1', 'M-2'], tolerance: '5%' },
    { num: 2, name: 'Pilot deployment', amount: '50,000.00', target: '2026-11-30', milestones: ['M-3', 'M-4'], tolerance: '5%' },
    { num: 3, name: 'Scale-up', amount: '30,000.00', target: '2027-05-31', milestones: ['M-5'], tolerance: '5%' },
  ];

  const categoryCaps = [
    { category: 'R&D Personnel', capPct: 50, capAmount: '15,000.00' },
    { category: 'Contractors', capPct: 25, capAmount: '7,500.00' },
    { category: 'Equipment', capPct: 15, capAmount: '4,500.00' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
      {/* Top Header matching B-03 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Set up grant · Tembo Agritech Ltd
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            Award $120,000.00 USD · Draft. The startup sees nothing until you send the offer.
          </p>
        </div>

        <button className="px-4 py-2 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition">
          Save draft
        </button>
      </div>

      {/* Grid: Left Steps Indicator + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Steps List */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#0E6466] text-white flex items-center justify-center text-xs font-semibold shrink-0">
              1
            </div>
            <div>
              <div className="text-xs font-semibold text-[#16213A]">Startup</div>
              <div className="text-[11px] text-[#5A6275]">Tembo Agritech Ltd</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#0E6466] text-white flex items-center justify-center text-xs font-semibold shrink-0">
              2
            </div>
            <div>
              <div className="text-xs font-semibold text-[#16213A]">Master budget</div>
              <div className="text-[11px] text-[#5A6275]">$120,000.00</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-[#0E6466] text-[#0E6466] flex items-center justify-center text-xs font-semibold shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0E6466]">Tranches & categories</div>
              <div className="text-[11px] text-[#C0392B]">1 issue</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border border-[#DDD8CC] text-[#5A6275] flex items-center justify-center text-xs font-semibold shrink-0">
              4
            </div>
            <div>
              <div className="text-xs font-medium text-[#5A6275]">Unlock conditions</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border border-[#DDD8CC] text-[#5A6275] flex items-center justify-center text-xs font-semibold shrink-0">
              5
            </div>
            <div>
              <div className="text-xs font-medium text-[#5A6275]">Review & send offer</div>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Issue Warning Banner */}
          <div className="p-4 bg-[#FDF2F2] border border-[#C0392B]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#C0392B]">
            <span className="font-bold text-sm leading-none">⊗</span>
            <div>
              <div className="font-semibold">Tranche 3 category caps total 90%, not 100%</div>
              <div className="text-[11px] text-[#C0392B]/80 mt-0.5">
                Raise a cap or add a category so Tranche 3 adds up to 100% of $30,000.00.
              </div>
            </div>
          </div>

          {/* Tranches Card */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#16213A]">
                Tranches
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0E6466] bg-[#E8F3F1] px-2 py-0.5 rounded-full border border-[#0E6466]/20">
                <Check className="w-3 h-3" /> Total $120,000.00 = award
              </span>
            </div>

            <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                    <th className="py-2.5 px-3 text-left font-medium">#</th>
                    <th className="py-2.5 px-3 text-left font-medium">Name</th>
                    <th className="py-2.5 px-3 text-right font-medium">Amount (USD)</th>
                    <th className="py-2.5 px-3 text-left font-medium">Target submission</th>
                    <th className="py-2.5 px-3 text-left font-medium">Milestones</th>
                    <th className="py-2.5 px-3 text-right font-medium">Tolerance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
                  {tranches.map((t) => (
                    <tr key={t.num} className="hover:bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 text-[#5A6275]">{t.num}</td>
                      <td className="py-2.5 px-3 font-medium text-[#16213A]">{t.name}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">{t.amount}</td>
                      <td className="py-2.5 px-3 font-mono text-[#5A6275]">{t.target}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          {t.milestones.map((m) => (
                            <span key={m} className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD8CC] text-[10px] font-mono">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#5A6275]">{t.tolerance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition">
                Add tranche
              </button>
            </div>
          </div>

          {/* Category caps · Tranche 3 Card */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#16213A]">
                Category caps · Tranche 3
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C0392B] bg-[#FDF2F2] px-2 py-0.5 rounded-full border border-[#C0392B]/20">
                ⊗ 90% of 100%
              </span>
            </div>

            <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                    <th className="py-2.5 px-3 text-left font-medium">Category</th>
                    <th className="py-2.5 px-3 text-right font-medium">Cap %</th>
                    <th className="py-2.5 px-3 text-right font-medium">Cap amount</th>
                    <th className="py-2.5 px-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
                  {categoryCaps.map((c) => (
                    <tr key={c.category} className="hover:bg-[#FAF8F5]">
                      <td className="py-2.5 px-3 font-medium text-[#16213A]">{c.category}</td>
                      <td className="py-2.5 px-3 text-right">
                        <input
                          type="number"
                          defaultValue={c.capPct}
                          className="w-16 px-2 py-1 border border-[#DDD8CC] rounded font-mono text-right text-xs"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">{c.capAmount}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button className="text-[11px] text-[#5A6275] hover:text-[#C0392B]">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#FAF8F5] font-semibold">
                    <td className="py-2.5 px-3 text-[#16213A]">Total</td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#C0392B]">90%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">27,000.00</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition">
                Add category
              </button>
              <span className="text-[11px] text-[#5A6275]">
                Only categories enabled on the program can be added.
              </span>
            </div>
          </div>

          {/* Preview of step 4 · Unlock conditions */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-2">
            <h3 className="font-semibold text-xs text-[#16213A]">
              Preview of step 4 · Unlock conditions
            </h3>
            <ul className="space-y-1.5 text-xs text-[#5A6275] list-disc list-inside">
              <li>
                Tranche 2 opens when <strong>Tranche 1 is Disbursed & reconciled</strong> AND <strong>M-2 is Verified</strong>
              </li>
              <li>
                Tranche 3 opens when <strong>Tranche 2 is Disbursed & reconciled</strong> AND <strong>M-4 is Verified</strong>
              </li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => navigate('/institution/programs')}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition"
            >
              Back
            </button>
            <button
              disabled={true}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-[#EAE6DD] text-[#5A6275] cursor-not-allowed transition"
            >
              Continue to unlock conditions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
