import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Landmark,
  LayoutDashboard,
  Lock,
  Menu,
  ReceiptText,
  ShieldCheck,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

type PreviewKey = 'overview' | 'evidence' | 'review';

const previewTabs: { key: PreviewKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'review', label: 'Review' },
];

const workflowSteps: {
  label: string;
  title: string;
  description: string;
  details: string[];
  icon: LucideIcon;
}[] = [
  {
    label: 'Plan',
    title: 'Structure the award before work begins',
    description:
      'Set budget categories, milestones and tranche schedules against the grant agreement, with one shared reference for both sides.',
    details: ['Budget categories mapped to eligible costs', 'Milestones and tranche dates agreed upfront', 'Funder and founder see the same plan'],
    icon: FileText,
  },
  {
    label: 'Record',
    title: 'Post transactions directly against the grant',
    description:
      'Every expense is tagged to a grant and tranche as it is recorded, so spend never has to be reconstructed at submission time.',
    details: ['Journal entries with grant tagging', 'Burn and runway kept current', 'General ledger stays reconciled'],
    icon: Wallet,
  },
  {
    label: 'Evidence',
    title: 'Keep receipts attached to the claim',
    description:
      'Upload documents once, link them to the right line items and resolve gaps before a package is sent for review.',
    details: ['One evidence vault per workspace', 'Duplicate detection on upload', 'Readiness checks before submission'],
    icon: ReceiptText,
  },
  {
    label: 'Release',
    title: 'Review, approve and reconcile with confidence',
    description:
      'Officers review the same line items the founder submitted, then approvals and disbursements close the loop in the ledger.',
    details: ['Line-item review with reason codes', 'Committee sign-off and audit trail', 'Disbursement reconciliation in one place'],
    icon: ClipboardCheck,
  },
];

const roleCards: {
  role: UserRole;
  tab: string;
  short: string;
  title: string;
  description: string;
  points: string[];
  destination: string;
  icon: LucideIcon;
}[] = [
  {
    role: 'STARTUP_FOUNDER',
    tab: 'Startup founder',
    short: 'Claim funds with proof',
    title: 'A finance workspace built around your grant',
    description:
      'Manage the ledger, track runway, gather evidence and submit each tranche from one calm view of what is still required.',
    points: ['Live tranche readiness', 'Evidence linked to entries', 'Clear runway and burn'],
    destination: '/startup/dashboard',
    icon: Wallet,
  },
  {
    role: 'INSTITUTION_OFFICER',
    tab: 'Institution officer',
    short: 'Review with clarity',
    title: 'Oversight without chasing spreadsheets',
    description:
      'Review submissions line by line, apply consistent decision codes and move approved disbursements through reconciliation.',
    points: ['Shared review queue', 'Reason-coded decisions', 'Portfolio-level reporting'],
    destination: '/institution/dashboard',
    icon: Landmark,
  },
  {
    role: 'PLATFORM_ADMIN',
    tab: 'Platform admin',
    short: 'Govern the whole system',
    title: 'Control access, templates and accountability',
    description:
      'Provision tenants, monitor platform health and inspect the append-only audit log that records every material action.',
    points: ['Tenant provisioning', 'Schema and templates', 'Append-only audit history'],
    destination: '/admin/tenants',
    icon: ShieldCheck,
  },
];

const controlItems: { title: string; description: string; note: string; icon: LucideIcon }[] = [
  {
    title: 'Traceable by design',
    description: 'Every figure connects back to an entry, a document and a named decision.',
    note: 'LINE-LEVEL PROVENANCE',
    icon: FileCheck2,
  },
  {
    title: 'Role-based by default',
    description: 'Founders, reviewers and administrators only see the work their role requires.',
    note: 'SCOPED WORKSPACES',
    icon: Lock,
  },
  {
    title: 'Ready for inspection',
    description: 'Status changes are recorded in order, with context that an auditor can follow.',
    note: 'APPEND-ONLY HISTORY',
    icon: ClipboardCheck,
  },
];

const BrandMark: React.FC = () => (
  <Link to="/" className="flex items-center gap-2.5" aria-label="Grant Ledger home">
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar font-serif text-sm text-white">
      G
    </span>
    <span className="text-sm font-semibold tracking-tight text-ink">Grant Ledger</span>
  </Link>
);

const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
}> = ({ eyebrow, title, description }) => (
  <div className="max-w-2xl">
    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
    <h2 className="mt-3 text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
    <p className="mt-4 text-sm leading-relaxed text-ink-2">{description}</p>
  </div>
);

const OverviewPreview: React.FC = () => (
  <div className="space-y-3">
    <div className="rounded-lg bg-bg p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Available grant balance</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <span className="font-mono text-2xl text-ink">$120,000.00</span>
        <span className="text-[10px] text-status-success">2 active tranches</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-border">
        <div className="h-full w-[68%] rounded-pill bg-accent" />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-3">
        <span>$81,600 released</span>
        <span>68%</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: 'Cash on hand', value: '$89,600' },
        { label: 'Net burn / month', value: '$9,807' },
      ].map((item) => (
        <div key={item.label} className="rounded-lg border border-border p-3">
          <p className="text-[10px] text-ink-3">{item.label}</p>
          <p className="mt-1 font-mono text-base text-ink">{item.value}</p>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-2 text-accent">
          <ReceiptText className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-xs font-medium text-ink">Equipment purchase</span>
          <span className="block text-[10px] text-ink-3">Journal entry · 24 Oct</span>
        </span>
      </div>
      <span className="font-mono text-xs text-ink">$4,200.00</span>
    </div>
  </div>
);

const EvidencePreview: React.FC = () => {
  const documents = [
    { name: 'Equipment invoice · Oct 24', status: 'Verified', verified: true },
    { name: 'Lab consumables receipt', status: 'Verified', verified: true },
    { name: 'Contractor invoice · M-3', status: 'Needs review', verified: false },
    { name: 'Bank statement · October', status: 'Verified', verified: true },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-bg p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Document readiness</p>
          <span className="font-mono text-xs text-accent">7 / 8</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-border">
          <div className="h-full w-[88%] rounded-pill bg-accent" />
        </div>
        <p className="mt-2 text-[10px] text-ink-3">One receipt is needed before this tranche can be submitted.</p>
      </div>
      <div className="space-y-2">
        {documents.map((document) => (
          <div
            key={document.name}
            className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-md ${
                  document.verified ? 'bg-status-success-bg text-status-success' : 'bg-status-warning-bg text-status-warning'
                }`}
              >
                <FileCheck2 className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs text-ink">{document.name}</span>
            </div>
            <span className={`text-[10px] ${document.verified ? 'text-status-success' : 'text-status-warning'}`}>
              {document.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewPreview: React.FC = () => {
  const lines = [
    { item: 'Labor · Research lead', amount: '$12,000', state: 'Approved' },
    { item: 'Equipment · Centrifuge', amount: '$4,200', state: 'Approved' },
    { item: 'Consumables · Q4', amount: '$1,860', state: 'In review' },
  ];

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border bg-surface-2 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">
          <span>Line item</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {lines.map((line) => (
          <div
            key={line.item}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border px-3 py-3 last:border-b-0"
          >
            <span className="text-[11px] text-ink">{line.item}</span>
            <span className="font-mono text-[11px] text-ink">{line.amount}</span>
            <span
              className={`text-[10px] ${line.state === 'Approved' ? 'text-status-success' : 'text-status-warning'}`}
            >
              {line.state}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2.5 rounded-lg bg-status-success-bg p-3 text-status-success">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-[11px] leading-relaxed">2 of 3 line items cleared. Review completes when evidence is confirmed.</p>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
        <span className="text-[10px] text-ink-3">Package SUB-T2-01</span>
        <span className="font-mono text-[10px] text-accent">Due 04 Nov</span>
      </div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<PreviewKey>('overview');
  const [activeStep, setActiveStep] = useState(0);
  const [activeRole, setActiveRole] = useState<UserRole>('STARTUP_FOUNDER');

  const selectedRole = roleCards.find((item) => item.role === activeRole) ?? roleCards[0];
  const selectedStep = workflowSteps[activeStep];

  const enterWorkspace = (role: UserRole, destination?: string) => {
    switchRole(role);
    navigate(destination ?? (role === 'STARTUP_FOUNDER' ? '/startup/dashboard' : role === 'INSTITUTION_OFFICER' ? '/institution/dashboard' : '/admin/tenants'));
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <BrandMark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {[
              { label: 'Platform', href: '#platform' },
              { label: 'Workflow', href: '#workflow' },
              { label: 'Roles', href: '#roles' },
              { label: 'Controls', href: '#controls' },
            ].map((item) => (
              <a key={item.href} href={item.href} className="text-xs text-ink-2 transition hover:text-accent">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/auth/login" className="text-xs font-medium text-ink-2 transition hover:text-accent">
              Sign in
            </Link>
            <Link to="/auth/register" className="text-xs font-medium text-ink-2 transition hover:text-accent">
              Create account
            </Link>
            <button
              type="button"
              onClick={() => enterWorkspace('STARTUP_FOUNDER')}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-medium text-white transition hover:bg-accent-hover"
            >
              Open demo <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-ink md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
              {[
                { label: 'Platform', href: '#platform' },
                { label: 'Workflow', href: '#workflow' },
                { label: 'Roles', href: '#roles' },
                { label: 'Controls', href: '#controls' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-ink-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
              <Link to="/auth/login" className="text-sm font-medium text-ink-2">
                Sign in
              </Link>
              <Link to="/auth/register" className="text-sm font-medium text-ink-2">
                Create account
              </Link>
              <button
                type="button"
                onClick={() => enterWorkspace('STARTUP_FOUNDER')}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-medium text-white"
              >
                Open demo <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="main">
        <section id="platform" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                One system for grant-funded work
              </span>
              <h1 className="mt-6 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[3.6rem]">
                Grant funding, <span className="text-accent">accounted for.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-ink-2 sm:text-base">
                Grant Ledger brings budgets, evidence, reviews and disbursements into one calm workspace. Founders claim
                with confidence. Funders approve with proof.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => enterWorkspace('STARTUP_FOUNDER')}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-hover"
                >
                  Explore the demo <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-ink transition hover:border-border-strong"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-ink-3">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Sample data included
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Three role-based views
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-6 -top-6 hidden h-32 w-32 rounded-full bg-accent/10 blur-3xl lg:block" />
              <div className="relative rounded-xl border border-border bg-surface p-5 shadow-ledger">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
                      <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
                      <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                      Workspace preview
                    </span>
                  </div>
                  <span className="rounded-pill bg-status-success-bg px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-status-success">
                    Live
                  </span>
                </div>
                <div className="mt-4 flex gap-1 rounded-md bg-surface-2 p-1">
                  {previewTabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setPreviewTab(tab.key)}
                      className={`flex-1 rounded-sm px-3 py-2 text-[11px] font-medium transition ${
                        previewTab === tab.key ? 'bg-surface text-ink shadow-ledger' : 'text-ink-3 hover:text-ink'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="mt-5 min-h-[300px]">
                  {previewTab === 'overview' && <OverviewPreview />}
                  {previewTab === 'evidence' && <EvidencePreview />}
                  {previewTab === 'review' && <ReviewPreview />}
                </div>
                <p className="mt-4 border-t border-border pt-3 text-[10px] text-ink-3">
                  Illustrative data. Switch tabs to move through the same tranche.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-3 sm:gap-10">
            {[
              { value: '01', label: 'One ledger', detail: 'Budget to receipt, in view' },
              { value: '02', label: 'Proof attached', detail: 'Evidence stays with the claim' },
              { value: '03', label: 'Audit-ready', detail: 'Decisions recorded in order' },
            ].map((item) => (
              <div key={item.value} className="flex items-start gap-3">
                <span className="font-mono text-xs text-accent">{item.value}</span>
                <span>
                  <span className="block text-sm font-medium text-ink">{item.label}</span>
                  <span className="block text-[11px] text-ink-3">{item.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              eyebrow="The workflow"
              title="From award to reconciliation, in one line of sight."
              description="A deliberate sequence keeps the financial record, the evidence and the approval in step — without a scattered spreadsheet trail."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="flex flex-col gap-2" role="tablist" aria-label="Grant workflow steps">
                {workflowSteps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    role="tab"
                    aria-selected={activeStep === index}
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                      activeStep === index
                        ? 'border-accent bg-surface text-ink shadow-ledger'
                        : 'border-transparent text-ink-3 hover:border-border hover:bg-surface'
                    }`}
                  >
                    <span className="font-mono text-[10px]">0{index + 1}</span>
                    <span className="flex-1 text-sm font-medium">{step.label}</span>
                    <ChevronRight className={`h-3.5 w-3.5 ${activeStep === index ? 'text-accent' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-surface p-6 shadow-ledger sm:p-8" role="tabpanel">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl">
                    <h3 className="text-2xl leading-snug text-ink">{selectedStep.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{selectedStep.description}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-accent">
                    <selectedStep.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                  {selectedStep.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="text-[11px] leading-relaxed text-ink-2">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="scroll-mt-24 border-y border-border bg-surface-2">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionHeading
              eyebrow="Built for every seat"
              title="One platform. Three clear points of view."
              description="Each workspace shows the right work, the right controls and the right level of detail for the person using it."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-[320px_1fr]">
              <div className="flex flex-col gap-2" role="tablist" aria-label="Workspace roles">
                {roleCards.map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    role="tab"
                    aria-selected={activeRole === item.role}
                    onClick={() => setActiveRole(item.role)}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-4 text-left transition ${
                      activeRole === item.role
                        ? 'border-accent bg-surface shadow-ledger'
                        : 'border-border bg-surface/60 hover:border-border-strong'
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-md ${
                        activeRole === item.role ? 'bg-accent text-white' : 'bg-surface-2 text-ink-2'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-ink">{item.tab}</span>
                      <span className="block text-[11px] text-ink-3">{item.short}</span>
                    </span>
                    <ChevronRight className={`h-3.5 w-3.5 ${activeRole === item.role ? 'text-accent' : 'text-ink-3'}`} />
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-surface p-6 shadow-ledger sm:p-8" role="tabpanel">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Workspace view</p>
                <h3 className="mt-3 max-w-xl text-2xl leading-snug text-ink">{selectedRole.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2">{selectedRole.description}</p>
                <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                  {selectedRole.points.map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="text-[11px] leading-relaxed text-ink-2">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => enterWorkspace(selectedRole.role, selectedRole.destination)}
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-xs font-medium text-white transition hover:bg-accent-hover"
                  >
                    Enter as {selectedRole.tab.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[10px] text-ink-3">No setup required · sample data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="controls" className="scroll-mt-24 bg-sidebar text-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8FD3D1]">Governance</p>
                <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">Controls you can show, not just describe.</h2>
              </div>
              <p className="max-w-sm text-xs leading-relaxed text-[#B8C3D9]">
                Grant Ledger keeps the financial record and the decision record together, so review never depends on
                memory or attachments.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {controlItems.map((item) => (
                <div key={item.title} className="border-t border-white/20 pt-5">
                  <item.icon className="h-5 w-5 text-[#8FD3D1]" />
                  <h3 className="mt-4 text-lg text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#B8C3D9]">{item.description}</p>
                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8FD3D1]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="rounded-xl border border-border bg-surface px-6 py-14 text-center shadow-ledger sm:px-12">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">See it in action</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl">
                A clearer way to move from award to impact.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-2">
                Open a guided demo with sample grants, entries, evidence and reviews already in place.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => enterWorkspace('STARTUP_FOUNDER')}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-hover"
                >
                  Open founder demo <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-ink transition hover:border-border-strong"
                >
                  Request access <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-ink-3">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Three workspaces · One shared record
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BrandMark />
            <p className="mt-2 text-[11px] text-ink-3">Grant accounting and governance, kept in one ledger.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-ink-2">
            <a href="#platform" className="transition hover:text-accent">Platform</a>
            <a href="#workflow" className="transition hover:text-accent">Workflow</a>
            <a href="#roles" className="transition hover:text-accent">Roles</a>
            <Link to="/auth/login" className="transition hover:text-accent">Sign in</Link>
            <Link to="/auth/register" className="transition hover:text-accent">Create account</Link>
          </div>
          <p className="font-mono text-[10px] text-ink-3">© 2026 Grant Ledger</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
