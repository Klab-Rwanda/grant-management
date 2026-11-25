import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Printer,
  ChevronRight
} from 'lucide-react';

export const FinancialReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'TRIAL_BALANCE' | 'INCOME_STATEMENT' | 'BALANCE_SHEET'>('TRIAL_BALANCE');
  
  // Date & Period Filter State
  const [asOfDate, setAsOfDate] = useState('2026-10-31');
  const [period, setPeriod] = useState<'Month' | 'Quarter' | 'Year to date'>('Year to date');

  // TRIAL BALANCE DATA (A-05)
  const trialBalanceRows = [
    { code: '1010', name: 'Operating bank account', type: 'Asset', debit: '86,420.55', credit: '' },
    { code: '1020', name: 'Mobile money float', type: 'Asset', debit: '3,180.00', credit: '' },
    { code: '1200', name: 'Accounts receivable', type: 'Asset', debit: '4,900.00', credit: '' },
    { code: '1500', name: 'Equipment', type: 'Asset', debit: '38,600.00', credit: '' },
    { code: '1590', name: 'Accumulated depreciation', type: 'Asset (contra)', debit: '', credit: '5,140.00' },
    { code: '2100', name: 'Accounts payable', type: 'Liability', debit: '', credit: '7,215.40' },
    { code: '2200', name: 'Accrued payroll', type: 'Liability', debit: '', credit: '9,800.00' },
    { code: '2400', name: 'Deferred grant income', type: 'Liability', debit: '', credit: '18,500.00' },
    { code: '3100', name: 'Share capital', type: 'Equity', debit: '', credit: '150,000.00' },
    { code: '3200', name: 'Retained earnings', type: 'Equity', debit: '12,300.00', credit: '' },
    { code: '4100', name: 'Subscription revenue', type: 'Revenue', debit: '', credit: '21,600.00' },
    { code: '4200', name: 'Advisory services', type: 'Revenue', debit: '', credit: '6,300.00' },
    { code: '4500', name: 'Grant income', type: 'Revenue', debit: '', credit: '21,500.00' },
    { code: '6010', name: 'R&D Personnel', type: 'Expense', debit: '48,200.00', credit: '' },
    { code: '6020', name: 'Direct Payroll', type: 'Expense', debit: '14,400.00', credit: '' },
    { code: '6100', name: 'Cloud Infrastructure', type: 'Expense', debit: '4,122.85', credit: '' },
    { code: '6200', name: 'Contractors', type: 'Expense', debit: '12,750.00', credit: '' },
    { code: '6300', name: 'Marketing', type: 'Expense', debit: '6,300.00', credit: '' },
    { code: '6400', name: 'Rent & office', type: 'Expense', debit: '3,742.00', credit: '' },
    { code: '6900', name: 'Depreciation', type: 'Expense', debit: '5,140.00', credit: '' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header Row with Export PDF / CSV (Matching A-05, A-06, A-07) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            {activeTab === 'TRIAL_BALANCE' && 'Trial balance'}
            {activeTab === 'INCOME_STATEMENT' && 'Income statement'}
            {activeTab === 'BALANCE_SHEET' && 'Balance sheet'}
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · {activeTab === 'INCOME_STATEMENT' ? '1 Jan – 31 Oct 2026 · Accrual basis · USD' : `As of ${asOfDate} · USD`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === 'INCOME_STATEMENT' ? (
            <div className="flex bg-[#F1EEE7] border border-[#DDD8CC] rounded-md p-0.5 text-xs">
              {(['Month', 'Quarter', 'Year to date'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded transition font-medium ${
                    period === p ? 'bg-[#16213A] text-white' : 'text-[#5A6275] hover:text-[#16213A]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#5A6275]">As of</span>
              <input
                type="date"
                value={asOfDate}
                onChange={(e) => setAsOfDate(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-[#DDD8CC] rounded-md font-mono text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition"
            >
              Export PDF
            </button>
            {activeTab === 'TRIAL_BALANCE' && (
              <button 
                onClick={() => alert('Exporting CSV...')}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition"
              >
                Export CSV
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Trial balance | Income statement | Balance sheet) */}
      <div className="flex border-b border-[#DDD8CC] text-xs font-medium space-x-6">
        <button
          onClick={() => setActiveTab('TRIAL_BALANCE')}
          className={`pb-2 transition border-b-2 ${
            activeTab === 'TRIAL_BALANCE'
              ? 'border-[#0E6466] text-[#0E6466] font-bold'
              : 'border-transparent text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Trial balance
        </button>
        <button
          onClick={() => setActiveTab('INCOME_STATEMENT')}
          className={`pb-2 transition border-b-2 ${
            activeTab === 'INCOME_STATEMENT'
              ? 'border-[#0E6466] text-[#0E6466] font-bold'
              : 'border-transparent text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Income statement
        </button>
        <button
          onClick={() => setActiveTab('BALANCE_SHEET')}
          className={`pb-2 transition border-b-2 ${
            activeTab === 'BALANCE_SHEET'
              ? 'border-[#0E6466] text-[#0E6466] font-bold'
              : 'border-transparent text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Balance sheet
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. TRIAL BALANCE TAB (Matching A-05) */}
      {/* ========================================================================= */}
      {activeTab === 'TRIAL_BALANCE' && (
        <div className="space-y-4">
          {/* In Balance Banner */}
          <div className="p-3.5 rounded-lg bg-[#E4F1E8] border border-[#C8E4D1] text-xs text-[#1D5E3A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1D5E3A] shrink-0" />
            <span>
              <strong>In balance.</strong> Total debits equal total credits. When they don't, this banner turns red, names the difference, and links to unposted or one-sided entries.
            </span>
          </div>

          {/* Table */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-4 font-mono w-24">Code</th>
                    <th className="py-2.5 px-4">Account</th>
                    <th className="py-2.5 px-4 w-32">Type</th>
                    <th className="py-2.5 px-4 text-right font-mono w-40">Debit</th>
                    <th className="py-2.5 px-4 text-right font-mono w-40">Credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
                  {trialBalanceRows.map(row => (
                    <tr key={row.code} className="hover:bg-[#FAF9F5] transition">
                      <td className="py-2 px-4 font-mono text-[#5A6275]">{row.code}</td>
                      <td className="py-2 px-4 font-medium">{row.name}</td>
                      <td className="py-2 px-4 text-[#5A6275]">{row.type}</td>
                      <td className="py-2 px-4 text-right font-mono font-medium">{row.debit}</td>
                      <td className="py-2 px-4 text-right font-mono font-medium">{row.credit}</td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="bg-[#FAF9F5] font-bold text-[#16213A] border-t-2 border-[#DDD8CC]">
                    <td className="py-3 px-4" colSpan={3}>Totals</td>
                    <td className="py-3 px-4 text-right font-mono">240,055.40</td>
                    <td className="py-3 px-4 text-right font-mono">240,055.40</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[11px] text-[#5A6275] leading-relaxed">
            Accounts with a zero balance are hidden; you can show them with a toggle. Each row opens the general ledger for that account. Grant income recognised: $21,500.00 of the $40,000.00 Tranche 1 receipt; $18,500.00 remains deferred.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INCOME STATEMENT TAB (Matching A-06) */}
      {/* ========================================================================= */}
      {activeTab === 'INCOME_STATEMENT' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-4">Line</th>
                    <th className="py-2.5 px-4 text-right font-mono w-36">Oct 2026</th>
                    <th className="py-2.5 px-4 text-right font-mono w-36">Year to date</th>
                    <th className="py-2.5 px-4 text-right font-mono w-44">% of revenue (YTD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
                  {/* Revenue Section */}
                  <tr className="bg-[#FAF9F5] font-bold text-[#16213A]">
                    <td className="py-2 px-4" colSpan={4}>Revenue</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Subscription revenue</td>
                    <td className="py-2 px-4 text-right font-mono">2,950.00</td>
                    <td className="py-2 px-4 text-right font-mono">21,600.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">43.7%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Advisory services</td>
                    <td className="py-2 px-4 text-right font-mono">0.00</td>
                    <td className="py-2 px-4 text-right font-mono">6,300.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">12.8%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Grant income</td>
                    <td className="py-2 px-4 text-right font-mono">0.00</td>
                    <td className="py-2 px-4 text-right font-mono">21,500.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">43.5%</td>
                  </tr>
                  <tr className="font-bold border-t border-[#DDD8CC]">
                    <td className="py-2.5 px-4">Total revenue</td>
                    <td className="py-2.5 px-4 text-right font-mono">2,950.00</td>
                    <td className="py-2.5 px-4 text-right font-mono">49,400.00</td>
                    <td className="py-2.5 px-4 text-right font-mono">100.0%</td>
                  </tr>

                  {/* Operating Expenses Section */}
                  <tr className="bg-[#FAF9F5] font-bold text-[#16213A]">
                    <td className="py-2 px-4" colSpan={4}>Operating expenses</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">R&D Personnel</td>
                    <td className="py-2 px-4 text-right font-mono">9,600.00</td>
                    <td className="py-2 px-4 text-right font-mono">48,200.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">97.6%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Direct Payroll</td>
                    <td className="py-2 px-4 text-right font-mono">1,440.00</td>
                    <td className="py-2 px-4 text-right font-mono">14,400.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">29.1%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Contractors</td>
                    <td className="py-2 px-4 text-right font-mono">1,230.00</td>
                    <td className="py-2 px-4 text-right font-mono">12,750.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">25.8%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Marketing</td>
                    <td className="py-2 px-4 text-right font-mono">400.00</td>
                    <td className="py-2 px-4 text-right font-mono">6,300.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">12.8%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Depreciation</td>
                    <td className="py-2 px-4 text-right font-mono">520.00</td>
                    <td className="py-2 px-4 text-right font-mono">5,140.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">10.4%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Cloud Infrastructure</td>
                    <td className="py-2 px-4 text-right font-mono">412.18</td>
                    <td className="py-2 px-4 text-right font-mono">4,122.85</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">8.3%</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2 px-4 pl-8">Rent & office</td>
                    <td className="py-2 px-4 text-right font-mono">374.20</td>
                    <td className="py-2 px-4 text-right font-mono">3,742.00</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">7.6%</td>
                  </tr>
                  <tr className="font-bold border-t border-[#DDD8CC]">
                    <td className="py-2.5 px-4">Total operating expenses</td>
                    <td className="py-2.5 px-4 text-right font-mono">13,976.38</td>
                    <td className="py-2.5 px-4 text-right font-mono">94,654.85</td>
                    <td className="py-2.5 px-4 text-right font-mono">191.6%</td>
                  </tr>

                  {/* Net Income (Loss) */}
                  <tr className="bg-[#FAF9F5] font-bold text-[#16213A] border-t-2 border-[#DDD8CC]">
                    <td className="py-3 px-4">Net income (loss)</td>
                    <td className="py-3 px-4 text-right font-mono text-[#16213A]">(11,026.38)</td>
                    <td className="py-3 px-4 text-right font-mono text-[#16213A]">(45,254.85)</td>
                    <td className="py-3 px-4 text-right font-mono text-[#16213A]">(91.6%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[11px] text-[#5A6275] leading-relaxed">
            Losses are shown in parentheses with a "loss" label for screen readers, never in red alone. Each line opens the general ledger filtered to that account and period. Grant income follows the deferral in account 2400.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BALANCE SHEET TAB (Matching A-07) */}
      {/* ========================================================================= */}
      {activeTab === 'BALANCE_SHEET' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* Left Column: Assets */}
            <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
              <div className="p-3.5 bg-[#FAF9F5] border-b border-[#DDD8CC] font-bold text-sm text-[#16213A]">
                Assets
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#DDD8CC] text-[#5A6275] font-semibold bg-[#F1EEE7]">
                    <th className="py-2 px-4">Account</th>
                    <th className="py-2 px-4 text-right font-mono">USD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
                  <tr className="bg-[#FAF9F5] font-semibold text-[#5A6275]">
                    <td className="py-1.5 px-4" colSpan={2}>Current assets</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Operating bank account</td>
                    <td className="py-2 px-4 text-right font-mono">86,420.55</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Mobile money float</td>
                    <td className="py-2 px-4 text-right font-mono">3,180.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Accounts receivable</td>
                    <td className="py-2 px-4 text-right font-mono">4,900.00</td>
                  </tr>
                  <tr className="font-bold border-t border-[#DDD8CC]">
                    <td className="py-2 px-4">Total current assets</td>
                    <td className="py-2 px-4 text-right font-mono">94,500.55</td>
                  </tr>

                  <tr className="bg-[#FAF9F5] font-semibold text-[#5A6275]">
                    <td className="py-1.5 px-4" colSpan={2}>Non-current assets</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Equipment</td>
                    <td className="py-2 px-4 text-right font-mono">38,600.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Less accumulated depreciation</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">(5,140.00)</td>
                  </tr>
                  <tr className="font-bold border-t border-[#DDD8CC]">
                    <td className="py-2 px-4">Total non-current assets</td>
                    <td className="py-2 px-4 text-right font-mono">33,460.00</td>
                  </tr>

                  <tr className="bg-[#F1EEE7] font-bold text-sm text-[#16213A] border-t-2 border-[#DDD8CC]">
                    <td className="py-3 px-4">Total assets</td>
                    <td className="py-3 px-4 text-right font-mono">127,960.55</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column: Liabilities & Equity */}
            <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
              <div className="p-3.5 bg-[#FAF9F5] border-b border-[#DDD8CC] font-bold text-sm text-[#16213A]">
                Liabilities & equity
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#DDD8CC] text-[#5A6275] font-semibold bg-[#F1EEE7]">
                    <th className="py-2 px-4">Account</th>
                    <th className="py-2 px-4 text-right font-mono">USD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
                  <tr className="bg-[#FAF9F5] font-semibold text-[#5A6275]">
                    <td className="py-1.5 px-4" colSpan={2}>Current liabilities</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Accounts payable</td>
                    <td className="py-2 px-4 text-right font-mono">7,215.40</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Accrued payroll</td>
                    <td className="py-2 px-4 text-right font-mono">9,800.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Deferred grant income</td>
                    <td className="py-2 px-4 text-right font-mono">18,500.00</td>
                  </tr>
                  <tr className="font-bold border-t border-[#DDD8CC]">
                    <td className="py-2 px-4">Total liabilities</td>
                    <td className="py-2 px-4 text-right font-mono">35,515.40</td>
                  </tr>

                  <tr className="bg-[#FAF9F5] font-semibold text-[#5A6275]">
                    <td className="py-1.5 px-4" colSpan={2}>Equity</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Share capital</td>
                    <td className="py-2 px-4 text-right font-mono">150,000.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Retained earnings (prior years)</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">(12,300.00)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 pl-8">Current-year net loss</td>
                    <td className="py-2 px-4 text-right font-mono text-[#5A6275]">(45,254.85)</td>
                  </tr>
                  <tr className="font-bold border-t border-[#DDD8CC]">
                    <td className="py-2 px-4">Total equity</td>
                    <td className="py-2 px-4 text-right font-mono">92,445.15</td>
                  </tr>

                  <tr className="bg-[#F1EEE7] font-bold text-sm text-[#16213A] border-t-2 border-[#DDD8CC]">
                    <td className="py-3 px-4">Total liabilities & equity</td>
                    <td className="py-3 px-4 text-right font-mono">127,960.55</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Balanced Validation Banner */}
          <div className="p-3.5 rounded-lg bg-[#E4F1E8] border border-[#C8E4D1] text-xs text-[#1D5E3A] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1D5E3A] shrink-0" />
            <span>
              <strong>Balanced:</strong> assets $127,960.55 = liabilities + equity $127,960.55. If the sheet doesn't balance, this turns into an error banner linking to the trial balance.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
          Notifications
        </h1>
        <p className="text-xs text-[#5A6275] mt-1">
          Audited alerts, tranche status milestones, and reviewer correspondence.
        </p>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger flex justify-between items-start text-xs">
          <div>
            <span className="font-semibold text-[#16213A] block">Disbursement Reconciled</span>
            <p className="text-[#5A6275] mt-0.5">Tranche #1 ($40,000.00) bank wire reference confirmed by Riverbend Trust.</p>
            <span className="text-[10px] text-[#5A6275] block mt-1 font-mono">18 Jul 2026 · REF-WIRE-0044</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
            Reconciled
          </span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger flex justify-between items-start text-xs">
          <div>
            <span className="font-semibold text-[#16213A] block">Readiness review feedback</span>
            <p className="text-[#7A4A00] mt-0.5">Tranche 2 has 3 unresolved issues: Equipment cap exceeded, missing receipts, M-3 deliverable.</p>
            <span className="text-[10px] text-[#5A6275] block mt-1 font-mono">28 Oct 2026</span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FBF0D9] text-[#7A4A00] border border-[#F4DCAC]">
            Attention
          </span>
        </div>
      </div>
    </div>
  );
};
