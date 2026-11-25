import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  FileCheck2, 
  FileText, 
  Building2, 
  DollarSign, 
  Layers, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Link } from 'react-router-dom';

export const GrantsOverview: React.FC = () => {
  const { grants, activeGrant, setActiveGrant, tranches } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Active Grant Portfolio & Agreements
        </h2>
        <p className="text-xs text-slate-500">
          Monitor multi-funder grant commitments, reporting schedules, and compliance stipulations.
        </p>
      </div>

      {/* Grant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {grants.map((grant) => {
          const isSelected = grant.id === activeGrant.id;
          const completionPct = ((grant.totalReceived / grant.totalAwarded) * 100).toFixed(0);

          return (
            <div
              key={grant.id}
              onClick={() => setActiveGrant(grant)}
              className={`p-6 rounded-xl border transition-all cursor-pointer bg-white dark:bg-slate-900 shadow-sm ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {grant.id}
                </span>
                <StatusBadge status={grant.status} size="sm" />
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {grant.programName}
              </h3>
              <p className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                {grant.institutionName}
              </p>

              {/* Progress & Numbers */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Awarded</span>
                    <span className="font-bold text-slate-900 dark:text-white">${grant.totalAwarded.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Received</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">${grant.totalReceived.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Remaining</span>
                    <span className="font-bold text-slate-500">${grant.remainingAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${completionPct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{completionPct}% Disbursed</span>
                  <span>Ends {grant.endDate}</span>
                </div>
              </div>

              {/* Eligible Categories tags */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Eligible Expenditure Categories
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {grant.eligibleCategories.map((cat, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs pt-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {isSelected ? '✓ Active Context' : 'Click to Set Active'}
                </span>
                <div className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grant Master Agreement Details Card */}
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Master Grant Agreement Provisions — {activeGrant.programName}
            </h3>
            <p className="text-xs text-slate-500">
              Contract Terms, Auditing Stated Principles & Reporting Cadence
            </p>
          </div>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-mono">
            REF: AGR-2026-GITF-001
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-slate-400 block text-[11px] mb-1">Audit Standard</span>
            <span className="font-semibold text-slate-900 dark:text-white">GAAP + Double Entry Verification</span>
            <p className="text-[11px] text-slate-500 mt-1">Receipts required for all line items exceeding $100.</p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-slate-400 block text-[11px] mb-1">Disbursement Mechanics</span>
            <span className="font-semibold text-slate-900 dark:text-white">Commercial Bank Wire (External)</span>
            <p className="text-[11px] text-slate-500 mt-1">Reconciliation proof uploaded by Funder upon wire clearance.</p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-slate-400 block text-[11px] mb-1">Subsequent Tranche Gate</span>
            <span className="font-semibold text-slate-900 dark:text-white">Strict Milestone Verification</span>
            <p className="text-[11px] text-slate-500 mt-1">Tranche N+1 locks until Tranche N is verified & reconciled.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
