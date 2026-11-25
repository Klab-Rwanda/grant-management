import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileUp, 
  MessageSquare, 
  Award, 
  Sliders,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const Milestones: React.FC = () => {
  const { milestones, updateMilestoneProgress, activeGrant } = useApp();
  const [selectedMilestone, setSelectedMilestone] = useState<any | null>(null);
  const [newProgress, setNewProgress] = useState<number>(50);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMilestone) {
      updateMilestoneProgress(selectedMilestone.id, Number(newProgress));
      setSelectedMilestone(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Milestone Progression & Deliverable Verification
        </h2>
        <p className="text-xs text-slate-500">
          Track technical achievements, upload deliverable dossiers, and qualify for tranche unlocks.
        </p>
      </div>

      {/* Milestones list */}
      <div className="space-y-4">
        {milestones.map((ms) => {
          return (
            <div
              key={ms.id}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {ms.title}
                    </span>
                    <StatusBadge status={ms.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    {ms.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedMilestone(ms);
                      setNewProgress(ms.completionPercentage);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    Update Progress
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-400">Deliverable Completion</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {ms.completionPercentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      ms.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${ms.completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer info: deliverables & comments */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Due Date: <strong className="text-slate-700 dark:text-slate-300">{ms.dueDate}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileUp className="w-3.5 h-3.5" />
                    {ms.deliverablesCount} Attached Deliverables
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {ms.commentsCount} Reviewer Notes
                  </span>
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  ID: {ms.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress update modal */}
      {selectedMilestone && (
        <Modal
          isOpen={!!selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
          title={`Update Progress: ${selectedMilestone.title}`}
          description="Adjust completion metric and milestone deliverable status."
        >
          <form onSubmit={handleUpdate} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Completion Percentage: {newProgress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                Deliverable Summary / Lab Notes
              </label>
              <textarea
                rows={3}
                placeholder="Describe current benchmark findings or attach protocol notes..."
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedMilestone(null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg"
              >
                Save Milestone Update
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
