import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  CheckCircle2,
  FileCheck2,
  Info,
  Loader2,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { Tranche } from '../../types';

type ProofStatus = 'idle' | 'uploading' | 'ready' | 'error';

type UnlockNotice = {
  reconciledNumber: number;
  nextNumber: number | null;
  detail: string;
};

const MAX_PROOF_SIZE = 10 * 1024 * 1024;
const ACCEPTED_PROOF_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
const ACCEPTED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg'];

const formatFileSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const validateProofFile = (file: File) => {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

  if (!ACCEPTED_PROOF_TYPES.includes(file.type) || !ACCEPTED_EXTENSIONS.includes(extension)) {
    return 'Upload a bank confirmation as a PDF, PNG or JPG file.';
  }
  if (file.size === 0) {
    return 'This file is empty. Choose a valid bank confirmation.';
  }
  if (file.size > MAX_PROOF_SIZE) {
    return 'Bank proof must be 10 MB or smaller.';
  }

  return null;
};

const uploadProofFile = (file: File, onProgress: (progress: number) => void) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      for (const progress of [20, 45, 70, 90, 100]) {
        await new Promise<void>((done) => setTimeout(done, 110));
        onProgress(progress);
      }
      resolve(String(reader.result));
    };
    reader.onerror = () => reject(new Error('Unable to read the selected file.'));
    reader.readAsDataURL(file);
  });

const confirmReconciliation = () => new Promise<void>((resolve) => setTimeout(resolve, 900));

export const DisbursementReconciliation: React.FC = () => {
  const navigate = useNavigate();
  const { tranches, reconcileDisbursement, updateTrancheStatus } = useApp();

  const [selectedTrancheModal, setSelectedTrancheModal] = useState<Tranche | null>(null);
  const [paymentRef, setPaymentRef] = useState('');
  const [transferDate, setTransferDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState<number>(0);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | null>(null);
  const [proofStatus, setProofStatus] = useState<ProofStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [proofError, setProofError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [confirmationState, setConfirmationState] = useState<'idle' | 'confirming'>('idle');
  const [unlockNotice, setUnlockNotice] = useState<UnlockNotice | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadRunRef = useRef(0);

  const eligibleTranches = tranches.filter(
    (t) =>
      t.status === 'APPROVED_FOR_DISBURSEMENT' ||
      t.status === 'PENDING_REVIEW' ||
      t.status === 'DISBURSED_AND_RECONCILED'
  );

  const resetProofState = () => {
    uploadRunRef.current += 1;
    setProofFile(null);
    setProofPreviewUrl(null);
    setProofStatus('idle');
    setUploadProgress(0);
    setProofError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeModal = () => {
    if (confirmationState === 'confirming') return;
    setSelectedTrancheModal(null);
    setFormError(null);
    resetProofState();
  };

  const handleOpenModal = (tranche: Tranche) => {
    setSelectedTrancheModal(tranche);
    setAmount(tranche.amount);
    setPaymentRef(`FEDWIRE-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setFormError(null);
    setUnlockNotice(null);
    resetProofState();
  };

  const processProofFile = async (file: File) => {
    const validationError = validateProofFile(file);
    resetProofState();

    if (validationError) {
      setProofError(validationError);
      setProofStatus('error');
      return;
    }

    const run = ++uploadRunRef.current;
    setProofFile(file);
    setProofStatus('uploading');
    setUploadProgress(0);
    setProofError(null);

    try {
      const previewUrl = await uploadProofFile(file, (progress) => {
        if (uploadRunRef.current === run) setUploadProgress(progress);
      });

      if (uploadRunRef.current !== run) return;
      setProofPreviewUrl(previewUrl);
      setProofStatus('ready');
    } catch {
      if (uploadRunRef.current !== run) return;
      setProofFile(null);
      setProofStatus('error');
      setProofError('The proof could not be uploaded. Try again.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void processProofFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void processProofFile(file);
  };

  const handleReconcileSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const tranche = selectedTrancheModal;

    if (!tranche) return;
    if (!paymentRef.trim()) {
      setFormError('Enter the bank wire reference before confirming.');
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError('Enter a disbursed amount greater than zero.');
      return;
    }
    if (proofStatus !== 'ready' || !proofPreviewUrl) {
      setProofError('Upload a valid bank confirmation before confirming.');
      setProofStatus('error');
      return;
    }

    setFormError(null);
    setConfirmationState('confirming');

    try {
      await confirmReconciliation();

      reconcileDisbursement(tranche.id, paymentRef.trim(), transferDate, amount, 1, proofPreviewUrl);

      const nextTranche = tranches.find(
        (item) => item.grantId === tranche.grantId && item.trancheNumber === tranche.trancheNumber + 1
      );

      if (nextTranche) {
        if (nextTranche.status === 'DRAFT') {
          updateTrancheStatus(
            nextTranche.id,
            'ACTIVE',
            `Unlocked after tranche ${tranche.trancheNumber} was reconciled.`
          );
        }
        setUnlockNotice({
          reconciledNumber: tranche.trancheNumber,
          nextNumber: nextTranche.trancheNumber,
          detail:
            nextTranche.status === 'DRAFT'
              ? 'Status changed from DRAFT to ACTIVE. The grantee can now prepare a claim.'
              : 'The tranche is active and ready for the next claim submission.',
        });
      } else {
        setUnlockNotice({
          reconciledNumber: tranche.trancheNumber,
          nextNumber: null,
          detail: 'This is the final tranche in the grant. No downstream tranche needs unlocking.',
        });
      }

      setSelectedTrancheModal(null);
      resetProofState();
    } catch {
      setFormError('Reconciliation could not be confirmed. Try again.');
    } finally {
      setConfirmationState('idle');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          External Bank Wire Disbursement Reconciliation
        </h2>
        <p className="text-xs text-slate-500">
          Match and confirm off-platform commercial bank transfers, upload wire confirmation slips, and unlock downstream
          tranches.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold mb-0.5">Off-Platform Settlement Protocol</strong>
          GrantStack does not hold custodial funds or execute direct automated wire transfers. Payments are initiated
          outside the platform via your commercial banking partner. Record the verified wire reference and attach the
          confirmation memo here to update the grantee's audit ledger and unlock subsequent tranches.
        </div>
      </div>

      {unlockNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold">Reconciliation confirmed by settlement service</p>
              <p className="mt-0.5 text-emerald-700 dark:text-emerald-200">
                Tranche #{unlockNotice.reconciledNumber} is marked DISBURSED_AND_RECONCILED.{' '}
                {unlockNotice.nextNumber
                  ? `Tranche #${unlockNotice.nextNumber} is unlocked for submission.`
                  : 'All tranches in this grant are now settled.'}{' '}
                {unlockNotice.detail}
              </p>
            </div>
          </div>
          {unlockNotice.nextNumber && (
            <button
              type="button"
              onClick={() => navigate('/startup/tranches')}
              className="shrink-0 inline-flex items-center gap-2 self-start rounded-lg border border-emerald-300 dark:border-emerald-700 px-3 py-2 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition"
            >
              View tranche <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tranche Settlement Pipeline</h3>
          <span className="text-xs text-slate-400">{eligibleTranches.length} Tranche Entries</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {eligibleTranches.map((tranche) => {
            const isReconciled = tranche.status === 'DISBURSED_AND_RECONCILED';

            return (
              <div
                key={tranche.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Tranche #{tranche.trancheNumber} — BioGenix Labs
                    </span>
                    <StatusBadge status={tranche.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">{tranche.releaseConditions}</p>
                  {isReconciled && tranche.paymentReference && (
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono pt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>
                        Wire Ref: <strong>{tranche.paymentReference}</strong> • Disbursed {tranche.disbursedDate}
                      </span>
                      {tranche.bankProofUrl && (
                        <a
                          href={tranche.bankProofUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 underline underline-offset-2"
                        >
                          <FileCheck2 className="w-3 h-3" /> View bank proof
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Tranche Value</span>
                    <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                      ${tranche.amount.toLocaleString()} USD
                    </span>
                  </div>

                  <div>
                    {isReconciled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Reconciled</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenModal(tranche)}
                        className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
                      >
                        <Banknote className="w-4 h-4" />
                        <span>Record Bank Wire Proof</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTrancheModal && (
        <Modal
          isOpen
          onClose={closeModal}
          title={`Reconcile Tranche #${selectedTrancheModal.trancheNumber} Wire`}
          description="Enter settlement details and attach the bank confirmation document."
          maxWidth="2xl"
        >
          <form onSubmit={handleReconcileSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Bank Wire / SWIFT / Fedwire Reference Number
              </label>
              <input
                type="text"
                required
                value={paymentRef}
                onChange={(event) => setPaymentRef(event.target.value)}
                placeholder="e.g. WIRE-98214-FED"
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Settlement / Transfer Date
                </label>
                <input
                  type="date"
                  required
                  value={transferDate}
                  onChange={(event) => setTransferDate(event.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Disbursed Amount ($ USD)
                </label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <label className="block text-slate-700 dark:text-slate-300 font-medium">
                  Bank Confirmation Document
                </label>
                <span className="text-[10px] text-slate-400">PDF, PNG or JPG · max 10 MB</span>
              </div>

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`rounded-xl border-2 border-dashed transition ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                    : proofStatus === 'error'
                      ? 'border-rose-300 bg-rose-50/60 dark:bg-rose-950/20'
                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={confirmationState === 'confirming'}
                  className="w-full px-4 py-6 flex flex-col items-center text-center gap-2 disabled:opacity-60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                    <UploadCloud className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                    {proofFile ? 'Choose a different document' : 'Drop bank proof here or click to upload'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    The confirmation memo is attached to the tranche audit record.
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {proofStatus === 'uploading' && (
                <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading {proofFile?.name}
                    </span>
                    <span className="font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {proofStatus === 'error' && proofError && (
                <p className="mt-2 flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {proofError}
                </p>
              )}

              {proofStatus === 'ready' && proofPreviewUrl && proofFile && (
                <div className="mt-3 rounded-lg border border-emerald-200 dark:border-emerald-800 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/30">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                          {proofFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {formatFileSize(proofFile.size)} · Uploaded and ready to attach
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={resetProofState}
                      className="shrink-0 p-1.5 rounded-md text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition"
                      aria-label="Remove bank proof"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="h-40 bg-slate-100 dark:bg-slate-800 border-t border-emerald-200 dark:border-emerald-800">
                    {proofFile.type === 'application/pdf' ? (
                      <object data={proofPreviewUrl} type="application/pdf" className="h-full w-full">
                        <a href={proofPreviewUrl} target="_blank" rel="noreferrer" className="p-4 block text-emerald-700">
                          Open PDF preview
                        </a>
                      </object>
                    ) : (
                      <img
                        src={proofPreviewUrl}
                        alt="Bank confirmation preview"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <a
                    href={proofPreviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block border-t border-emerald-200 dark:border-emerald-800 px-3 py-2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  >
                    Open full preview
                  </a>
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3 text-[11px] text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              Confirming attaches this document to the audit record, credits the grantee ledger and evaluates the next
              tranche for release.
            </div>

            {formError && (
              <p className="flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                {formError}
              </p>
            )}

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={closeModal}
                disabled={confirmationState === 'confirming'}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={proofStatus !== 'ready' || confirmationState === 'confirming'}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {confirmationState === 'confirming' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Confirming reconciliation…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Confirm Wire Reconciliation
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
