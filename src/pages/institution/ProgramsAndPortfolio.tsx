import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const GrantPrograms: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Exact data from B-01 screenshot:
  const programs = [
    {
      id: 'climate-smart-2026',
      title: 'Climate-Smart Agriculture Accelerator 2026',
      period: 'Jan 2026 – Dec 2027',
      status: 'Active',
      pool: '600,000',
      committed: '520,000',
      disbursed: '210,000',
      grants: 5,
      needsAttention: {
        type: 'warning',
        text: '2 reviews over SLA'
      }
    },
    {
      id: 'women-in-fintech-2026',
      title: 'Women in Fintech Fund 2026',
      period: 'Mar 2026 – Feb 2028',
      status: 'Active',
      pool: '400,000',
      committed: '300,000',
      disbursed: '85,000',
      grants: 4,
      needsAttention: {
        type: 'info',
        text: '1 payout to reconcile'
      }
    },
    {
      id: 'health-innovation-2027',
      title: 'Health Innovation Pilot 2027',
      period: 'Starts Feb 2027',
      status: 'Draft',
      pool: '250,000',
      committed: '0',
      disbursed: '0',
      grants: 0,
      needsAttention: {
        type: 'neutral',
        text: 'Finish setup'
      }
    }
  ];

  const filteredPrograms = programs.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Grant programs
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            3 programs · Pool totals in program currency
          </p>
        </div>

        <Link
          to="/institution/programs/new"
          className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition self-start sm:self-auto"
        >
          Create program
        </Link>
      </div>

      {/* 4 KPI Summary Cards matching B-01 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Total pool
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            1,250,000
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            USD across 3 programs
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Committed to grants
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            820,000
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            9 grants
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Disbursed & reconciled
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            295,000
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            11 tranches
          </div>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger">
          <div className="text-xs text-[#5A6275] font-normal mb-2">
            Reviews past SLA
          </div>
          <div className="text-2xl font-mono font-medium text-[#16213A]">
            2
          </div>
          <div className="text-xs text-[#5A6275] mt-1">
            Oldest: 6 days over
          </div>
        </div>
      </div>

      {/* Search and Status Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div className="sm:col-span-3">
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Search programs
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 text-xs text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Status
          </label>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-3 px-4 text-left font-medium">Program</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-right font-medium">Pool</th>
                <th className="py-3 px-4 text-right font-medium">Committed</th>
                <th className="py-3 px-4 text-right font-medium">Disbursed</th>
                <th className="py-3 px-4 text-center font-medium">Grants</th>
                <th className="py-3 px-4 text-left font-medium">Needs attention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {filteredPrograms.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF8F5] transition">
                  <td className="py-3.5 px-4">
                    <Link
                      to={`/institution/programs/${p.id}`}
                      className="font-medium text-[#16213A] hover:underline"
                    >
                      {p.title}
                    </Link>
                    <div className="text-[11px] text-[#5A6275] mt-0.5">{p.period}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    {p.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E6466]"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F1EEE7] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">{p.pool}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">{p.committed}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">{p.disbursed}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-[#16213A]">{p.grants}</td>

                  <td className="py-3.5 px-4">
                    {p.needsAttention.type === 'warning' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                        <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                        {p.needsAttention.text}
                      </span>
                    )}
                    {p.needsAttention.type === 'info' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                        <Clock className="w-3 h-3 text-[#3B82F6]" />
                        {p.needsAttention.text}
                      </span>
                    )}
                    {p.needsAttention.type === 'neutral' && (
                      <Link 
                        to={`/institution/programs/setup-grant`}
                        className="text-[#5A6275] hover:text-[#16213A] hover:underline text-[11px]"
                      >
                        {p.needsAttention.text}
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State Card (matching bottom of B-01) */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl p-8 shadow-ledger text-center space-y-2">
        <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider">
          EMPTY STATE (NEW INSTITUTION)
        </div>
        <h3 className="font-semibold text-sm text-[#16213A]">
          No programs yet
        </h3>
        <p className="text-xs text-[#5A6275] max-w-md mx-auto">
          Create a program to set the funding pool, currency and default tranche rules. You'll add startups afterwards.
        </p>
        <div className="pt-2">
          <Link
            to="/institution/programs/new"
            className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition inline-block"
          >
            Create your first program
          </Link>
        </div>
      </div>
    </div>
  );
};

// Program Detail Screen matching B-04
export const ProgramDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grants' | 'rules' | 'access' | 'activity'>('grants');

  // Exact grantees from B-04 screenshot:
  const grantees = [
    {
      startup: 'Kilele Labs',
      award: '100,000',
      tranche: 'T1 of 3',
      status: 'Submitted · in review',
      subtext: 'Stage 1 of 2 · Financial review',
      statusType: 'submitted',
      waitingOn: 'David O. (Reviewer)',
      sla: 'Day 12 of 10',
      slaOver: true
    },
    {
      startup: 'Shamba Data Co.',
      award: '110,000',
      tranche: 'T2 of 3',
      status: 'Changes requested',
      statusType: 'changes',
      waitingOn: 'Startup · 3 lines',
      sla: 'Startup day 6 of 7',
      slaWarn: true
    },
    {
      startup: 'AquaRoot Systems',
      award: '90,000',
      tranche: 'T1 of 2',
      status: 'Approved for disbursement',
      statusType: 'approved',
      waitingOn: 'Treasury payout',
      sla: 'Day 3'
    },
    {
      startup: 'Tembo Agritech Ltd',
      award: '120,000',
      tranche: 'T2 of 3',
      status: 'Active · Draft',
      statusType: 'active',
      waitingOn: 'Startup preparing',
      sla: 'Not started'
    },
    {
      startup: 'Mavuno Cold Chain',
      award: '100,000',
      tranche: 'T3 of 3',
      status: 'Disbursed & reconciled',
      statusType: 'reconciled',
      waitingOn: 'Grant complete',
      sla: '—'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      {/* Header matching B-04 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Climate-Smart Agriculture Accelerator 2026
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            Pool $600,000 · Committed $520,000 · Disbursed & reconciled $210,000 · Review SLA 10 business days
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition">
            Edit program
          </button>
          <Link
            to="/institution/programs/setup-grant"
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition"
          >
            Add grant
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#DDD8CC] text-xs font-medium">
        <button
          onClick={() => setActiveTab('grants')}
          className={`pb-2 transition ${
            activeTab === 'grants'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Grants (5)
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`pb-2 transition ${
            activeTab === 'rules'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Program rules
        </button>
        <button
          onClick={() => setActiveTab('access')}
          className={`pb-2 transition ${
            activeTab === 'access'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Team access
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-2 transition ${
            activeTab === 'activity'
              ? 'border-b-2 border-[#16213A] text-[#16213A] font-semibold'
              : 'text-[#5A6275] hover:text-[#16213A]'
          }`}
        >
          Activity
        </button>
      </div>

      {/* Grants Table matching B-04 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-3 px-4 text-left font-medium">Startup</th>
                <th className="py-3 px-4 text-right font-medium">Award</th>
                <th className="py-3 px-4 text-left font-medium">Current tranche</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Waiting on</th>
                <th className="py-3 px-4 text-left font-medium">SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {grantees.map((g) => (
                <tr key={g.startup} className="hover:bg-[#FAF8F5] transition">
                  <td className="py-3.5 px-4 font-semibold text-[#16213A]">
                    {g.startup}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#16213A] font-medium">
                    {g.award}
                  </td>
                  <td className="py-3.5 px-4 text-[#5A6275]">
                    {g.tranche}
                  </td>
                  <td className="py-3.5 px-4">
                    {g.statusType === 'submitted' && (
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                          <Clock className="w-3 h-3 text-[#3B82F6]" />
                          {g.status}
                        </span>
                        {g.subtext && (
                          <div className="text-[10px] text-[#5A6275] mt-0.5">{g.subtext}</div>
                        )}
                      </div>
                    )}
                    {g.statusType === 'changes' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                        <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                        {g.status}
                      </span>
                    )}
                    {g.statusType === 'approved' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#0E6466]" />
                        {g.status}
                      </span>
                    )}
                    {g.statusType === 'active' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
                        {g.status}
                      </span>
                    )}
                    {g.statusType === 'reconciled' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#0E6466]" />
                        {g.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#5A6275]">
                    {g.waitingOn}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    {g.slaOver ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[11px] font-medium">
                        ⊗ {g.sla}
                      </span>
                    ) : g.slaWarn ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                        Δ {g.sla}
                      </span>
                    ) : (
                      <span className="text-[#5A6275]">{g.sla}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 2 Cards (What you're waiting on + Privacy reminder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-2">
          <h3 className="font-semibold text-xs text-[#16213A]">
            What you're waiting on
          </h3>
          <ul className="space-y-1.5 text-xs text-[#5A6275] list-disc list-inside">
            <li>
              AquaRoot T1 approved 3 days ago. Record the bank reference once treasury pays.
            </li>
            <li>
              Kilele Labs review is 2 business days past SLA. An escalation went to you and David O.
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-2">
          <h3 className="font-semibold text-xs text-[#16213A]">
            Privacy reminder
          </h3>
          <p className="text-xs text-[#5A6275] leading-relaxed">
            You only see what each startup tagged and submitted to this program. Their full ledgers and untagged expenses are never visible here.
          </p>
        </div>
      </div>
    </div>
  );
};

export const StartupPortfolio: React.FC = () => {
  return <ProgramDetail />;
};
