export type UserRole = 'STARTUP_FOUNDER' | 'INSTITUTION_OFFICER' | 'PLATFORM_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organizationId: string;
  organizationName: string;
}

export type TrancheStatus = 
  | 'DRAFT'
  | 'ACTIVE'
  | 'SUBMITTED'
  | 'PENDING_REVIEW'
  | 'CHANGES_REQUESTED'
  | 'APPROVED_FOR_DISBURSEMENT'
  | 'DISBURSED_AND_RECONCILED';

export type RejectionReasonCode = 
  | 'INVALID_RECEIPT'
  | 'INELIGIBLE_CATEGORY'
  | 'AMOUNT_MISMATCH'
  | 'DUPLICATE_CLAIM';

export interface Grant {
  id: string;
  programId: string;
  programName: string;
  startupId: string;
  startupName: string;
  institutionName: string;
  totalAwarded: number;
  totalReceived: number;
  totalSpent: number;
  remainingAmount: number;
  currency: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED' | 'UNDER_REVIEW';
  agreementDate: string;
  endDate: string;
  eligibleCategories: string[];
}

export interface Tranche {
  id: string;
  grantId: string;
  trancheNumber: number;
  amount: number;
  status: TrancheStatus;
  releaseConditions: string;
  milestoneIds: string[];
  submissionDate?: string;
  approvedDate?: string;
  disbursedDate?: string;
  paymentReference?: string;
  bankProofUrl?: string;
  reviewerComments?: string;
}

export interface Milestone {
  id: string;
  grantId: string;
  title: string;
  description: string;
  dueDate: string;
  completionPercentage: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED' | 'DELAYED';
  deliverablesCount: number;
  commentsCount: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string; // e.g., 'Operating Bank', 'Grant Escrow', 'Payroll'
  debit: number;
  credit: number;
  grantId?: string;
  trancheId?: string;
  receiptId?: string;
  merchantName?: string;
  submissionStatus?: 'UNSUBMITTED' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CORRECTION_NEEDED';
  isLocked?: boolean;
  reviewReason?: RejectionReasonCode;
  reviewComment?: string;
}

export interface DocumentEvidence {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'png' | 'jpg';
  uploadDate: string;
  category: string;
  merchantName: string;
  transactionDate: string;
  amount: number;
  currency: string;
  verificationStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED_DUPLICATE' | 'REJECTED';
  previewUrl: string;
  isDuplicateWarning?: boolean;
}

export interface BudgetCategory {
  id: string;
  grantId: string;
  name: string;
  allocated: number;
  actualSpent: number;
  variance: number;
  percentageUsed: number;
}

export interface SubmissionPackage {
  id: string;
  grantId: string;
  trancheId: string;
  startupName: string;
  submissionDate: string;
  totalClaimed: number;
  itemsCount: number;
  status: TrancheStatus;
  signedBy?: string;
  signedAt?: string;
  signatureTitle?: string;
  validationRef?: string;
  reviewedItemsCount: number;
  approvedItemsCount: number;
  rejectedItemsCount: number;
  items: {
    transactionId: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    evidenceId?: string;
    merchantName?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CORRECTION_REQUESTED';
    rejectionReason?: RejectionReasonCode;
    reviewerComment?: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'SUBMISSION_APPROVED' | 'SUBMISSION_REJECTED' | 'CHANGES_REQUESTED' | 'MILESTONE_ALERT' | 'MISSING_DOC' | 'TRANCHE_UNLOCKED' | 'COMMENT';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
