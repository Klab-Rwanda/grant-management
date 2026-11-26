import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  FileCheck, 
  ArrowDownRight, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge, RejectionReasonBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const AccountingLedger: React.FC = () => {
  const { 
    transactions, 
    addTransaction, 
    documents, 
    activeGrant,
    budgetCategories 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState<'LEDGER' | 'CHART_OF_ACCOUNTS'>('LEDGER');

  // Form State for new entry
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(budgetCategories[0]?.name || 'R&D Equipment');
  const [account, setAccount] = useState('Operating Bank Account (SVB)');
  const [amount, setAmount] = useState<number>(1500);
  const [type, setType] = useState<'DEBIT' | 'CREDIT'>('DEBIT');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [merchant, setMerchant] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState('');

  const totalDebits = transactions.reduce((acc, t) => acc + (t.debit || 0), 0);
  const totalCredits = transactions.reduce((acc, t) => acc + (t.credit || 0), 0);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.merchantName && t.merchantName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      date,
      description: desc,
      category,
      account,
      debit: type === 'DEBIT' ? Number(amount) : 0,
      credit: type === 'CREDIT' ? Number(amount) : 0,
      grantId: activeGrant.id,
      trancheId: 'tranche-03',
      receiptId: selectedReceipt || undefined,
      merchantName: merchant || undefined,
      submissionStatus: 'UNSUBMITTED'
    });
    setIsModalOpen(false);
    setDesc('');
    setMerchant('');
  };

  const handleExportCSV = () => {
    const headers = "ID,Date,Description,Category,Account,Debit,Credit,Merchant,Status\n";
    const rows = filteredTransactions.map(t => 
      `"${t.id}","${t.date}","${t.description.replace(/"/g, '""')}","${t.category}","${t.account}",${t.debit},${t.credit},"${t.merchantName || ''}","${t.submissionStatus || ''}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Grant_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Double Entry Integrity Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            General Ledger & Journal Entries
          </h2>
          <p className="text-xs text-slate-500">
            Double-entry bookkeeping compliant with grant reporting & auditing guidelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTab('LEDGER')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${tab === 'LEDGER' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Journal Ledger
            </button>
            <button
              onClick={() => setTab('CHART_OF_ACCOUNTS')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${tab === 'CHART_OF_ACCOUNTS' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Chart of Accounts
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-emerald-500 hover:bg-slate-800 dark:hover:bg-emerald-400 text-white dark:text-slate-950 flex items-center gap-1.5 transition shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Post Entry</span>
          </button>
        </div>
      </div>

      {/* Double-Entry Balance Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Inflow / Credits</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${totalCredits.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-lg">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Outflow / Debits</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">${totalDebits.toLocaleString()}</span>
          </div>
          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-lg">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Net Ledger Position</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">${(totalCredits - totalDebits).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Auditable</span>
          </div>
        </div>
      </div>

      {tab === 'LEDGER' ? (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions, accounts, vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="ALL">All Categories</option>
                {budgetCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Description / Merchant</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Account</th>
                    <th className="py-3 px-4 text-right">Debit (Expense)</th>
                    <th className="py-3 px-4 text-right">Credit (Income)</th>
                    <th className="py-3 px-4 text-center">Evidence</th>
                    <th className="py-3 px-4 text-center">Submission Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {tx.description}
                        </div>
                        {tx.merchantName && (
                          <div className="text-[11px] text-slate-400">
                            Vendor: {tx.merchantName}
                          </div>
                        )}
                        {tx.reviewReason && (
                          <div className="mt-1 flex items-center gap-1.5">
                            <RejectionReasonBadge reason={tx.reviewReason} />
                            {tx.reviewComment && (
                              <span className="text-[10px] text-rose-600 dark:text-rose-400">
                                {tx.reviewComment}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {tx.account}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-900 dark:text-white whitespace-nowrap">
                        {tx.debit > 0 ? `$${tx.debit.toLocaleString()}` : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                        {tx.credit > 0 ? `$${tx.credit.toLocaleString()}` : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {tx.receiptId ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] border border-emerald-200 dark:border-emerald-800">
                            <FileCheck className="w-3 h-3" />
                            <span>Attached</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {tx.submissionStatus ? (
                          <StatusBadge status={tx.submissionStatus} size="sm" />
                        ) : (
                          <span className="text-[11px] text-slate-400">UNSUBMITTED</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Chart of Accounts Sub-view */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Standard Chart of Accounts (COA)</h3>
            <p className="text-xs text-slate-500">Structured financial reporting hierarchy according to GAAP & grant rules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">1000 - Assets</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>1010 Operating Bank Account (SVB)</span>
                  <span className="font-mono font-semibold">$65,500.00</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>1020 Grant Escrow Holding</span>
                  <span className="font-mono font-semibold">$0.00</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>1500 Lab Spectrometry Equipment (CapEx)</span>
                  <span className="font-mono font-semibold">$34,500.00</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">2000 - Liabilities & Equity</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>2010 Accounts Payable (Vendors)</span>
                  <span className="font-mono font-semibold">$8,750.00</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>2200 Deferred Grant Revenue</span>
                  <span className="font-mono font-semibold">$250,000.00</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>3000 Common Stock Equity</span>
                  <span className="font-mono font-semibold">$50,000.00</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">4000 - Revenue & Inflow</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>4010 Grant Recognized Inflows</span>
                  <span className="font-mono font-semibold">$250,000.00</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>4100 Commercial Pilot Revenue</span>
                  <span className="font-mono font-semibold">$0.00</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">5000 - Grant Eligible Expenses</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>5100 R&D Equipment & Hardware</span>
                  <span className="font-mono font-semibold">$112,500.00</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>5200 Clinical Trials & Reagents</span>
                  <span className="font-mono font-semibold">$89,000.00</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-700/60">
                  <span>5300 Scientific Engineering Payroll</span>
                  <span className="font-mono font-semibold">$125,000.00</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>5400 Legal & Patent Filings</span>
                  <span className="font-mono font-semibold">$28,000.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Post Transaction Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post New Journal Entry"
        description="Record an income or expense transaction linked to the active grant."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateTransaction} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Transaction Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="DEBIT">Debit (Expense / Outflow)</option>
                <option value="CREDIT">Credit (Income / Grant Inflow)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Posting Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Mass Spectrometer Quarterly Lease Payment"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Grant Budget Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                {budgetCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
                <option value="Grant Inflow">Grant Inflow</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Merchant / Vendor Name</label>
              <input
                type="text"
                placeholder="e.g. Agilent Technologies"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="Operating Bank Account (SVB)">Operating Bank Account (SVB)</option>
                <option value="Payroll Account">Payroll Account</option>
                <option value="Grant Escrow">Grant Escrow</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Attach Evidence Receipt</label>
            <select
              value={selectedReceipt}
              onChange={(e) => setSelectedReceipt(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="">No receipt attached (Draft)</option>
              {documents.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.fileName} (${doc.amount}) - {doc.merchantName}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg"
            >
              Post to Ledger
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
