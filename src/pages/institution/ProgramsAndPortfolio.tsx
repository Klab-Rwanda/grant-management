import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  ExternalLink, 
  FolderKanban, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const GrantPrograms: React.FC = () => {
  const { grants } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progName, setProgName] = useState('');
  const [pool, setPool] = useState<number>(1000000);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Grant Programs & Funding Facilities
          </h2>
          <p className="text-xs text-slate-500">
            Configure funding pools, eligibility criteria, and participating cohort requirements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center gap-1.5 transition self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Grant Facility</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                ACTIVE PROGRAM
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                DeepTech Horizon Phase II Catalyst
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">$2,500,000 Total Pool</span>
          </div>
          <p className="text-xs text-slate-500">
            Focus area: Synthetic biology, genomic therapeutics, and cellular manufacturing pipelines.
          </p>

          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Grantees</span>
              <span className="font-bold text-slate-900 dark:text-white">4 Startups</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Committed</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">$1,750,000</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Disbursed</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">$850,000</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Reporting: Quarterly GAAP audit</span>
            <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              <span>Manage Cohort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                CALL FOR PROPOSALS
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                CleanBio Sustainable Carbon Acceleration
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">$1,500,000 Total Pool</span>
          </div>
          <p className="text-xs text-slate-500">
            Focus area: Industrial bioreactors, microbial protein synthesis, and enzymatic degradation.
          </p>

          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Grantees</span>
              <span className="font-bold text-slate-900 dark:text-white">2 Startups</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Committed</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">$500,000</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Disbursed</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">$200,000</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Reporting: Bi-annual milestone verification</span>
            <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              <span>Manage Cohort</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Program Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Grant Facility Program"
        description="Establish funding guidelines, budget allocations, and reporting cadence."
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Program Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Clean Energy Innovations 2027"
              value={progName}
              onChange={(e) => setProgName(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Total Dedicated Funding Pool ($)</label>
            <input
              type="number"
              required
              step="50000"
              value={pool}
              onChange={(e) => setPool(Number(e.target.value))}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
            />
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
              Initialize Program
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export const StartupPortfolio: React.FC = () => {
  const { grants } = useApp();

  const cohort = [
    {
      id: 'org-bio-01',
      name: 'BioGenix Labs Inc.',
      grant: 'DeepTech Horizon Phase II Catalyst',
      awarded: 500000,
      disbursed: 250000,
      spent: 184500,
      milestonesCompleted: '3 / 5',
      compliance: 'COMPLIANT',
      lastSubmission: '2026-11-18'
    },
    {
      id: 'org-nano-02',
      name: 'NanoMesh Quantum Devices',
      grant: 'DeepTech Horizon Phase II Catalyst',
      awarded: 450000,
      disbursed: 200000,
      spent: 155000,
      milestonesCompleted: '2 / 4',
      compliance: 'COMPLIANT',
      lastSubmission: '2026-10-24'
    },
    {
      id: 'org-eco-03',
      name: 'EcoCarbon Capture',
      grant: 'CleanBio Sustainable Carbon Acceleration',
      awarded: 600000,
      disbursed: 300000,
      spent: 280000,
      milestonesCompleted: '4 / 6',
      compliance: 'ATTENTION_NEEDED',
      lastSubmission: '2026-11-02'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Startup Portfolio & Grantee Directory
        </h2>
        <p className="text-xs text-slate-500">
          Cohort financial health, compliance tracking, and tranche burn rates.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-3 px-4">Organization Name</th>
                <th className="py-3 px-4">Grant Program</th>
                <th className="py-3 px-4 text-right">Awarded</th>
                <th className="py-3 px-4 text-right">Disbursed</th>
                <th className="py-3 px-4 text-right">Audited Spent</th>
                <th className="py-3 px-4 text-center">Milestones</th>
                <th className="py-3 px-4 text-center">Compliance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {cohort.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    {s.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {s.grant}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium">
                    ${s.awarded.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-blue-600 dark:text-blue-400">
                    ${s.disbursed.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    ${s.spent.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    {s.milestonesCompleted}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <StatusBadge status={s.compliance} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                      View Profile
                    </button>
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
