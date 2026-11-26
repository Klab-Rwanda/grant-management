import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';

export const BurnAndRunwayPage: React.FC = () => {
  const [burnAverage, setBurnAverage] = useState<'3-month average' | '6-month average' | '12-month average'>('3-month average');
  const [alertThreshold, setAlertThreshold] = useState('6 months');

  // Exact data from screenshot: May to Oct
  // May (11,020), Jun (10,640), Jul (9,950), Aug (10,420), Sep (9,860), Oct (9,140)
  // Current 3-month average (Aug, Sep, Oct): Dark navy (#16213A)
  // Earlier months (May, Jun, Jul): Deep teal (#0E6466)
  const monthlyBurnData = [
    { month: 'May', value: 11020, display: '11,020', isRecentAvg: false },
    { month: 'Jun', value: 10640, display: '10,640', isRecentAvg: false },
    { month: 'Jul', value: 9950, display: '9,950', isRecentAvg: false },
    { month: 'Aug', value: 10420, display: '10,420', isRecentAvg: true },
    { month: 'Sep', value: 9860, display: '9,860', isRecentAvg: true },
    { month: 'Oct', value: 9140, display: '9,140', isRecentAvg: true },
  ];

  // Custom customized top label for bar chart matching screenshot
  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    if (value === undefined || value === null) return null;
    return (
      <text 
        x={x + width / 2} 
        y={y - 8} 
        fill="#5A6275" 
        textAnchor="middle" 
        className="font-mono text-[11px]"
      >
        {Number(value).toLocaleString()}
      </text>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Burn & runway
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            Cash basis · Last 6 closed months · USD
          </p>
        </div>

        {/* Burn average dropdown */}
        <div className="flex flex-col items-start sm:items-end">
          <span className="text-[11px] text-[#5A6275] mb-1 font-medium">Burn average</span>
          <div className="relative">
            <select
              value={burnAverage}
              onChange={(e) => setBurnAverage(e.target.value as any)}
              className="appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-1.5 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="3-month average">3-month average</option>
              <option value="6-month average">6-month average</option>
              <option value="12-month average">12-month average</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4 KPI Summary Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cash on hand */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Cash on hand (31 Oct)
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            89,600.55
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            Bank + mobile money
          </div>
        </div>

        {/* Card 2: Gross burn */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Gross burn (Oct)
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            12,090.00
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            Cash out
          </div>
        </div>

        {/* Card 3: Net burn */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Net burn (3-mo avg)
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            9,806.67
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            Cash out minus cash in
          </div>
        </div>

        {/* Card 4: Runway */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Runway
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            9.1 months
          </div>
          <div className="text-xs text-[#5A6275] mt-1 font-mono">
            89,600.55 ÷ 9,806.67
          </div>
        </div>
      </div>

      {/* Main Grid: Left chart + Right sidebar cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Net burn by month chart (span-2) */}
        <div className="lg:col-span-2 bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger">
          <div className="flex items-center justify-between mb-6 pb-2">
            <h2 className="text-base font-serif font-normal text-[#16213A]">
              Net burn by month
            </h2>
            <span className="text-xs text-[#5A6275] font-sans">
              Bars labelled with exact values
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={monthlyBurnData} 
                margin={{ top: 25, right: 10, left: 10, bottom: 20 }}
                barCategoryGap="22%"
              >
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#5A6275', fontSize: 12, fontFamily: 'Inter, sans-serif' }} 
                  dy={10}
                />
                <YAxis hide={true} domain={[0, 13000]} />
                <Bar 
                  dataKey="value" 
                  radius={[3, 3, 0, 0]}
                  label={renderCustomBarLabel}
                >
                  {monthlyBurnData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isRecentAvg ? '#16213A' : '#0E6466'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend matching screenshot */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#DDD8CC]/50 text-xs text-[#5A6275]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#16213A]"></span>
              <span>In current 3-month average</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#0E6466]"></span>
              <span>Earlier months</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Cards (Runway with grants, Alert threshold, Empty state) */}
        <div className="space-y-6">
          {/* Card 1: Runway with expected grant funds */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
            <h3 className="text-sm font-semibold text-[#16213A] mb-3 leading-snug">
              Runway with expected grant funds
            </h3>

            <div className="border border-[#DDD8CC] rounded-lg overflow-hidden mb-3">
              <div className="grid grid-cols-2 bg-[#F1EEE7] px-3.5 py-2 text-xs font-medium text-[#5A6275]">
                <div>Scenario</div>
                <div className="text-right">Runway</div>
              </div>

              <div className="divide-y divide-[#DDD8CC]/60 bg-white text-xs">
                <div className="grid grid-cols-2 px-3.5 py-2.5 items-center">
                  <div className="text-[#16213A]">Cash on hand only</div>
                  <div className="text-right font-mono text-[#16213A]">9.1 mo</div>
                </div>

                <div className="grid grid-cols-2 px-3.5 py-2.5 items-center">
                  <div className="text-[#16213A]">
                    + Tranche 2 <br />
                    <span className="text-[#5A6275] font-mono text-[11px]">($50,000)</span>
                  </div>
                  <div className="text-right font-mono text-[#16213A]">14.2 mo</div>
                </div>

                <div className="grid grid-cols-2 px-3.5 py-2.5 items-center">
                  <div className="text-[#16213A]">
                    + Tranches 2 and 3 <br />
                    <span className="text-[#5A6275] font-mono text-[11px]">($80,000)</span>
                  </div>
                  <div className="text-right font-mono text-[#16213A]">17.3 mo</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#5A6275] leading-relaxed">
              Expected grant funds are shown separately and never added to cash until the tranche is reconciled.
            </p>
          </div>

          {/* Card 2: Alert threshold */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
            <h3 className="text-sm font-semibold text-[#16213A] mb-1.5">
              Alert threshold
            </h3>
            <label className="block text-xs text-[#5A6275] mb-2">
              Warn me when runway drops below
            </label>

            <div className="relative mb-3">
              <select
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
              >
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="9 months">9 months</option>
                <option value="12 months">12 months</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <p className="text-[11px] text-[#5A6275] leading-relaxed">
              Alerts go to the Founder and Finance Lead by email and in-app.
            </p>
          </div>

          {/* Card 3: Empty state note */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-4 shadow-ledger text-center">
            <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1.5">
              EMPTY STATE
            </div>
            <p className="text-xs text-[#5A6275] leading-relaxed max-w-xs mx-auto">
              Burn needs at least one closed month of cash transactions. Close October to see your first figure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
