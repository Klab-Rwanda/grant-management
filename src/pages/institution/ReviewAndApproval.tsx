import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Eye, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  HelpCircle,
  ExternalLink,
  Check,
  X,
  Clock,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, RejectionReasonBadge } from '../../components/common/StatusBadge';
import { RejectionReasonCode } from '../../types';

export const FinancialReviewCenter: React.FC = () => {
  const [filter, setFilter] = useState('Pending first');
  const [selectedItemKey, setSelectedItemKey] = useState('JE-0318');
  
  // Rejection choice
  const [decision, setDecision] = useState<'Approve' | 'Reject'>('Reject');
  const [reasonCode, setReasonCode] = useState<string>('AMOUNT_MISMATCH');
  const [noteToStartup, setNoteToStartup] = useState('The invoice total is $4,100.00 but $4,120.00 was claimed.');
  const [isSaved, setIsSaved] = useState(false);

  // Line items matching D-06
  const lineItems = [
    { key: 'JE-0301', title: 'Drone survey', amount: '2,180.00', cat: 'Contractors', status: 'Rejected' },
    { key: 'JE-0318', title: 'Soil probes batch #4', amount: '4,120.00', cat: 'Equipment', status: 'Pending' },
    { key: 'JE-0305', title: 'Agronomist Oct', amount: '1,230.00', cat: 'Contractors', status: 'Pending' },
    { key: 'JE-0322', title: 'Payroll R&D Oct', amount: '9,600.00', cat: 'R&D', status: 'Pending' },
    { key: 'JE-0233', title: 'Sensor kits ×12', amount: '6,240.00', cat: 'Equipment', status: 'Approved' },
    { key: 'JE-0270', title: 'Gateway routers', amount: '3,520.00', cat: 'Equipment', status: 'Approved' },
  ];

  const handleSaveNext = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header bar with Review progress (Matching D-06) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDD8CC] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Line-item review
            </h1>
            <StatusBadge status="SUBMITTED_PENDING_REVIEW" size="sm" />
          </div>
          <p className="text-xs text-[#5A6275]">
            Stage 1 of 2 · Financial review · Claimed $46,820.00 · SLA day 7 of 10
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="px-3 py-1.5 rounded-md bg-white border border-[#DDD8CC] hover:bg-[#F1EEE7] text-xs font-medium text-[#16213A] shadow-ledger">
            Grant BvA summary
          </button>
          <button className="px-3.5 py-1.5 rounded-md bg-[#0E6466] hover:bg-[#0A4F51] text-xs font-medium text-white shadow-sm">
            Finish & write report
          </button>
        </div>
      </div>

      {/* Decision progress bar & milestones */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-[#16213A]">
            14 of 23 lines decided · 12 approved · 2 rejected · 9 pending
          </span>
          <span className="text-[#5A6275]">
            Milestones: M-4 verified · M-3 pending
          </span>
        </div>
        <div className="w-full h-2 bg-[#F1EEE7] rounded-full overflow-hidden flex">
          <div className="bg-[#1D5E3A] h-full" style={{ width: '52%' }}></div>
          <div className="bg-[#9B1C1C] h-full" style={{ width: '9%' }}></div>
        </div>
      </div>

      {/* Main Review Workspace (2-Column split matching D-06) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Line Items Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#16213A]">Line items</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs py-1 px-2 border border-[#DDD8CC] rounded bg-white text-[#16213A]"
            >
              <option value="Pending first">Pending first</option>
              <option value="All">All lines</option>
            </select>
          </div>

          <div className="space-y-2">
            {lineItems.map(item => {
              const isSelected = item.key === selectedItemKey;
              return (
                <div
                  key={item.key}
                  onClick={() => setSelectedItemKey(item.key)}
                  className={`p-3 rounded-lg border transition cursor-pointer flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-white border-[#0E6466] ring-1 ring-[#0E6466] shadow-sm'
                      : 'bg-white border-[#DDD8CC] hover:border-[#8C8573]'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="font-semibold text-[#16213A] truncate">
                      {item.key} · {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#5A6275]">
                      {item.amount} · {item.cat}
                    </div>
                  </div>

                  <StatusBadge status={item.status} size="sm" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: OCR Verification & Decision Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Item Title */}
          <div className="flex justify-between items-center bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
            <div>
              <span className="text-xs font-mono text-[#5A6275] block">ACTIVE AUDIT TARGET</span>
              <h2 className="text-xl font-serif text-[#16213A] font-semibold">
                JE-0318 · Soil probes batch #4
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#ECEAE4] text-[#4A5266] text-xs font-medium">
              Equipment
            </span>
          </div>

          {/* Forensic Field Comparison Table (Claimed vs OCR) */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5A6275]">
              Forensic Match: Ledger Claim vs. Evidence OCR
            </h3>

            <div className="border border-[#DDD8CC] rounded-md overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2 px-3">Field</th>
                    <th className="py-2 px-3">Claimed (ledger)</th>
                    <th className="py-2 px-3">Evidence (OCR)</th>
                    <th className="py-2 px-3">Match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#16213A]">Vendor</td>
                    <td className="py-2.5 px-3">Highland Instruments</td>
                    <td className="py-2.5 px-3">Highland Instruments Ltd</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#1D5E3A] font-medium flex items-center gap-1">
                        ✓ Match
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#16213A]">Date</td>
                    <td className="py-2.5 px-3 font-mono">2026-10-28</td>
                    <td className="py-2.5 px-3 font-mono">2026-10-26</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#1E4E8C] font-mono text-[11px] bg-[#E5EEF9] px-1.5 py-0.5 rounded">
                        ⓘ 2 days apart
                      </span>
                    </td>
                  </tr>

                  <tr className="bg-[#FBE6E4]/40">
                    <td className="py-2.5 px-3 font-semibold text-[#16213A]">Amount</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#16213A]">4,120.00</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#16213A]">4,100.00</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#9B1C1C] font-mono font-bold text-[11px] bg-[#FBE6E4] border border-[#F7C6C2] px-1.5 py-0.5 rounded">
                        ⊗ Differs by 20.00
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-[#16213A]">Fingerprint</td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#5A6275]">a3f9...41c2</td>
                    <td className="py-2.5 px-3 text-[11px] text-[#5A6275]">no duplicate found</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[#1D5E3A] font-medium flex items-center gap-1">
                        ✓ Unique
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* OCR Invoice Preview Card */}
            <div className="p-4 rounded-md border border-[#DDD8CC] bg-[#FAF9F5] text-xs font-mono space-y-2">
              <div className="flex justify-between font-bold text-[#16213A]">
                <span>Highland Instruments Ltd</span>
                <span>INVOICE INV-SP-0441</span>
              </div>
              <div className="py-2 border-y border-[#DDD8CC] space-y-1">
                <div className="flex justify-between">
                  <span>40 × soil moisture probe</span>
                  <span>4,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>100.00</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#16213A]">
                <span>Total due (USD)</span>
                <span className="px-2 py-0.5 rounded border border-[#0E6466] bg-white">4,100.00</span>
              </div>
            </div>
          </div>

          {/* Decision Form Box (Matching D-06) */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#16213A]">
              Your decision
            </h3>

            {/* Decision toggle buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDecision('Approve')}
                className={`py-2 px-4 rounded-md text-xs font-semibold border transition ${
                  decision === 'Approve'
                    ? 'bg-[#1D5E3A] text-white border-[#1D5E3A]'
                    : 'bg-white border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7]'
                }`}
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => setDecision('Reject')}
                className={`py-2 px-4 rounded-md text-xs font-semibold border transition ${
                  decision === 'Reject'
                    ? 'bg-[#9B1C1C] text-white border-[#9B1C1C]'
                    : 'bg-white border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7]'
                }`}
              >
                Reject
              </button>
            </div>

            {/* Reason code radio options */}
            {decision === 'Reject' && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[#16213A] block">
                  Reason code *
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    { code: 'INVALID_RECEIPT', label: 'INVALID_RECEIPT' },
                    { code: 'INELIGIBLE_CATEGORY', label: 'INELIGIBLE_CATEGORY' },
                    { code: 'AMOUNT_MISMATCH', label: 'AMOUNT_MISMATCH' },
                    { code: 'DUPLICATE_CLAIM', label: 'DUPLICATE_CLAIM' },
                  ].map(r => (
                    <label
                      key={r.code}
                      className={`p-2 rounded border cursor-pointer flex items-center gap-2 ${
                        reasonCode === r.code
                          ? 'border-[#9B1C1C] bg-[#FBE6E4] text-[#9B1C1C]'
                          : 'border-[#DDD8CC] bg-white text-[#5A6275]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        checked={reasonCode === r.code}
                        onChange={() => setReasonCode(r.code)}
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Note to startup */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#16213A] mb-1">
                Note to startup *
              </label>
              <textarea
                rows={3}
                value={noteToStartup}
                onChange={(e) => setNoteToStartup(e.target.value)}
                className="w-full p-2.5 text-xs bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                placeholder="Required when rejecting. The startup sees this note."
              ></textarea>
              <span className="text-[11px] text-[#5A6275] block mt-0.5">
                Required when rejecting. The startup sees this note.
              </span>
            </div>

            {isSaved && (
              <div className="p-2.5 rounded bg-[#E4F1E8] border border-[#C8E4D1] text-[#1D5E3A] text-xs font-semibold">
                ✓ Decision saved. Moving to next pending item...
              </div>
            )}

            <button
              type="button"
              onClick={handleSaveNext}
              className="w-full py-2.5 px-4 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium text-xs rounded-md shadow transition"
            >
              Save & next pending line
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApprovalManagement: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
          Committee sign-off
        </h1>
        <p className="text-xs text-[#5A6275] mt-1">
          Authorized executive signatures and formal grant tranche release approvals.
        </p>
      </div>

      <div className="bg-white border border-[#DDD8CC] rounded-lg p-6 shadow-ledger space-y-4">
        <h2 className="text-base font-serif font-semibold text-[#16213A]">
          Pending Committee Approvals (1)
        </h2>
        <div className="p-4 rounded-md border border-[#DDD8CC] bg-[#FAF9F5] flex justify-between items-center text-xs">
          <div>
            <div className="font-bold text-[#16213A]">Tembo Agritech · Tranche 1 Final Sign-off</div>
            <div className="text-[#5A6275] font-mono mt-0.5">$40,000.00 USD · Verified by Marcus Vance</div>
          </div>
          <button className="px-4 py-2 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium rounded-md shadow-sm">
            Sign & authorize
          </button>
        </div>
      </div>
    </div>
  );
};
