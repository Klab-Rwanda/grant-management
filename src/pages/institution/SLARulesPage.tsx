import React, { useState } from 'react';
import { ChevronDown, Check, Save } from 'lucide-react';

interface StageSLA {
  timer: string;
  target: number;
  remindAt: number;
  escalateTo: string;
}

export const SLARulesPage: React.FC = () => {
  const [stages, setStages] = useState<StageSLA[]>([
    {
      timer: 'Stage 1 · Financial review',
      target: 10,
      remindAt: 7,
      escalateTo: 'Program Manager',
    },
    {
      timer: 'Stage 2 · Committee sign-off',
      target: 5,
      remindAt: 3,
      escalateTo: 'Program Manager',
    },
    {
      timer: 'Payout reconciliation after approval',
      target: 2,
      remindAt: 4,
      escalateTo: 'Program Manager',
    },
  ]);

  // Startup side rules
  const [changesReplyDays, setChangesReplyDays] = useState(7);
  const [milestoneReminderDays, setMilestoneReminderDays] = useState(3);
  const [offerResponseDays, setOfferResponseDays] = useState(14);

  // Channels for SLA alerts
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(false);

  const [savedNotice, setSavedNotice] = useState(false);

  const updateStage = (index: number, field: keyof StageSLA, value: any) => {
    const updated = [...stages];
    updated[index] = { ...updated[index], [field]: value };
    setStages(updated);
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-[#5A6672] mb-1">
          <span>Settings</span>
          <span>/</span>
          <span className="text-[#16213A] font-medium">SLA rules</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#16213A]">
              SLA rules & reminders
            </h1>
            <p className="text-xs text-[#5A6672] mt-0.5">
              Applies to all programs unless a program overrides it · Business days exclude weekends and the holiday calendar below
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#0E6466] hover:bg-[#0b4d4f] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save rules
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>SLA rules and alert thresholds updated successfully.</span>
        </div>
      )}

      {/* Card 1: Institution side */}
      <div className="bg-white rounded-xl border border-[#DDD8CC] shadow-sm overflow-hidden p-6 space-y-4">
        <h2 className="text-base font-serif font-bold text-[#16213A]">Institution side</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF9F5] text-[#5A6672] border-b border-[#DDD8CC]">
                <th className="py-2.5 px-3 font-semibold w-1/3">Timer</th>
                <th className="py-2.5 px-3 font-semibold text-center w-28">Target (business days)</th>
                <th className="py-2.5 px-3 font-semibold text-center w-28">Remind at</th>
                <th className="py-2.5 px-3 font-semibold">Escalate to</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]">
              {stages.map((stage, idx) => {
                const isError = stage.remindAt >= stage.target;

                return (
                  <tr key={idx} className="hover:bg-[#FAF9F5]/50 transition">
                    <td className="py-3 px-3 font-medium text-[#16213A]">
                      {stage.timer}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={stage.target}
                        onChange={(e) => updateStage(idx, 'target', parseInt(e.target.value) || 0)}
                        className={`w-20 px-2.5 py-1.5 text-center font-mono rounded-lg border text-xs focus:outline-none ${
                          isError
                            ? 'border-[#C53030] text-[#C53030] bg-[#FFF5F5]'
                            : 'border-[#DDD8CC] text-[#16213A] focus:border-[#0E6466]'
                        }`}
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={stage.remindAt}
                        onChange={(e) => updateStage(idx, 'remindAt', parseInt(e.target.value) || 0)}
                        className={`w-20 px-2.5 py-1.5 text-center font-mono rounded-lg border text-xs focus:outline-none ${
                          isError
                            ? 'border-[#C53030] text-[#C53030] bg-[#FFF5F5]'
                            : 'border-[#DDD8CC] text-[#16213A] focus:border-[#0E6466]'
                        }`}
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="relative">
                        <select
                          value={stage.escalateTo}
                          onChange={(e) => updateStage(idx, 'escalateTo', e.target.value)}
                          className="w-full appearance-none px-3 py-1.5 bg-white border border-[#DDD8CC] rounded-lg text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466] pr-8"
                        >
                          <option value="Program Manager">Program Manager</option>
                          <option value="Lead Reviewer">Lead Reviewer</option>
                          <option value="Finance Director">Finance Director</option>
                          <option value="Investment Committee Chair">Investment Committee Chair</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-[#5A6672] absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Error notice if remindAt >= target */}
        {stages.some((s) => s.remindAt >= s.target) && (
          <div className="flex items-center gap-1.5 text-xs text-[#C53030] pt-1 font-medium">
            <span className="w-3.5 h-3.5 rounded-full border border-[#C53030] flex items-center justify-center text-[10px] font-bold">⊗</span>
            <span>
              The reminder (day {stages.find((s) => s.remindAt >= s.target)?.remindAt}) must come before the target (day {stages.find((s) => s.remindAt >= s.target)?.target})
            </span>
          </div>
        )}
      </div>

      {/* Card 2: Startup side */}
      <div className="bg-white rounded-xl border border-[#DDD8CC] shadow-sm p-6 space-y-4">
        <h2 className="text-base font-serif font-bold text-[#16213A]">Startup side</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1.5">
              Reply to changes requested (days)
            </label>
            <input
              type="number"
              min="1"
              value={changesReplyDays}
              onChange={(e) => setChangesReplyDays(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs font-mono text-right text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1.5">
              Milestone due reminder (days before)
            </label>
            <input
              type="number"
              min="1"
              value={milestoneReminderDays}
              onChange={(e) => setMilestoneReminderDays(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs font-mono text-right text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#16213A] mb-1.5">
              Offer response window (days)
            </label>
            <input
              type="number"
              min="1"
              value={offerResponseDays}
              onChange={(e) => setOfferResponseDays(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white border border-[#DDD8CC] rounded-lg text-xs font-mono text-right text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
        </div>
      </div>

      {/* Card 3: Channels for SLA alerts */}
      <div className="bg-white rounded-xl border border-[#DDD8CC] shadow-sm p-6 space-y-4">
        <h2 className="text-base font-serif font-bold text-[#16213A]">Channels for SLA alerts</h2>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-xs font-medium text-[#16213A] cursor-pointer">
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0 cursor-pointer"
            />
            <span>Email</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-[#16213A] cursor-pointer">
            <input
              type="checkbox"
              checked={inAppAlerts}
              onChange={(e) => setInAppAlerts(e.target.checked)}
              className="w-4 h-4 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0 cursor-pointer"
            />
            <span>In-app</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-[#16213A] cursor-pointer">
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0 cursor-pointer"
            />
            <span>SMS</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-[#16213A] cursor-pointer">
            <input
              type="checkbox"
              checked={whatsAppAlerts}
              onChange={(e) => setWhatsAppAlerts(e.target.checked)}
              className="w-4 h-4 rounded border-[#DDD8CC] text-[#0E6466] focus:ring-0 cursor-pointer"
            />
            <span>WhatsApp</span>
          </label>
        </div>

        <p className="text-xs text-[#5A6672] pt-2">
          Each user can still mute non-critical channels in their own preferences. Escalations always go by email.
        </p>
      </div>
    </div>
  );
};
