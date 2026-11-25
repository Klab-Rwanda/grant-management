import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Lock, 
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccountItem {
  code: string;
  name: string;
  type: string;
  grantCat?: string;
  balance: string;
  isHeader?: boolean;
}

export const ChartOfAccountsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [selectedAccount, setSelectedAccount] = useState<AccountItem>({
    code: '1500',
    name: 'Equipment',
    type: 'Asset',
    grantCat: 'Equipment',
    balance: '38,600.00'
  });

  const accounts: AccountItem[] = [
    { code: '1000', name: 'Assets', type: 'Asset', balance: '127,960.55', isHeader: true },
    { code: '1010', name: 'Operating bank account', type: 'Asset', balance: '86,420.55' },
    { code: '1020', name: 'Mobile money float', type: 'Asset', balance: '3,180.00' },
    { code: '1200', name: 'Accounts receivable', type: 'Asset', balance: '4,900.00' },
    { code: '1500', name: 'Equipment', type: 'Asset', grantCat: 'Equipment', balance: '38,600.00' },
    { code: '1590', name: 'Accumulated depreciation', type: 'Asset (contra)', balance: '(5,140.00)' },
    { code: '2000', name: 'Liabilities', type: 'Liability', balance: '35,515.40', isHeader: true },
    { code: '2400', name: 'Deferred grant income', type: 'Liability', balance: '18,500.00' },
    { code: '6000', name: 'Expenses', type: 'Expense', balance: '94,654.85', isHeader: true },
    { code: '6010', name: 'R&D Personnel', type: 'Expense', grantCat: 'R&D Personnel', balance: '48,200.00' },
    { code: '6100', name: 'Cloud Infrastructure', type: 'Expense', grantCat: 'Cloud Infrastructure', balance: '4,122.85' },
    { code: '6200', name: 'Contractors', type: 'Expense', grantCat: 'Contractors', balance: '12,750.00' },
  ];

  const filteredAccounts = accounts.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.code.includes(search);
    const matchType = typeFilter === 'All types' || a.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions (Matching A-02) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Chart of accounts
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            42 accounts · Template: Technology & growth startup
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert('Exporting Chart of Accounts CSV...')}
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
          >
            Export CSV
          </button>
          <button 
            onClick={() => alert('Open add account dialog')}
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-[#0E6466] hover:bg-[#0A4F51] text-white transition shadow-sm"
          >
            Add account
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="text-xs font-medium text-[#16213A] block mb-1">Search accounts</label>
          <input
            type="text"
            placeholder="Code or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div className="w-full sm:w-64">
          <label className="text-xs font-medium text-[#16213A] block mb-1">Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          >
            <option value="All types">All types</option>
            <option value="Asset">Assets</option>
            <option value="Liability">Liabilities</option>
            <option value="Expense">Expenses</option>
          </select>
        </div>

        <div className="flex items-center gap-2 sm:pt-6">
          <input type="checkbox" id="archived" className="rounded border-[#DDD8CC] text-[#0E6466]" />
          <label htmlFor="archived" className="text-xs text-[#5A6275] cursor-pointer">Show archived</label>
        </div>
      </div>

      {/* Main Grid: Accounts Table + Edit Account Drawer (Matching A-02) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                <th className="py-2.5 px-3 font-mono">Code</th>
                <th className="py-2.5 px-3">Account</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Grant category</th>
                <th className="py-2.5 px-3 text-right font-mono">Balance (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
              {filteredAccounts.map((a) => {
                const isSelected = selectedAccount.code === a.code;
                if (a.isHeader) {
                  return (
                    <tr key={a.code} className="bg-[#FAF9F5] font-bold text-[#16213A]">
                      <td className="py-2.5 px-3 font-mono">{a.code}</td>
                      <td className="py-2.5 px-3">{a.name}</td>
                      <td className="py-2.5 px-3">{a.type}</td>
                      <td className="py-2.5 px-3">—</td>
                      <td className="py-2.5 px-3 text-right font-mono">{a.balance}</td>
                    </tr>
                  );
                }
                return (
                  <tr 
                    key={a.code}
                    onClick={() => setSelectedAccount(a)}
                    className={`hover:bg-[#FAF9F5] cursor-pointer transition ${
                      isSelected ? 'bg-[#E4F1E8]/30 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono text-[#5A6275] pl-6">{a.code}</td>
                    <td className="py-2.5 px-3">{a.name}</td>
                    <td className="py-2.5 px-3 text-[#5A6275]">{a.type}</td>
                    <td className="py-2.5 px-3">
                      {a.grantCat ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4] text-[#4A5266]">
                          {a.grantCat}
                        </span>
                      ) : (
                        <span className="text-[#5A6275]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">{a.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-3 border-t border-[#DDD8CC] bg-[#FAF9F5] flex justify-between items-center text-xs text-[#5A6275]">
            <span>Showing 12 of 42 · grouped by type</span>
            <button className="text-[#0E6466] font-medium hover:underline">Expand all</button>
          </div>
        </div>

        {/* Right Drawer: Edit Account - 1500 (Matching A-02) */}
        <div className="lg:col-span-4 bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-4 text-xs">
          <h2 className="text-sm font-bold text-[#16213A]">
            Edit account · {selectedAccount.code}
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-[#16213A] font-medium mb-1">Account name</label>
              <input
                type="text"
                value={selectedAccount.name}
                onChange={(e) => setSelectedAccount({ ...selectedAccount, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Code</label>
                <input
                  type="text"
                  disabled
                  value={selectedAccount.code}
                  className="w-full px-3 py-2 bg-[#F1EEE7] border border-[#DDD8CC] rounded-md font-mono text-[#5A6275] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[#16213A] font-medium mb-1">Type</label>
                <input
                  type="text"
                  disabled
                  value={selectedAccount.type}
                  className="w-full px-3 py-2 bg-[#F1EEE7] border border-[#DDD8CC] rounded-md text-[#5A6275] cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#16213A] font-medium mb-1">Parent</label>
              <select className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A]">
                <option>1000 Assets</option>
                <option>2000 Liabilities</option>
                <option>6000 Expenses</option>
              </select>
            </div>

            <div>
              <label className="block text-[#16213A] font-medium mb-1">Default grant category</label>
              <select 
                value={selectedAccount.grantCat || 'None'}
                onChange={(e) => setSelectedAccount({ ...selectedAccount, grantCat: e.target.value === 'None' ? undefined : e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A]"
              >
                <option value="None">None</option>
                <option value="Equipment">Equipment</option>
                <option value="R&D Personnel">R&D Personnel</option>
                <option value="Contractors">Contractors</option>
              </select>
              <span className="text-[11px] text-[#5A6275] mt-1 block">
                Suggested when tagging entries from this account
              </span>
            </div>

            {/* Locked Info Note */}
            <div className="p-3 rounded-md bg-[#F1EEE7] border border-[#DDD8CC] text-[11px] text-[#5A6275] flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-[#16213A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#16213A]">Code and type are locked.</strong> This account has 31 posted entries. You can archive it, but you can't delete it or change its type.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button className="px-3.5 py-2 border border-[#DDD8CC] rounded-md text-[#16213A] hover:bg-[#F1EEE7]">
                Archive
              </button>
              <button 
                onClick={() => alert('Account changes saved.')}
                className="px-4 py-2 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium rounded-md shadow-sm"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
