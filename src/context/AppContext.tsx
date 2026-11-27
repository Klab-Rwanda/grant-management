import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserRole, Grant, Tranche, Milestone, Transaction, 
  DocumentEvidence, BudgetCategory, SubmissionPackage, NotificationItem,
  RejectionReasonCode, TrancheStatus, DiscussionThread, DiscussionTargetType
} from '../types';
import { 
  DEMO_USERS, INITIAL_GRANTS, INITIAL_TRANCHES, INITIAL_MILESTONES, 
  INITIAL_BUDGET_CATEGORIES, INITIAL_DOCUMENTS, INITIAL_TRANSACTIONS, 
  INITIAL_SUBMISSIONS, INITIAL_NOTIFICATIONS, INITIAL_DISCUSSION_THREADS
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Grants & Tranches
  grants: Grant[];
  activeGrant: Grant;
  setActiveGrant: (grant: Grant) => void;
  tranches: Tranche[];
  addTranche: (tranche: Tranche) => void;
  updateTrancheStatus: (trancheId: string, status: TrancheStatus, comments?: string) => void;
  
  // Accounting & Ledger
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updated: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  // Documents & Evidence
  documents: DocumentEvidence[];
  addDocument: (doc: Omit<DocumentEvidence, 'id' | 'uploadDate'>) => void;
  deleteDocument: (id: string) => void;
  
  // Milestones
  milestones: Milestone[];
  updateMilestoneProgress: (id: string, percent: number) => void;
  
  // Budgets
  budgetCategories: BudgetCategory[];
  addBudgetCategory: (category: Omit<BudgetCategory, 'id' | 'actualSpent' | 'variance' | 'percentageUsed'>) => void;
  
  // Submissions & Review
  submissions: SubmissionPackage[];
  reviewLineItem: (submissionId: string, transactionId: string, status: 'APPROVED' | 'REJECTED' | 'CORRECTION_REQUESTED', reason?: RejectionReasonCode, comment?: string) => void;
  submitTranchePackage: (
    trancheId: string,
    transactionIds: string[],
    signedBy: string,
    signedAt: string,
    validationRef: string
  ) => void;
  reconcileDisbursement: (trancheId: string, paymentRef: string, transferDate: string, amount: number, exchangeRate: number, bankProofUrl: string) => void;

  // Discussion threads
  discussionThreads: DiscussionThread[];
  addDiscussionReply: (targetType: DiscussionTargetType, targetId: string, subject: string, body: string) => void;
  setDiscussionThreadResolved: (threadId: string, resolved: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('grantstack_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.startup;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('grantstack_theme') === 'dark';
  });

  const [grants, setGrants] = useState<Grant[]>(INITIAL_GRANTS);
  const [activeGrant, setActiveGrant] = useState<Grant>(INITIAL_GRANTS[0]);
  const [tranches, setTranches] = useState<Tranche[]>(INITIAL_TRANCHES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [documents, setDocuments] = useState<DocumentEvidence[]>(INITIAL_DOCUMENTS);
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(INITIAL_BUDGET_CATEGORIES);
  const [submissions, setSubmissions] = useState<SubmissionPackage[]>(INITIAL_SUBMISSIONS);
  const [discussionThreads, setDiscussionThreads] = useState<DiscussionThread[]>(INITIAL_DISCUSSION_THREADS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    localStorage.setItem('grantstack_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('grantstack_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('grantstack_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const switchRole = (role: UserRole) => {
    if (role === 'STARTUP_FOUNDER') setCurrentUser(DEMO_USERS.startup);
    else if (role === 'INSTITUTION_OFFICER') setCurrentUser(DEMO_USERS.institution);
    else setCurrentUser(DEMO_USERS.admin);
  };

  const addTranche = (newTranche: Tranche) => {
    setTranches(prev => [...prev, newTranche]);
  };

  const updateTrancheStatus = (trancheId: string, status: TrancheStatus, comments?: string) => {
    setTranches(prev => prev.map(t => t.id === trancheId ? { ...t, status, reviewerComments: comments || t.reviewerComments } : t));
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update corresponding budget category actual spent
    if (tx.category && tx.debit > 0) {
      setBudgetCategories(prev => prev.map(cat => {
        if (cat.name.toLowerCase() === tx.category.toLowerCase()) {
          const newSpent = cat.actualSpent + tx.debit;
          return {
            ...cat,
            actualSpent: newSpent,
            variance: cat.allocated - newSpent,
            percentageUsed: Math.min(100, Number(((newSpent / cat.allocated) * 100).toFixed(1)))
          };
        }
        return cat;
      }));
    }
  };

  const editTransaction = (id: string, updated: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addDocument = (doc: Omit<DocumentEvidence, 'id' | 'uploadDate'>) => {
    // Check for duplicate warning if merchant + amount matches
    const isDup = documents.some(d => d.merchantName.toLowerCase() === doc.merchantName.toLowerCase() && Math.abs(d.amount - doc.amount) < 0.01);
    const newDoc: DocumentEvidence = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      isDuplicateWarning: isDup,
      verificationStatus: isDup ? 'FLAGGED_DUPLICATE' : 'VERIFIED'
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const updateMilestoneProgress = (id: string, percent: number) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          completionPercentage: percent,
          status: percent >= 100 ? 'COMPLETED' : percent > 0 ? 'IN_PROGRESS' : 'NOT_STARTED'
        };
      }
      return m;
    }));
  };

  const addBudgetCategory = (category: Omit<BudgetCategory, 'id' | 'actualSpent' | 'variance' | 'percentageUsed'>) => {
    const newCat: BudgetCategory = {
      ...category,
      id: `bcat-${Date.now()}`,
      actualSpent: 0,
      variance: category.allocated,
      percentageUsed: 0
    };
    setBudgetCategories(prev => [...prev, newCat]);
  };

  const reviewLineItem = (
    submissionId: string, 
    transactionId: string, 
    status: 'APPROVED' | 'REJECTED' | 'CORRECTION_REQUESTED', 
    reason?: RejectionReasonCode, 
    comment?: string
  ) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      const updatedItems = sub.items.map(item => {
        if (item.transactionId === transactionId) {
          return {
            ...item,
            status,
            rejectionReason: reason,
            reviewerComment: comment
          };
        }
        return item;
      });
      const approvedCount = updatedItems.filter(i => i.status === 'APPROVED').length;
      const rejectedCount = updatedItems.filter(i => i.status === 'REJECTED' || i.status === 'CORRECTION_REQUESTED').length;
      const reviewedCount = approvedCount + rejectedCount;

      return {
        ...sub,
        items: updatedItems,
        reviewedItemsCount: reviewedCount,
        approvedItemsCount: approvedCount,
        rejectedItemsCount: rejectedCount,
        status: reviewedCount === sub.items.length ? (rejectedCount > 0 ? 'CHANGES_REQUESTED' : 'APPROVED_FOR_DISBURSEMENT') : 'PENDING_REVIEW'
      };
    }));

    // Update in transaction ledger too
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId) {
        return {
          ...tx,
          submissionStatus: status === 'APPROVED' ? 'APPROVED' : status === 'REJECTED' ? 'REJECTED' : 'CORRECTION_NEEDED',
          reviewReason: reason,
          reviewComment: comment
        };
      }
      return tx;
    }));
  };

  const submitTranchePackage = (
    trancheId: string,
    transactionIds: string[],
    signedBy: string,
    signedAt: string,
    validationRef: string
  ) => {
    const targetTransactions = transactions.filter(t => transactionIds.includes(t.id));
    const totalClaimed = targetTransactions.reduce((acc, curr) => acc + (curr.debit || 0), 0);

    const newSub: SubmissionPackage = {
      id: `sub-${Date.now()}`,
      grantId: activeGrant.id,
      trancheId,
      startupName: currentUser.organizationName,
      submissionDate: new Date().toISOString().split('T')[0],
      totalClaimed,
      itemsCount: targetTransactions.length,
      status: 'PENDING_REVIEW',
      signedBy,
      signedAt,
      signatureTitle: 'Authorized founder sign-off',
      validationRef,
      reviewedItemsCount: 0,
      approvedItemsCount: 0,
      rejectedItemsCount: 0,
      items: targetTransactions.map(tx => ({
        transactionId: tx.id,
        description: tx.description,
        amount: tx.debit,
        category: tx.category,
        date: tx.date,
        evidenceId: tx.receiptId,
        merchantName: tx.merchantName,
        status: 'PENDING'
      }))
    };

    setSubmissions(prev => [newSub, ...prev]);
    updateTrancheStatus(trancheId, 'SUBMITTED', 'Submitted for institutional review.');
    
    // Mark items as SUBMITTED in ledger
    setTransactions(prev => prev.map(tx => transactionIds.includes(tx.id)
      ? { ...tx, submissionStatus: 'SUBMITTED', isLocked: true }
      : tx
    ));
  };

  const reconcileDisbursement = (
    trancheId: string, 
    paymentRef: string, 
    transferDate: string, 
    amount: number, 
    _exchangeRate: number, 
    bankProofUrl: string
  ) => {
    setTranches(prev => prev.map(t => {
      if (t.id === trancheId) {
        return {
          ...t,
          status: 'DISBURSED_AND_RECONCILED',
          paymentReference: paymentRef,
          disbursedDate: transferDate,
          bankProofUrl: bankProofUrl || 'https://sample-proof.org/wire.pdf',
          reviewerComments: `Disbursement reconciled externally. Reference #${paymentRef}`
        };
      }
      return t;
    }));

    // Add income ledger transaction for the startup
    addTransaction({
      date: transferDate,
      description: `Grant Tranche Inflow - Ref #${paymentRef}`,
      category: 'Grant Inflow',
      account: 'Operating Bank Account (SVB)',
      debit: 0,
      credit: amount,
      grantId: activeGrant.id,
      trancheId
    });

    // Update grant totals
    setGrants(prev => prev.map(g => {
      if (g.id === activeGrant.id) {
        const newReceived = g.totalReceived + amount;
        return {
          ...g,
          totalReceived: newReceived,
          remainingAmount: g.totalAwarded - newReceived
        };
      }
      return g;
    }));
  };

  const addDiscussionReply = (
    targetType: DiscussionTargetType,
    targetId: string,
    subject: string,
    body: string
  ) => {
    const timestamp = new Date().toISOString();
    const reply = {
      id: `reply-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      body,
      createdAt: timestamp
    };

    setDiscussionThreads(prev => {
      const existingIndex = prev.findIndex(
        thread => thread.targetType === targetType && thread.targetId === targetId
      );

      if (existingIndex === -1) {
        return [...prev, {
          id: `thread-${Date.now()}`,
          targetType,
          targetId,
          subject,
          status: 'OPEN',
          createdAt: timestamp,
          updatedAt: timestamp,
          replies: [reply]
        }];
      }

      return prev.map((thread, index) => index === existingIndex
        ? {
            ...thread,
            subject,
            status: 'OPEN',
            updatedAt: timestamp,
            replies: [...thread.replies, reply]
          }
        : thread
      );
    });
  };

  const setDiscussionThreadResolved = (threadId: string, resolved: boolean) => {
    setDiscussionThreads(prev => prev.map(thread => thread.id === threadId
      ? { ...thread, status: resolved ? 'RESOLVED' : 'OPEN' }
      : thread
    ));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      isDarkMode,
      toggleDarkMode,
      grants,
      activeGrant,
      setActiveGrant,
      tranches,
      addTranche,
      updateTrancheStatus,
      transactions,
      addTransaction,
      editTransaction,
      deleteTransaction,
      documents,
      addDocument,
      deleteDocument,
      milestones,
      updateMilestoneProgress,
      budgetCategories,
      addBudgetCategory,
      submissions,
      reviewLineItem,
      submitTranchePackage,
      reconcileDisbursement,
      discussionThreads,
      addDiscussionReply,
      setDiscussionThreadResolved,
      notifications,
      markNotificationAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
