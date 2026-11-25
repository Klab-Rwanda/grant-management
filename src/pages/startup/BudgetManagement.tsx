import React, { useState } from 'react';
import { 
  Plus, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Download,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/common/Modal';

export const BudgetManagement: React.FC = () => {
  const { budgetCategories, addBudgetCategory, activeGrant } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [allocated, setAllocated] = useState<number>(25000);

  // Exact figures from A-09 Budget vs actuals mockup
  const budgetRows = [
    { code: '6010', category: 'R&D Personnel', approved: 80000, committed: 0, actual: 48200, remaining: 31800, pct: 60.3, status: 'NORMAL' },
    { code: '6020', category: 'Direct Payroll', approved: 25000, committed: 0, actual: 14400, remaining: 10600, pct: 57.6, status: 'NORMAL' },
    { code: '6100', category: 'Cloud Infrastructure', approved: 8000, committed: 450, actual: 4122.85, remaining: 3427.15, pct: 57.2, status: 'NORMAL' },
    { code: '6200', category: 'Contractors', approved: 20000, committed: 1200, actual: 12750, remaining: 6050, pct: 69.8, status: 'NORMAL' },
    { code: '1500', category: 'Equipment & Hardware', approved: 40000, committed: 0, actual: 38600, remaining: 1400, pct: 96.5, status: 'WARNING' },
    { code: '6300', category: 'Marketing & Dissemination', approved: 12000, committed: 0, actual: 6300, remaining: 5700, pct: 52.5, status: 'NORMAL' },
    { code: '6400', category: 'Rent & Operating Facilities', approved: 15000, committed: 0, actual: 3742, remaining: 11258, pct: 24.9, status: 'NORMAL' },
  ];

  const totalApproved = 200000;
  const totalActual = budgetRows.reduce((acc, c) => acc + c.actual, 0);
  const totalCommitted = budgetRows.reduce((acc, c) => acc + c.committed, 0);
  const totalRemaining = totalApproved - totalActual - totalCommitted;
  const overallPercentage = ((totalActual / totalApproved) * 100).toFixed(1);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addBudgetCategory({
      grantId: activeGrant.id,
      name,
      allocated: Number(allocated)
    });
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching A-09 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Budget vs actuals
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · Grant: Sustainable Agriculture Tech Grant · Program total: $200,000.00 USD
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#5A6275]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add budget line</span>
          </button>
        </div>
      </div>

      {/* Aggregate Overview Card */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg p-6 shadow-ledger">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-5">
          <div>
            <span className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider block">
              Cumulative Grant Budget Utilization
            </span>
            <div className="text-3xl font-mono font-medium text-[#16213A] mt-1">
              ${totalActual.toLocaleString('en-US', { minimumFractionDigits: 2 })}{' '}
              <span className="text-sm font-sans font-normal text-[#5A6275]">
                incurred of ${totalApproved.toLocaleString()} approved cap
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[11px] text-[#5A6275] block uppercase tracking-wider">Remaining Unencumbered</span>
              <span className="text-lg font-mono font-semibold text-[#0E6466]">
                ${totalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="px-4 py-2 bg-[#F1EEE7] border border-[#DDD8CC] rounded-lg text-center">
              <span className="text-[10px] text-[#5A6275] block font-medium">UTILIZATION</span>
              <span className="text-xl font-mono font-bold text-[#16213A]">{overallPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-[#EAE6DD] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0E6466] transition-all duration-500 rounded-full" 
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-[#5A6275] mt-2 font-mono">
          <span>$0.00</span>
          <span>Target Milestone 2 Gate: $100,000.00</span>
          <span>$200,000.00 (100%)</span>
        </div>
      </div>

      {/* Warning banner for near-cap category */}
      <div className="p-3.5 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg flex items-center justify-between text-xs text-[#92400E]">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>
            <strong>Equipment & Hardware</strong> is at <strong>96.5%</strong> of its approved cap ($1,400 remaining). Additional equipment journal tags require funder re-allocation approval.
          </span>
        </div>
      </div>

      {/* Budget Categories Table */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F1EEE7] border-b border-[#DDD8CC] flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#16213A] uppercase tracking-wider">
            Category Variance Breakdown
          </h2>
          <span className="text-xs text-[#5A6275]">7 active categories</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">Code</th>
                <th className="py-2.5 px-4 text-left font-medium">Category name</th>
                <th className="py-2.5 px-4 text-right font-medium">Approved budget</th>
                <th className="py-2.5 px-4 text-right font-medium">Committed</th>
                <th className="py-2.5 px-4 text-right font-medium">Actual spent</th>
                <th className="py-2.5 px-4 text-right font-medium">Remaining balance</th>
                <th className="py-2.5 px-4 text-right font-medium">% Spent</th>
                <th className="py-2.5 px-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-mono">
              {budgetRows.map((r) => (
                <tr key={r.code} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 text-[#5A6275]">{r.code}</td>
                  <td className="py-3 px-4 font-sans font-medium text-[#16213A]">{r.category}</td>
                  <td className="py-3 px-4 text-right text-[#16213A]">${r.approved.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-[#5A6275]">
                    {r.committed > 0 ? `$${r.committed.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-[#16213A]">${r.actual.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-[#0E6466] font-medium">${r.remaining.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={r.pct > 90 ? 'text-[#C0392B] font-bold' : 'text-[#16213A]'}>
                      {r.pct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans">
                    {r.status === 'WARNING' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]/30">
                        <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                        Near cap
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F3F1] text-[#0E6466] border border-[#0E6466]/20">
                        <CheckCircle2 className="w-3 h-3 text-[#0E6466]" />
                        On track
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-[#16213A] bg-[#F1EEE7] font-mono font-semibold text-[#16213A]">
              <tr>
                <td className="py-3 px-4 font-sans" colSpan={2}>Total Program Allocation</td>
                <td className="py-3 px-4 text-right">${totalApproved.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">${totalCommitted.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">${totalActual.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-[#0E6466]">${totalRemaining.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">{overallPercentage}%</td>
                <td className="py-3 px-4 font-sans font-normal text-[#5A6275]">Active</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add budget line item">
        <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-[#16213A] mb-1">Category name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="e.g. Field trials & pilot testing"
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
          <div>
            <label className="block font-medium text-[#16213A] mb-1">Approved allocation (USD)</label>
            <input 
              type="number" 
              value={allocated} 
              onChange={e => setAllocated(Number(e.target.value))} 
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md font-mono text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="px-3.5 py-1.5 border border-[#DDD8CC] rounded-md text-[#5A6275] hover:bg-[#F1EEE7]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-3.5 py-1.5 bg-[#0E6466] text-white rounded-md hover:bg-[#0B4F51]"
            >
              Save category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
