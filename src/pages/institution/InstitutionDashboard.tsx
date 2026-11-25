import React, { useState } from 'react';
import { 
  Building2, 
  Wallet, 
  CheckSquare, 
  AlertCircle, 
  Layers, 
  FolderKanban, 
  Briefcase, 
  Banknote, 
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  Users,
  Eye,
  Check,
  X,
  MessageSquare,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusBadge, RejectionReasonBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { RejectionReasonCode } from '../../types';
import { Link } from 'react-router-dom';

export const InstitutionDashboard: React.FC = () => {
  const { grants, submissions, tranches } = useApp();

  const totalPool = 5000000;
  const totalAwarded = grants.reduce((acc, g) => acc + g.totalAwarded, 0);
  const totalDisbursed = grants.reduce((acc, g) => acc + g.totalReceived, 0);
  const availablePool = totalPool - totalAwarded;

  const pendingReviewsCount = submissions.filter(s => s.status === 'PENDING_REVIEW' || s.status === 'SUBMITTED').length;

  const portfolioChartData = [
    { name: 'BioGenix Labs', awarded: 500000, disbursed: 250000, spent: 184500 },
    { name: 'NanoMesh Quantum', awarded: 450000, disbursed: 200000, spent: 155000 },
    { name: 'EcoCarbon Capture', awarded: 600000, disbursed: 300000, spent: 280000 },
    { name: 'AeroCell Propulsion', awarded: 400000, disbursed: 150000, spent: 90000 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Program Funder Hero */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              GRANTOR GOVERNANCE CONSOLE
            </span>
            <span className="text-xs text-slate-400">Global Innovation & Technology Fund</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Grant Capital Deployment & Portfolio Audit
          </h2>
          <p className="text-xs text-slate-300">
            Overseeing 12 deep-tech grant initiatives, multi-tranche milestone governance, and off-platform bank wire audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/institution/reviews"
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5"
          >
            <span>Open Review Center</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            to="/institution/reconciliation"
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
          >
            Reconcile Disbursements
          </Link>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Funding Pool"
          value={`$${(totalPool / 1000000).toFixed(1)}M`}
          subtitle="Authorized institution grant treasury"
          icon={Wallet}
        />
        <MetricCard
          title="Committed / Awarded"
          value={`$${(totalAwarded / 1000).toFixed(0)}k`}
          subtitle={`${((totalAwarded / totalPool) * 100).toFixed(1)}% capital deployed`}
          icon={FolderKanban}
          variant="highlight"
        />
        <MetricCard
          title="Total Disbursed to Date"
          value={`$${(totalDisbursed / 1000).toFixed(0)}k`}
          subtitle="Cleared bank wires via reconciliation"
          icon={Banknote}
        />
        <MetricCard
          title="Pending Tranche Audits"
          value={`${pendingReviewsCount} Package`}
          subtitle="Awaiting financial review action"
          icon={CheckSquare}
          variant={pendingReviewsCount > 0 ? 'warning' : 'default'}
        />
      </div>

      {/* Portfolio Deployment Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Portfolio Allocation & Burn Across Cohort
              </h3>
              <p className="text-xs text-slate-500">Awarded vs. Disbursed vs. Reconciled Expenditures (USD)</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-slate-300 dark:bg-slate-700"></span> Awarded
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Disbursed
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Spent
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`$${val.toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="awarded" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="disbursed" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="spent" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Review Pipeline Quick View */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Review Pipeline
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-semibold">
                Urgent
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Submissions requiring line-item verification before tranche disbursement authorization.
            </p>

            <div className="space-y-3">
              {submissions.map(sub => (
                <div key={sub.id} className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sub.startupName}
                    </span>
                    <StatusBadge status={sub.status} size="sm" />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Claim: ${sub.totalClaimed.toLocaleString()}</span>
                    <span>{sub.itemsCount} Line Items</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500" 
                      style={{ width: `${(sub.reviewedItemsCount / sub.itemsCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/institution/reviews"
            className="w-full mt-4 py-2 px-3 text-center text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white transition"
          >
            Review All Pending Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};
