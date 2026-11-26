import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';

// Auth pages
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/auth/AuthPages';

// Startup Workspace pages (Matching A-01, A-02, A-03, A-04)
import { StartupDashboard } from './pages/startup/StartupDashboard';
import { ChartOfAccountsPage } from './pages/startup/ChartOfAccountsPage';
import { JournalEntriesPage } from './pages/startup/JournalEntriesPage';
import { GeneralLedgerPage } from './pages/startup/GeneralLedgerPage';
import { BurnAndRunwayPage } from './pages/startup/BurnAndRunwayPage';
import { BudgetManagement } from './pages/startup/BudgetManagement';
import { GrantsOverview } from './pages/startup/GrantsOverview';
import { TrancheManagement } from './pages/startup/TrancheManagement';
import { EvidenceVault } from './pages/startup/EvidenceVault';
import { Milestones } from './pages/startup/Milestones';
import { SubmissionCenter } from './pages/startup/SubmissionCenter';
import { FinancialReports, NotificationsPage } from './pages/startup/ReportsAndNotifications';

import { OnboardingWizard } from './pages/auth/OnboardingWizard';
import { TeamRolesPage } from './pages/startup/TeamRolesPage';
import { BankImportPage } from './pages/startup/BankImportPage';
import { IntegrationsPage } from './pages/startup/IntegrationsPage';
import { GrantOfferAcceptancePage } from './pages/startup/GrantOfferAcceptancePage';
import { GrantSetupWizard } from './pages/institution/GrantSetupWizard';
import { InstitutionDashboard } from './pages/institution/InstitutionDashboard';
import { GrantPrograms, StartupPortfolio } from './pages/institution/ProgramsAndPortfolio';
import { FinancialReviewCenter, ApprovalManagement } from './pages/institution/ReviewAndApproval';
import { DisbursementReconciliation } from './pages/institution/DisbursementReconciliation';

// Admin Workspace pages
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public homepage */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
          <Route path="/auth/onboarding" element={<OnboardingWizard />} />

          {/* Startup Workspace Routes */}
          <Route path="/startup" element={<AppLayout title="Dashboard" breadcrumbs={['Dashboard']} />}>
            <Route path="dashboard" element={<StartupDashboard />} />
            <Route path="chart-of-accounts" element={<ChartOfAccountsPage />} />
            <Route path="journal" element={<JournalEntriesPage />} />
            <Route path="ledger" element={<GeneralLedgerPage />} />
            <Route path="budgets" element={<BudgetManagement />} />
            <Route path="burn-runway" element={<BurnAndRunwayPage />} />
            <Route path="grants" element={<GrantsOverview />} />
            <Route path="grant-offer" element={<GrantOfferAcceptancePage />} />
            <Route path="tranches" element={<TrancheManagement />} />
            <Route path="evidence" element={<EvidenceVault />} />
            <Route path="milestones" element={<Milestones />} />
            <Route path="submissions" element={<SubmissionCenter />} />
            <Route path="reports" element={<FinancialReports />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="bank-import" element={<BankImportPage />} />
            <Route path="team" element={<TeamRolesPage />} />
            <Route path="integrations" element={<IntegrationsPage />} />
          </Route>

          {/* Institution Workspace Routes */}
          <Route path="/institution" element={<AppLayout title="Institution Workspace" breadcrumbs={['Review queue', 'Tembo Agritech · Tranche 2 · SUB-T2-01']} />}>
            <Route path="dashboard" element={<InstitutionDashboard />} />
            <Route path="programs" element={<GrantPrograms />} />
            <Route path="programs/new" element={<GrantSetupWizard />} />
            <Route path="startups" element={<StartupPortfolio />} />
            <Route path="reviews" element={<FinancialReviewCenter />} />
            <Route path="approvals" element={<ApprovalManagement />} />
            <Route path="reconciliation" element={<DisbursementReconciliation />} />
            <Route path="reports" element={<FinancialReports />} />
          </Route>

          {/* Admin Workspace Routes */}
          <Route path="/admin" element={<AppLayout title="Platform Governance" breadcrumbs={['Platform governance']} />}>
            <Route index element={<Navigate to="/admin/tenants" replace />} />
            <Route path="dashboard" element={<Navigate to="/admin/tenants" replace />} />
            <Route path="tenants" element={<AdminDashboard activeTab="tenants" />} />
            <Route path="health" element={<AdminDashboard activeTab="health" />} />
            <Route path="audit" element={<AdminDashboard activeTab="audit" />} />
            <Route path="schema" element={<AdminDashboard activeTab="schema" />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
