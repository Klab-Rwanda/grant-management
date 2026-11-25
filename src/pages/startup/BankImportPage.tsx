import React, { useState } from 'react';
import { 
  Building2, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  RefreshCw,
  Search,
  Filter,
  Check
} from 'lucide-react';

export const BankImportPage: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('1010');
  const [isMatching, setIsMatching] = useState(false);

  // Bank feeds matching X-03
  const bankStatements = [
    {
      id: 'stmt-1',
      date: '28 Oct 2026',
      description: 'HIGHWAY SENSOR WIRE TRF',
      ref: 'WIRE-99412',
      withdrawal: 4120.00,
      deposit: 0,
      matchedEntry: 'JE-0318',
      matchStatus: 'MATCHED',
      ledgerAccount: '1500 Equipment'
    },
    {
      id: 'stmt-2',
      date: '24 Oct 2026',
      description: 'AWS CLOUD EMEA MONTHLY',
      ref: 'POS-88124',
      withdrawal: 412.18,
      deposit: 0,
      matchedEntry: 'JE-0310',
      matchStatus: 'MATCHED',
      ledgerAccount: '6100 Cloud Infrastructure'
    },
    {
      id: 'stmt-3',
      date: '15 Oct 2026',
      description: 'STRIPE PAYOUT SUBSCRIPTION',
      ref: 'ACH-77129',
      withdrawal: 0,
      deposit: 2950.00,
      matchedEntry: 'JE-0299',
      matchStatus: 'MATCHED',
      ledgerAccount: '4100 Subscription revenue'
    },
    {
      id: 'stmt-4',
      date: '30 Oct 2026',
      description: 'LOCAL TECH FIELD TABLETS',
      ref: 'DEBIT-6612',
      withdrawal: 1720.00,
      deposit: 0,
      matchedEntry: null,
      matchStatus: 'UNMATCHED',
      ledgerAccount: '1500 Equipment'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching X-03 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Bank statement import & reconciliation
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · Import OFX/CSV statements and match external bank debits against general ledger journal entries
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsMatching(true);
              setTimeout(() => setIsMatching(false), 800);
            }}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#5A6275] ${isMatching ? 'animate-spin' : ''}`} />
            <span>Auto-match entries</span>
          </button>
          <button
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload OFX / CSV</span>
          </button>
        </div>
      </div>

      {/* Account Balances Comparison Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
          <span className="text-[11px] text-[#5A6275] uppercase tracking-wider block">Statement Ending Balance</span>
          <div className="text-2xl font-mono font-medium text-[#16213A] mt-1">
            $86,420.55
          </div>
          <span className="text-[11px] text-[#5A6275]">As of 31 Oct 2026 (KCB Operating)</span>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
          <span className="text-[11px] text-[#5A6275] uppercase tracking-wider block">General Ledger Account 1010</span>
          <div className="text-2xl font-mono font-medium text-[#16213A] mt-1">
            $86,420.55
          </div>
          <span className="text-[11px] text-[#0E6466] flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3 h-3" /> Exact match ($0.00 variance)
          </span>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
          <span className="text-[11px] text-[#5A6275] uppercase tracking-wider block">Unreconciled Items</span>
          <div className="text-2xl font-mono font-medium text-[#D97706] mt-1">
            1 item
          </div>
          <span className="text-[11px] text-[#5A6275]">$1,720.00 requires voucher link</span>
        </div>
      </div>

      {/* Statements Table */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F1EEE7] border-b border-[#DDD8CC] flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#16213A] uppercase tracking-wider">
            Statement Line Items & Ledger Linkage
          </h2>
          <span className="text-xs text-[#5A6275]">4 imported transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">Bank Date</th>
                <th className="py-2.5 px-4 text-left font-medium">Bank Reference / Memo</th>
                <th className="py-2.5 px-4 text-right font-medium">Withdrawal</th>
                <th className="py-2.5 px-4 text-right font-medium">Deposit</th>
                <th className="py-2.5 px-4 text-left font-medium">Matched Journal Voucher</th>
                <th className="py-2.5 px-4 text-left font-medium">Reconciliation Status</th>
                <th className="py-2.5 px-4 text-right font-medium pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-mono">
              {bankStatements.map((stmt) => (
                <tr key={stmt.id} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-sans text-[#5A6275]">{stmt.date}</td>
                  <td className="py-3 px-4 font-sans">
                    <div className="font-medium text-[#16213A]">{stmt.description}</div>
                    <div className="text-[10px] text-[#5A6275] font-mono">{stmt.ref}</div>
                  </td>
                  <td className="py-3 px-4 text-right text-[#C0392B]">
                    {stmt.withdrawal > 0 ? `$${stmt.withdrawal.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right text-[#0E6466]">
                    {stmt.deposit > 0 ? `$${stmt.deposit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    {stmt.matchedEntry ? (
                      <span className="font-mono text-[#0E6466] font-medium bg-[#E8F3F1] px-1.5 py-0.5 rounded border border-[#0E6466]/20">
                        {stmt.matchedEntry}
                      </span>
                    ) : (
                      <span className="text-[#5A6275] italic">No voucher</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    {stmt.matchStatus === 'MATCHED' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#0E6466] font-medium">
                        <Check className="w-3.5 h-3.5" /> Reconciled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#D97706] font-medium bg-[#FEF3C7] px-1.5 py-0.5 rounded border border-[#F59E0B]/30">
                        <AlertTriangle className="w-3 h-3" /> Unmatched
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    {stmt.matchStatus === 'UNMATCHED' ? (
                      <button className="px-2.5 py-1 bg-[#16213A] text-white rounded text-[11px] hover:bg-[#223150] transition">
                        Match →
                      </button>
                    ) : (
                      <button className="text-[11px] text-[#5A6275] hover:text-[#16213A] underline">
                        Unlink
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
