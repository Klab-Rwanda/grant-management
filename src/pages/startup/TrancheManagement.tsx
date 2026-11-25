import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Lock, 
  FileCheck, 
  ExternalLink,
  ChevronRight,
  DollarSign,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';

export const TrancheManagement: React.FC = () => {
  const { tranches, activeGrant } = useApp();
  const [selectedTrancheId, setSelectedTrancheId] = useState<string>(tranches[1]?.id || tranches[0]?.id);

  // Exact data from D-01 Tranche workspace & D-02 Readiness check
  const selectedTranche = tranches.find(t => t.id === selectedTrancheId) || tranches[1];

  // Readiness block items matching D-02
  const readinessIssues = [
    {
      type: 'BLOCKER',
      title: 'Equipment cap exceeded by $1,400.00',
      description: 'Tagged equipment line items ($38,600.00) exceed the allowable $37,200 Tranche 2 sub-allocation.',
      action: 'Edit journal tag',
      link: '/startup/journal'
    },
    {
      type: 'WARNING',
      title: 'Missing receipt for JE-0321 ($1,720.00)',
      description: 'Field tablets purchase has no PDF receipt attached in Evidence Vault.',
      action: 'Upload file',
      link: '/startup/evidence'
    },
    {
      type: 'WARNING',
      title: 'Milestone 2 deliverable pending sign-off',
      description: 'Prototype soil probe testing report has been uploaded but lacks external lab verification signature.',
      action: 'View milestone',
      link: '/startup/milestones'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching D-01 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Tranche workspace
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · Tranche 2 of 4 · Grant: Sustainable Agriculture Tech Grant · Disbursement target: $40,000.00 USD
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/startup/submissions"
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
          >
            <span>Check readiness & submit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Visual Timeline Pipeline matching D-01 / D-02 */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg p-6 shadow-ledger">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#16213A] mb-6">
          Grant Tranche Schedule
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {tranches.map((t) => {
            const isReconciled = t.status === 'DISBURSED_AND_RECONCILED';
            const isSelected = t.id === selectedTrancheId;

            return (
              <div 
                key={t.id}
                onClick={() => setSelectedTrancheId(t.id)}
                className={`p-4 rounded-lg border cursor-pointer transition ${
                  isSelected 
                    ? 'border-[#0E6466] bg-[#E8F3F1]/40 ring-1 ring-[#0E6466]' 
                    : 'border-[#DDD8CC] bg-[#FAF8F5] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#16213A]">
                    Tranche {t.trancheNumber}
                  </span>
                  {isReconciled ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0E6466]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reconciled
                    </span>
                  ) : t.trancheNumber === 2 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D97706]">
                      <Clock className="w-3.5 h-3.5" />
                      Draft claim
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#5A6275]">
                      <Lock className="w-3.5 h-3.5" />
                      Locked
                    </span>
                  )}
                </div>

                <div className="text-xl font-mono font-medium text-[#16213A]">
                  ${t.amount.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#5A6275] mt-1">
                  Target date: {t.trancheNumber === 1 ? '15 Mar 2026' : t.trancheNumber === 2 ? '15 Nov 2026' : '15 Mar 2027'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Readiness Check Alert Banner (D-02 Readiness check) */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="p-4 bg-[#FEF3C7] border-b border-[#F59E0B]/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E]">
            <AlertCircle className="w-4 h-4 text-[#D97706]" />
            <span>Submission readiness check: 1 blocker and 2 warnings must be addressed</span>
          </div>
          <span className="text-[11px] font-mono text-[#92400E]">Status: BLOCKED</span>
        </div>

        <div className="divide-y divide-[#DDD8CC]/60 text-xs">
          {readinessIssues.map((issue, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5]">
              <div className="flex items-start gap-3">
                {issue.type === 'BLOCKER' ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FDF2F2] text-[#C0392B] border border-[#C0392B]/20 uppercase">
                    Blocker
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30 uppercase">
                    Warning
                  </span>
                )}
                <div>
                  <div className="font-medium text-[#16213A]">{issue.title}</div>
                  <div className="text-[#5A6275] text-[11px] mt-0.5">{issue.description}</div>
                </div>
              </div>

              <Link
                to={issue.link}
                className="self-start sm:self-auto px-3 py-1 bg-white border border-[#DDD8CC] rounded text-[11px] font-medium text-[#16213A] hover:bg-[#F1EEE7] transition shrink-0"
              >
                {issue.action} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Line Item Allocations for this Tranche */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F1EEE7] border-b border-[#DDD8CC] flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#16213A] uppercase tracking-wider">
            Allocated Journal Entries to Tranche 2
          </h2>
          <span className="text-xs font-mono font-medium text-[#16213A]">
            Claimed: $38,600.00 / Cap: $40,000.00
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">Date</th>
                <th className="py-2.5 px-4 text-left font-medium">Voucher #</th>
                <th className="py-2.5 px-4 text-left font-medium">Description</th>
                <th className="py-2.5 px-4 text-left font-medium">Category</th>
                <th className="py-2.5 px-4 text-right font-medium">Amount</th>
                <th className="py-2.5 px-4 text-left font-medium">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-mono">
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-sans text-[#5A6275]">19 Aug 2026</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">JE-0233</td>
                <td className="py-3 px-4 font-sans text-[#16213A]">Field sensor kits ×12</td>
                <td className="py-3 px-4 font-sans">Equipment</td>
                <td className="py-3 px-4 text-right font-medium text-[#16213A]">$6,240.00</td>
                <td className="py-3 px-4 font-sans">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#0E6466]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2 files
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-sans text-[#5A6275]">11 Sep 2026</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">JE-0270</td>
                <td className="py-3 px-4 font-sans text-[#16213A]">Gateway routers ×4</td>
                <td className="py-3 px-4 font-sans">Equipment</td>
                <td className="py-3 px-4 text-right font-medium text-[#16213A]">$3,520.00</td>
                <td className="py-3 px-4 font-sans">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#D97706]">
                    <AlertTriangle className="w-3.5 h-3.5" /> Missing
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-sans text-[#5A6275]">28 Oct 2026</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">JE-0318</td>
                <td className="py-3 px-4 font-sans text-[#16213A]">Soil probes batch #4</td>
                <td className="py-3 px-4 font-sans">Equipment</td>
                <td className="py-3 px-4 text-right font-medium text-[#16213A]">$4,120.00</td>
                <td className="py-3 px-4 font-sans">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#0E6466]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 1 file
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
