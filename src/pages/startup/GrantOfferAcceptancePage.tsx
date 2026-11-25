import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Download,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const GrantOfferAcceptancePage: React.FC = () => {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [signatoryName, setSignatoryName] = useState('Amani Ndegwa');
  const [signatoryTitle, setSignatoryTitle] = useState('Chief Executive Officer');
  const [isSigned, setIsSigned] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header matching B-06 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-xs font-medium mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Official Grant Award Offer</span>
          </div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Grant Offer & Agreement Execution
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Grant Agreement #AGR-2026-092 · Global Innovation & Tech Fund (GITF) → Tembo Agritech Ltd
          </p>
        </div>

        <button 
          onClick={() => window.print()}
          className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5 text-[#5A6275]" />
          <span>Download PDF Agreement</span>
        </button>
      </div>

      {/* Grant Summary Terms Card */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#DDD8CC]">
          <div>
            <span className="text-[11px] text-[#5A6275] uppercase tracking-wider block">Total Award Value</span>
            <div className="text-2xl font-mono font-medium text-[#0E6466] mt-1">$200,000.00 USD</div>
            <span className="text-[11px] text-[#5A6275]">Non-dilutive grant</span>
          </div>
          <div>
            <span className="text-[11px] text-[#5A6275] uppercase tracking-wider block">Disbursement Tranches</span>
            <div className="text-2xl font-mono font-medium text-[#16213A] mt-1">4 Tranches</div>
            <span className="text-[11px] text-[#5A6275]">T1 Advance: $40,000.00</span>
          </div>
          <div>
            <span className="text-[11px] text-[#5A6275] uppercase tracking-wider block">Grant Period</span>
            <div className="text-2xl font-mono font-medium text-[#16213A] mt-1">18 Months</div>
            <span className="text-[11px] text-[#5A6275]">01 Jan 2026 – 30 Jun 2027</span>
          </div>
        </div>

        {/* Tranche Release Conditions */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16213A] mb-3">
            Tranche Milestone Conditions
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#FAF8F5] border border-[#DDD8CC] rounded-lg flex items-center justify-between">
              <div>
                <span className="font-mono font-medium text-[#16213A]">Tranche 1 ($40,000.00):</span>
                <span className="text-[#5A6275] ml-2">Initial mobilization advance upon agreement signing.</span>
              </div>
              <span className="text-[#0E6466] font-medium text-[11px]">Ready for Release</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#DDD8CC] rounded-lg flex items-center justify-between">
              <div>
                <span className="font-mono font-medium text-[#16213A]">Tranche 2 ($40,000.00):</span>
                <span className="text-[#5A6275] ml-2">Full reconciliation of T1 expenses + Prototype soil probe lab report.</span>
              </div>
              <span className="text-[#5A6275] text-[11px]">Milestone 2 Gated</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] border border-[#DDD8CC] rounded-lg flex items-center justify-between">
              <div>
                <span className="font-mono font-medium text-[#16213A]">Tranche 3 ($60,000.00):</span>
                <span className="text-[#5A6275] ml-2">1,000 farmer pilot deployments + audited quarterly expenditure report.</span>
              </div>
              <span className="text-[#5A6275] text-[11px]">Milestone 3 Gated</span>
            </div>
          </div>
        </div>

        {/* Legal Sign-off Form */}
        {!isSigned ? (
          <div className="pt-6 border-t border-[#DDD8CC] space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16213A]">
              Grantee Acceptance & Digital Signature
            </h2>

            <div className="p-4 bg-[#F1EEE7] border border-[#DDD8CC] rounded-lg text-xs text-[#5A6275] space-y-2">
              <p>
                By signing below, the grantee certifies adherence to the eligible expenditure framework, anti-fraud governance policies, and external audit access covenants.
              </p>
              <label className="flex items-center gap-2 cursor-pointer text-[#16213A] font-medium pt-1">
                <input 
                  type="checkbox" 
                  checked={agreedTerms}
                  onChange={e => setAgreedTerms(e.target.checked)}
                  className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0" 
                />
                <span>I confirm that I am authorized to bind Tembo Agritech Ltd to this agreement.</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-[#16213A] mb-1">Signatory Full Name</label>
                <input 
                  type="text" 
                  value={signatoryName}
                  onChange={e => setSignatoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A]"
                />
              </div>
              <div>
                <label className="block font-medium text-[#16213A] mb-1">Signatory Title</label>
                <input 
                  type="text" 
                  value={signatoryTitle}
                  onChange={e => setSignatoryTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-[#16213A]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                disabled={!agreedTerms}
                onClick={() => setIsSigned(true)}
                className={`px-5 py-2 text-xs font-medium rounded-md shadow-ledger transition flex items-center gap-1.5 ${
                  agreedTerms 
                    ? 'bg-[#0E6466] text-white hover:bg-[#0B4F51]' 
                    : 'bg-[#DDD8CC] text-[#5A6275] cursor-not-allowed'
                }`}
              >
                <span>Sign & Accept Grant Agreement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-6 border-t border-[#DDD8CC] text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F3F1] text-[#0E6466] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-[#16213A]">Grant Agreement Executed</h3>
            <p className="text-xs text-[#5A6275] max-w-md mx-auto">
              Digitally signed by <strong>{signatoryName}</strong> ({signatoryTitle}) on {new Date().toLocaleDateString()}. Funder notification dispatched.
            </p>
            <div className="pt-2">
              <Link
                to="/startup/grants"
                className="px-4 py-2 bg-[#16213A] text-white rounded text-xs hover:bg-[#223150] transition inline-flex items-center gap-1"
              >
                Go to My Grants →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
