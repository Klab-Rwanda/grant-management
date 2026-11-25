import React, { useState } from 'react';
import { 
  Flame, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Clock, 
  TrendingDown, 
  AlertTriangle, 
  Download, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export const BurnAndRunwayPage: React.FC = () => {
  const [scenario, setScenario] = useState<'CURRENT' | 'CONSERVATIVE' | 'AGGRESSIVE'>('CURRENT');
  const [includeGrantInflow, setIncludeGrantInflow] = useState(true);

  // Cash and burn metrics matching A-08
  const currentCash = 89600.55;
  const netBurnRate = 11026.38;
  const grossBurnRate = 13976.38;
  const revenueRunrate = 2950.00;
  const runwayMonths = (currentCash / netBurnRate).toFixed(1); // ~8.1 - 9.1 months

  // 12-month runway projection data
  const projectionData = [
    { month: 'Oct 26', cash: 89600, netBurn: 11026, revenue: 2950, expenses: 13976 },
    { month: 'Nov 26', cash: 78574, netBurn: 11200, revenue: 3100, expenses: 14300 },
    { month: 'Dec 26', cash: 67374, netBurn: 11400, revenue: 3400, expenses: 14800 },
    { month: 'Jan 27', cash: 95974, netBurn: 11800, revenue: 3600, expenses: 15400, note: 'Tranche 2 disbursement ($40k)' },
    { month: 'Feb 27', cash: 84174, netBurn: 12000, revenue: 3800, expenses: 15800 },
    { month: 'Mar 27', cash: 72174, netBurn: 12200, revenue: 4100, expenses: 16300 },
    { month: 'Apr 27', cash: 59974, netBurn: 12500, revenue: 4300, expenses: 16800 },
    { month: 'May 27', cash: 47474, netBurn: 12800, revenue: 4600, expenses: 17400 },
    { month: 'Jun 27', cash: 34674, netBurn: 13100, revenue: 4900, expenses: 18000 },
    { month: 'Jul 27', cash: 61574, netBurn: 13500, revenue: 5200, expenses: 18700, note: 'Tranche 3 disbursement ($40k)' },
    { month: 'Aug 27', cash: 48074, netBurn: 13800, revenue: 5500, expenses: 19300 },
    { month: 'Sep 27', cash: 34274, netBurn: 14200, revenue: 5800, expenses: 20000 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching A-08 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Burn rate & runway
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · Cash depletion trajectory and runway forecasting based on posted general ledger transactions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-[#F1EEE7] border border-[#DDD8CC] rounded-md p-0.5 text-xs">
            {(['CURRENT', 'CONSERVATIVE', 'AGGRESSIVE'] as const).map(s => (
              <button
                key={s}
                onClick={() => setScenario(s)}
                className={`px-3 py-1 rounded transition font-medium capitalize ${
                  scenario === s ? 'bg-[#16213A] text-white' : 'text-[#5A6275] hover:text-[#16213A]'
                }`}
              >
                {s.toLowerCase()}
              </button>
            ))}
          </div>

          <button 
            onClick={() => window.print()}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#5A6275]" />
            <span>Export forecast</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
          <div className="flex items-center justify-between text-[#5A6275] text-xs mb-2">
            <span>Cash on hand</span>
            <DollarSign className="w-4 h-4 text-[#0E6466]" />
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            ${currentCash.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1 flex items-center gap-1">
            <span>Accounts 1010 + 1020</span>
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
          <div className="flex items-center justify-between text-[#5A6275] text-xs mb-2">
            <span>Net monthly burn</span>
            <Flame className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            ${netBurnRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1 flex items-center gap-1">
            <span className="text-[#C0392B] font-mono font-medium">+4.2%</span> vs 3-mo rolling avg
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger">
          <div className="flex items-center justify-between text-[#5A6275] text-xs mb-2">
            <span>Gross monthly spend</span>
            <TrendingDown className="w-4 h-4 text-[#5A6275]" />
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            ${grossBurnRate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1 flex items-center gap-1">
            <span>Offset by ${revenueRunrate.toLocaleString()} revenue</span>
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger bg-gradient-to-br from-white to-[#F7F5F0]">
          <div className="flex items-center justify-between text-[#5A6275] text-xs mb-2">
            <span>Calculated runway</span>
            <Clock className="w-4 h-4 text-[#0E6466]" />
          </div>
          <div className="text-2xl font-mono font-medium text-[#0E6466]">
            {runwayMonths} months
          </div>
          <div className="text-[11px] text-[#5A6275] mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E6466]" />
            <span>Sufficient through July 2027</span>
          </div>
        </div>
      </div>

      {/* Runway Projection Chart */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg p-6 shadow-ledger">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#DDD8CC]">
          <div>
            <h2 className="text-sm font-semibold text-[#16213A] uppercase tracking-wider">
              Cash balance trajectory (12 months)
            </h2>
            <p className="text-xs text-[#5A6275] mt-0.5">
              Assumes baseline monthly burn of ${netBurnRate.toLocaleString()} with scheduled grant tranches.
            </p>
          </div>

          <label className="flex items-center gap-2 text-xs text-[#16213A] cursor-pointer">
            <input 
              type="checkbox" 
              checked={includeGrantInflow} 
              onChange={e => setIncludeGrantInflow(e.target.checked)}
              className="rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0" 
            />
            <span>Include scheduled grant disbursements</span>
          </label>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0E6466" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0E6466" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBE7DE" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5A6275' }} stroke="#DDD8CC" />
              <YAxis 
                tick={{ fontSize: 11, fill: '#5A6275', fontFamily: 'IBM Plex Mono' }} 
                stroke="#DDD8CC"
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip 
                formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Cash Balance']}
                contentStyle={{ backgroundColor: '#16213A', borderColor: '#16213A', borderRadius: '6px', color: '#FFF', fontSize: '12px' }}
              />
              <Area 
                type="monotone" 
                dataKey="cash" 
                stroke="#0E6466" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#cashGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Cash Breakdown Table */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F1EEE7] border-b border-[#DDD8CC]">
          <h2 className="text-xs font-semibold text-[#16213A] uppercase tracking-wider">
            Historical & Projected Monthly Outflow
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">Month</th>
                <th className="py-2.5 px-4 text-right font-medium">Opening Cash</th>
                <th className="py-2.5 px-4 text-right font-medium">Operating Expenses</th>
                <th className="py-2.5 px-4 text-right font-medium">Earned Revenue</th>
                <th className="py-2.5 px-4 text-right font-medium">Net Monthly Burn</th>
                <th className="py-2.5 px-4 text-right font-medium">Ending Cash</th>
                <th className="py-2.5 px-4 text-left font-medium">Notes & Tranche Inflows</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-mono">
              {projectionData.slice(0, 6).map((r, i) => (
                <tr key={r.month} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-sans font-medium text-[#16213A]">{r.month}</td>
                  <td className="py-3 px-4 text-right text-[#5A6275]">${(r.cash + r.netBurn).toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-[#C0392B]">${r.expenses.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-[#0E6466]">+${r.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium text-[#16213A]">(${r.netBurn.toLocaleString()})</td>
                  <td className="py-3 px-4 text-right font-semibold text-[#16213A]">${r.cash.toLocaleString()}</td>
                  <td className="py-3 px-4 font-sans text-[#5A6275]">
                    {r.note ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8F3F1] text-[#0E6466] text-[11px] font-medium border border-[#0E6466]/20">
                        <CheckCircle2 className="w-3 h-3" />
                        {r.note}
                      </span>
                    ) : '—'}
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
