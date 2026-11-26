import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Eye, 
  ArrowRight,
  ChevronDown,
  Clock,
  Check,
  X,
  Lock
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------------
// D-07: Verification report · Tembo Agritech · Tranche 2
// ----------------------------------------------------------------------------
export const VerificationReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [reviewedAll, setReviewedAll] = useState(true);
  const [statement, setStatement] = useState(
    'All remaining lines are supported by evidence and within category caps. Recommend releasing $45,570.00.'
  );
  const [isSent, setIsSent] = useState(false);

  // Exact data from D-07 screenshot:
  const categoryBreakdown = [
    {
      category: 'R&D Personnel',
      cap: '30,000.00',
      claimed: '27,400.00',
      approved: '27,400.00',
      rejectedWithdrawn: '0.00',
      withinCap: true
    },
    {
      category: 'Equipment',
      cap: '12,500.00',
      claimed: '12,480.00',
      approved: '12,480.00',
      rejectedWithdrawn: '0.00',
      withinCap: true
    },
    {
      category: 'Contractors',
      cap: '7,500.00',
      claimed: '6,920.00',
      approved: '5,690.00',
      rejectedWithdrawn: '1,230.00',
      withinCap: true
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
      {/* Top Header matching D-07 */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Verification report · Tembo Agritech · Tranche 2
            </h1>
            <p className="text-xs text-[#5A6275] mt-1 font-sans">
              Resubmission reviewed 10 Dec 2026 · All 23 lines decided
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium shrink-0">
            <Clock className="w-3 h-3 text-[#3B82F6]" />
            Submitted · in review
          </span>
        </div>
      </div>

      {/* Progress Stage Tracker matching D-07 */}
      <div className="flex items-center gap-8 border-b border-[#DDD8CC] pb-3 text-xs font-medium">
        <span className="text-[#5A6275]">
          Stage 1 · Financial review
        </span>
        <span className="text-[#16213A] font-semibold border-b-2 border-[#16213A] pb-3 -mb-3.5">
          Stage 2 · Committee sign-off
        </span>
        <span className="text-[#5A6275]">
          Approved for disbursement
        </span>
      </div>

      {/* 4 Summary Cards matching D-07 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] mb-1">Recommended release</div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            45,570.00
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1">
            Tranche ceiling 50,000.00
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] mb-1">Approved lines</div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            22
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1">
            1 adjusted (JE-0318 → 4,100.00)
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] mb-1">Withdrawn by startup</div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            1
          </div>
          <div className="text-[11px] font-mono text-[#5A6275] mt-1">
            JE-0305 · 1,230.00
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] mb-1">Milestones verified</div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            2 of 2
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1">
            M-3, M-4
          </div>
        </div>
      </div>

      {/* Category Breakdown Table matching D-07 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">Category</th>
                <th className="py-2.5 px-4 text-right font-medium">Cap</th>
                <th className="py-2.5 px-4 text-right font-medium">Claimed</th>
                <th className="py-2.5 px-4 text-right font-medium">Approved</th>
                <th className="py-2.5 px-4 text-right font-medium">Rejected / withdrawn</th>
                <th className="py-2.5 px-4 text-center font-medium">Within cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {categoryBreakdown.map((row) => (
                <tr key={row.category} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-medium text-[#16213A]">{row.category}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#5A6275]">{row.cap}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#16213A]">{row.claimed}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#16213A] font-medium">{row.approved}</td>
                  <td className="py-3 px-4 text-right font-mono text-[#5A6275]">{row.rejectedWithdrawn}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                      <Check className="w-3 h-3 text-[#0E6466]" /> Yes
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-[#FAF8F5] font-semibold border-t-2 border-[#DDD8CC]">
                <td className="py-3 px-4 text-[#16213A]">Total</td>
                <td className="py-3 px-4 text-right font-mono text-[#16213A]">50,000.00</td>
                <td className="py-3 px-4 text-right font-mono text-[#16213A]">46,800.00</td>
                <td className="py-3 px-4 text-right font-mono text-[#16213A]">45,570.00</td>
                <td className="py-3 px-4 text-right font-mono text-[#16213A]">1,230.00</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2 Bottom Cards: Flags & resolutions (Left) + Reviewer statement (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Flags & resolutions Card matching D-07 */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            Flags & resolutions
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] font-mono text-[10px] uppercase shrink-0 mt-0.5">
                DUPLICATE_CLAIM
              </span>
              <p className="text-[#5A6275] text-[11px] leading-relaxed">
                <strong>JE-0301:</strong> the original supplier invoice was provided. Approved on resubmission.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] font-mono text-[10px] uppercase shrink-0 mt-0.5">
                AMOUNT_MISMATCH
              </span>
              <p className="text-[#5A6275] text-[11px] leading-relaxed">
                <strong>JE-0318:</strong> claim adjusted to the invoice total, $4,100.00.
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] font-mono text-[10px] uppercase shrink-0 mt-0.5">
                INVALID_RECEIPT
              </span>
              <p className="text-[#5A6275] text-[11px] leading-relaxed">
                <strong>JE-0305:</strong> withdrawn by the startup.
              </p>
            </div>
          </div>
        </div>

        {/* Reviewer statement Card matching D-07 */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            Reviewer statement
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-xs text-[#5A6275] mb-1.5">
                Summary for the committee
              </label>
              <textarea
                rows={3}
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg p-3 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466] leading-relaxed"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#16213A]">
              <input
                type="checkbox"
                checked={reviewedAll}
                onChange={(e) => setReviewedAll(e.target.checked)}
                className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
              />
              <span>I reviewed every line and milestone in this submission</span>
            </label>

            {!isSent ? (
              <button
                onClick={() => {
                  setIsSent(true);
                  setTimeout(() => navigate('/institution/reconciliation'), 1200);
                }}
                disabled={!reviewedAll}
                className={`w-full py-2.5 rounded-lg text-xs font-medium shadow-ledger transition text-center ${
                  reviewedAll
                    ? 'bg-[#0E6466] hover:bg-[#0B4F51] text-white'
                    : 'bg-[#EAE6DD] text-[#5A6275] cursor-not-allowed'
                }`}
              >
                Send to committee
              </button>
            ) : (
              <div className="p-2.5 bg-[#E8F3F1] border border-[#0E6466]/20 rounded-lg text-center text-xs font-semibold text-[#0E6466]">
                ✓ Verification report submitted to committee!
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#5A6275] leading-relaxed">
        Assumption: the release equals approved claims up to the tranche ceiling. If Riverbend pays fixed tranche amounts instead, this KPI becomes "Release $50,000.00 · claims verified".
      </p>
    </div>
  );
};

// ----------------------------------------------------------------------------
// D-05: Review queue screen
// ----------------------------------------------------------------------------
export const ReviewQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const [programFilter, setProgramFilter] = useState('All programs');
  const [statusFilter, setStatusFilter] = useState('Needs my review');

  // Exact data from D-05 screenshot:
  const queueItems = [
    {
      id: 'kilele-t1',
      startupTranche: 'Kilele Labs · T1',
      submissionId: 'SUB-T1-01 · submitted 4 Nov',
      program: 'Climate-Smart Agri 2026',
      claimed: '31,450.00',
      lines: '18',
      status: 'Submitted · in review',
      slaBadge: 'Day 12 of 10 · overdue',
      slaType: 'overdue',
      actionLabel: 'Continue (11/18)',
      actionType: 'primary',
      actionLink: '/institution/reviews/detail'
    },
    {
      id: 'tembo-t2',
      startupTranche: 'Tembo Agritech Ltd · T2',
      submissionId: 'SUB-T2-01 · resubmitted 8 Dec',
      program: 'Climate-Smart Agri 2026',
      claimed: '45,570.00',
      lines: '3 changed',
      status: 'Submitted · in review',
      slaBadge: 'Day 1 of 10',
      slaType: 'normal',
      actionLabel: 'Review changes',
      actionType: 'primary',
      actionLink: '/institution/reviews/verification-report'
    },
    {
      id: 'pesa-t2',
      startupTranche: 'Pesa Bridge · T2',
      submissionId: 'SUB-T2-01 · submitted 1 Dec',
      program: 'Women in Fintech 2026',
      claimed: '22,900.00',
      lines: '14',
      status: 'Submitted · in review',
      slaBadge: 'Day 6 of 10',
      slaType: 'warning',
      actionLabel: 'Start review',
      actionType: 'outline',
      actionLink: '/institution/reviews/detail'
    },
    {
      id: 'shamba-t2',
      startupTranche: 'Shamba Data Co. · T2',
      submissionId: "Waiting for the startup's reply",
      program: 'Climate-Smart Agri 2026',
      claimed: '38,000.00',
      lines: '3 open',
      status: 'Changes requested',
      slaBadge: 'Startup day 6 of 7',
      slaType: 'neutral',
      actionLabel: 'View',
      actionType: 'outline',
      actionLink: '/startup/tranches?view=changes'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
      {/* Top Header matching D-05 */}
      <div>
        <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
          Review queue
        </h1>
        <p className="text-xs text-[#5A6275] mt-1 font-sans">
          Submissions assigned to you, oldest SLA first
        </p>
      </div>

      {/* Filter Row matching D-05 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Program
          </label>
          <div className="relative">
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="All programs">All programs</option>
              <option value="Climate-Smart Agri 2026">Climate-Smart Agri 2026</option>
              <option value="Women in Fintech 2026">Women in Fintech 2026</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Status
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="Needs my review">Needs my review</option>
              <option value="All statuses">All statuses</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Queue Table matching D-05 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-3 px-4 text-left font-medium">Startup · tranche</th>
                <th className="py-3 px-4 text-left font-medium">Program</th>
                <th className="py-3 px-4 text-right font-medium">Claimed</th>
                <th className="py-3 px-4 text-center font-medium">Lines</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">SLA</th>
                <th className="py-3 px-4 text-right font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {queueItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF8F5] transition">
                  {/* Startup · tranche */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#16213A]">
                      {item.startupTranche}
                    </div>
                    <div className="text-[11px] text-[#5A6275] font-sans mt-0.5">
                      {item.submissionId}
                    </div>
                  </td>

                  {/* Program */}
                  <td className="py-3.5 px-4 text-[#5A6275]">
                    {item.program}
                  </td>

                  {/* Claimed */}
                  <td className="py-3.5 px-4 text-right font-mono text-[#16213A] font-medium">
                    {item.claimed}
                  </td>

                  {/* Lines */}
                  <td className="py-3.5 px-4 text-center text-[#5A6275]">
                    {item.lines}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {item.status === 'Submitted · in review' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                        <Clock className="w-3 h-3 text-[#3B82F6]" />
                        Submitted · in review
                      </span>
                    )}
                    {item.status === 'Changes requested' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                        <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                        Changes requested
                      </span>
                    )}
                  </td>

                  {/* SLA */}
                  <td className="py-3.5 px-4">
                    {item.slaType === 'overdue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[11px] font-medium font-mono">
                        ⊗ {item.slaBadge}
                      </span>
                    )}
                    {item.slaType === 'normal' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
                        {item.slaBadge}
                      </span>
                    )}
                    {item.slaType === 'warning' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium font-mono">
                        Δ {item.slaBadge}
                      </span>
                    )}
                    {item.slaType === 'neutral' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
                        {item.slaBadge}
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    {item.actionType === 'primary' ? (
                      <Link
                        to={item.actionLink}
                        className="inline-block px-3.5 py-1.5 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white text-xs font-medium shadow-ledger transition text-center"
                      >
                        {item.actionLabel}
                      </Link>
                    ) : (
                      <Link
                        to={item.actionLink}
                        className="inline-block px-3.5 py-1.5 rounded-lg border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition text-center"
                      >
                        {item.actionLabel}
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 2 Banners matching D-05 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="p-5 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl flex items-start gap-3 text-xs text-[#92400E]">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Kilele Labs is 2 business days past SLA.</strong> An escalation was sent to you and Sara T. (program manager) on 18 Nov.
          </div>
        </div>

        <div className="p-5 bg-white border border-[#DDD8CC] rounded-xl shadow-ledger text-center space-y-1">
          <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider">
            EMPTY STATE
          </div>
          <div className="text-sm font-semibold text-[#16213A]">
            You're all caught up
          </div>
          <p className="text-xs text-[#5A6275]">
            New submissions assigned to you will appear here, and you'll get an email.
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// D-06: Line-item review
// ----------------------------------------------------------------------------
export const LineItemReviewPage: React.FC = () => {
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
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
      {/* Top Header bar with Review progress (Matching D-06) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDD8CC] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Line-item review
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
              Submitted · in review
            </span>
          </div>
          <p className="text-xs text-[#5A6275]">
            Stage 1 of 2 · Financial review · Claimed $46,820.00 · SLA day 7 of 10
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/institution/reviews"
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
          >
            ← Back to queue
          </Link>
          <Link
            to="/institution/reviews/verification-report"
            className="px-3.5 py-1.5 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-xs font-medium text-white shadow-ledger transition"
          >
            Finish & write report
          </Link>
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
          <div className="bg-[#0E6466] h-full" style={{ width: '52%' }}></div>
          <div className="bg-[#C0392B] h-full" style={{ width: '9%' }}></div>
        </div>
      </div>

      {/* Main Review Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Line Items Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#16213A]">Line items</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs py-1 px-2 border border-[#DDD8CC] rounded bg-white text-[#16213A] shadow-ledger"
            >
              <option value="Pending first">Pending first</option>
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-xl divide-y divide-[#DDD8CC]/60 shadow-ledger overflow-hidden">
            {lineItems.map((item) => (
              <div
                key={item.key}
                onClick={() => setSelectedItemKey(item.key)}
                className={`p-3.5 cursor-pointer transition ${
                  selectedItemKey === item.key
                    ? 'bg-[#E8F3F1]/50 border-l-4 border-l-[#0E6466]'
                    : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#16213A]">{item.key}</span>
                  <span className="font-mono text-xs font-semibold text-[#16213A]">${item.amount}</span>
                </div>
                <div className="text-xs text-[#5A6275]">{item.title}</div>
                <div className="flex items-center justify-between mt-2 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275]">
                    {item.cat}
                  </span>
                  {item.status === 'Approved' && (
                    <span className="text-[#0E6466] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Approved
                    </span>
                  )}
                  {item.status === 'Rejected' && (
                    <span className="text-[#C0392B] font-medium flex items-center gap-1">
                      <X className="w-3 h-3" /> Rejected
                    </span>
                  )}
                  {item.status === 'Pending' && (
                    <span className="text-[#D97706] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Comparison & Decision Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD8CC] pb-3">
              <div>
                <span className="text-xs font-mono text-[#5A6275]">Claimed line</span>
                <h3 className="text-base font-bold text-[#16213A] mt-0.5">
                  JE-0318 · Soil probes batch #4
                </h3>
              </div>
              <span className="font-mono text-lg font-bold text-[#16213A]">$4,120.00</span>
            </div>

            {/* Comparison Table */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#16213A]">
                Comparison: Claimed vs Invoice OCR
              </span>
              <div className="border border-[#DDD8CC] rounded-lg overflow-hidden text-xs">
                <table className="w-full">
                  <thead className="bg-[#FAF8F5] border-b border-[#DDD8CC] text-[#5A6275]">
                    <tr>
                      <th className="py-2 px-3 text-left font-medium">Field</th>
                      <th className="py-2 px-3 text-left font-medium">Claimed by startup</th>
                      <th className="py-2 px-3 text-left font-medium">OCR extracted</th>
                      <th className="py-2 px-3 text-left font-medium">Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD8CC]/60 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 font-sans text-[#5A6275]">Vendor</td>
                      <td className="py-2.5 px-3 font-sans text-[#16213A]">Highland Sensors Ltd</td>
                      <td className="py-2.5 px-3 font-sans text-[#16213A]">Highland Sensors Ltd</td>
                      <td className="py-2.5 px-3 text-[#0E6466] font-sans">✓ Match</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans text-[#5A6275]">Amount</td>
                      <td className="py-2.5 px-3 font-bold text-[#C0392B]">$4,120.00</td>
                      <td className="py-2.5 px-3 font-bold text-[#0E6466]">$4,100.00</td>
                      <td className="py-2.5 px-3 text-[#C0392B] font-sans">⊗ Mismatch ($20.00)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-sans text-[#5A6275]">Date</td>
                      <td className="py-2.5 px-3 text-[#16213A]">2026-10-28</td>
                      <td className="py-2.5 px-3 text-[#16213A]">2026-10-28</td>
                      <td className="py-2.5 px-3 text-[#0E6466] font-sans">✓ Match</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Decision Radio Selection */}
            <div className="space-y-3 pt-3 border-t border-[#DDD8CC]">
              <span className="text-xs font-semibold text-[#16213A] block">
                Reviewer Decision
              </span>
              <div className="flex items-center gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#16213A]">
                  <input
                    type="radio"
                    name="decision"
                    checked={decision === 'Approve'}
                    onChange={() => setDecision('Approve')}
                    className="text-[#0E6466] focus:ring-0"
                  />
                  <span>Approve line item</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-[#C0392B]">
                  <input
                    type="radio"
                    name="decision"
                    checked={decision === 'Reject'}
                    onChange={() => setDecision('Reject')}
                    className="text-[#C0392B] focus:ring-0"
                  />
                  <span>Reject with reason code</span>
                </label>
              </div>

              {decision === 'Reject' && (
                <div className="p-4 bg-[#FDF2F2] border border-[#C0392B]/20 rounded-lg space-y-3 text-xs">
                  <div>
                    <label className="block text-[#C0392B] font-semibold mb-1">
                      Rejection Reason Code
                    </label>
                    <select
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-[#DDD8CC] rounded bg-white text-[#16213A]"
                    >
                      <option value="AMOUNT_MISMATCH">AMOUNT_MISMATCH · Claim exceeds invoice total</option>
                      <option value="INVALID_RECEIPT">INVALID_RECEIPT · Unsigned or unreadable receipt</option>
                      <option value="INELIGIBLE_CATEGORY">INELIGIBLE_CATEGORY · Not covered by grant agreement</option>
                      <option value="DUPLICATE_CLAIM">DUPLICATE_CLAIM · File hash matched another submission</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#16213A] font-medium mb-1">
                      Note to startup (explaining what to fix)
                    </label>
                    <textarea
                      rows={2}
                      value={noteToStartup}
                      onChange={(e) => setNoteToStartup(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-[#DDD8CC] rounded bg-white text-[#16213A]"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                {isSaved ? (
                  <span className="text-xs font-semibold text-[#0E6466]">
                    ✓ Decision recorded for JE-0318!
                  </span>
                ) : (
                  <span></span>
                )}
                <button
                  onClick={handleSaveNext}
                  className="px-4 py-2 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white font-medium text-xs shadow-ledger transition"
                >
                  Save & next item →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FinancialReviewCenter: React.FC = () => {
  return <ReviewQueuePage />;
};

export const ApprovalManagement: React.FC = () => {
  return <LineItemReviewPage />;
};
