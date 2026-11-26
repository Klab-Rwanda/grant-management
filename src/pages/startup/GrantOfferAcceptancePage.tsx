import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Lock 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const GrantOfferAcceptancePage: React.FC = () => {
  const navigate = useNavigate();

  // Form states matching B-06
  const [agreed, setAgreed] = useState(true);
  const [fullName, setFullName] = useState('Grace M.');
  const [password, setPassword] = useState('••••••••••');
  const [isAccepted, setIsAccepted] = useState(false);

  // Exact tranche data from B-06:
  const tranches = [
    {
      num: 1,
      amount: '35,000.00',
      categories: 'R&D Personnel 60% · Equipment 40%',
      milestone: 'M-1 Gateway prototype field test',
      unlocks: 'On acceptance'
    },
    {
      num: 2,
      amount: '25,000.00',
      categories: 'R&D Personnel 50% · Contractors 50%',
      milestone: 'M-2 50 connected farms',
      unlocks: 'T1 reconciled + M-1 verified'
    }
  ];

  const handleSignAndAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !fullName.trim()) return;
    setIsAccepted(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
      {/* Top Header matching B-06 */}
      <div>
        <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1">
          OFFER FROM NORTHGATE SEED FUND
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Rural Connectivity Grant 2027
            </h1>
            <p className="text-xs text-[#5A6275] mt-1 font-sans">
              Award $60,000.00 USD · Respond by 4 Dec 2026
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium shrink-0">
            <Clock className="w-3 h-3 text-[#3B82F6]" />
            Offer received
          </span>
        </div>
      </div>

      {/* Main Grid: Left Tranches & Conditions (span-2) + Right Accept this grant form (span-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tranches & conditions Card */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
            <h2 className="text-sm font-semibold text-[#16213A]">
              Tranches & conditions
            </h2>

            <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                    <th className="py-2.5 px-3 text-left font-medium">Tranche</th>
                    <th className="py-2.5 px-3 text-right font-medium">Amount</th>
                    <th className="py-2.5 px-3 text-left font-medium">Eligible categories (cap)</th>
                    <th className="py-2.5 px-3 text-left font-medium">Milestone</th>
                    <th className="py-2.5 px-3 text-left font-medium">Unlocks when</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
                  {tranches.map((t) => (
                    <tr key={t.num} className="hover:bg-[#FAF8F5]">
                      <td className="py-3 px-3 text-[#5A6275]">{t.num}</td>
                      <td className="py-3 px-3 text-right font-mono text-[#16213A] font-medium">
                        {t.amount}
                      </td>
                      <td className="py-3 px-3 text-[#5A6275] text-[11px]">
                        {t.categories}
                      </td>
                      <td className="py-3 px-3 text-[#5A6275] text-[11px]">
                        {t.milestone}
                      </td>
                      <td className="py-3 px-3 text-[#5A6275] text-[11px]">
                        {t.unlocks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Terms List matching B-06 */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="grid grid-cols-2 py-1 border-b border-[#DDD8CC]/50">
                <span className="text-[#5A6275]">Variance tolerance</span>
                <span className="text-[#16213A] font-medium">5% per category</span>
              </div>
              <div className="grid grid-cols-2 py-1 border-b border-[#DDD8CC]/50">
                <span className="text-[#5A6275]">Review SLA (funder)</span>
                <span className="text-[#16213A] font-medium">10 business days</span>
              </div>
              <div className="grid grid-cols-2 py-1 border-b border-[#DDD8CC]/50">
                <span className="text-[#5A6275]">Payment method</span>
                <span className="text-[#16213A] font-medium">Off-platform bank transfer by the funder</span>
              </div>
              <div className="grid grid-cols-2 py-1">
                <span className="text-[#5A6275]">Grant agreement</span>
                <a 
                  href="#download" 
                  onClick={(e) => { e.preventDefault(); alert('Downloading Northgate-RCG-2027-agreement.pdf'); }}
                  className="text-[#0E6466] hover:underline font-medium"
                >
                  Northgate-RCG-2027-agreement.pdf <span className="text-[#5A6275] font-normal">(PDF, 412 KB)</span>
                </a>
              </div>
            </div>
          </div>

          {/* What the funder will see if you accept Card */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-2">
            <h3 className="text-xs font-semibold text-[#16213A]">
              What the funder will see if you accept
            </h3>
            <p className="text-xs text-[#5A6275] leading-relaxed">
              Only expenses you tag to this grant, their evidence, milestone deliverables and grant budget-vs-actual summaries. Your other books stay private.
            </p>
          </div>
        </div>

        {/* Right Column: Accept this grant form */}
        <div className="space-y-4">
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-5">
            <h2 className="text-sm font-semibold text-[#16213A]">
              Accept this grant
            </h2>

            {!isAccepted ? (
              <form onSubmit={handleSignAndAccept} className="space-y-4 text-xs">
                {/* Checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#16213A] leading-snug">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                  />
                  <span>
                    I have read the grant agreement and I'm authorised to accept it for <strong>Tembo Agritech Ltd</strong>
                  </span>
                </label>

                {/* Type your full name to sign */}
                <div>
                  <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                    Type your full name to sign
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                </div>

                {/* Confirm your password */}
                <div>
                  <label className="block text-xs font-medium text-[#16213A] mb-1.5">
                    Confirm your password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs font-mono text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                  />
                  <div className="text-[11px] text-[#5A6275] mt-1">
                    Re-authentication is required for signatures
                  </div>
                </div>

                {/* Sign & accept grant button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!agreed || !fullName.trim()}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs shadow-ledger transition text-center ${
                      agreed && fullName.trim()
                        ? 'bg-[#16213A] hover:bg-[#223150] text-white'
                        : 'bg-[#EAE6DD] text-[#5A6275] cursor-not-allowed'
                    }`}
                  >
                    Sign & accept grant
                  </button>
                </div>

                {/* Ask a question or Decline buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Sending question to Northgate Seed Fund...')}
                    className="py-2 px-3 rounded-lg border border-[#DDD8CC] text-xs font-medium text-[#16213A] hover:bg-[#F1EEE7] transition text-center"
                  >
                    Ask a question
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/startup/grants')}
                    className="py-2 px-3 rounded-lg border border-[#DDD8CC] text-xs font-medium text-[#5A6275] hover:bg-[#F1EEE7] transition text-center"
                  >
                    Decline
                  </button>
                </div>

                <p className="text-[11px] text-[#5A6275] pt-1 leading-relaxed">
                  Your name, the time, IP address and agreement hash are written to the audit log.
                </p>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F3F1] text-[#0E6466] flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base text-[#16213A]">Grant Accepted!</h3>
                <p className="text-xs text-[#5A6275]">
                  Signed by {fullName} on {new Date().toLocaleDateString()}. Tranche 1 is ready for mobilization.
                </p>
                <div className="pt-2">
                  <Link
                    to="/startup/grants"
                    className="px-4 py-2 bg-[#0E6466] text-white rounded-lg text-xs hover:bg-[#0B4F51] transition inline-block"
                  >
                    Return to My grants
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Finance Lead view notice banner matching bottom right of B-06 */}
          <div className="p-4 bg-[#FAF8F5] border border-[#DDD8CC] rounded-xl flex items-start gap-2.5 text-xs text-[#5A6275]">
            <Lock className="w-4 h-4 text-[#5A6275] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Finance Lead view:</strong> the form is replaced by "Only the Founder / CEO can accept this offer" and a <strong>Remind Grace</strong> button.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
