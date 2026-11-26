import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Loader2,
  ReceiptText,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';

type ApiState = 'idle' | 'validating' | 'posting';

interface ValidationResult {
  valid: boolean;
  issues: string[];
  reference: string;
  checkedAt: string;
}

interface PostReceipt {
  transactionId: string;
  postedAt: string;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const formatTimestamp = (value: string) => value.replace('T', ' · ').replace(/\.\d{3}Z$/, ' UTC');

const validateExpenseWithApi = async (payload: {
  description: string;
  amount: number;
  category: string;
  evidenceId: string;
  trancheId: string;
  localIssues: string[];
}): Promise<ValidationResult> => {
  await wait(650);

  const issues = [...payload.localIssues];
  if (payload.description.trim().length < 3) issues.push('A clear expense description is required.');
  if (payload.amount <= 0) issues.push('The expense amount must be greater than zero.');
  if (!payload.evidenceId) issues.push('Select a verified receipt for this expense.');
  if (!payload.trancheId) issues.push('Select the grant tranche this expense belongs to.');

  return {
    valid: issues.length === 0,
    issues,
    reference: `LEDGER-VAL-${Date.now().toString().slice(-6)}`,
    checkedAt: new Date().toISOString(),
  };
};

const postExpenseWithApi = async (validationRef: string): Promise<PostReceipt> => {
  if (!validationRef) throw new Error('Validate the expense before posting.');

  await wait(850);

  return {
    transactionId: `tx-${Date.now()}`,
    postedAt: new Date().toISOString(),
  };
};

export const JournalEntriesPage: React.FC = () => {
  const { addTransaction, transactions, documents, budgetCategories, activeGrant, tranches } = useApp();

  const activeTranches = tranches.filter(
    (tranche) => tranche.grantId === activeGrant.id && (tranche.status === 'ACTIVE' || tranche.status === 'DRAFT')
  );

  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [reference, setReference] = useState('INV-2026-0441');
  const [description, setDescription] = useState('Soil probes batch #4 — supplier invoice');
  const [merchant, setMerchant] = useState('Highland Agri Supply');
  const [amount, setAmount] = useState<number>(0);
  const [account, setAccount] = useState('1500 Equipment');
  const [category, setCategory] = useState(budgetCategories[0]?.name ?? 'R&D Equipment');
  const [trancheId, setTrancheId] = useState(activeTranches[0]?.id ?? '');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState('');
  const [apiState, setApiState] = useState<ApiState>('idle');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [postReceipt, setPostReceipt] = useState<PostReceipt | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const isPosted = Boolean(postReceipt);
  const selectedEvidence = documents.find((document) => document.id === selectedEvidenceId);
  const selectedBudget = budgetCategories.find((item) => item.name === category);
  const budgetRemaining = selectedBudget ? selectedBudget.allocated - selectedBudget.actualSpent : 0;
  const isEligibleCategory = activeGrant.eligibleCategories.includes(category);
  const selectedTranche = tranches.find((tranche) => tranche.id === trancheId);

  const resetApiState = () => {
    setValidationResult(null);
    setPostReceipt(null);
    setApiError(null);
    setApiState('idle');
  };

  const handleNewEntry = () => {
    resetApiState();
    setEntryDate(new Date().toISOString().split('T')[0]);
    setReference(`INV-${Date.now().toString().slice(-6)}`);
    setDescription('');
    setMerchant('');
    setAmount(0);
    setSelectedEvidenceId('');
  };

  const handleSelectEvidence = (id: string) => {
    const evidence = documents.find((document) => document.id === id);
    if (!evidence || evidence.verificationStatus !== 'VERIFIED') return;

    setSelectedEvidenceId(id);
    setAmount(evidence.amount);
    setCategory(evidence.category);
    setMerchant(evidence.merchantName);
    resetApiState();
  };

  const localIssues = [
    ...(!entryDate ? ['Select an entry date.'] : []),
    ...(!reference.trim() ? ['Enter an invoice or reference number.'] : []),
    ...(description.trim().length < 3 ? ['Enter a clear expense description.'] : []),
    ...(!(amount > 0) ? ['Enter an amount greater than zero.'] : []),
    ...(!isEligibleCategory ? [`${category} is not eligible under ${activeGrant.programName}.`] : []),
    ...(!selectedEvidence ? ['Choose a verified receipt from the evidence vault.'] : []),
    ...(selectedEvidence && Math.abs(selectedEvidence.amount - amount) > 0.01
      ? [`Evidence amount $${selectedEvidence.amount.toLocaleString()} does not match the expense amount.`]
      : []),
    ...(!trancheId ? ['Tag this expense to an active grant tranche.'] : []),
    ...(selectedBudget && amount > budgetRemaining
      ? [`Only $${budgetRemaining.toLocaleString()} remains in the ${category} budget.`]
      : []),
  ];

  const canValidate = localIssues.length === 0 && apiState === 'idle' && !isPosted;
  const canPost = Boolean(validationResult?.valid) && apiState === 'idle' && !isPosted;

  const handleValidate = async () => {
    if (!canValidate) return;

    setApiState('validating');
    setValidationResult(null);
    setApiError(null);

    try {
      const result = await validateExpenseWithApi({
        description,
        amount,
        category,
        evidenceId: selectedEvidenceId,
        trancheId,
        localIssues,
      });
      setValidationResult(result);
    } catch {
      setApiError('Ledger validation service is unavailable. Try again.');
    } finally {
      setApiState('idle');
    }
  };

  const handlePost = async () => {
    if (!canPost || !validationResult) return;

    setApiState('posting');
    setApiError(null);

    try {
      const receipt = await postExpenseWithApi(validationResult.reference);
      addTransaction({
        date: entryDate,
        description: description.trim(),
        category,
        account,
        debit: amount,
        credit: 0,
        grantId: activeGrant.id,
        trancheId,
        receiptId: selectedEvidenceId || undefined,
        merchantName: merchant.trim() || selectedEvidence?.merchantName,
        submissionStatus: 'UNSUBMITTED',
      });
      setPostReceipt(receipt);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'The expense could not be posted.');
    } finally {
      setApiState('idle');
    }
  };

  const readinessChecks = [
    { label: 'Expense details complete', ok: Boolean(entryDate && reference.trim() && description.trim()), detail: 'Date, reference and description' },
    { label: 'Amount entered', ok: amount > 0, detail: amount > 0 ? `$${amount.toLocaleString()} USD` : 'Awaiting amount' },
    { label: 'Category eligible', ok: isEligibleCategory, detail: category },
    { label: 'Verified evidence selected', ok: Boolean(selectedEvidence?.verificationStatus === 'VERIFIED'), detail: selectedEvidence?.fileName ?? 'No receipt selected' },
    { label: 'Tranche tagged', ok: Boolean(trancheId), detail: selectedTranche ? `Tranche #${selectedTranche.trancheNumber}` : 'No tranche selected' },
    { label: 'Budget available', ok: amount <= budgetRemaining, detail: `$${budgetRemaining.toLocaleString()} remaining` },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">New expense entry</h1>
          <p className="text-xs text-[#5A6275] font-mono mt-1">
            {postReceipt ? postReceipt.transactionId : 'Draft, not posted'} · {activeGrant.programName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isPosted ? (
            <button
              type="button"
              onClick={handleNewEntry}
              className="px-4 py-2 text-xs font-medium rounded-md bg-[#0E6466] hover:bg-[#0A4F51] text-white transition"
            >
              Create another entry
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNewEntry}
              className="px-3.5 py-2 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
            >
              Reset form
            </button>
          )}
          <Link
            to="/startup/accounting-ledger"
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger inline-flex items-center gap-1.5"
          >
            Open full ledger <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {postReceipt && (
        <div className="p-4 rounded-lg bg-[#E4F1E8] border border-[#C8E4D1] text-[#1D5E3A] text-xs flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Expense posted to the general ledger</p>
            <p className="text-[11px] mt-0.5 font-mono">
              {postReceipt.transactionId} · {formatTimestamp(postReceipt.postedAt)} · Validation {validationResult?.reference}
            </p>
            <p className="text-[11px] mt-0.5">Budget actuals and the grant tranche allocation have been updated.</p>
          </div>
        </div>
      )}

      {localIssues.length > 0 && !isPosted && (
        <div className="p-4 rounded-lg bg-[#FBF0D9] border border-[#F4DCAC] text-[#7A4A00] text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block">This draft is not ready to validate</strong>
            <span className="text-[11px]">{localIssues[0]}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-5">
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger text-xs">
            <h2 className="text-sm font-semibold text-[#16213A] mb-4">Expense details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Entry date</label>
                <input
                  type="date"
                  disabled={isPosted}
                  value={entryDate}
                  onChange={(event) => {
                    setEntryDate(event.target.value);
                    resetApiState();
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Invoice / reference</label>
                <input
                  type="text"
                  disabled={isPosted}
                  value={reference}
                  onChange={(event) => {
                    setReference(event.target.value);
                    resetApiState();
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#16213A] font-medium mb-1">Description</label>
                <input
                  type="text"
                  disabled={isPosted}
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    resetApiState();
                  }}
                  placeholder="What was purchased and why"
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Merchant</label>
                <input
                  type="text"
                  disabled={isPosted}
                  value={merchant}
                  onChange={(event) => {
                    setMerchant(event.target.value);
                    resetApiState();
                  }}
                  placeholder="Supplier name"
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Amount (USD)</label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  disabled={isPosted}
                  value={amount || ''}
                  onChange={(event) => {
                    setAmount(Number(event.target.value));
                    resetApiState();
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Expense account</label>
                <select
                  disabled={isPosted}
                  value={account}
                  onChange={(event) => {
                    setAccount(event.target.value);
                    resetApiState();
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                >
                  <option>1500 Equipment</option>
                  <option>6010 R&D Personnel</option>
                  <option>6100 Cloud Infrastructure</option>
                  <option>6200 Clinical Testing</option>
                  <option>6300 Legal & Patent</option>
                </select>
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Budget category</label>
                <select
                  disabled={isPosted}
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setSelectedEvidenceId('');
                    resetApiState();
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                >
                  {budgetCategories.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#16213A] font-medium mb-1">Grant tranche tag</label>
                <select
                  disabled={isPosted}
                  value={trancheId}
                  onChange={(event) => {
                    setTrancheId(event.target.value);
                    resetApiState();
                  }}
                  className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466] disabled:bg-[#F1EEE7]"
                >
                  <option value="">Select an active tranche</option>
                  {activeTranches.map((tranche) => (
                    <option key={tranche.id} value={tranche.id}>
                      Tranche {tranche.trancheNumber} · ${tranche.amount.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
            <div className="p-4 border-b border-[#DDD8CC] flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-[#16213A]">Evidence selection</h2>
                <p className="text-[11px] text-[#5A6275] mt-0.5">Choose one verified receipt from the evidence vault.</p>
              </div>
              <Link to="/startup/evidence" className="text-[#0E6466] hover:underline inline-flex items-center gap-1 shrink-0">
                Upload new <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {selectedEvidence && (
              <div className="p-4 border-b border-[#DDD8CC] bg-[#FAF9F5] flex gap-3">
                <img
                  src={selectedEvidence.previewUrl}
                  alt="Selected evidence preview"
                  className="h-20 w-28 object-cover rounded-md border border-[#DDD8CC]"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-[#16213A] truncate">{selectedEvidence.fileName}</p>
                  <p className="text-[11px] text-[#5A6275] mt-0.5">
                    {selectedEvidence.merchantName} · {selectedEvidence.category}
                  </p>
                  <p className="font-mono text-sm text-[#0E6466] mt-1">${selectedEvidence.amount.toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="divide-y divide-[#ECEAE4] max-h-72 overflow-y-auto">
              {documents.map((document) => {
                const selected = document.id === selectedEvidenceId;
                const disabled = isPosted || document.verificationStatus !== 'VERIFIED';

                return (
                  <button
                    key={document.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelectEvidence(document.id)}
                    className={`w-full p-3 text-left flex items-center gap-3 transition ${
                      selected ? 'bg-[#E5EEF9]' : 'hover:bg-[#FAF9F5]'
                    } ${disabled ? 'opacity-55 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="radio"
                      checked={selected}
                      readOnly
                      className="text-[#0E6466] focus:ring-[#0E6466]"
                    />
                    <FileCheck2 className="w-4 h-4 text-[#0E6466] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-[#16213A]">{document.fileName}</p>
                      <p className="text-[10px] text-[#5A6275]">
                        {document.merchantName} · {document.category}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-[#16213A]">${document.amount.toLocaleString()}</p>
                      <StatusBadge status={document.verificationStatus} size="sm" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
            <div className="p-4 border-b border-[#DDD8CC]">
              <h2 className="text-sm font-semibold text-[#16213A]">Double-entry preview</h2>
              <p className="text-[11px] text-[#5A6275] mt-0.5">Generated from the expense above. Both sides remain balanced.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-3">Account</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right font-mono">Debit</th>
                    <th className="py-2.5 px-3 text-right font-mono">Credit</th>
                    <th className="py-2.5 px-3">Grant tag</th>
                    <th className="py-2.5 px-3">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]">
                  <tr>
                    <td className="py-2.5 px-3 font-mono">{account}</td>
                    <td className="py-2.5 px-3">{description || 'Expense line'}</td>
                    <td className="py-2.5 px-3 text-right font-mono">{amount > 0 ? amount.toFixed(2) : '0.00'}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#8C8573]">0.00</td>
                    <td className="py-2.5 px-3 font-mono text-[10px]">
                      {selectedTranche ? `T${selectedTranche.trancheNumber} · ${category}` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-[10px] text-[#1D5E3A]">
                      {selectedEvidence ? selectedEvidence.fileName : '—'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono">1010 Operating bank account</td>
                    <td className="py-2.5 px-3">Payment to {merchant || 'supplier'}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#8C8573]">0.00</td>
                    <td className="py-2.5 px-3 text-right font-mono">{amount > 0 ? amount.toFixed(2) : '0.00'}</td>
                    <td className="py-2.5 px-3">—</td>
                    <td className="py-2.5 px-3">—</td>
                  </tr>
                  <tr className="bg-[#FAF9F5] font-bold">
                    <td className="py-3 px-3" colSpan={2}>Totals</td>
                    <td className="py-3 px-3 text-right font-mono">{amount > 0 ? amount.toFixed(2) : '0.00'}</td>
                    <td className="py-3 px-3 text-right font-mono">{amount > 0 ? amount.toFixed(2) : '0.00'}</td>
                    <td className="py-3 px-3 text-[#1D5E3A]" colSpan={2}>Balanced</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
            <div className="p-4 border-b border-[#DDD8CC]">
              <h2 className="text-sm font-semibold text-[#16213A]">Recently posted entries</h2>
            </div>
            <div className="divide-y divide-[#ECEAE4]">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="p-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#16213A]">{transaction.description}</p>
                    <p className="text-[10px] text-[#5A6275] font-mono">
                      {transaction.date} · {transaction.category}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-[#16213A]">
                      ${(transaction.debit || transaction.credit).toLocaleString()}
                    </p>
                    {transaction.submissionStatus && (
                      <StatusBadge status={transaction.submissionStatus} size="sm" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger text-xs space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[#16213A]">Posting readiness</h2>
              <span className="text-[10px] font-mono text-[#5A6275]">LEDGER SERVICE</span>
            </div>

            <div className="space-y-2.5">
              {readinessChecks.map((check) => (
                <div key={check.label} className="flex items-start gap-2">
                  {check.ok ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1D5E3A] shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-[#9B1C1C] shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-[#16213A]">{check.label}</p>
                    <p className="text-[10px] text-[#5A6275] truncate">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {apiError && (
              <p className="flex items-start gap-1.5 text-[11px] text-[#9B1C1C]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {apiError}
              </p>
            )}

            {validationResult && (
              <div
                className={`p-3 rounded-md border text-[11px] ${
                  validationResult.valid
                    ? 'bg-[#E4F1E8] border-[#C8E4D1] text-[#1D5E3A]'
                    : 'bg-[#FBE6E4] border-[#F7C6C2] text-[#9B1C1C]'
                }`}
              >
                <p className="flex items-center gap-1.5 font-semibold">
                  {validationResult.valid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {validationResult.valid ? 'Validation passed' : 'Validation failed'}
                </p>
                <p className="font-mono text-[10px] mt-1 opacity-80">
                  {validationResult.reference} · {formatTimestamp(validationResult.checkedAt)}
                </p>
                {validationResult.issues.length > 0 && (
                  <ul className="mt-1.5 list-disc pl-4 space-y-0.5">
                    {validationResult.issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!isPosted && (
              <div className="space-y-2 pt-3 border-t border-[#DDD8CC]">
                <button
                  type="button"
                  onClick={handleValidate}
                  disabled={!canValidate}
                  className="w-full py-2.5 px-4 rounded-md text-xs font-medium flex items-center justify-center gap-2 bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] disabled:bg-[#F1EEE7] disabled:text-[#8C8573] disabled:cursor-not-allowed"
                >
                  {apiState === 'validating' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Validating…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Validate expense
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePost}
                  disabled={!canPost}
                  className="w-full py-2.5 px-4 rounded-md text-xs font-medium flex items-center justify-center gap-2 bg-[#0E6466] hover:bg-[#0A4F51] text-white disabled:bg-[#DDD8CC] disabled:text-[#5A6275] disabled:cursor-not-allowed"
                >
                  {apiState === 'posting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Posting to ledger…
                    </>
                  ) : (
                    <>
                      <ReceiptText className="w-4 h-4" /> Post expense
                    </>
                  )}
                </button>
                {!validationResult?.valid && (
                  <p className="text-[10px] text-[#5A6275] text-center">
                    Pass validation to enable posting.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#FAF9F5] border border-[#DDD8CC] rounded-lg p-5 text-xs space-y-2">
            <h2 className="text-sm font-semibold text-[#16213A]">Budget impact</h2>
            <div className="flex justify-between text-[#5A6275]">
              <span>Allocated</span>
              <span className="font-mono">${(selectedBudget?.allocated ?? 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#5A6275]">
              <span>Already spent</span>
              <span className="font-mono">${(selectedBudget?.actualSpent ?? 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-[#16213A] border-t border-[#DDD8CC] pt-2">
              <span>After this entry</span>
              <span className={`font-mono ${budgetRemaining - amount < 0 ? 'text-[#9B1C1C]' : 'text-[#1D5E3A]'}`}>
                ${(budgetRemaining - amount).toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-[#5A6275] leading-relaxed pt-1">
              Posting updates budget actuals immediately and attaches the selected evidence to the ledger line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
