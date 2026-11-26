import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  FileCheck2,
  Loader2,
  Lock,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Transaction, Tranche } from '../../types';

type ApiState = 'idle' | 'validating' | 'submitting';

interface ValidationResult {
  valid: boolean;
  issues: string[];
  reference: string;
  checkedAt: string;
}

interface SubmitReceipt {
  submissionId: string;
  signedBy: string;
  signedAt: string;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const formatSignedAt = (value: string) => value.replace('T', ' · ').replace(/\.\d{3}Z$/, ' UTC');

const isEntryLocked = (transaction: Transaction) =>
  Boolean(transaction.isLocked) ||
  transaction.submissionStatus === 'SUBMITTED' ||
  transaction.submissionStatus === 'APPROVED';

const transactionsForTranche = (transactions: Transaction[], tranche: Tranche) =>
  transactions.filter(
    (transaction) =>
      transaction.debit > 0 &&
      transaction.grantId === tranche.grantId &&
      (!transaction.trancheId || transaction.trancheId === tranche.id)
  );

const validatePackageWithApi = async (payload: {
  trancheId: string;
  transactionIds: string[];
  totalClaimAmount: number;
  signedBy: string;
  certified: boolean;
  localIssues: string[];
}): Promise<ValidationResult> => {
  await wait(700);

  const issues = [...payload.localIssues];

  if (payload.transactionIds.length === 0) issues.push('No ledger entries were included in the package.');
  if (payload.totalClaimAmount <= 0) issues.push('The claim amount must be greater than zero.');
  if (payload.signedBy.length < 3) issues.push('A valid founder signature is required.');
  if (!payload.certified) issues.push('The sign-off certification was not accepted.');

  return {
    valid: issues.length === 0,
    issues,
    reference: `VAL-${Date.now().toString().slice(-6)}`,
    checkedAt: new Date().toISOString(),
  };
};

const submitPackageWithApi = async (validationRef: string, signedBy: string): Promise<SubmitReceipt> => {
  if (!validationRef) throw new Error('A passing validation result is required before submission.');
  if (signedBy.length < 3) throw new Error('The signatory name is invalid.');

  await wait(900);

  return {
    submissionId: `sub-api-${Date.now()}`,
    signedBy,
    signedAt: new Date().toISOString(),
  };
};

export const SubmissionCenter: React.FC = () => {
  const { tranches, transactions, milestones, submissions, submitTranchePackage, activeGrant, currentUser } = useApp();

  const initialTranche =
    tranches.find((tranche) => tranche.status === 'ACTIVE') ??
    tranches.find((tranche) => tranche.status === 'PENDING_REVIEW') ??
    tranches[0];

  const [selectedTrancheId, setSelectedTrancheId] = useState(() => initialTranche?.id ?? '');
  const [selectedTxIds, setSelectedTxIds] = useState<string[]>(() =>
    initialTranche
      ? transactionsForTranche(transactions, initialTranche)
          .filter((transaction) => !isEntryLocked(transaction))
          .slice(0, 4)
          .map((transaction) => transaction.id)
      : []
  );
  const [signatureName, setSignatureName] = useState('');
  const [certified, setCertified] = useState(false);
  const [apiState, setApiState] = useState<ApiState>('idle');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [submitReceipt, setSubmitReceipt] = useState<SubmitReceipt | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const selectedTranche = tranches.find((tranche) => tranche.id === selectedTrancheId) ?? initialTranche;

  const resetApiState = () => {
    setValidationResult(null);
    setSubmitReceipt(null);
    setApiError(null);
    setApiState('idle');
  };

  const handleSelectTranche = (trancheId: string) => {
    const tranche = tranches.find((item) => item.id === trancheId);
    if (!tranche) return;

    const existingSubmission = submissions.find((submission) => submission.trancheId === trancheId);
    const selectable = transactionsForTranche(transactions, tranche).filter(
      (transaction) => !isEntryLocked(transaction)
    );

    setSelectedTrancheId(trancheId);
    setSelectedTxIds(
      existingSubmission
        ? existingSubmission.items.map((item) => item.transactionId)
        : selectable.slice(0, 4).map((transaction) => transaction.id)
    );
    setSignatureName('');
    setCertified(false);
    resetApiState();
  };

  const handleToggleTx = (id: string) => {
    if (apiState !== 'idle') return;
    setSelectedTxIds((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    );
    resetApiState();
  };

  const handleValidate = async () => {
    if (!selectedTranche || apiState !== 'idle' || localIssues.length > 0) return;

    setApiState('validating');
    setValidationResult(null);
    setApiError(null);

    try {
      const result = await validatePackageWithApi({
        trancheId: selectedTranche.id,
        transactionIds: selectedTxIds,
        totalClaimAmount,
        signedBy: signatureName.trim(),
        certified,
        localIssues,
      });
      setValidationResult(result);
    } catch {
      setApiError('Validation service is unavailable. Try again.');
    } finally {
      setApiState('idle');
    }
  };

  const handleSubmitPackage = async () => {
    if (!selectedTranche || !validationResult?.valid || apiState !== 'idle') return;

    setApiState('submitting');
    setApiError(null);

    try {
      const receipt = await submitPackageWithApi(validationResult.reference, signatureName.trim());
      submitTranchePackage(
        selectedTranche.id,
        selectedTxIds,
        receipt.signedBy,
        receipt.signedAt,
        validationResult.reference
      );
      setSubmitReceipt(receipt);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Submission failed. Try again.');
    } finally {
      setApiState('idle');
    }
  };

  if (!selectedTranche) {
    return <p className="text-xs text-slate-500">No tranche packages are available.</p>;
  }

  const submissionForTranche = submissions.find((submission) => submission.trancheId === selectedTranche.id);
  const isPackageLocked =
    Boolean(submissionForTranche) ||
    selectedTranche.status === 'SUBMITTED' ||
    selectedTranche.status === 'PENDING_REVIEW' ||
    selectedTranche.status === 'APPROVED_FOR_DISBURSEMENT' ||
    selectedTranche.status === 'DISBURSED_AND_RECONCILED';

  const visibleTransactions = transactionsForTranche(transactions, selectedTranche);
  const chosenTransactions = visibleTransactions.filter((transaction) => selectedTxIds.includes(transaction.id));
  const totalClaimAmount = chosenTransactions.reduce((total, transaction) => total + transaction.debit, 0);
  const hasMissingReceipts = chosenTransactions.some((transaction) => !transaction.receiptId);
  const associatedMilestones = milestones.filter((milestone) => selectedTranche.milestoneIds?.includes(milestone.id));
  const areMilestonesComplete = associatedMilestones.every((milestone) => milestone.completionPercentage >= 75);
  const isBudgetWithinLimit = totalClaimAmount <= selectedTranche.amount;
  const isSignatureComplete = signatureName.trim().length >= 3 && certified;

  const localIssues = [
    ...(chosenTransactions.length === 0 ? ['Select at least one ledger expense.'] : []),
    ...(hasMissingReceipts ? ['One or more selected expenses are missing a receipt.'] : []),
    ...(!areMilestonesComplete ? ['Associated milestones are below the 75% completion gate.'] : []),
    ...(!isBudgetWithinLimit ? ['Claim total exceeds the tranche ceiling.'] : []),
    ...(!isSignatureComplete ? ['Founder sign-off is incomplete.'] : []),
  ];

  const canValidate = localIssues.length === 0 && !isPackageLocked && apiState === 'idle';
  const canSubmit = Boolean(validationResult?.valid) && !isPackageLocked && apiState === 'idle';

  const signingRecord = submissionForTranche?.signedBy
    ? {
        signedBy: submissionForTranche.signedBy,
        signedAt: submissionForTranche.signedAt ?? selectedTranche.submissionDate ?? '',
        validationRef: submissionForTranche.validationRef,
        submissionId: submissionForTranche.id,
      }
    : submitReceipt
      ? {
          signedBy: submitReceipt.signedBy,
          signedAt: submitReceipt.signedAt,
          validationRef: validationResult?.reference,
          submissionId: submitReceipt.submissionId,
        }
      : null;

  const readinessChecks = [
    {
      label: 'Expense Items Selected',
      detail: `${chosenTransactions.length} expenses tagged ($${totalClaimAmount.toLocaleString()})`,
      ok: chosenTransactions.length > 0,
    },
    {
      label: 'Zero Missing Evidence Receipts',
      detail: hasMissingReceipts ? 'One or more line items lack an invoice proof.' : 'All claims verified with attached receipts.',
      ok: !hasMissingReceipts && chosenTransactions.length > 0,
    },
    {
      label: 'Milestone Gate Fulfillment',
      detail: areMilestonesComplete
        ? 'All associated milestones are at least 75% complete.'
        : 'Required technical milestones are pending completion.',
      ok: areMilestonesComplete,
    },
    {
      label: 'Tranche Budget Boundary Check',
      detail: `Claim total within Tranche ceiling ($${selectedTranche.amount.toLocaleString()}).`,
      ok: isBudgetWithinLimit,
    },
    {
      label: 'Founder Sign-off',
      detail: isSignatureComplete
        ? `${signatureName.trim()} · certification accepted`
        : 'Type your full name and accept the certification below.',
      ok: isSignatureComplete,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Grant Tranche Submission Center</h2>
        <p className="text-xs text-slate-500">
          Prepare, validate, sign and submit expense packages for {activeGrant.programName}.
        </p>
      </div>

      {submitReceipt && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold">Package signed and submitted for institutional review</p>
              <p className="mt-0.5 text-emerald-700 dark:text-emerald-200">
                {submitReceipt.submissionId} · Signed by {submitReceipt.signedBy} at{' '}
                {formatSignedAt(submitReceipt.signedAt)} · Validation {validationResult?.reference}
              </p>
              <p className="text-emerald-700 dark:text-emerald-200">Selected ledger entries are now frozen.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmitReceipt(null)}
            className="text-xs font-medium underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
          Select Target Tranche Package
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {tranches.map((tranche) => {
            const trancheHasSubmission = submissions.some((submission) => submission.trancheId === tranche.id);
            const locked =
              trancheHasSubmission ||
              tranche.status === 'SUBMITTED' ||
              tranche.status === 'PENDING_REVIEW' ||
              tranche.status === 'APPROVED_FOR_DISBURSEMENT' ||
              tranche.status === 'DISBURSED_AND_RECONCILED';

            return (
              <button
                key={tranche.id}
                type="button"
                onClick={() => handleSelectTranche(tranche.id)}
                className={`p-3 rounded-lg border text-left transition ${
                  tranche.id === selectedTrancheId
                    ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1 gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Tranche #{tranche.trancheNumber}</span>
                  <span className="flex items-center gap-1">
                    {locked && <Lock className="w-3 h-3 text-slate-400" />}
                    <StatusBadge status={tranche.status} size="sm" />
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  ${tranche.amount.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Eligible Ledger Expenses to Include
                </h3>
                <p className="text-xs text-slate-400">
                  {isPackageLocked
                    ? 'Entries are frozen after sign-off and cannot be edited.'
                    : 'Select posted line items to claim under this tranche release'}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                  Selected: {chosenTransactions.length} (${totalClaimAmount.toLocaleString()})
                </span>
                {isPackageLocked && (
                  <span className="text-[10px] text-slate-500 inline-flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {visibleTransactions.length} frozen
                  </span>
                )}
              </div>
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
                  {visibleTransactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 px-4 text-center text-slate-400">
                        No ledger expenses are available for this tranche.
                      </td>
                    </tr>
                  )}
                  {visibleTransactions.map((transaction) => {
                    const isSelected = selectedTxIds.includes(transaction.id);
                    const locked = isPackageLocked || isEntryLocked(transaction);

                    return (
                      <tr
                        key={transaction.id}
                        onClick={() => !locked && handleToggleTx(transaction.id)}
                        className={`transition ${
                          locked
                            ? 'cursor-not-allowed bg-slate-50/70 dark:bg-slate-800/40 opacity-70'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer'
                        } ${isSelected ? 'bg-emerald-50/10 dark:bg-emerald-950/10' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={locked}
                            onChange={() => {}}
                            className="rounded text-emerald-500 focus:ring-emerald-400 disabled:cursor-not-allowed"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white">{transaction.description}</span>
                            {locked && (
                              <span className="inline-flex items-center gap-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide">
                                <Lock className="w-3 h-3" /> Locked
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {transaction.date} · {transaction.merchantName || 'Direct Expense'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                          ${transaction.debit.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {transaction.receiptId ? (
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

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Submission Readiness Audit Checklist</h3>
            <div className="space-y-3 text-xs">
              {readinessChecks.map((check) => (
                <div key={check.label} className="flex items-start gap-2.5">
                  {check.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">{check.label}</span>
                    <span className="text-slate-500 text-[11px]">{check.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Founder Sign-off</h3>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                {isPackageLocked ? 'Signed' : 'Required'}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                Type your full legal name
              </label>
              <input
                type="text"
                value={signatureName}
                disabled={isPackageLocked || apiState !== 'idle'}
                onChange={(event) => {
                  setSignatureName(event.target.value);
                  resetApiState();
                }}
                placeholder="Authorized founder name"
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white disabled:opacity-60"
              />
            </div>

            <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3">
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Signature</p>
              <p
                className={`font-serif text-xl italic leading-tight mt-1 ${
                  signatureName.trim() ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-slate-600'
                }`}
              >
                {signatureName.trim() || 'Type your name above'}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between gap-2 text-[10px] text-slate-400">
                <span>{currentUser.organizationName}</span>
                <span>{signingRecord ? formatSignedAt(signingRecord.signedAt) : 'Unsigned'}</span>
              </div>
            </div>

            <label className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={certified}
                disabled={isPackageLocked || apiState !== 'idle'}
                onChange={(event) => {
                  setCertified(event.target.checked);
                  resetApiState();
                }}
                className="mt-0.5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-400"
              />
              <span>
                I certify that the selected expenses are accurate, eligible and supported by attached evidence.
              </span>
            </label>

            {signingRecord && (
              <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-3 text-[11px] space-y-1">
                <p className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
                  <Lock className="w-3.5 h-3.5" /> Package locked for institutional review
                </p>
                <p className="text-slate-700 dark:text-slate-200">
                  Signed by <strong>{signingRecord.signedBy}</strong> at {formatSignedAt(signingRecord.signedAt)}
                </p>
                <p className="font-mono text-[10px] text-slate-500">
                  {signingRecord.submissionId} · Validation {signingRecord.validationRef ?? '—'}
                </p>
              </div>
            )}
          </div>

          {isPackageLocked ? (
            <div className="p-5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Package is frozen
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Entries cannot be changed while the institutional review is in progress.
              </p>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <button
                type="button"
                onClick={handleValidate}
                disabled={!canValidate}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition bg-emerald-500 hover:bg-emerald-600 text-slate-950 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                {apiState === 'validating' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Validating with review service…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Run API Validation
                  </>
                )}
              </button>

              {validationResult && (
                <div
                  className={`p-3 rounded-lg border text-[11px] ${
                    validationResult.valid
                      ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300'
                      : 'border-rose-200 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300'
                  }`}
                >
                  <p className="flex items-center gap-1.5 font-semibold">
                    {validationResult.valid ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    {validationResult.valid ? 'Validation passed' : 'Validation failed'}
                  </p>
                  <p className="mt-1 font-mono text-[10px] opacity-80">
                    {validationResult.reference} · {formatSignedAt(validationResult.checkedAt)}
                  </p>
                  {validationResult.issues.length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc pl-4">
                      {validationResult.issues.map((issue) => (
                        <li key={issue}>{issue}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {apiError && (
                <p className="flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {apiError}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmitPackage}
                disabled={!canSubmit}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition bg-emerald-500 hover:bg-emerald-600 text-slate-950 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                {apiState === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing and submitting…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Sign & Submit Package
                  </>
                )}
              </button>

              {!validationResult?.valid && (
                <p className="text-[10px] text-slate-400 text-center">
                  Run validation successfully to unlock sign-off and submission.
                </p>
              )}

              {chosenTransactions.length > 0 && (
                <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-400">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  {chosenTransactions.length} entries will be locked after submission.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
