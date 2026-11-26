import React, { useState } from 'react';
import { 
  Check, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Lock, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FileText,
  Building2
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// B-05: Startup My Grants List
export const GrantsOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
      {/* Top Header matching B-05 */}
      <div>
        <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
          My grants
        </h1>
        <p className="text-xs text-[#5A6275] mt-1 font-sans">
          Grants from every institution you work with, in one place
        </p>
      </div>

      {/* Grant 1: New Offer Card matching top of B-05 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1">
              NEW OFFER · WAITING FOR YOUR ACCEPTANCE
            </div>
            <h2 className="text-base font-semibold text-[#16213A]">
              Northgate Seed Fund · Rural Connectivity Grant 2027
            </h2>
            <div className="text-xs text-[#5A6275] mt-1">
              Award <strong className="font-mono text-[#16213A] font-semibold">$60,000.00</strong> · 2 tranches · Respond by 4 Dec 2026
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium shrink-0">
            <Clock className="w-3 h-3 text-[#3B82F6]" />
            Offer received
          </span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/startup/grant-offer"
            className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition"
          >
            Review offer
          </Link>
          <span className="text-xs text-[#5A6275]">
            Only the Founder / CEO can accept.
          </span>
        </div>
      </div>

      {/* Grant 2: Active Grant Card matching middle of B-05 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1">
              RIVERBEND INNOVATION TRUST
            </div>
            <h2 className="text-base font-semibold text-[#16213A]">
              Climate-Smart Agriculture Accelerator 2026
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E6466]"></span>
            Active
          </span>
        </div>

        {/* 4 Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
          <div>
            <div className="text-[11px] text-[#5A6275]">Award</div>
            <div className="text-sm font-mono font-medium text-[#16213A] mt-0.5">
              $120,000.00
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#5A6275]">Received</div>
            <div className="text-sm font-mono font-medium text-[#16213A] mt-0.5">
              $40,000.00
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#5A6275]">Current tranche</div>
            <div className="text-sm font-medium text-[#16213A] mt-0.5">
              Tranche 2 · Draft
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[#5A6275]">Target submission</div>
            <div className="text-sm font-medium text-[#16213A] mt-0.5">
              30 Nov 2026
            </div>
          </div>
        </div>

        {/* Progress Bar & Tranche Chips matching B-05 */}
        <div className="space-y-3">
          <div className="w-full h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden flex">
            <div className="h-full bg-[#0E6466] w-1/3 rounded-full"></div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
              <Check className="w-3 h-3 text-[#0E6466]" />
              T1 Disbursed & reconciled
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
              T2 Active · Draft
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
              <Lock className="w-3 h-3 text-[#5A6275]" />
              T3 Locked
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-1">
          <Link
            to="/startup/grants/climate-smart-2026"
            className="px-4 py-2 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
          >
            Open grant
          </Link>
          <Link
            to="/startup/tranches"
            className="text-xs text-[#5A6275] hover:text-[#16213A] hover:underline font-medium"
          >
            Go to tranche workspace
          </Link>
        </div>
      </div>

      {/* Grant 3: Completed Grant Card matching B-05 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1">
              LAKESHORE ENTERPRISE FUND
            </div>
            <h2 className="text-base font-semibold text-[#16213A]">
              Seed Prototype Grant 2025
            </h2>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium shrink-0">
            <Check className="w-3 h-3 text-[#0E6466]" />
            Completed
          </span>
        </div>

        <p className="text-xs text-[#5A6275]">
          Both tranches were disbursed and reconciled. The submission history and audit trail stay available read-only.
        </p>
      </div>

      {/* Empty State Banner (matching bottom of B-05) */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl p-8 shadow-ledger text-center space-y-2">
        <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider">
          EMPTY STATE
        </div>
        <h3 className="font-semibold text-sm text-[#16213A]">
          No grants yet
        </h3>
        <p className="text-xs text-[#5A6275] max-w-md mx-auto">
          When an institution offers your startup a grant, it shows up here and you'll get an email. Your books work the same with or without grants.
        </p>
      </div>
    </div>
  );
};

// B-07: Grant detail & tranche timeline
export const GrantDetailPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
      {/* Top Header matching B-07 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1">
            RIVERBEND INNOVATION TRUST
          </div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Climate-Smart Agriculture Accelerator 2026
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            Award $120,000.00 · Accepted 12 Jan 2026 by Grace M. · Program manager: Sara T.
          </p>
        </div>

        <Link
          to="/startup/tranches"
          className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition"
        >
          Open Tranche 2 workspace
        </Link>
      </div>

      {/* 3 Tranche Cards matching B-07 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Tranche 1: Disbursed & reconciled */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[#16213A]">
                  Tranche 1 · Setup & prototype
                </h3>
                <div className="text-xs font-mono font-medium text-[#16213A] mt-1">
                  40,000.00
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium mb-4">
              <Check className="w-3 h-3 text-[#0E6466]" />
              Disbursed & reconciled
            </span>

            {/* Stepper history matching B-07 */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#0E6466] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div className="text-[#5A6275]">
                  Submitted 02 Jun · SUB-T1-01
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#0E6466] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div className="text-[#5A6275]">
                  Changes requested 11 Jun · 2 lines
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#0E6466] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div className="text-[#5A6275]">
                  Approved for disbursement 03 Jul
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-[#0E6466] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <div className="text-[#5A6275]">
                  Reconciled 18 Jul · ref FT26198KK2
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDD8CC]/50">
            <Link to="/startup/reports" className="text-xs text-[#5A6275] hover:text-[#16213A] hover:underline">
              View submission & audit trail
            </Link>
          </div>
        </div>

        {/* Tranche 2: Active · Draft (Featured Border) */}
        <div className="bg-white border-2 border-[#0E6466] rounded-xl p-5 shadow-ledger flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[#16213A]">
                  Tranche 2 · Pilot deployment
                </h3>
                <div className="text-xs font-mono font-medium text-[#16213A] mt-1">
                  50,000.00
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
              Active · Draft
            </span>

            {/* Tagged so far */}
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-[#5A6275]">Tagged so far</span>
                <span className="font-mono text-[#16213A]">48,200.00</span>
              </div>
              <div className="w-full h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden">
                <div className="h-full bg-[#0E6466] w-[96%] rounded-full"></div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[10px] font-medium shrink-0">
                  <AlertTriangle className="w-2.5 h-2.5" /> Due
                </span>
                <span className="text-[#5A6275]">
                  M-3 Pilot with 200 farmers · 30 Nov
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[10px] font-medium shrink-0">
                  <Clock className="w-2.5 h-2.5" /> Submitted
                </span>
                <span className="text-[#5A6275]">
                  M-4 Sensor network v2 deployed
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDD8CC]/50 text-xs text-[#5A6275]">
            Target submission 30 Nov 2026
          </div>
        </div>

        {/* Tranche 3: Scale-up (Locked) */}
        <div className="bg-[#FAF8F5] border border-[#DDD8CC] rounded-xl p-5 shadow-ledger flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-[#16213A]">
                  Tranche 3 · Scale-up
                </h3>
              </div>
              <div className="text-xs font-mono font-medium text-[#16213A]">
                30,000.00
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium mb-3">
              <Lock className="w-3 h-3 text-[#5A6275]" />
              Locked
            </span>

            <p className="text-xs text-[#5A6275] mb-3">
              Unlocks automatically when all of these are true:
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-white border border-[#DDD8CC] text-[#5A6275] text-[10px]">
                  Not yet
                </span>
                <span className="text-[#5A6275]">
                  Tranche 2 is Disbursed & reconciled
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-white border border-[#DDD8CC] text-[#5A6275] text-[10px]">
                  Not yet
                </span>
                <span className="text-[#5A6275]">
                  Milestone M-4 is Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Table matching B-07 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#FAF8F5] border-b border-[#DDD8CC] flex items-center justify-between">
          <h2 className="text-sm font-serif font-normal text-[#16213A]">
            Milestones
          </h2>
          <Link to="/startup/activity-log" className="text-xs text-[#5A6275] hover:text-[#16213A] hover:underline">
            Activity log
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">ID</th>
                <th className="py-2.5 px-4 text-left font-medium">Milestone</th>
                <th className="py-2.5 px-4 text-left font-medium">Tranche</th>
                <th className="py-2.5 px-4 text-left font-medium">Due</th>
                <th className="py-2.5 px-4 text-left font-medium">Deliverables</th>
                <th className="py-2.5 px-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono text-[#5A6275]">M-1</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">Prototype probe validated in lab</td>
                <td className="py-3 px-4 text-[#5A6275]">T1</td>
                <td className="py-3 px-4 font-mono text-[#5A6275]">15 May</td>
                <td className="py-3 px-4 text-[#5A6275]">2 files</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                    <Check className="w-3 h-3 text-[#0E6466]" /> Verified
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono text-[#5A6275]">M-2</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">Advisory app beta with 20 farmers</td>
                <td className="py-3 px-4 text-[#5A6275]">T1</td>
                <td className="py-3 px-4 font-mono text-[#5A6275]">30 Jun</td>
                <td className="py-3 px-4 text-[#5A6275]">3 files</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                    <Check className="w-3 h-3 text-[#0E6466]" /> Verified
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono text-[#5A6275]">M-3</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">Pilot with 200 farmers</td>
                <td className="py-3 px-4 text-[#5A6275]">T2</td>
                <td className="py-3 px-4 font-mono text-[#5A6275]">30 Nov</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[10px] font-medium">
                    <AlertTriangle className="w-2.5 h-2.5" /> Missing
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                    <Clock className="w-3 h-3" /> In progress
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono text-[#5A6275]">M-4</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">Sensor network v2 deployed at 3 sites</td>
                <td className="py-3 px-4 text-[#5A6275]">T2</td>
                <td className="py-3 px-4 font-mono text-[#5A6275]">30 Nov</td>
                <td className="py-3 px-4 text-[#5A6275]">4 files</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                    <Check className="w-3 h-3" /> Submitted
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#FAF8F5]">
                <td className="py-3 px-4 font-mono text-[#5A6275]">M-5</td>
                <td className="py-3 px-4 font-medium text-[#16213A]">1,000 farmers onboarded</td>
                <td className="py-3 px-4 text-[#5A6275]">T3</td>
                <td className="py-3 px-4 font-mono text-[#5A6275]">31 May 2027</td>
                <td className="py-3 px-4 text-[#5A6275]">—</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span> Not started
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
