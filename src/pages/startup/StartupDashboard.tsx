import React from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Info,
  Lock,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';

export const StartupDashboard: React.FC = () => {
  const { 
    activeGrant, 
    tranches, 
    transactions,
    currentUser
  } = useApp();

  const cashOnHand = 89600.55;
  const netBurn = 9806.67;
  const runway = 9.1;
  const grantFundsToClaim = 48200.00;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Greeting & Action Buttons (Matching A-01) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-[#5A6275] mt-0.5">
            Books closed through 31 Oct 2026 · Functional currency USD
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/startup/evidence"
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
          >
            Upload receipt
          </Link>
          <Link
            to="/startup/ledger"
            className="px-3.5 py-2 text-xs font-medium rounded-md bg-[#0E6466] hover:bg-[#0A4F51] text-white transition shadow-sm"
          >
            New journal entry
          </Link>
        </div>
      </div>

      {/* Warning Banner: Readiness issues */}
      <div className="p-4 rounded-lg bg-[#FBF0D9] border border-[#F4DCAC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2 text-[#7A4A00]">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#7A4A00] mt-0.5 sm:mt-0" />
          <div>
            <strong className="font-semibold">Tranche 2 can't be submitted yet: 3 readiness issues</strong>
            <p className="text-[#7A4A00]/90 text-[11px] mt-0.5">
              Equipment is over its cap, 2 line items have no receipt, and the Milestone M-3 deliverable is missing.
            </p>
          </div>
        </div>

        <Link
          to="/startup/submissions"
          className="px-3 py-1.5 rounded bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] font-medium text-xs whitespace-nowrap self-start sm:self-auto shadow-sm"
        >
          Fix issues
        </Link>
      </div>

      {/* 4 Financial Metric Cards (Matching A-01) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Cash on hand</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">
            ${cashOnHand.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-[#5A6275] mt-1 block">Bank + mobile money</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Net burn (3-mo avg)</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">
            ${netBurn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-[#5A6275] mt-1 block">per month</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Runway</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">
            {runway} mo
          </span>
          <span className="text-[11px] text-[#5A6275] mt-1 block">At current net burn</span>
        </div>

        <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
          <span className="text-xs text-[#5A6275] block">Grant funds to claim</span>
          <span className="text-2xl font-serif text-[#16213A] mt-1 block">
            ${grantFundsToClaim.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-[#5A6275] mt-1 block">Tagged to Tranche 2 of $50,000</span>
        </div>
      </div>

      {/* Main Grid: Active Grant + Tasks & Budget use */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Grant Timeline Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-serif font-semibold text-[#16213A]">
                  Active grant · Climate-Smart Agriculture Accelerator 2026
                </h2>
                <p className="text-xs text-[#5A6275] mt-0.5">
                  Riverbend Innovation Trust · Award $120,000.00 · 3 tranches
                </p>
              </div>
              <Link to="/startup/grants" className="text-xs text-[#0E6466] hover:underline font-medium">
                Open grant
              </Link>
            </div>

            {/* Tranche Table */}
            <div className="border border-[#DDD8CC] rounded-md overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-3">Tranche</th>
                    <th className="py-2.5 px-3 font-mono">Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Next step</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]">
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-3 font-semibold text-[#16213A]">Tranche 1</td>
                    <td className="py-3 px-3 font-mono">40,000.00</td>
                    <td className="py-3 px-3">
                      <StatusBadge status="DISBURSED_AND_RECONCILED" size="sm" />
                    </td>
                    <td className="py-3 px-3 text-[#5A6275]">Closed 18 Jul 2026</td>
                  </tr>

                  <tr className="bg-[#E4F1E8]/20 hover:bg-[#E4F1E8]/30">
                    <td className="py-3 px-3 font-bold text-[#16213A]">
                      Tranche 2
                    </td>
                    <td className="py-3 px-3 font-mono font-bold">50,000.00</td>
                    <td className="py-3 px-3">
                      <StatusBadge status="ACTIVE" size="sm" />
                    </td>
                    <td className="py-3 px-3">
                      <Link to="/startup/submissions" className="text-[#0E6466] font-semibold hover:underline">
                        Resolve 3 readiness issues
                      </Link>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5] opacity-75">
                    <td className="py-3 px-3 text-[#5A6275]">Tranche 3</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">30,000.00</td>
                    <td className="py-3 px-3">
                      <StatusBadge status="LOCKED" size="sm" />
                    </td>
                    <td className="py-3 px-3 text-[#5A6275]">Needs T2 reconciled + M-4 verified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-serif font-semibold text-[#16213A]">
                Recent transactions
              </h2>
              <Link to="/startup/ledger" className="text-xs text-[#0E6466] hover:underline font-medium">
                General ledger
              </Link>
            </div>

            <div className="border border-[#DDD8CC] rounded-md overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Account</th>
                    <th className="py-2.5 px-3 text-right font-mono">USD</th>
                    <th className="py-2.5 px-3 font-mono">Grant tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]">
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2.5 px-3 font-mono text-[#5A6275]">31 Oct</td>
                    <td className="py-2.5 px-3 font-medium text-[#16213A]">October payroll — R&D</td>
                    <td className="py-2.5 px-3 text-[#5A6275]">6010 R&D Personnel</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">9,600.00</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4] text-[#4A5266]">
                        T2 · R&D Personnel
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2.5 px-3 font-mono text-[#5A6275]">28 Oct</td>
                    <td className="py-2.5 px-3 font-medium text-[#16213A]">Soil probes batch #4</td>
                    <td className="py-2.5 px-3 text-[#5A6275]">1500 Equipment</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">4,120.00</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4] text-[#4A5266]">
                        T2 · Equipment
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2.5 px-3 font-mono text-[#5A6275]">27 Oct</td>
                    <td className="py-2.5 px-3 font-medium text-[#16213A]">Cloud hosting</td>
                    <td className="py-2.5 px-3 text-[#5A6275]">6100 Cloud Infrastructure</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">412.18</td>
                    <td className="py-2.5 px-3 text-[#5A6275] text-[11px]">Not tagged</td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-2.5 px-3 font-mono text-[#5A6275]">25 Oct</td>
                    <td className="py-2.5 px-3 font-medium text-[#16213A]">Subscription receipts</td>
                    <td className="py-2.5 px-3 text-[#5A6275]">4100 Subscription revenue</td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">2,950.00</td>
                    <td className="py-2.5 px-3 text-[#5A6275]">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Your Tasks & Tranche 2 Budget Use (Matching A-01) */}
        <div className="space-y-6">
          {/* Your Tasks Card */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-3">
            <h3 className="text-sm font-semibold text-[#16213A]">
              Your tasks
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-md border border-[#F7C6C2] bg-[#FBE6E4] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white text-[#9B1C1C] text-[10px] font-bold">
                    ⊗ Blocked
                  </span>
                  <span className="text-[#9B1C1C] font-medium">
                    Equipment over cap by $1,380.00 (T2)
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-md border border-[#F4DCAC] bg-[#FBF0D9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white text-[#7A4A00] text-[10px] font-bold">
                    Δ Missing
                  </span>
                  <span className="text-[#7A4A00] font-medium">
                    2 receipts for T2 line items
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-md border border-[#F4DCAC] bg-[#FBF0D9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white text-[#7A4A00] text-[10px] font-bold">
                    Δ Missing
                  </span>
                  <span className="text-[#7A4A00] font-medium">
                    M-3 deliverable (owner: Joel K.)
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-md border border-[#CADDF4] bg-[#E5EEF9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-white text-[#1E4E8C] text-[10px] font-bold">
                    ⓘ Review
                  </span>
                  <span className="text-[#1E4E8C] font-medium">
                    6 OCR results waiting for confirmation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tranche 2 Budget Use Progress */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-4">
            <h3 className="text-sm font-semibold text-[#16213A]">
              Tranche 2 budget use
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#16213A] font-medium">R&D Personnel</span>
                  <span className="font-mono text-[#5A6275]">27,400 / 30,000</span>
                </div>
                <div className="w-full h-2 bg-[#F1EEE7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0E6466]" style={{ width: '91.3%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16213A] font-medium">Equipment</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#FBE6E4] text-[#9B1C1C] border border-[#F7C6C2] font-semibold">
                      ⊗ Over cap
                    </span>
                  </div>
                  <span className="font-mono text-[#9B1C1C] font-bold">13,880 / 12,500</span>
                </div>
                <div className="w-full h-2 bg-[#F1EEE7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#9B1C1C]" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#16213A] font-medium">Contractors</span>
                  <span className="font-mono text-[#5A6275]">6,920 / 7,500</span>
                </div>
                <div className="w-full h-2 bg-[#F1EEE7] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0E6466]" style={{ width: '92.2%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
