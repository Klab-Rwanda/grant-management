import React, { useState } from 'react';
import { 
  Download, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LedgerRow {
  date: string;
  entry: string;
  desc: string;
  debit?: string;
  credit?: string;
  balance: string;
  grantAlloc?: string;
  evidence?: string;
  isMissingEvidence?: boolean;
  isReconciledTag?: boolean;
}

export const GeneralLedgerPage: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState('1500 Equipment');
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-10-31');
  const [grantTagFilter, setGrantTagFilter] = useState('Any');

  const rows: LedgerRow[] = [
    { date: '01 Jan', entry: '', desc: 'Opening balance', balance: '12,000.00' },
    { date: '14 Mar', entry: 'JE-0094', desc: 'Weather stations ×3', debit: '8,400.00', balance: '20,400.00', grantAlloc: 'T1 · reconciled', evidence: '2 files', isReconciledTag: true },
    { date: '02 May', entry: 'JE-0151', desc: 'Laptops ×2', debit: '2,600.00', balance: '23,000.00', grantAlloc: 'Not tagged', evidence: '1 file' },
    { date: '19 Aug', entry: 'JE-0233', desc: 'Field sensor kits ×12', debit: '6,240.00', balance: '29,240.00', grantAlloc: 'T2 · Equipment', evidence: '2 files' },
    { date: '11 Sep', entry: 'JE-0270', desc: 'Gateway routers ×4', debit: '3,520.00', balance: '32,760.00', grantAlloc: 'T2 · Equipment', evidence: 'Missing', isMissingEvidence: true },
    { date: '28 Oct', entry: 'JE-0318', desc: 'Soil probes batch #4', debit: '4,120.00', balance: '36,880.00', grantAlloc: 'T2 · Equipment', evidence: '1 file' },
    { date: '30 Oct', entry: 'JE-0321', desc: 'Field tablets ×2', debit: '1,720.00', balance: '38,600.00', grantAlloc: 'Not tagged', evidence: 'Missing', isMissingEvidence: true },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions (Matching A-04) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            General ledger · 1500 Equipment
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            1 Jan – 31 Oct 2026 · Asset · Normal balance: debit
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert('Exporting General Ledger CSV...')}
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
          >
            Export CSV
          </button>
          <Link
            to="/startup/journal"
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-[#0E6466] hover:bg-[#0A4F51] text-white transition shadow-sm"
          >
            New journal entry
          </Link>
        </div>
      </div>

      {/* Account, Date & Tag Filters (Matching A-04) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-[#16213A] font-medium mb-1">Account</label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          >
            <option>1500 Equipment</option>
            <option>1010 Operating bank account</option>
            <option>6010 R&D Personnel</option>
            <option>6100 Cloud Infrastructure</option>
          </select>
        </div>

        <div>
          <label className="block text-[#16213A] font-medium mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div>
          <label className="block text-[#16213A] font-medium mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div>
          <label className="block text-[#16213A] font-medium mb-1">Grant tag</label>
          <select
            value={grantTagFilter}
            onChange={(e) => setGrantTagFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          >
            <option value="Any">Any</option>
            <option value="T1">Tranche 1</option>
            <option value="T2">Tranche 2</option>
            <option value="Not tagged">Not tagged</option>
          </select>
        </div>
      </div>

      {/* 4 Balances Row (Matching A-04) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Opening balance</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">12,000.00</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Debits</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">26,600.00</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Credits</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">0.00</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Closing balance</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block font-bold">38,600.00</span>
        </div>
      </div>

      {/* Ledger Table (Matching A-04) */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                <th className="py-2.5 px-3 font-mono">Date</th>
                <th className="py-2.5 px-3 font-mono">Entry</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-right font-mono">Debit</th>
                <th className="py-2.5 px-3 text-right font-mono">Credit</th>
                <th className="py-2.5 px-3 text-right font-mono">Balance</th>
                <th className="py-2.5 px-3 font-mono">Grant allocation</th>
                <th className="py-2.5 px-3 text-center">Evidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
              {rows.map((r, idx) => {
                const isHighlight = r.date === '28 Oct';
                return (
                  <tr 
                    key={idx} 
                    className={`hover:bg-[#FAF9F5] transition ${
                      isHighlight ? 'bg-[#E4F1E8]/20' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono text-[#5A6275]">{r.date}</td>
                    <td className="py-2.5 px-3 font-mono text-[#5A6275]">
                      {r.entry ? (
                        <Link to="/startup/journal" className="hover:underline text-[#0E6466]">
                          {r.entry}
                        </Link>
                      ) : '—'}
                    </td>
                    <td className="py-2.5 px-3 font-medium">{r.desc}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">{r.debit || ''}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">{r.credit || ''}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">{r.balance}</td>
                    <td className="py-2.5 px-3">
                      {r.isReconciledTag ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4] text-[#4A5266]">
                          <Lock className="w-3 h-3" />
                          <span>{r.grantAlloc}</span>
                        </span>
                      ) : r.grantAlloc === 'Not tagged' ? (
                        <span className="text-[#5A6275] text-[11px]">{r.grantAlloc}</span>
                      ) : r.grantAlloc ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4] text-[#4A5266]">
                          {r.grantAlloc}
                        </span>
                      ) : (
                        <span className="text-[#5A6275]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {r.evidence === 'Missing' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FBF0D9] text-[#7A4A00] border border-[#F4DCAC] text-[10px] font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Missing</span>
                        </span>
                      ) : r.evidence ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1] text-[10px] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{r.evidence}</span>
                        </span>
                      ) : (
                        <span className="text-[#5A6275]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {/* Closing Balance Row */}
              <tr className="bg-[#F1EEE7] font-bold text-[#16213A]">
                <td className="py-3 px-3" colSpan={3}>Closing balance</td>
                <td className="py-3 px-3 text-right font-mono">26,600.00</td>
                <td className="py-3 px-3 text-right font-mono">0.00</td>
                <td className="py-3 px-3 text-right font-mono">38,600.00</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-[#5A6275] leading-relaxed">
        Locked rows (paper tint) belong to a submitted or reconciled tranche. Open one to see its read-only entry and the submission that locked it. An Operations Lead sees this same view without the New journal entry button.
      </p>
    </div>
  );
};
