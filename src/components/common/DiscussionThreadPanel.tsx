import React, { useState } from 'react';
import { Check, MessageSquare, RotateCcw, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DiscussionTargetType, UserRole } from '../../types';

interface DiscussionThreadPanelProps {
  targetType: DiscussionTargetType;
  targetId: string;
  subject: string;
}

const roleLabels: Record<UserRole, string> = {
  STARTUP_FOUNDER: 'Startup founder',
  INSTITUTION_OFFICER: 'Institution officer',
  PLATFORM_ADMIN: 'Platform admin'
};

const formatTimestamp = (value: string) => value.replace('T', ' ').slice(0, 16);

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const DiscussionThreadPanel: React.FC<DiscussionThreadPanelProps> = ({
  targetType,
  targetId,
  subject
}) => {
  const { discussionThreads, addDiscussionReply, setDiscussionThreadResolved } = useApp();
  const [reply, setReply] = useState('');

  const thread = discussionThreads.find(
    (item) => item.targetType === targetType && item.targetId === targetId
  );
  const isResolved = thread?.status === 'RESOLVED';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const body = reply.trim();
    if (!body) return;

    addDiscussionReply(targetType, targetId, subject, body);
    setReply('');
  };

  return (
    <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDD8CC] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E8F3F1] border border-[#0E6466]/20 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-[#0E6466]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#16213A]">Discussion thread</h2>
            <p className="text-[11px] font-mono text-[#5A6275] mt-0.5">{subject}</p>
          </div>
        </div>

        {thread ? (
          <button
            type="button"
            onClick={() => setDiscussionThreadResolved(thread.id, !isResolved)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border transition ${
              isResolved
                ? 'bg-[#F1EEE7] border-[#DDD8CC] text-[#5A6275] hover:bg-white'
                : 'bg-[#E8F3F1] border-[#0E6466]/20 text-[#0E6466] hover:bg-white'
            }`}
          >
            {isResolved ? <RotateCcw className="w-3 h-3" /> : <Check className="w-3 h-3" />}
            {isResolved ? 'Reopen thread' : 'Resolve thread'}
          </button>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[11px] text-[#5A6275]">
            No replies yet
          </span>
        )}
      </div>

      {thread ? (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {thread.replies.map((entry) => (
            <div key={entry.id} className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 flex items-center justify-center text-[10px] font-semibold text-[#0E6466] shrink-0">
                {initials(entry.authorName)}
              </div>
              <div className="flex-1 bg-[#FAF8F5] border border-[#DDD8CC]/70 rounded-lg p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#16213A]">{entry.authorName}</span>
                  <span className="text-[10px] font-mono text-[#5A6275]">
                    {formatTimestamp(entry.createdAt)}
                  </span>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-wide text-[#5A6275] mt-0.5">
                  {roleLabels[entry.authorRole]}
                </p>
                <p className="text-xs text-[#16213A] leading-relaxed whitespace-pre-wrap mt-2">
                  {entry.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#5A6275] leading-relaxed">
          Start the conversation about this item. Replies are timestamped and visible to both parties.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[#DDD8CC]">
        <textarea
          rows={2}
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          placeholder="Write a reply..."
          className="flex-1 bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs text-[#16213A] placeholder-[#5A6275]/70 shadow-ledger focus:outline-none focus:border-[#0E6466] resize-none"
        />
        <button
          type="submit"
          disabled={!reply.trim()}
          className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium shadow-ledger transition ${
            reply.trim()
              ? 'bg-[#0E6466] hover:bg-[#0B4F51] text-white'
              : 'bg-[#EAE6DD] text-[#5A6275] cursor-not-allowed'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          Reply
        </button>
      </form>
    </div>
  );
};
