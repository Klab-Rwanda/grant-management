import { 
  User, Grant, Tranche, Milestone, Transaction, 
  DocumentEvidence, BudgetCategory, SubmissionPackage, NotificationItem,
  DiscussionThread
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  startup: {
    id: 'user-startup-01',
    name: 'Elena Rostova',
    email: 'elena@biogenix-labs.io',
    role: 'STARTUP_FOUNDER',
    organizationId: 'org-bio-01',
    organizationName: 'BioGenix Labs Inc.',
  },
  institution: {
    id: 'user-inst-01',
    name: 'Marcus Vance',
    email: 'm.vance@innovate-capital.org',
    role: 'INSTITUTION_OFFICER',
    organizationId: 'org-innovate-found',
    organizationName: 'Global Innovation & Technology Fund',
  },
  admin: {
    id: 'user-admin-01',
    name: 'Sarah Chen',
    email: 'sarah.chen@grantstack-core.gov',
    role: 'PLATFORM_ADMIN',
    organizationId: 'org-platform-root',
    organizationName: 'GrantStack Governance Global',
  }
};

export const INITIAL_GRANTS: Grant[] = [
  {
    id: 'grant-2026-alpha',
    programId: 'prog-deeptech-seed',
    programName: 'DeepTech Horizon Phase II Catalyst',
    startupId: 'org-bio-01',
    startupName: 'BioGenix Labs Inc.',
    institutionName: 'Global Innovation & Technology Fund',
    totalAwarded: 500000,
    totalReceived: 250000,
    totalSpent: 184500,
    remainingAmount: 315500,
    currency: 'USD',
    status: 'ACTIVE',
    agreementDate: '2026-01-15',
    endDate: '2027-01-15',
    eligibleCategories: ['R&D Equipment', 'Clinical Testing', 'Personnel & Engineering', 'Patent & Legal', 'Operations & Cloud']
  },
  {
    id: 'grant-2026-beta',
    programId: 'prog-cleantech-scale',
    programName: 'CleanBio Clean Energy Acceleration',
    startupId: 'org-bio-01',
    startupName: 'BioGenix Labs Inc.',
    institutionName: 'Sustainable Future Alliance',
    totalAwarded: 250000,
    totalReceived: 100000,
    totalSpent: 42000,
    remainingAmount: 208000,
    currency: 'USD',
    status: 'ACTIVE',
    agreementDate: '2026-03-01',
    endDate: '2027-03-01',
    eligibleCategories: ['Hardware Prototypes', 'Pilot Trials', 'Direct Operations']
  }
];

export const INITIAL_TRANCHES: Tranche[] = [
  {
    id: 'tranche-01',
    grantId: 'grant-2026-alpha',
    trancheNumber: 1,
    amount: 150000,
    status: 'DISBURSED_AND_RECONCILED',
    releaseConditions: 'Initial grant execution & laboratory workspace establishment',
    milestoneIds: ['ms-01'],
    submissionDate: '2026-02-01',
    approvedDate: '2026-02-10',
    disbursedDate: '2026-02-14',
    paymentReference: 'WIRE-94829104-FED',
    bankProofUrl: 'https://docs.sample.com/wire-confirm-01.pdf',
    reviewerComments: 'Full compliance verified. Wire completed via Silicon Valley Commercial Bank.'
  },
  {
    id: 'tranche-02',
    grantId: 'grant-2026-alpha',
    trancheNumber: 2,
    amount: 100000,
    status: 'DISBURSED_AND_RECONCILED',
    releaseConditions: 'Phase 1 Enzyme prototype synthesis & validation test report',
    milestoneIds: ['ms-02'],
    submissionDate: '2026-06-12',
    approvedDate: '2026-06-20',
    disbursedDate: '2026-06-25',
    paymentReference: 'WIRE-11883920-CHASE',
    bankProofUrl: 'https://docs.sample.com/wire-confirm-02.pdf',
    reviewerComments: 'Enzyme yield milestone verified by Dr. Albright. Line items confirmed.'
  },
  {
    id: 'tranche-03',
    grantId: 'grant-2026-alpha',
    trancheNumber: 3,
    amount: 150000,
    status: 'PENDING_REVIEW',
    releaseConditions: 'Animal trial safety clearance and initial biomanufacturing scale test',
    milestoneIds: ['ms-03', 'ms-04'],
    submissionDate: '2026-11-18',
    reviewerComments: 'Under audit by Financial Reviewer Marcus Vance.'
  },
  {
    id: 'tranche-04',
    grantId: 'grant-2026-alpha',
    trancheNumber: 4,
    amount: 100000,
    status: 'ACTIVE',
    releaseConditions: 'Phase II Clinical Trial filing and regulatory clearance submission',
    milestoneIds: ['ms-05']
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'ms-01',
    grantId: 'grant-2026-alpha',
    title: 'Lab Setup & Equipment Calibration',
    description: 'Procurement of biosafety cabinet, mass spectrometer calibration, cleanroom qualification.',
    dueDate: '2026-02-28',
    completionPercentage: 100,
    status: 'VERIFIED',
    deliverablesCount: 4,
    commentsCount: 2
  },
  {
    id: 'ms-02',
    grantId: 'grant-2026-alpha',
    title: 'Enzyme Expression & Purification Protocol',
    description: 'Achieve >98% purity target for recombinant biocatalysts with chromatographic verification.',
    dueDate: '2026-06-15',
    completionPercentage: 100,
    status: 'VERIFIED',
    deliverablesCount: 3,
    commentsCount: 5
  },
  {
    id: 'ms-03',
    grantId: 'grant-2026-alpha',
    title: 'In-Vitro Biocompatibility Benchmarking',
    description: 'Mammalian cellular cytotoxicity screening and dose-response stability tests.',
    dueDate: '2026-11-30',
    completionPercentage: 90,
    status: 'IN_PROGRESS',
    deliverablesCount: 5,
    commentsCount: 3
  },
  {
    id: 'ms-04',
    grantId: 'grant-2026-alpha',
    title: 'Pre-clinical Pilot Batch Synthesis',
    description: 'Demonstrate continuous 50L bioreactor yield consistency without protein degradation.',
    dueDate: '2026-12-15',
    completionPercentage: 75,
    status: 'IN_PROGRESS',
    deliverablesCount: 2,
    commentsCount: 1
  },
  {
    id: 'ms-05',
    grantId: 'grant-2026-alpha',
    title: 'FDA IND Dossier Preparation',
    description: 'Comprehensive regulatory compilation and safety toxicology compilation for IND submission.',
    dueDate: '2027-01-10',
    completionPercentage: 80,
    status: 'IN_PROGRESS',
    deliverablesCount: 1,
    commentsCount: 0
  }
];

export const INITIAL_BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'bcat-01',
    grantId: 'grant-2026-alpha',
    name: 'R&D Equipment',
    allocated: 140000,
    actualSpent: 112500,
    variance: 27500,
    percentageUsed: 80.3
  },
  {
    id: 'bcat-02',
    grantId: 'grant-2026-alpha',
    name: 'Clinical Testing',
    allocated: 120000,
    actualSpent: 89000,
    variance: 31000,
    percentageUsed: 74.1
  },
  {
    id: 'bcat-03',
    grantId: 'grant-2026-alpha',
    name: 'Personnel & Engineering',
    allocated: 150000,
    actualSpent: 125000,
    variance: 25000,
    percentageUsed: 83.3
  },
  {
    id: 'bcat-04',
    grantId: 'grant-2026-alpha',
    name: 'Patent & Legal',
    allocated: 45000,
    actualSpent: 28000,
    variance: 17000,
    percentageUsed: 62.2
  },
  {
    id: 'bcat-05',
    grantId: 'grant-2026-alpha',
    name: 'Operations & Cloud',
    allocated: 45000,
    actualSpent: 34500,
    variance: 10500,
    percentageUsed: 76.6
  }
];

export const INITIAL_DOCUMENTS: DocumentEvidence[] = [
  {
    id: 'doc-101',
    fileName: 'Spectrometry_Equip_Invoice_9821.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    uploadDate: '2026-11-12',
    category: 'R&D Equipment',
    merchantName: 'Agilent Technologies',
    transactionDate: '2026-11-10',
    amount: 34500,
    currency: 'USD',
    verificationStatus: 'VERIFIED',
    previewUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
    isDuplicateWarning: false
  },
  {
    id: 'doc-102',
    fileName: 'Bioreactor_Parts_Consumables.pdf',
    fileSize: '1.1 MB',
    fileType: 'pdf',
    uploadDate: '2026-11-14',
    category: 'R&D Equipment',
    merchantName: 'Thermo Fisher Scientific',
    transactionDate: '2026-11-13',
    amount: 14200,
    currency: 'USD',
    verificationStatus: 'VERIFIED',
    previewUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-103',
    fileName: 'Cellular_Viability_Assay_Reagents.png',
    fileSize: '840 KB',
    fileType: 'png',
    uploadDate: '2026-11-15',
    category: 'Clinical Testing',
    merchantName: 'Sigma-Aldrich / Millipore',
    transactionDate: '2026-11-14',
    amount: 8750,
    currency: 'USD',
    verificationStatus: 'PENDING',
    previewUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-104',
    fileName: 'Patent_Prosecution_US89212.pdf',
    fileSize: '3.8 MB',
    fileType: 'pdf',
    uploadDate: '2026-11-16',
    category: 'Patent & Legal',
    merchantName: 'Cooley LLP IP Counsel',
    transactionDate: '2026-11-15',
    amount: 12500,
    currency: 'USD',
    verificationStatus: 'VERIFIED',
    previewUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'doc-105',
    fileName: 'Duplicate_Test_Receipt.jpg',
    fileSize: '512 KB',
    fileType: 'jpg',
    uploadDate: '2026-11-17',
    category: 'Operations & Cloud',
    merchantName: 'Amazon Web Services',
    transactionDate: '2026-11-01',
    amount: 3200,
    currency: 'USD',
    verificationStatus: 'FLAGGED_DUPLICATE',
    isDuplicateWarning: true,
    previewUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-501',
    date: '2026-11-10',
    description: 'High-Resolution Mass Spectrometer Lease Q4',
    category: 'R&D Equipment',
    account: 'Operating Bank Account (SVB)',
    debit: 34500,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-03',
    receiptId: 'doc-101',
    merchantName: 'Agilent Technologies',
    submissionStatus: 'SUBMITTED'
  },
  {
    id: 'tx-502',
    date: '2026-11-13',
    description: 'Single-use Bio-reactors and Microcarrier Beads',
    category: 'R&D Equipment',
    account: 'Operating Bank Account (SVB)',
    debit: 14200,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-03',
    receiptId: 'doc-102',
    merchantName: 'Thermo Fisher Scientific',
    submissionStatus: 'SUBMITTED'
  },
  {
    id: 'tx-503',
    date: '2026-11-14',
    description: 'Assay Reagents and Fluorescent Markers',
    category: 'Clinical Testing',
    account: 'Operating Bank Account (SVB)',
    debit: 8750,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-03',
    receiptId: 'doc-103',
    merchantName: 'Sigma-Aldrich / Millipore',
    submissionStatus: 'SUBMITTED'
  },
  {
    id: 'tx-504',
    date: '2026-11-15',
    description: 'International PCT Patent Filing Fees',
    category: 'Patent & Legal',
    account: 'Operating Bank Account (SVB)',
    debit: 12500,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-03',
    receiptId: 'doc-104',
    merchantName: 'Cooley LLP IP Counsel',
    submissionStatus: 'SUBMITTED'
  },
  {
    id: 'tx-505',
    date: '2026-11-16',
    description: 'Cloud Compute High Performance Cluster',
    category: 'Operations & Cloud',
    account: 'Operating Bank Account (SVB)',
    debit: 3200,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-03',
    receiptId: 'doc-105',
    merchantName: 'Amazon Web Services',
    submissionStatus: 'CORRECTION_NEEDED',
    reviewReason: 'DUPLICATE_CLAIM',
    reviewComment: 'This exact AWS invoice was already claimed under Tranche 2 expense filing.'
  },
  {
    id: 'tx-506',
    date: '2026-10-31',
    description: 'Principal Research Scientist Monthly Payroll',
    category: 'Personnel & Engineering',
    account: 'Payroll Account',
    debit: 22000,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-02',
    merchantName: 'Gusto Payroll Processing',
    submissionStatus: 'APPROVED'
  },
  {
    id: 'tx-507',
    date: '2026-06-25',
    description: 'Tranche #2 Wire Inflow from Innovate Capital',
    category: 'Grant Inflow',
    account: 'Operating Bank Account (SVB)',
    debit: 0,
    credit: 100000,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-02',
    merchantName: 'Global Innovation & Tech Fund'
  },
  {
    id: 'tx-508',
    date: '2026-11-20',
    description: 'Regulatory Consulting Retainer · FDA Filing',
    category: 'Patent & Legal',
    account: 'Operating Bank Account (SVB)',
    debit: 14800,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-04',
    receiptId: 'doc-104',
    merchantName: 'Regulatory Affairs Partners'
  },
  {
    id: 'tx-509',
    date: '2026-11-21',
    description: 'Clinical Data Management Platform',
    category: 'Operations & Cloud',
    account: 'Operating Bank Account (SVB)',
    debit: 9650,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-04',
    receiptId: 'doc-105',
    merchantName: 'Medidata Solutions'
  },
  {
    id: 'tx-510',
    date: '2026-11-22',
    description: 'Biostatistics Contractor · Phase II Design',
    category: 'Personnel & Engineering',
    account: 'Operating Bank Account (SVB)',
    debit: 12400,
    credit: 0,
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-04',
    receiptId: 'doc-101',
    merchantName: 'BioStats Consulting LLC'
  }
];

export const INITIAL_SUBMISSIONS: SubmissionPackage[] = [
  {
    id: 'sub-2026-003',
    grantId: 'grant-2026-alpha',
    trancheId: 'tranche-03',
    startupName: 'BioGenix Labs Inc.',
    submissionDate: '2026-11-18',
    totalClaimed: 73150,
    itemsCount: 5,
    status: 'PENDING_REVIEW',
    signedBy: 'Elena Rostova',
    signedAt: '2026-11-18T09:42:00.000Z',
    signatureTitle: 'Authorized founder sign-off',
    validationRef: 'VAL-2026-1118-03',
    reviewedItemsCount: 3,
    approvedItemsCount: 2,
    rejectedItemsCount: 1,
    items: [
      {
        transactionId: 'tx-501',
        description: 'High-Resolution Mass Spectrometer Lease Q4',
        amount: 34500,
        category: 'R&D Equipment',
        date: '2026-11-10',
        evidenceId: 'doc-101',
        merchantName: 'Agilent Technologies',
        status: 'APPROVED',
        reviewerComment: 'Valid invoice verified against equipment capital depreciation threshold.'
      },
      {
        transactionId: 'tx-502',
        description: 'Single-use Bio-reactors and Microcarrier Beads',
        amount: 14200,
        category: 'R&D Equipment',
        date: '2026-11-13',
        evidenceId: 'doc-102',
        merchantName: 'Thermo Fisher Scientific',
        status: 'APPROVED',
        reviewerComment: 'Consumables correspond to batch synthesis milestone requirements.'
      },
      {
        transactionId: 'tx-505',
        description: 'Cloud Compute High Performance Cluster',
        amount: 3200,
        category: 'Operations & Cloud',
        date: '2026-11-16',
        evidenceId: 'doc-105',
        merchantName: 'Amazon Web Services',
        status: 'REJECTED',
        rejectionReason: 'DUPLICATE_CLAIM',
        reviewerComment: 'Receipt timestamp overlaps with previously reimbursed Tranche 2 expense.'
      },
      {
        transactionId: 'tx-503',
        description: 'Assay Reagents and Fluorescent Markers',
        amount: 8750,
        category: 'Clinical Testing',
        date: '2026-11-14',
        evidenceId: 'doc-103',
        merchantName: 'Sigma-Aldrich / Millipore',
        status: 'PENDING'
      },
      {
        transactionId: 'tx-504',
        description: 'International PCT Patent Filing Fees',
        amount: 12500,
        category: 'Patent & Legal',
        date: '2026-11-15',
        evidenceId: 'doc-104',
        merchantName: 'Cooley LLP IP Counsel',
        status: 'PENDING'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Disbursement Reconciled',
    message: 'Tranche #2 ($100,000) bank wire reference confirmed by Marcus Vance.',
    type: 'TRANCHE_UNLOCKED',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/startup/tranches'
  },
  {
    id: 'notif-2',
    title: 'Reviewer Feedback Received',
    message: 'Tranche #3 submission has 1 flagged item: Duplicate AWS invoice requires correction.',
    type: 'CHANGES_REQUESTED',
    timestamp: '1 day ago',
    read: false,
    actionUrl: '/startup/submissions'
  },
  {
    id: 'notif-3',
    title: 'Upcoming Milestone Deadline',
    message: 'Milestone "In-Vitro Biocompatibility Benchmarking" is due in 7 days.',
    type: 'MILESTONE_ALERT',
    timestamp: '2 days ago',
    read: true,
    actionUrl: '/startup/milestones'
  }
];

export const INITIAL_DISCUSSION_THREADS: DiscussionThread[] = [
  {
    id: 'thread-je-0318',
    targetType: 'LINE_ITEM',
    targetId: 'JE-0318',
    subject: 'JE-0318 · Soil probes batch #4',
    status: 'OPEN',
    createdAt: '2026-11-19T08:12:00.000Z',
    updatedAt: '2026-11-19T09:06:00.000Z',
    replies: [
      {
        id: 'reply-je-0318-1',
        authorId: 'user-inst-01',
        authorName: 'Marcus Vance',
        authorRole: 'INSTITUTION_OFFICER',
        body: 'Invoice OCR shows $4,100.00, but the claim is $4,120.00. Please confirm the extra $20.00 or correct the line.',
        createdAt: '2026-11-19T08:12:00.000Z'
      },
      {
        id: 'reply-je-0318-2',
        authorId: 'user-startup-01',
        authorName: 'Elena Rostova',
        authorRole: 'STARTUP_FOUNDER',
        body: 'Checking the supplier invoice now. I will either correct the entry or upload the missing surcharge receipt.',
        createdAt: '2026-11-19T09:06:00.000Z'
      }
    ]
  },
  {
    id: 'thread-doc-5',
    targetType: 'RECEIPT',
    targetId: 'doc-5',
    subject: 'AWS-Oct-2026.pdf',
    status: 'OPEN',
    createdAt: '2026-11-20T10:24:00.000Z',
    updatedAt: '2026-11-20T11:02:00.000Z',
    replies: [
      {
        id: 'reply-doc-5-1',
        authorId: 'user-inst-01',
        authorName: 'Marcus Vance',
        authorRole: 'INSTITUTION_OFFICER',
        body: 'The Tax / VAT field is blank and OCR confidence is low. Please enter the tax amount or mark it as none.',
        createdAt: '2026-11-20T10:24:00.000Z'
      },
      {
        id: 'reply-doc-5-2',
        authorId: 'user-startup-01',
        authorName: 'Elena Rostova',
        authorRole: 'STARTUP_FOUNDER',
        body: 'Cloud hosting is exempt from VAT in this jurisdiction. I will add that note to the invoice metadata.',
        createdAt: '2026-11-20T11:02:00.000Z'
      }
    ]
  },
  {
    id: 'thread-doc-101',
    targetType: 'RECEIPT',
    targetId: 'doc-101',
    subject: 'Spectrometry_Equip_Invoice_9821.pdf',
    status: 'RESOLVED',
    createdAt: '2026-11-12T14:10:00.000Z',
    updatedAt: '2026-11-13T08:30:00.000Z',
    replies: [
      {
        id: 'reply-doc-101-1',
        authorId: 'user-inst-01',
        authorName: 'Marcus Vance',
        authorRole: 'INSTITUTION_OFFICER',
        body: 'Please confirm the lease term so this can be checked against the equipment cap.',
        createdAt: '2026-11-12T14:10:00.000Z'
      },
      {
        id: 'reply-doc-101-2',
        authorId: 'user-startup-01',
        authorName: 'Elena Rostova',
        authorRole: 'STARTUP_FOUNDER',
        body: 'Confirmed: 12-month operating lease beginning 1 Nov 2026.',
        createdAt: '2026-11-13T08:30:00.000Z'
      }
    ]
  }
];
