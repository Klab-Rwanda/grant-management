import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  FileCheck2,
  Paperclip,
  Check,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisbursementReconciliation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { tranches, reconcileDisbursement, updateTrancheStatus } = useApp();

  const [wireRef, setWireRef] = useState('FT26346QW7R1');
  const [method, setMethod] = useState('International wire (SWIFT)');
  const [dateExecuted, setDateExecuted] = useState('2026-12-15');
  const [currencySent, setCurrencySent] = useState('USD');
  const [fxRate, setFxRate] = useState('1.000000');
  const [netAmount, setNetAmount] = useState('45,545.00');
  const [explanation, setExplanation] = useState('Intermediary bank fee deducted');
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>({
    name: 'swift-mt103-FT26346QW7R1.pdf',
    size: '84 KB'
  });
  const [isReconciled, setIsReconciled] = useState(false);

  const authorisedAmount = 45570.0;
  const currentNetNum = parseFloat(netAmount.replace(/,/g, '')) || 0;
  const variance = authorisedAmount - currentNetNum;

  const handleConfirm = () => {
    // Execute reconciliation
    const targetTranche = tranches.find(t => t.trancheNumber === 2) || tranches[0];
    if (targetTranche) {
      reconcileDisbursement(
        targetTranche.id,
        wireRef,
        dateExecuted,
        currentNetNum,
        parseFloat(fxRate) || 1,
        'swift-mt103-FT26346QW7R1.pdf'
      );
      const nextT = tranches.find(t => t.trancheNumber === targetTranche.trancheNumber + 1);
      if (nextT && nextT.status === 'DRAFT') {
        updateTrancheStatus(nextT.id, 'ACTIVE', 'Unlocked after tranche 2 was reconciled.');
      }
    }
    setIsReconciled(true);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#5A6672] mb-1">
          <span>Reconciliation</span>
          <span>/</span>
          <span className="text-[#16213A] font-medium">Tembo Agritech · Tranche 2</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#16213A]">
              Record off-platform payment
            </h1>
            <p className="text-xs text-[#5A6672] mt-0.5">
              Authorisation AUTH-2026-0117 · Approved by Linda P. on 12 Dec 2026 · Authorised USD 45,570.00
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved for disbursement
          </span>
        </div>
      </div>

      {/* Info notice box */}
      <div className="p-3.5 rounded-lg bg-[#EBF3FB] border border-[#D0E2F7] text-[#1E3A8A] flex items-center gap-2.5 text-xs">
        <Info className="w-4 h-4 text-[#2563EB] shrink-0" />
        <div>
          Pay through your own bank, wire or mobile-money channel first. This screen only records the proof. No money moves through this platform.
        </div>
      </div>

      {isReconciled && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Payment reconciled successfully!</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Tranche 2 is now marked Disbursed & Reconciled. Tranche 3 is unlocked for Tembo Agritech.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/institution/reviews')}
            className="px-3.5 py-1.5 bg-[#0E6466] text-white text-xs font-semibold rounded-lg hover:bg-[#0b4d4f] transition flex items-center gap-1.5"
          >
            Back to review queue <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid: Form on Left, Checks on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Form (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DDD8CC] p-6 shadow-sm space-y-5">
          <h2 className="text-base font-serif font-bold text-[#16213A]">Payment details</h2>

          {/* Row 1: Wire ref & Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1">
                Bank / wire reference <span className="text-[#C53030]">*</span>
              </label>
              <input
                type="text"
                value={wireRef}
                onChange={(e) => setWireRef(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs font-mono text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                placeholder="e.g. FT26346QW7R1"
              />
              <span className="text-[10px] text-[#5A6672] mt-1 block">
                8-35 characters, as shown on the bank confirmation
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1">
                Method
              </label>
              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full appearance-none px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466] pr-8"
                >
                  <option value="International wire (SWIFT)">International wire (SWIFT)</option>
                  <option value="Domestic Fedwire / ACH">Domestic Fedwire / ACH</option>
                  <option value="RTGS">RTGS Local Clearing</option>
                  <option value="Mobile Money Business (B2C)">Mobile Money Business (B2C)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#5A6672] absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Date executed & Currency sent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1">
                Date executed <span className="text-[#C53030]">*</span>
              </label>
              <input
                type="date"
                value={dateExecuted}
                onChange={(e) => setDateExecuted(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
              <span className="text-[10px] text-[#5A6672] mt-1 block">
                Can't be before the approval date
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1">
                Currency sent
              </label>
              <div className="relative">
                <select
                  value={currencySent}
                  onChange={(e) => setCurrencySent(e.target.value)}
                  className="w-full appearance-none px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466] pr-8"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="KES">KES</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#5A6672] absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 3: Applied FX rate & Net amount disbursed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1">
                Applied FX rate
              </label>
              <input
                type="text"
                value={fxRate}
                onChange={(e) => setFxRate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs font-mono text-right text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
              <span className="text-[10px] text-[#5A6672] mt-1 block">
                Same currency as the grant
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#16213A] mb-1">
                Net amount disbursed (USD) <span className="text-[#C53030]">*</span>
              </label>
              <input
                type="text"
                value={netAmount}
                onChange={(e) => setNetAmount(e.target.value)}
                className="w-full px-3 py-2 bg-white border-2 border-[#C53030] rounded-lg text-xs font-mono font-semibold text-right text-[#16213A] focus:outline-none"
              />
              {variance > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-[#C53030] mt-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#C53030] flex items-center justify-center text-[10px] font-bold">⊗</span>
                  <span>{variance.toFixed(2)} less than authorised. Add an explanation.</span>
                </div>
              )}
            </div>
          </div>

          {/* Row 4: Explanation for difference */}
          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1">
              Explanation for difference
            </label>
            <input
              type="text"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              placeholder="e.g. Intermediary bank fee deducted"
            />
          </div>

          {/* Row 5: Bank confirmation attachment */}
          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1">
              Bank confirmation <span className="text-[#C53030]">*</span>
            </label>
            {attachedFile ? (
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#DDD8CC] bg-[#F7F5F0]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32]">
                    <Check className="w-3 h-3" /> Attached
                  </span>
                  <span className="font-mono text-xs text-[#16213A]">{attachedFile.name}</span>
                  <span className="text-[11px] text-[#5A6672]">· {attachedFile.size}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  className="text-xs font-semibold text-[#16213A] hover:underline"
                >
                  Replace
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-[#DDD8CC] rounded-lg p-4 text-center bg-[#FAF9F5]">
                <p className="text-xs text-[#5A6672]">Upload Swift MT103, Fedwire receipt or bank advice</p>
                <input
                  type="file"
                  id="bankFile"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setAttachedFile({ name: f.name, size: `${Math.round(f.size / 1024)} KB` });
                  }}
                />
                <label
                  htmlFor="bankFile"
                  className="mt-2 inline-block px-3 py-1 bg-white border border-[#DDD8CC] rounded text-xs font-medium text-[#16213A] cursor-pointer hover:bg-slate-50"
                >
                  Choose file
                </label>
              </div>
            )}
          </div>

          {/* Buttons: Save draft & Confirm reconciliation */}
          <div className="pt-4 flex items-center justify-between border-t border-[#DDD8CC]">
            <button
              type="button"
              className="px-4 py-2 border border-[#DDD8CC] rounded-lg text-xs font-semibold text-[#16213A] hover:bg-[#FAF9F5] transition"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2 bg-[#0E6466] hover:bg-[#0b4d4f] text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              Confirm reconciliation
            </button>
          </div>
        </div>

        {/* Right Sidebar Cards */}
        <div className="space-y-5">
          {/* Automatic checks Card */}
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16213A]">Automatic checks</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" /> Pass
                </span>
                <span className="text-xs text-[#5A6672]">
                  Reference not used on any other payout
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" /> Pass
                </span>
                <span className="text-xs text-[#5A6672]">
                  Date is on or after the approval
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FEF3C7] text-[#B45309] shrink-0 mt-0.5">
                  <AlertTriangle className="w-3 h-3" /> Note
                </span>
                <span className="text-xs text-[#5A6672]">
                  Amount within 0.1% of authorised
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5E9] text-[#2E7D32] shrink-0 mt-0.5">
                  <Check className="w-3 h-3" /> Pass
                </span>
                <span className="text-xs text-[#5A6672]">
                  Confirmation document fingerprinted
                </span>
              </div>
            </div>
          </div>

          {/* On confirm Card */}
          <div className="bg-white rounded-xl border border-[#DDD8CC] p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16213A]">On confirm</h3>
            
            <ul className="text-xs text-[#5A6672] space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                Tranche 2 becomes <strong className="text-[#16213A]">Disbursed & reconciled</strong>
              </li>
              <li>
                Tembo is notified to record the receipt in their ledger
              </li>
              <li>
                Tranche 3 unlocks once M-4 is verified (it already is)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
