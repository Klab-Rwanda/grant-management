import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const SubmissionCenter: React.FC = () => {
  const { 
    tranches, 
    transactions, 
    documents, 
    milestones, 
    submitTranchePackage, 
    activeGrant 
  } = useApp();

  const [selectedTrancheId, setSelectedTrancheId] = useState(
    tranches.find(t => t.status === 'ACTIVE' || t.status === 'PENDING_REVIEW')?.id || tranches[0].id
  );
  
  // Selectable expense items from transactions
  const eligibleTransactions = transactions.filter(t => t.debit > 0);
  const [selectedTxIds, setSelectedTxIds] = useState<string[]>(
    eligibleTransactions.slice(0, 4).map(t => t.id)
  );
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const selectedTranche = tranches.find(t => t.id === selectedTrancheId) || tranches[0];

  const toggleSelectTx = (id: string) => {
    setSelectedTxIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Readiness Checklist checks
  const chosenTransactions = eligibleTransactions.filter(t => selectedTxIds.includes(t.id));
  const totalClaimAmount = chosenTransactions.reduce((acc, t) => acc + t.debit, 0);

  const hasMissingReceipts = chosenTransactions.some(t => !t.receiptId);
  const associatedMilestones = milestones.filter(m => selectedTranche.milestoneIds?.includes(m.id));
  const areMilestonesComplete = associatedMilestones.every(m => m.completionPercentage >= 75);
  const isBudgetWithinLimit = totalClaimAmount <= selectedTranche.amount;

  const isReadyToSubmit = 
    chosenTransactions.length > 0 && 
    !hasMissingReceipts && 
    areMilestonesComplete && 
    isBudgetWithinLimit;

  const handleSubmit = () => {
    if (!isReadyToSubmit) return;
    submitTranchePackage(selectedTranche.id, selectedTxIds);
    setIsSubmittedSuccess(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Grant Tranche Submission Center
        </h2>
        <p className="text-xs text-slate-500">
          Prepare, validate, and submit financial expense packages and milestone proofs for institutional audit.
        </p>
      </div>

      {isSubmittedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold">
              Tranche package successfully submitted for institutional audit. Status updated to PENDING_REVIEW.
            </span>
          </div>
          <button
            onClick={() => setIsSubmittedSuccess(false)}
            className="text-xs text-emerald-700 underline font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Target Tranche Selector */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
          Select Target Tranche Package
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {tranches.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTrancheId(t.id)}
              className={`p-3 rounded-lg border text-left transition ${
                t.id === selectedTrancheId
                  ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Tranche #{t.trancheNumber}
                </span>
                <StatusBadge status={t.status} size="sm" />
              </div>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                ${t.amount.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Submission Readiness Checklist & Validation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Item Selector Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Eligible Ledger Expenses to Include
                </h3>
                <p className="text-xs text-slate-400">
                  Select posted line items to claim under this tranche release
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                Selected: {chosenTransactions.length} items (${totalClaimAmount.toLocaleString()})
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                    <th className="py-2.5 px-4 w-10">Select</th>
                    <th className="py-2.5 px-4">Date & Description</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                    <th className="py-2.5 px-4 text-center">Receipt Attached</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {eligibleTransactions.map(tx => {
                    const isSelected = selectedTxIds.includes(tx.id);
                    return (
                      <tr 
                        key={tx.id}
                        onClick={() => toggleSelectTx(tx.id)}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition ${
                          isSelected ? 'bg-emerald-50/10 dark:bg-emerald-950/10' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="rounded text-emerald-500 focus:ring-emerald-400"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {tx.description}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {tx.date} • {tx.merchantName || 'Direct Expense'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]">
                            {tx.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                          ${tx.debit.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {tx.receiptId ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px] flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="text-rose-500 font-medium text-[11px] flex items-center justify-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>Missing Receipt</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Readiness Checklist Card */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Submission Readiness Audit Checklist
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                {chosenTransactions.length > 0 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Expense Items Selected
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {chosenTransactions.length} expenses tagged (${totalClaimAmount.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                {!hasMissingReceipts && chosenTransactions.length > 0 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Zero Missing Evidence Receipts
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {hasMissingReceipts ? 'One or more line items lack an invoice proof.' : 'All claims verified with attached receipts.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                {areMilestonesComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Milestone Gate Fulfillment
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {areMilestonesComplete ? 'All associated milestones >= 75% complete.' : 'Required technical milestones are pending completion.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                {isBudgetWithinLimit ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Tranche Budget Boundary Check
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Claim total within Tranche ceiling (${selectedTranche.amount.toLocaleString()}).
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={!isReadyToSubmit}
                onClick={handleSubmit}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${
                  isReadyToSubmit
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 cursor-pointer shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Submit for Institutional Review</span>
              </button>
              {!isReadyToSubmit && (
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Complete all audit checklist conditions to enable submission.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
