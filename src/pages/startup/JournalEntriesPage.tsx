import React, { useState } from 'react';
import { 
  XCircle, 
  Plus, 
  Trash2, 
  FileCheck, 
  Lock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface JournalLine {
  id: string;
  account: string;
  desc: string;
  debit: string;
  credit: string;
  grantTag?: string;
  evidence?: string;
}

export const JournalEntriesPage: React.FC = () => {
  const [entryDate, setEntryDate] = useState('2026-10-28');
  const [reference, setReference] = useState('INV-SP-0441');
  const [memo, setMemo] = useState('Soil probes batch #4 — supplier invoice');

  const [lines, setLines] = useState<JournalLine[]>([
    {
      id: 'l1',
      account: '1500 Equipment',
      desc: '40 × soil probes',
      debit: '4,120.00',
      credit: '',
      grantTag: 'T2 · Equipment',
      evidence: '1 file'
    },
    {
      id: 'l2',
      account: '2100 Accounts Payable',
      desc: 'Supplier: Highland',
      debit: '',
      credit: '4,100.00',
      grantTag: '',
      evidence: ''
    }
  ]);

  const totalDebit = lines.reduce((acc, l) => acc + (parseFloat(l.debit.replace(/,/g, '')) || 0), 0);
  const totalCredit = lines.reduce((acc, l) => acc + (parseFloat(l.credit.replace(/,/g, '')) || 0), 0);
  const diff = Math.abs(totalDebit - totalCredit);
  const isOutOfBalance = diff !== 0;

  const handleAddLine = () => {
    setLines([
      ...lines,
      {
        id: `l-${Date.now()}`,
        account: '1500 Equipment',
        desc: '',
        debit: '',
        credit: '',
        grantTag: '',
        evidence: ''
      }
    ]);
  };

  const handleRemoveLine = (id: string) => {
    if (lines.length > 2) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header & Actions (Matching A-03) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            New journal entry
          </h1>
          <p className="text-xs text-[#5A6275] font-mono mt-1">
            JE-2026-0318 · Draft, not posted
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert('Draft saved successfully.')}
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
          >
            Save draft
          </button>
          <button 
            disabled={isOutOfBalance}
            onClick={() => alert('Journal entry posted to General Ledger.')}
            className={`px-4 py-2 text-xs font-medium rounded-md shadow-sm transition ${
              isOutOfBalance 
                ? 'bg-[#DDD8CC] text-[#5A6275] cursor-not-allowed'
                : 'bg-[#0E6466] hover:bg-[#0A4F51] text-white'
            }`}
          >
            Post entry
          </button>
        </div>
      </div>

      {/* Out of Balance Error Banner (Matching A-03) */}
      {isOutOfBalance && (
        <div className="p-4 rounded-lg bg-[#FBE6E4] border border-[#F7C6C2] text-xs text-[#9B1C1C] flex items-center gap-2.5">
          <XCircle className="w-4 h-4 shrink-0 text-[#9B1C1C]" />
          <div>
            <strong className="font-semibold block">
              Debits and credits don't balance. Off by ${diff.toFixed(2)}.
            </strong>
            <span className="text-[11px]">
              Debits ${totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })} ≠ credits ${totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}. Fix a line amount or add a line before posting.
            </span>
          </div>
        </div>
      )}

      {/* Header Form: Entry Date, Reference, Memo (Matching A-03) */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger text-xs">
        <div className="sm:col-span-3">
          <label className="block text-[#16213A] font-medium mb-1">Entry date</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="block text-[#16213A] font-medium mb-1">Reference</label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="e.g. INV-SP-0441"
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div className="sm:col-span-6">
          <label className="block text-[#16213A] font-medium mb-1">Memo</label>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Description of transaction"
            className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          />
        </div>
      </div>

      {/* Double-Entry Lines Table (Matching A-03) */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                <th className="py-2.5 px-3 w-48">Account</th>
                <th className="py-2.5 px-3">Line description</th>
                <th className="py-2.5 px-3 w-28 text-right font-mono">Debit</th>
                <th className="py-2.5 px-3 w-28 text-right font-mono">Credit</th>
                <th className="py-2.5 px-3 w-36 font-mono">Grant tag</th>
                <th className="py-2.5 px-3 w-24 text-center">Evidence</th>
                <th className="py-2.5 px-3 w-20 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]">
              {lines.map((line, idx) => (
                <tr key={line.id} className="hover:bg-[#FAF9F5]">
                  <td className="py-2.5 px-3">
                    <select
                      value={line.account}
                      onChange={(e) => {
                        const newL = [...lines];
                        newL[idx].account = e.target.value;
                        setLines(newL);
                      }}
                      className="w-full p-1.5 bg-white border border-[#DDD8CC] rounded text-xs text-[#16213A]"
                    >
                      <option>1500 Equipment</option>
                      <option>2100 Accounts Payable</option>
                      <option>1010 Operating bank account</option>
                      <option>6010 R&D Personnel</option>
                      <option>6100 Cloud Infrastructure</option>
                    </select>
                  </td>

                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={line.desc}
                      onChange={(e) => {
                        const newL = [...lines];
                        newL[idx].desc = e.target.value;
                        setLines(newL);
                      }}
                      className="w-full p-1.5 bg-white border border-[#DDD8CC] rounded text-xs text-[#16213A]"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="text"
                      value={line.debit}
                      onChange={(e) => {
                        const newL = [...lines];
                        newL[idx].debit = e.target.value;
                        setLines(newL);
                      }}
                      placeholder="0.00"
                      className="w-full p-1.5 bg-white border border-[#DDD8CC] rounded text-xs text-right font-mono text-[#16213A]"
                    />
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="text"
                      value={line.credit}
                      onChange={(e) => {
                        const newL = [...lines];
                        newL[idx].credit = e.target.value;
                        setLines(newL);
                      }}
                      placeholder="0.00"
                      className={`w-full p-1.5 bg-white border rounded text-xs text-right font-mono text-[#16213A] ${
                        isOutOfBalance && line.credit ? 'border-[#9B1C1C]' : 'border-[#DDD8CC]'
                      }`}
                    />
                  </td>

                  <td className="py-2.5 px-3">
                    {line.grantTag ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4] text-[#4A5266]">
                        {line.grantTag}
                      </span>
                    ) : (
                      <span className="text-[#5A6275]">—</span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    {line.evidence ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1] text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{line.evidence}</span>
                      </span>
                    ) : (
                      <span className="text-[#5A6275]">—</span>
                    )}
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleRemoveLine(line.id)}
                      className="text-[#5A6275] hover:text-[#9B1C1C] text-xs font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {/* Totals Row */}
              <tr className="bg-[#FAF9F5] font-bold text-[#16213A]">
                <td className="py-3 px-3">Totals</td>
                <td></td>
                <td className="py-3 px-3 text-right font-mono">
                  {totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-3 text-right font-mono">
                  {totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td colSpan={3} className="py-3 px-3">
                  {isOutOfBalance && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FBE6E4] text-[#9B1C1C] border border-[#F7C6C2] text-[10px] font-mono font-bold">
                      ⊗ Out of balance · {diff.toFixed(2)}
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleAddLine}
        className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
      >
        Add line
      </button>

      {/* Grant Tagging & Locked Entry Cards (Matching A-03 bottom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-2">
          <h3 className="font-semibold text-[#16213A]">Grant tagging</h3>
          <p className="text-[#5A6275] text-[11px] leading-relaxed">
            Tagging a debit line to a tranche creates a draft line-item allocation. The amount must not exceed the line amount, and the category must be allowed in that tranche.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#DDD8CC] space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-[#16213A]">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked entry (other state)</span>
          </div>
          <p className="text-[#5A6275] text-[11px] leading-relaxed">
            Entries tagged to a submitted tranche open read-only, with the banner "Locked by submission SUB-T1-01. Post a reversing entry to correct." and a <strong>Create reversing entry</strong> button.
          </p>
        </div>
      </div>
    </div>
  );
};
