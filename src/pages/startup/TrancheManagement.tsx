import React, { useState } from 'react';
import { 
  ChevronDown, 
  AlertTriangle, 
  Check, 
  Clock, 
  ArrowRight,
  ArrowLeft,
  Lock,
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export const TrancheManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewMode = searchParams.get('view') || 'allocation'; // 'allocation' | 'readiness' | 'sign' | 'changes'

  // Allocation state for D-01
  const [activeTab, setActiveTab] = useState<'line_items' | 'milestones' | 'untagged'>('line_items');
  const [selectedLines, setSelectedLines] = useState<string[]>(['JE-0270']);
  const [categoryFilter, setCategoryFilter] = useState('All categories');
  const [evidenceFilter, setEvidenceFilter] = useState('Any');

  // Exact Line Items from D-01 screenshot:
  const lineItems = [
    {
      entry: 'JE-0233',
      description: 'Field sensor kits ×12',
      category: 'Equipment',
      ledgerAmount: '6,240.00',
      allocated: '6,240.00',
      evidenceStatus: '2 files',
      evidenceType: 'success',
      checkStatus: 'OK',
      checkType: 'success'
    },
    {
      entry: 'JE-0270',
      description: 'Gateway routers ×4',
      category: 'Equipment',
      ledgerAmount: '3,520.00',
      allocated: '3,520.00',
      evidenceStatus: 'Missing',
      evidenceType: 'warning',
      checkStatus: 'No evidence',
      checkType: 'danger'
    },
    {
      entry: 'JE-0318',
      description: 'Soil probes batch #4',
      category: 'Equipment',
      ledgerAmount: '4,120.00',
      allocated: '4,120.00',
      evidenceStatus: '1 file',
      evidenceType: 'success',
      checkStatus: 'Over cap',
      checkType: 'warning'
    },
    {
      entry: 'JE-0301',
      description: 'Drone survey service',
      category: 'Contractors',
      ledgerAmount: '2,180.00',
      allocated: '2,180.00',
      evidenceStatus: 'Duplicate file',
      evidenceType: 'danger',
      checkStatus: 'Flagged',
      checkType: 'warning'
    },
    {
      entry: 'JE-0322',
      description: 'October payroll — R&D (60% of 16,000)',
      category: 'R&D Personnel',
      ledgerAmount: '16,000.00',
      allocated: '9,600.00',
      evidenceStatus: 'Payslips',
      evidenceType: 'success',
      checkStatus: 'OK',
      checkType: 'success'
    },
    {
      entry: 'JE-0305',
      description: 'Agronomist contract — Oct',
      category: 'Contractors',
      ledgerAmount: '1,230.00',
      allocated: '1,230.00',
      evidenceStatus: 'Missing',
      evidenceType: 'warning',
      checkStatus: 'No evidence',
      checkType: 'danger'
    }
  ];

  // Sign & submit form state for D-03
  const [attestationChecked, setAttestationChecked] = useState(true);
  const [signerName, setSignerName] = useState('Grace M.');
  const [signerPassword, setSignerPassword] = useState('••••••••••');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Changes requested state for D-04
  const [resolvedLines, setResolvedLines] = useState<Record<string, boolean>>({
    'JE-0301': true,
    'JE-0305': true,
    'JE-0318': false
  });

  const toggleSelect = (entry: string) => {
    setSelectedLines(prev => 
      prev.includes(entry) ? prev.filter(e => e !== entry) : [...prev, entry]
    );
  };

  // --------------------------------------------------------------------------
  // VIEW: D-04 Changes requested (startup view)
  // --------------------------------------------------------------------------
  if (viewMode === 'changes') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
        {/* Top Header matching D-04 */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
                Tranche 2 · Changes requested
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                <AlertTriangle className="w-3 h-3 text-[#D97706]" /> Changes requested
              </span>
            </div>
            <p className="text-xs text-[#5A6275] font-sans">
              Reviewed by David O. on 3 Dec 2026 · Reply within 7 days (by 10 Dec)
            </p>
          </div>

          <button 
            disabled={!resolvedLines['JE-0318']}
            onClick={() => navigate('/startup/tranches')}
            className={`px-4 py-2 text-xs font-medium rounded-lg shadow-ledger transition ${
              resolvedLines['JE-0318']
                ? 'bg-[#0E6466] hover:bg-[#0B4F51] text-white'
                : 'bg-[#EAE6DD] text-[#5A6275] cursor-not-allowed'
            }`}
          >
            Resubmit (2 of 3 resolved)
          </button>
        </div>

        {/* 4 Summary Cards matching D-04 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
            <div className="text-xs text-[#5A6275] mb-1">Approved lines</div>
            <div className="text-2xl font-mono font-medium text-[#16213A]">20</div>
            <div className="text-xs font-mono text-[#5A6275] mt-1">$39,290.00</div>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
            <div className="text-xs text-[#5A6275] mb-1">Rejected lines</div>
            <div className="text-2xl font-mono font-medium text-[#C0392B]">3</div>
            <div className="text-xs font-mono text-[#5A6275] mt-1">$7,530.00</div>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
            <div className="text-xs text-[#5A6275] mb-1">Resolved by you</div>
            <div className="text-2xl font-mono font-medium text-[#0E6466]">2 of 3</div>
            <div className="text-xs text-[#5A6275] mt-1">Resolve all 3 to resubmit</div>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
            <div className="text-xs text-[#5A6275] mb-1">Milestones</div>
            <div className="text-2xl font-mono font-medium text-[#16213A]">2 verified</div>
            <div className="text-xs text-[#5A6275] mt-1">M-3, M-4</div>
          </div>
        </div>

        {/* Guidance Alert Banner matching D-04 */}
        <div className="p-3.5 bg-[#EFF6FF] border border-[#3B82F6]/20 rounded-xl flex items-center gap-2.5 text-xs text-[#1D4ED8]">
          <span className="font-semibold text-sm">ⓘ</span>
          <span>
            Approved lines stay approved and locked. You only need to deal with the rejected lines below. For each one, fix it and reply, or withdraw it to lower the claim.
          </span>
        </div>

        {/* Rejected Lines Table matching D-04 */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-3 px-4 text-left font-medium">Entry</th>
                <th className="py-3 px-4 text-left font-medium">Description</th>
                <th className="py-3 px-4 text-right font-medium">Amount</th>
                <th className="py-3 px-4 text-left font-medium">Reason</th>
                <th className="py-3 px-4 text-left font-medium">Reviewer note</th>
                <th className="py-3 px-4 text-left font-medium">Your fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {/* Row 1 */}
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-mono text-[11px] text-[#16213A]">JE-0301</td>
                <td className="py-3.5 px-4 font-medium text-[#16213A]">Drone survey service</td>
                <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">2,180.00</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] font-mono text-[10px] font-medium uppercase">
                    ⊗ Rejected DUPLICATE_CLAIM
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#5A6275] max-w-xs text-[11px]">
                  Same receipt already claimed on the platform. Send the original supplier invoice.
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                    <Check className="w-3 h-3 text-[#0E6466]" /> Replied · invoice attached
                  </span>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-mono text-[11px] text-[#16213A]">JE-0305</td>
                <td className="py-3.5 px-4 font-medium text-[#16213A]">Agronomist contract — Oct</td>
                <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">1,230.00</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] font-mono text-[10px] font-medium uppercase">
                    ⊗ Rejected INVALID_RECEIPT
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#5A6275] max-w-xs text-[11px]">
                  Timesheet isn't signed and has no contractor tax ID.
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
                    <Check className="w-3 h-3 text-[#5A6275]" /> Withdrawn from claim
                  </span>
                </td>
              </tr>

              {/* Row 3 (Actionable) */}
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3.5 px-4 font-mono text-[11px] text-[#16213A]">JE-0318</td>
                <td className="py-3.5 px-4 font-medium text-[#16213A]">Soil probes batch #4</td>
                <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">4,120.00</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] font-mono text-[10px] font-medium uppercase">
                    ⊗ Rejected AMOUNT_MISMATCH
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#5A6275] max-w-xs text-[11px]">
                  The invoice total is $4,100.00 but $4,120.00 was claimed.
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setResolvedLines({ ...resolvedLines, 'JE-0318': true })}
                      className="px-3 py-1.5 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white text-xs font-medium shadow-ledger transition"
                    >
                      Adjust to 4,100.00
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition">
                      Reply
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Submission History Stepper matching D-04 */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            Submission history
          </h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0E6466] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#5A6275]">24 Nov · Submitted by Grace M. ·</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[10px] font-medium">
                  <Clock className="w-2.5 h-2.5" /> Submitted · in review
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0E6466] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </div>
              <div className="text-[#5A6275]">
                3 Dec · Review completed by David O. · 20 approved, 3 rejected
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#D97706] text-[#D97706] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#16213A] font-semibold">Now ·</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[10px] font-medium">
                  <AlertTriangle className="w-2.5 h-2.5" /> Changes requested
                </span>
                <span className="text-[#5A6275]">· startup to respond</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW: D-03 Sign & submit Tranche 2
  // --------------------------------------------------------------------------
  if (viewMode === 'sign') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
        {/* Top Header matching D-03 */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
                Sign & submit Tranche 2
              </h1>
              <p className="text-xs text-[#5A6275] mt-1 font-sans">
                Prepared by Amani N. · Readiness check passed 24 Nov 2026, 16:05
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-xs font-medium shrink-0">
              <Check className="w-3.5 h-3.5 text-[#0E6466]" />
              Ready to submit
            </span>
          </div>
        </div>

        {/* Breadcrumb Steps indicator matching D-03 */}
        <div className="flex items-center gap-8 border-b border-[#DDD8CC] pb-3 text-xs font-medium">
          <Link to="/startup/tranches" className="text-[#5A6275] hover:text-[#16213A]">
            Tag & attach
          </Link>
          <Link to="/startup/tranches?view=readiness" className="text-[#5A6275] hover:text-[#16213A]">
            Readiness check
          </Link>
          <span className="text-[#16213A] font-semibold border-b-2 border-[#16213A] pb-3 -mb-3.5">
            Founder signs
          </span>
          <span className="text-[#5A6275]">
            Funder review
          </span>
        </div>

        {/* 2-Column Split: Package summary (Left) + Founder attestation form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column (span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
              <h2 className="text-base font-serif font-normal text-[#16213A]">
                Package summary
              </h2>

              <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                      <th className="py-2.5 px-3 text-left font-medium">Category</th>
                      <th className="py-2.5 px-3 text-center font-medium">Line items</th>
                      <th className="py-2.5 px-3 text-right font-medium">Claimed</th>
                      <th className="py-2.5 px-3 text-right font-medium">Cap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-[#16213A]">R&D Personnel</td>
                      <td className="py-2.5 px-3 text-center font-mono text-[#5A6275]">9</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">27,400.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#5A6275]">30,000.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-[#16213A]">Equipment</td>
                      <td className="py-2.5 px-3 text-center font-mono text-[#5A6275]">4</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">12,500.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#5A6275]">12,500.00</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-medium text-[#16213A]">Contractors</td>
                      <td className="py-2.5 px-3 text-center font-mono text-[#5A6275]">10</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">6,920.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#5A6275]">7,500.00</td>
                    </tr>
                    <tr className="bg-[#FAF8F5] font-semibold border-t-2 border-[#DDD8CC]">
                      <td className="py-2.5 px-3 text-[#16213A]">Total</td>
                      <td className="py-2.5 px-3 text-center font-mono text-[#16213A]">23</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">46,820.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#16213A]">50,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Meta details list matching D-03 */}
              <div className="pt-2 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#DDD8CC]/50">
                  <span className="text-[#5A6275]">Evidence documents</span>
                  <span className="text-[#16213A] font-medium">31 files · all fingerprinted</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#DDD8CC]/50">
                  <span className="text-[#5A6275]">Milestones</span>
                  <span className="text-[#16213A] font-medium">M-3, M-4 with 6 deliverables</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#5A6275]">Flags disclosed</span>
                  <span className="text-[#16213A] font-medium">1 duplicate-file flag, with explanation</span>
                </div>
              </div>
            </div>

            {/* What happens when you submit banner matching D-03 */}
            <div className="p-4 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl flex items-start gap-2.5 text-xs text-[#92400E]">
              <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong>What happens when you submit:</strong> the 23 tagged ledger entries and their evidence are locked against edits, and Riverbend gets a read-only copy. Corrections after this point need a reversing entry.
              </div>
            </div>
          </div>

          {/* Right Column: Founder attestation Form (span-1) */}
          <div className="space-y-6">
            <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
              <h3 className="text-sm font-semibold text-[#16213A]">
                Founder attestation
              </h3>

              {!isSubmitted ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
                  }} 
                  className="space-y-4 text-xs"
                >
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#16213A] leading-snug">
                    <input
                      type="checkbox"
                      checked={attestationChecked}
                      onChange={(e) => setAttestationChecked(e.target.checked)}
                      className="mt-0.5 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0"
                    />
                    <span>
                      I confirm these expenses were incurred for the grant's purposes and the evidence is genuine and complete
                    </span>
                  </label>

                  <div>
                    <label className="block text-[#16213A] font-medium mb-1">Full name</label>
                    <input
                      type="text"
                      required
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs text-[#16213A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#16213A] font-medium mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={signerPassword}
                      onChange={(e) => setSignerPassword(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs font-mono text-[#16213A]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!attestationChecked}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#16213A] hover:bg-[#223150] text-white font-medium text-xs shadow-ledger transition text-center"
                    >
                      Sign & submit for review
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <button type="button" className="text-xs text-[#5A6275] hover:text-[#16213A] hover:underline">
                      Send back to Amani with a note
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F3F1] text-[#0E6466] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base text-[#16213A]">Submitted for Review</h3>
                  <p className="text-xs text-[#5A6275]">
                    Package SUB-T2-01 sent to Riverbend Innovation Trust.
                  </p>
                </div>
              )}
            </div>

            {/* After Submit (Success State) Card matching D-03 bottom right */}
            <div className="bg-[#EFF6FF] border border-[#3B82F6]/20 rounded-xl p-5 space-y-2 text-xs">
              <div className="text-[11px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                AFTER SUBMIT (SUCCESS STATE)
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                  <Clock className="w-3 h-3 text-[#3B82F6]" /> Submitted · in review
                </span>
              </div>
              <p className="text-[#5A6275] text-[11px] leading-relaxed pt-1">
                Submission SUB-T2-01 sent to Riverbend Innovation Trust. Review SLA: 10 business days, so expect a decision by 8 Dec 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW: D-02 Readiness check · Tranche 2
  // --------------------------------------------------------------------------
  if (viewMode === 'readiness') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
        {/* Header matching D-02 */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Readiness check · Tranche 2
            </h1>
            <p className="text-xs text-[#5A6275] mt-1 font-sans">
              Run 20 Nov 2026, 09:42 · Status stays <strong>Draft</strong> until every blocking check passes
            </p>
          </div>

          <button 
            onClick={() => alert('Re-running all compliance checks against ledger...')}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition"
          >
            Run again
          </button>
        </div>

        {/* 3 issues are blocking submission Banner matching D-02 */}
        <div className="p-4 bg-[#FDF2F2] border border-[#C0392B]/20 rounded-xl flex items-start gap-3 text-xs text-[#C0392B]">
          <span className="font-bold text-base leading-none mt-0.5">⊗</span>
          <div>
            <div className="font-semibold text-sm">3 issues are blocking submission</div>
            <div className="text-xs text-[#5A6275] mt-0.5">
              Fix them here, then run the check again. Nothing has been sent to Riverbend yet.
            </div>
          </div>
        </div>

        {/* Stepper Tabs matching D-02 */}
        <div className="flex items-center gap-8 border-b border-[#DDD8CC] pb-3 text-xs font-medium">
          <Link to="/startup/tranches" className="text-[#5A6275] hover:text-[#16213A]">
            Tag & attach
          </Link>
          <span className="text-[#16213A] font-semibold border-b-2 border-[#16213A] pb-3 -mb-3.5">
            Readiness check
          </span>
          <Link to="/startup/tranches?view=sign" className="text-[#5A6275] hover:text-[#16213A]">
            Founder signs
          </Link>
          <span className="text-[#5A6275]">
            Funder review
          </span>
        </div>

        {/* Section 1: Blocking (3) Cards matching D-02 */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            Blocking (3)
          </h2>

          {/* Issue 1: Over Cap */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[10px] font-semibold uppercase">
                  ⊗ Blocking
                </span>
                <h3 className="font-semibold text-xs text-[#16213A]">
                  Equipment is over its cap by $1,380.00
                </h3>
              </div>
              <button 
                onClick={() => navigate('/startup/tranches')}
                className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition self-start sm:self-auto"
              >
                Adjust allocations
              </button>
            </div>
            <p className="text-xs text-[#5A6275] leading-relaxed">
              Rule: Equipment ≤ 25% of the tranche ($12,500.00) plus 5% tolerance ($13,125.00). Tagged: $13,880.00. To clear it, untag or move at least $755.00. Bringing it under $12,500.00 avoids a variance note.
            </p>
          </div>

          {/* Issue 2: Missing Supporting Document */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[10px] font-semibold uppercase">
                  ⊗ Blocking
                </span>
                <h3 className="font-semibold text-xs text-[#16213A]">
                  2 line items have no supporting document
                </h3>
              </div>
              <button 
                onClick={() => navigate('/startup/evidence?view=upload')}
                className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition self-start sm:self-auto"
              >
                Attach evidence
              </button>
            </div>
            <ul className="text-xs text-[#5A6275] space-y-1 font-mono list-disc list-inside">
              <li>JE-0270 Gateway routers ×4 · $3,520.00</li>
              <li>JE-0305 Agronomist contract — Oct · $1,230.00</li>
            </ul>
          </div>

          {/* Issue 3: Missing Required Deliverable */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[10px] font-semibold uppercase">
                  ⊗ Blocking
                </span>
                <h3 className="font-semibold text-xs text-[#16213A]">
                  Milestone M-3 is missing a required deliverable
                </h3>
              </div>
              <button 
                onClick={() => navigate('/startup/milestones')}
                className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition self-start sm:self-auto"
              >
                Ask Joel K.
              </button>
            </div>
            <p className="text-xs text-[#5A6275]">
              "Pilot summary report" hasn't been uploaded. The owner is Joel K. (Operations Lead).
            </p>
          </div>
        </div>

        {/* Section 2: Warnings (1) · won't block matching D-02 */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            Warnings (1) · won't block
          </h2>

          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[10px] font-semibold uppercase">
                  ⚠ Warning
                </span>
                <h3 className="font-semibold text-xs text-[#16213A]">
                  JE-0301 has a duplicate-file flag
                </h3>
              </div>
              <button 
                onClick={() => navigate('/startup/evidence?view=upload')}
                className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition self-start sm:self-auto"
              >
                Add explanation
              </button>
            </div>
            <p className="text-xs text-[#5A6275]">
              Reviewers will see the flag. An explanation now reduces the chance of a <code className="px-1 py-0.5 bg-[#FAF8F5] border border-[#DDD8CC] rounded font-mono text-[10px]">DUPLICATE_CLAIM</code> rejection.
            </p>
          </div>
        </div>

        {/* Section 3: Passed (5 checks passed) matching D-02 */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-4 shadow-ledger flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] font-medium text-[11px]">
            <Check className="w-3 h-3 text-[#0E6466]" /> Passed
          </span>
          <span className="font-medium text-[#16213A]">5 checks passed</span>
        </div>

        {/* Action Button at bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-xs text-[#5A6275]">
            Available once all blocking checks pass
          </span>
          <button
            disabled={true}
            className="px-5 py-2.5 text-xs font-medium rounded-lg bg-[#EAE6DD] text-[#5A6275] cursor-not-allowed shadow-ledger transition"
          >
            Send to Founder for signature
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW: D-01 Tranche 2 · Pilot deployment (Default Allocation View)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
      {/* Top Header matching D-01 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Tranche 2 · Pilot deployment
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E6466]"></span> Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
              Draft
            </span>
          </div>
          <p className="text-xs text-[#5A6275] font-sans">
            Allocation $50,000.00 · Tagged $48,200.00 · 24 line items · Target 30 Nov 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition">
            Tag ledger entries
          </button>
          <Link
            to="/startup/tranches?view=readiness"
            className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition"
          >
            Run readiness check
          </Link>
        </div>
      </div>

      {/* 3 Category Cap Cards matching D-01 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: R&D Personnel */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-2">
          <div className="text-xs text-[#5A6275]">R&D Personnel · cap 30,000</div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            27,400.00
          </div>
          <div className="w-full h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden">
            <div className="h-full bg-[#0E6466] w-[91%] rounded-full"></div>
          </div>
        </div>

        {/* Card 2: Equipment (Over Cap with Red Border) */}
        <div className="bg-white border-2 border-[#C0392B] rounded-xl p-5 shadow-ledger space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5A6275]">Equipment · cap 12,500</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[10px] font-medium">
              ⊗ Over cap
            </span>
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            13,880.00
          </div>
          <div className="w-full h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden">
            <div className="h-full bg-[#C0392B] w-full rounded-full"></div>
          </div>
        </div>

        {/* Card 3: Contractors */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-2">
          <div className="text-xs text-[#5A6275]">Contractors · cap 7,500</div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            6,920.00
          </div>
          <div className="w-full h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden">
            <div className="h-full bg-[#0E6466] w-[92%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Tabs Row matching D-01 */}
      <div className="flex items-center gap-6 border-b border-[#DDD8CC] text-xs font-medium">
        <button
          onClick={() => setActiveTab('line_items')}
          className={`pb-2.5 transition ${
            activeTab === 'line_items'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Line items (24)
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`pb-2.5 transition ${
            activeTab === 'milestones'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Milestones (2)
        </button>
        <button
          onClick={() => setActiveTab('untagged')}
          className={`pb-2.5 transition ${
            activeTab === 'untagged'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Untagged entries (11)
        </button>
      </div>

      {/* Filters Row matching D-01 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="All categories">All categories</option>
              <option value="Equipment">Equipment</option>
              <option value="Contractors">Contractors</option>
              <option value="R&D Personnel">R&D Personnel</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Evidence
          </label>
          <div className="relative">
            <select
              value={evidenceFilter}
              onChange={(e) => setEvidenceFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="Any">Any</option>
              <option value="Attached">Attached</option>
              <option value="Missing">Missing</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table matching D-01 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-3 px-3 text-center w-10">
                  <input type="checkbox" className="rounded border-[#DDD8CC] text-[#0E6466]" />
                </th>
                <th className="py-3 px-3 text-left font-medium">Entry</th>
                <th className="py-3 px-3 text-left font-medium">Description</th>
                <th className="py-3 px-3 text-left font-medium">Category</th>
                <th className="py-3 px-3 text-right font-medium">Ledger amount</th>
                <th className="py-3 px-3 text-right font-medium">Allocated</th>
                <th className="py-3 px-3 text-left font-medium">Evidence</th>
                <th className="py-3 px-3 text-left font-medium">Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {lineItems.map((item) => {
                const isSelected = selectedLines.includes(item.entry);

                return (
                  <tr 
                    key={item.entry} 
                    className={`transition ${
                      isSelected ? 'bg-[#F0F8FF]/80' : 'hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <td className="py-3 px-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.entry)}
                        className="rounded border-[#DDD8CC] text-[#0E6466]"
                      />
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-[#16213A]">
                      {item.entry}
                    </td>

                    <td className="py-3 px-3 font-medium text-[#16213A]">
                      {item.description}
                    </td>

                    <td className="py-3 px-3 text-[#5A6275]">
                      {item.category}
                    </td>

                    <td className="py-3 px-3 text-right font-mono text-[#16213A]">
                      {item.ledgerAmount}
                    </td>

                    <td className="py-3 px-3 text-right font-mono text-[#16213A]">
                      {item.allocated}
                    </td>

                    <td className="py-3 px-3">
                      {item.evidenceType === 'success' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                          <Check className="w-3 h-3 text-[#0E6466]" /> {item.evidenceStatus}
                        </span>
                      )}
                      {item.evidenceType === 'warning' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                          <AlertTriangle className="w-3 h-3 text-[#D97706]" /> {item.evidenceStatus}
                        </span>
                      )}
                      {item.evidenceType === 'danger' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[11px] font-medium">
                          ⊗ {item.evidenceStatus}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      {item.checkType === 'success' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8F3F1] text-[#0E6466] text-[11px] font-medium">
                          <Check className="w-3 h-3" /> {item.checkStatus}
                        </span>
                      )}
                      {item.checkType === 'warning' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] text-[11px] font-medium">
                          <AlertTriangle className="w-3 h-3 text-[#D97706]" /> {item.checkStatus}
                        </span>
                      )}
                      {item.checkType === 'danger' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FDF2F2] text-[#C0392B] text-[11px] font-medium">
                          ⊗ {item.checkStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selection Action Bar matching D-01 bottom */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#DDD8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="text-[#5A6275]">
            1 selected · showing 6 of 24
          </span>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition">
              Move to another tranche
            </button>
            <button 
              onClick={() => navigate('/startup/evidence?view=upload')}
              className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition"
            >
              Attach evidence
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] bg-white text-[#5A6275] hover:text-[#C0392B] transition">
              Untag
            </button>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-[#5A6275] leading-relaxed">
        Partial allocation is allowed (JE-0322 allocates 60% of a payroll entry). An allocation can never exceed its ledger amount, and the same entry can't be allocated above 100% across tranches or grants.
      </p>
    </div>
  );
};
