import React, { useState } from 'react';
import { 
  Banknote, 
  CheckCircle2, 
  UploadCloud, 
  ExternalLink, 
  Info, 
  ShieldCheck, 
  Building2,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const DisbursementReconciliation: React.FC = () => {
  const { tranches, reconcileDisbursement } = useApp();
  const [selectedTrancheModal, setSelectedTrancheModal] = useState<any | null>(null);

  // Form states
  const [paymentRef, setPaymentRef] = useState('');
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState<number>(100000);
  const [exchangeRate, setExchangeRate] = useState<number>(1.0);
  const [bankProofUrl, setBankProofUrl] = useState('https://sample-bank-docs.com/wire-proof-confirmed.pdf');
  const [reconciledSuccess, setReconciledSuccess] = useState(false);

  const eligibleTranches = tranches.filter(
    t => t.status === 'APPROVED_FOR_DISBURSEMENT' || t.status === 'PENDING_REVIEW' || t.status === 'DISBURSED_AND_RECONCILED'
  );

  const handleOpenModal = (tranche: any) => {
    setSelectedTrancheModal(tranche);
    setAmount(tranche.amount);
    setPaymentRef(`FEDWIRE-${Math.floor(10000000 + Math.random() * 90000000)}`);
  };

  const handleReconcileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTrancheModal) {
      reconcileDisbursement(
        selectedTrancheModal.id,
        paymentRef,
        transferDate,
        Number(amount),
        Number(exchangeRate),
        bankProofUrl
      );
      setSelectedTrancheModal(null);
      setReconciledSuccess(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          External Bank Wire Disbursement Reconciliation
        </h2>
        <p className="text-xs text-slate-500">
          Match and confirm off-platform commercial bank transfers, upload wire confirmation slips, and unlock downstream tranches.
        </p>
      </div>

      {/* Critical Off-Platform Notice */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 flex items-start gap-3 text-xs leading-relaxed">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold mb-0.5">Off-Platform Settlement Protocol</strong>
          GrantStack does not hold custodial funds or execute direct automated wire transfers. Payments are initiated outside the platform via your commercial banking partner (e.g. JPMorgan Chase, Silicon Valley Bank, SWIFT/Fedwire). Record the verified wire reference and confirmation memo here to update the grantee's audit ledger and unlock subsequent milestones.
        </div>
      </div>

      {reconciledSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Disbursement successfully reconciled. Tranche status marked DISBURSED_AND_RECONCILED. Grantee ledger updated with matching credit.</span>
        </div>
      )}

      {/* Tranches awaiting reconciliation */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tranche Settlement Pipeline
          </h3>
          <span className="text-xs text-slate-400">
            {eligibleTranches.length} Tranche Entries
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {eligibleTranches.map((t) => {
            const isReconciled = t.status === 'DISBURSED_AND_RECONCILED';

            return (
              <div key={t.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Tranche #{t.trancheNumber} — BioGenix Labs
                    </span>
                    <StatusBadge status={t.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">
                    {t.releaseConditions}
                  </p>
                  {isReconciled && t.paymentReference && (
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono pt-1">
                      Wire Ref: <strong>{t.paymentReference}</strong> • Disbursed {t.disbursedDate}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Tranche Value</span>
                    <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                      ${t.amount.toLocaleString()} USD
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
                        onClick={() => handleOpenModal(t)}
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

      {/* Reconciliation Modal */}
      {selectedTrancheModal && (
        <Modal
          isOpen={!!selectedTrancheModal}
          onClose={() => setSelectedTrancheModal(null)}
          title={`Reconcile Tranche #${selectedTrancheModal.trancheNumber} Wire`}
          description="Enter commercial bank settlement details and wire verification proof."
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
                onChange={(e) => setPaymentRef(e.target.value)}
                placeholder="e.g. WIRE-98214-FED"
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Settlement / Transfer Date
                </label>
                <input
                  type="date"
                  required
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
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
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Bank Confirmation Document (PDF Proof Link)
              </label>
              <input
                type="text"
                required
                value={bankProofUrl}
                onChange={(e) => setBankProofUrl(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedTrancheModal(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg"
              >
                Confirm Wire Reconciliation
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
