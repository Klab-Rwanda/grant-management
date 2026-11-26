import React, { useState } from 'react';
import { 
  Check, 
  AlertTriangle, 
  Clock, 
  UploadCloud, 
  ArrowRight,
  FileText,
  Lock,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Milestones: React.FC = () => {
  // Deliverables states matching B-08 screenshot
  const [deliverables, setDeliverables] = useState([
    {
      id: 'del-1',
      name: 'Farmer enrolment list (anonymised)',
      file: 'm3-enrolment-v2.xlsx · 88 KB',
      status: 'Uploaded',
      actionType: 'Replace'
    },
    {
      id: 'del-2',
      name: 'Pilot summary report',
      file: 'No file yet',
      status: 'Missing',
      actionType: 'Upload'
    },
    {
      id: 'del-3',
      name: 'Field photos (optional)',
      file: '12 images · 21 MB',
      status: 'Uploaded',
      actionType: 'Manage'
    }
  ]);

  const handleUploadClick = (id: string) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          file: 'pilot_summary_v1.pdf · 2.4 MB',
          status: 'Uploaded',
          actionType: 'Replace'
        };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
      {/* Header matching B-08 */}
      <div>
        <div className="text-[11px] font-semibold text-[#5A6275] uppercase tracking-wider mb-1">
          CLIMATE-SMART AGRI 2026 · TRANCHE 2
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              M-3 · Pilot with 200 farmers
            </h1>
            <p className="text-xs text-[#5A6275] mt-1 font-sans">
              Due 30 Nov 2026 · Owner Joel K. · Verified by the funder's reviewer during tranche review
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-xs font-medium shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
            In progress
          </span>
        </div>
      </div>

      {/* Warning banner matching B-08 */}
      <div className="p-4 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl flex items-start gap-3 text-xs text-[#92400E]">
        <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-[#B45309]">
            A deliverable is required before Tranche 2 can be submitted
          </div>
          <div className="text-xs text-[#92400E] mt-0.5">
            The funder asks for: <strong>farmer enrolment list (anonymised)</strong> and a <strong>pilot summary report</strong>.
          </div>
        </div>
      </div>

      {/* Main Grid: Left Required deliverables (span-2) + Right Sidebar (span-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Required Deliverables) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-5">
            <h2 className="text-base font-serif font-normal text-[#16213A]">
              Required deliverables
            </h2>

            <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                    <th className="py-2.5 px-4 text-left font-medium">Deliverable</th>
                    <th className="py-2.5 px-4 text-left font-medium">File</th>
                    <th className="py-2.5 px-4 text-left font-medium">Status</th>
                    <th className="py-2.5 px-4 text-right font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
                  {deliverables.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF8F5] transition">
                      <td className="py-3 px-4 font-medium text-[#16213A]">
                        {item.name}
                      </td>

                      <td className="py-3 px-4 font-mono text-[#5A6275] text-[11px]">
                        {item.file}
                      </td>

                      <td className="py-3 px-4">
                        {item.status === 'Uploaded' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                            <Check className="w-3 h-3 text-[#0E6466]" />
                            Uploaded
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                            <AlertTriangle className="w-3 h-3 text-[#D97706]" />
                            Missing
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {item.actionType === 'Upload' ? (
                          <button
                            onClick={() => handleUploadClick(item.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white text-xs font-medium shadow-ledger transition"
                          >
                            Upload
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUploadClick(item.id)}
                            className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition"
                          >
                            {item.actionType}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Drop files box matching B-08 */}
            <div className="p-8 border-2 border-dashed border-[#DDD8CC] rounded-xl bg-white text-center space-y-2">
              <div className="font-semibold text-xs text-[#16213A]">
                Drop files here or choose files
              </div>
              <p className="text-[11px] text-[#5A6275]">
                PDF, PNG, JPEG, XLSX up to 25 MB each. Each file is fingerprinted (SHA-256) on upload.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => handleUploadClick('del-2')}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger"
                >
                  Choose files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Milestone status values + Linked activity */}
        <div className="space-y-6">
          {/* Card 1: Milestone status values */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
            <h3 className="text-sm font-semibold text-[#16213A]">
              Milestone status values
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5A6275]"></span>
                  Not started
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px]">
                  <Clock className="w-3 h-3 text-[#3B82F6]" />
                  In progress
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px]">
                  <Check className="w-3 h-3 text-[#3B82F6]" />
                  Submitted
                </span>
                <span className="text-[11px] text-[#5A6275]">
                  Locked with the tranche
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px]">
                  <Check className="w-3 h-3 text-[#0E6466]" />
                  Verified
                </span>
                <span className="text-[11px] text-[#5A6275]">
                  Set by the reviewer
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#5A6275] pt-2 border-t border-[#DDD8CC]/50 leading-relaxed font-sans">
              Assumption #8: these display values stand in for the undefined <code className="px-1 py-0.5 bg-[#FAF8F5] border border-[#DDD8CC] rounded font-mono text-[10px]">completion_status</code> enum.
            </p>
          </div>

          {/* Card 2: Linked activity */}
          <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
            <h3 className="text-sm font-semibold text-[#16213A]">
              Linked activity
            </h3>

            <div className="p-2.5 bg-[#FAF8F5] border border-[#DDD8CC] rounded-lg text-xs font-mono text-[#5A6275]">
              01 Oct · Agronomist contracted
            </div>

            <div className="pt-1">
              <Link
                to="/startup/activity-log"
                className="text-xs text-[#0E6466] hover:underline font-medium block"
              >
                Log an event for this milestone
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
