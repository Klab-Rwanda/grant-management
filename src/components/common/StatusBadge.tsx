import React from 'react';
import clsx from 'clsx';
import { 
  Check, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Lock, 
  CheckCircle2, 
  Clock,
  CircleDashed,
  Radio
} from 'lucide-react';
import { TrancheStatus, RejectionReasonCode } from '../../types';

interface StatusBadgeProps {
  status: TrancheStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyleAndIcon = () => {
    switch (status) {
      case 'DISBURSED_AND_RECONCILED':
      case 'APPROVED':
      case 'VERIFIED':
      case 'COMPLETED':
      case 'Active':
      case 'Success':
        return {
          bg: 'bg-[#E4F1E8] text-[#1D5E3A] border-[#C8E4D1]',
          icon: <Check className="w-3 h-3 stroke-[2.5]" />,
          label: status === 'DISBURSED_AND_RECONCILED' ? 'Disbursed & reconciled' : status
        };

      case 'APPROVED_FOR_DISBURSEMENT':
        return {
          bg: 'bg-[#E4F1E8] text-[#1D5E3A] border-[#C8E4D1]',
          icon: <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />,
          label: 'Approved for disbursement'
        };

      case 'ACTIVE':
        return {
          bg: 'bg-[#E4F1E8] text-[#1D5E3A] border-[#C8E4D1]',
          icon: <span className="w-2 h-2 rounded-full bg-[#1D5E3A]" />,
          label: 'Active · Draft'
        };

      case 'SUBMITTED_PENDING_REVIEW':
      case 'PENDING_REVIEW':
      case 'SUBMITTED':
      case 'Pending':
      case 'IN_PROGRESS':
        return {
          bg: 'bg-[#E5EEF9] text-[#1E4E8C] border-[#CADDF4]',
          icon: <Clock className="w-3 h-3 stroke-[2.5]" />,
          label: 'Submitted · in review'
        };

      case 'CHANGES_REQUESTED':
      case 'Warning':
      case 'Attention':
        return {
          bg: 'bg-[#FBF0D9] text-[#7A4A00] border-[#F4DCAC]',
          icon: <AlertTriangle className="w-3 h-3 stroke-[2.5]" />,
          label: 'Changes requested'
        };

      case 'REJECTED':
      case 'Suspended':
      case 'Error':
      case 'DUPLICATE_FILE_DETECTED':
      case 'FLAGGED_DUPLICATE':
        return {
          bg: 'bg-[#FBE6E4] text-[#9B1C1C] border-[#F7C6C2]',
          icon: <XCircle className="w-3 h-3 stroke-[2.5]" />,
          label: status === 'FLAGGED_DUPLICATE' ? 'Duplicate file' : status
        };

      case 'LOCKED':
      case 'Locked':
        return {
          bg: 'bg-[#ECEAE4] text-[#4A5266] border-[#DDD8CC]',
          icon: <Lock className="w-3 h-3 stroke-[2.5]" />,
          label: 'Locked'
        };

      case 'DRAFT':
      case 'Pending verification':
      case 'Invite pending':
      default:
        return {
          bg: 'bg-[#ECEAE4] text-[#4A5266] border-[#DDD8CC]',
          icon: <CircleDashed className="w-3 h-3 stroke-[2.5]" />,
          label: status.replace(/_/g, ' ')
        };
    }
  };

  const { bg, icon, label } = getStyleAndIcon();

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium border rounded-pill whitespace-nowrap leading-none',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        bg
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </span>
  );
};

export const RejectionReasonBadge: React.FC<{ reason: RejectionReasonCode | string }> = ({ reason }) => {
  const labels: Record<string, string> = {
    INVALID_RECEIPT: 'INVALID_RECEIPT',
    INELIGIBLE_CATEGORY: 'INELIGIBLE_CATEGORY',
    AMOUNT_MISMATCH: 'AMOUNT_MISMATCH',
    DUPLICATE_CLAIM: 'DUPLICATE_CLAIM'
  };

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#FBE6E4] text-[#9B1C1C] border border-[#F7C6C2]">
      {labels[reason] || reason}
    </span>
  );
};
