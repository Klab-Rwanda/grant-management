import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Plus, 
  Search, 
  Lock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Activity,
  FileText,
  Sliders,
  RefreshCw,
  Server,
  Database,
  Mail,
  MessageSquare
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

interface TenantOrg {
  id: string;
  name: string;
  type: 'INSTITUTION' | 'STARTUP';
  taxId: string;
  usersCount: number;
  createdDate: string;
  status: 'Active' | 'Invite pending' | 'Suspended';
}

const INITIAL_TENANTS: TenantOrg[] = [
  {
    id: 't-1',
    name: 'Riverbend Innovation Trust',
    type: 'INSTITUTION',
    taxId: '••••4471',
    usersCount: 6,
    createdDate: '08 Jan 2026',
    status: 'Active'
  },
  {
    id: 't-2',
    name: 'Northgate Seed Fund',
    type: 'INSTITUTION',
    taxId: '••••0912',
    usersCount: 4,
    createdDate: '02 Sep 2026',
    status: 'Active'
  },
  {
    id: 't-3',
    name: 'Tembo Agritech Ltd',
    type: 'STARTUP',
    taxId: '••••2290',
    usersCount: 4,
    createdDate: '10 Jan 2026',
    status: 'Active'
  },
  {
    id: 't-4',
    name: 'Kilele Labs',
    type: 'STARTUP',
    taxId: '••••7731',
    usersCount: 3,
    createdDate: '14 Feb 2026',
    status: 'Active'
  },
  {
    id: 't-5',
    name: 'Health Pilot Startup (invited)',
    type: 'STARTUP',
    taxId: '—',
    usersCount: 0,
    createdDate: '18 Nov 2026',
    status: 'Invite pending'
  }
];

export const AdminDashboard: React.FC<{ activeTab?: 'tenants' | 'health' | 'audit' | 'schema' }> = ({ activeTab = 'tenants' }) => {
  const [tenants, setTenants] = useState<TenantOrg[]>(INITIAL_TENANTS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'INSTITUTION' | 'STARTUP'>('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'INSTITUTION' | 'STARTUP'>('STARTUP');
  const [taxId, setTaxId] = useState('••••8819');
  const [selectedTenantManage, setSelectedTenantManage] = useState<TenantOrg | null>(null);

  // Health page refresh notice
  const [healthRefreshed, setHealthRefreshed] = useState(false);

  // Audit Log filter state
  const [auditEntity, setAuditEntity] = useState('Tembo Agritech · Tranche 2');
  const [auditAction, setAuditAction] = useState('All actions');
  const [selectedAuditEntry, setSelectedAuditEntry] = useState<any>({
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    tenant: 'Tembo Agritech Ltd',
    actor: 'David O. (Reviewer)',
    ip: '198.51.100.45',
    client: 'Web · desktop browser',
    before: '{ "status": "PENDING" }',
    after: '{ "status": "REJECTED", "reason_code": "AMOUNT_MISMATCH" }'
  });

  const institutionCount = tenants.filter(t => t.type === 'INSTITUTION').length;
  const startupCount = tenants.filter(t => t.type === 'STARTUP' && t.status === 'Active').length;
  const pendingCount = tenants.filter(t => t.status === 'Invite pending').length;
  const suspendedCount = tenants.filter(t => t.status === 'Suspended').length;

  const filteredTenants = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newTenant: TenantOrg = {
      id: `t-${Date.now()}`,
      name,
      type,
      taxId: taxId || '••••0000',
      usersCount: 1,
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Active'
    };
    setTenants(prev => [newTenant, ...prev]);
    setIsModalOpen(false);
    setName('');
  };

  const handleToggleStatus = (id: string) => {
    setTenants(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'Active' ? 'Suspended' : 'Active'
        };
      }
      return t;
    }));
    if (selectedTenantManage) {
      setSelectedTenantManage(prev => prev ? {
        ...prev,
        status: prev.status === 'Active' ? 'Suspended' : 'Active'
      } : null);
    }
  };

  const handleRefreshHealth = () => {
    setHealthRefreshed(true);
    setTimeout(() => setHealthRefreshed(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* VIEW 1: TENANTS DIRECTORY (X-01) */}
      {activeTab === 'tenants' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
                Tenant directory
              </h1>
              <p className="text-xs text-[#5A6275] mt-1">
                Organisation metadata only. Admins have no access to private ledgers, documents or unshared data.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium text-xs rounded-md shadow-sm transition"
            >
              Provision tenant
            </button>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
              <span className="text-xs text-[#5A6275] block">Institutions</span>
              <span className="text-2xl font-serif text-[#16213A] mt-1 block">{institutionCount}</span>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
              <span className="text-xs text-[#5A6275] block">Startups</span>
              <span className="text-2xl font-serif text-[#16213A] mt-1 block">{startupCount}</span>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
              <span className="text-xs text-[#5A6275] block">Pending invitations</span>
              <span className="text-2xl font-serif text-[#16213A] mt-1 block">{pendingCount}</span>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger">
              <span className="text-xs text-[#5A6275] block">Suspended</span>
              <span className="text-2xl font-serif text-[#16213A] mt-1 block">{suspendedCount}</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <label className="text-xs font-medium text-[#16213A] block mb-1">
                Search organisations
              </label>
              <input
                type="text"
                placeholder="e.g. Tembo Agritech..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#16213A] block mb-1">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              >
                <option value="All">All</option>
                <option value="INSTITUTION">Institutions</option>
                <option value="STARTUP">Startups</option>
              </select>
            </div>
          </div>

          {/* Tenants Table */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-3 px-4">Organisation</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 font-mono">Tax ID</th>
                    <th className="py-3 px-4 text-center font-mono">Users</th>
                    <th className="py-3 px-4 font-mono">Created</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC] text-[#16213A]">
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-[#FAF9F5] transition">
                      <td className="py-3 px-4 font-semibold text-[#16213A]">
                        {tenant.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#ECEAE4] text-[#4A5266] uppercase">
                          {tenant.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#5A6275]">
                        {tenant.taxId}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-medium">
                        {tenant.usersCount}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#5A6275]">
                        {tenant.createdDate}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={tenant.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {tenant.status === 'Invite pending' ? (
                          <button 
                            onClick={() => alert(`Invitation re-sent to ${tenant.name}`)}
                            className="px-3 py-1 rounded border border-[#DDD8CC] hover:bg-[#F1EEE7] text-xs font-medium"
                          >
                            Resend
                          </button>
                        ) : (
                          <button 
                            onClick={() => setSelectedTenantManage(tenant)}
                            className="px-3 py-1 rounded border border-[#DDD8CC] hover:bg-[#F1EEE7] text-xs font-medium"
                          >
                            Manage
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy Notice Banner */}
          <div className="p-4 rounded-lg bg-[#F1EEE7] border border-[#DDD8CC] text-xs text-[#5A6275] flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#16213A] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#16213A] font-semibold">Manage</strong> opens organisation metadata, seat counts, status (suspend/reactivate) and the admin contact. It never shows financial data. Every admin view is written to the platform audit log.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PLATFORM HEALTH (X-02) */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
                Platform health
              </h1>
              <p className="text-xs text-[#5A6275] mt-1">
                Service status and background queues · Updated 20 Nov 2026, 10:15 UTC
              </p>
            </div>

            <button
              onClick={handleRefreshHealth}
              className="px-4 py-2 bg-white border border-[#DDD8CC] hover:bg-[#F1EEE7] text-[#16213A] font-medium text-xs rounded-md shadow-ledger flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${healthRefreshed ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Degraded Alert Banner */}
          <div className="p-4 rounded-lg bg-[#FBF0D9] border border-[#F4DCAC] text-[#7A4A00] text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#7A4A00] shrink-0" />
            <span>
              <strong>Document AI is slow.</strong> OCR jobs are taking longer than usual. Uploads still succeed, and OCR results arrive late.
            </span>
          </div>

          {/* Service Status Cards (6 Grid matching X-02) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#16213A]">API gateway</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                  ✓ Operational
                </span>
              </div>
              <p className="text-[11px] text-[#5A6275]">Auth, RBAC and rate limiting</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#16213A]">PostgreSQL</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                  ✓ Operational
                </span>
              </div>
              <p className="text-[11px] text-[#5A6275]">Row-level security policies active</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#16213A]">Object storage</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                  ✓ Operational
                </span>
              </div>
              <p className="text-[11px] text-[#5A6275]">Encrypted · pre-signed URLs only</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#16213A]">Document AI pipeline</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FBF0D9] text-[#7A4A00] border border-[#F4DCAC]">
                  Δ Degraded
                </span>
              </div>
              <p className="text-[11px] text-[#5A6275]">OCR queue backing up</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#16213A]">Email gateway</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                  ✓ Operational
                </span>
              </div>
              <p className="text-[11px] text-[#5A6275]">Transactional email</p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xs text-[#16213A]">SMS / WhatsApp gateway</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                  ✓ Operational
                </span>
              </div>
              <p className="text-[11px] text-[#5A6275]">Phase 2 channel</p>
            </div>
          </div>

          {/* Background Queues Table (Matching X-02 bottom) */}
          <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden space-y-3 p-5">
            <h2 className="text-base font-serif font-semibold text-[#16213A]">
              Background queues
            </h2>

            <div className="border border-[#DDD8CC] rounded-md overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-3">Queue</th>
                    <th className="py-2.5 px-3 font-mono">Waiting</th>
                    <th className="py-2.5 px-3 font-mono">Failed (24h)</th>
                    <th className="py-2.5 px-3 font-mono">Oldest job</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]">
                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-3 font-medium text-[#16213A]">OCR jobs</td>
                    <td className="py-3 px-3 font-mono">24</td>
                    <td className="py-3 px-3 font-mono">1</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">4m 12s</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FBF0D9] text-[#7A4A00] border border-[#F4DCAC]">
                        Δ Slow
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button 
                        onClick={() => alert('Retried failed OCR job queue.')}
                        className="px-3 py-1 rounded border border-[#DDD8CC] hover:bg-[#F1EEE7] text-xs font-medium"
                      >
                        Retry failed
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-3 font-medium text-[#16213A]">File hashing & duplicate check</td>
                    <td className="py-3 px-3 font-mono">0</td>
                    <td className="py-3 px-3 font-mono">0</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">0s</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                        ✓ Normal
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#5A6275]">—</td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-3 font-medium text-[#16213A]">SLA timers</td>
                    <td className="py-3 px-3 font-mono">12</td>
                    <td className="py-3 px-3 font-mono">0</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">12s</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                        ✓ Normal
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#5A6275]">—</td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5]">
                    <td className="py-3 px-3 font-medium text-[#16213A]">Notification webhooks</td>
                    <td className="py-3 px-3 font-mono">2</td>
                    <td className="py-3 px-3 font-mono">0</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">1s</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1]">
                        ✓ Normal
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#5A6275]">—</td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5] opacity-75">
                    <td className="py-3 px-3 text-[#5A6275]">Reconciliation parser</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">—</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">—</td>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">—</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECEAE4] text-[#4A5266]">
                        Not enabled
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#5A6275]">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#5A6275] pt-1">
              Queue figures are placeholders and come from the real monitoring source. Health data never includes tenant financial content.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 3: PLATFORM AUDIT LOG (E-03) */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
                Audit log
              </h1>
              <p className="text-xs text-[#5A6275] mt-1">
                Append-only. Entries can't be edited or deleted by anyone, including admins.
              </p>
            </div>

            <button 
              onClick={() => alert('Exporting signed audit CSV...')}
              className="px-4 py-2 bg-white border border-[#DDD8CC] hover:bg-[#F1EEE7] text-[#16213A] font-medium text-xs rounded-md shadow-ledger"
            >
              Export CSV (filtered)
            </button>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white border border-[#DDD8CC] rounded-lg p-3 text-xs">
            <div>
              <label className="text-[#5A6275] block mb-1 font-medium">Entity</label>
              <input 
                type="text" 
                value={auditEntity} 
                onChange={(e) => setAuditEntity(e.target.value)} 
                className="w-full p-2 border border-[#DDD8CC] rounded text-[#16213A]"
              />
            </div>
            <div>
              <label className="text-[#5A6275] block mb-1 font-medium">Action</label>
              <select 
                value={auditAction} 
                onChange={(e) => setAuditAction(e.target.value)} 
                className="w-full p-2 border border-[#DDD8CC] rounded text-[#16213A]"
              >
                <option value="All actions">All actions</option>
                <option value="TRANCHE_RECONCILED">TRANCHE_RECONCILED</option>
                <option value="REVIEW_DECISION_REJECT">REVIEW_DECISION_REJECT</option>
              </select>
            </div>
            <div>
              <label className="text-[#5A6275] block mb-1 font-medium">Actor</label>
              <input type="text" defaultValue="Anyone" className="w-full p-2 border border-[#DDD8CC] rounded text-[#16213A]" />
            </div>
            <div>
              <label className="text-[#5A6275] block mb-1 font-medium">Date range</label>
              <input type="text" defaultValue="2026-11-01 → 2026-12-31" className="w-full p-2 border border-[#DDD8CC] rounded text-[#16213A] font-mono" />
            </div>
          </div>

          {/* Split Table + Detail View (Matching E-03) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F1EEE7] border-b border-[#DDD8CC] text-[#5A6275] font-semibold">
                    <th className="py-2.5 px-3 font-mono">Time (UTC)</th>
                    <th className="py-2.5 px-3">Actor</th>
                    <th className="py-2.5 px-3 font-mono">Action</th>
                    <th className="py-2.5 px-3">Entity</th>
                    <th className="py-2.5 px-3">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD8CC]">
                  <tr className="hover:bg-[#FAF9F5] cursor-pointer" onClick={() => setSelectedAuditEntry({
                    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                    tenant: 'Tembo Agritech Ltd',
                    actor: 'Sara T. (PM)',
                    ip: '198.51.100.45',
                    client: 'Web · desktop browser',
                    before: '{ "status": "APPROVED_FOR_DISBURSEMENT" }',
                    after: '{ "status": "DISBURSED_AND_RECONCILED" }'
                  })}>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">15 Dec 11:04</td>
                    <td className="py-3 px-3">Sara T. <span className="text-[10px] bg-[#ECEAE4] px-1 rounded">PM</span></td>
                    <td className="py-3 px-3"><span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4]">TRANCHE_RECONCILED</span></td>
                    <td className="py-3 px-3">Tranche 2</td>
                    <td className="py-3 px-3 text-[11px] font-mono">DISBURSED_AND_RECONCILED</td>
                  </tr>

                  <tr className="bg-[#E4F1E8]/20 hover:bg-[#E4F1E8]/30 cursor-pointer" onClick={() => setSelectedAuditEntry({
                    id: '8a2ceb1a-2a1c-4cad-8cdd-1a0d6b2dcb5c',
                    tenant: 'Tembo Agritech Ltd',
                    actor: 'David O. (Reviewer)',
                    ip: '198.51.100.45',
                    client: 'Web · desktop browser',
                    before: '{ "status": "PENDING" }',
                    after: '{ "status": "REJECTED", "reason_code": "AMOUNT_MISMATCH" }'
                  })}>
                    <td className="py-3 px-3 font-mono text-[#5A6275]">03 Dec 14:18</td>
                    <td className="py-3 px-3">David O. <span className="text-[10px] bg-[#ECEAE4] px-1 rounded">REV</span></td>
                    <td className="py-3 px-3"><span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#FBE6E4] text-[#9B1C1C]">REVIEW_DECISION_REJECT</span></td>
                    <td className="py-3 px-3 font-mono">JE-0318</td>
                    <td className="py-3 px-3 text-[11px] font-mono text-[#9B1C1C]">PENDING → REJECTED</td>
                  </tr>

                  <tr className="hover:bg-[#FAF9F5] cursor-pointer">
                    <td className="py-3 px-3 font-mono text-[#5A6275]">24 Nov 16:11</td>
                    <td className="py-3 px-3">Grace M. <span className="text-[10px] bg-[#ECEAE4] px-1 rounded">FDR</span></td>
                    <td className="py-3 px-3"><span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#ECEAE4]">SUBMISSION_SIGNED</span></td>
                    <td className="py-3 px-3 font-mono">SUB-T2-01</td>
                    <td className="py-3 px-3 text-[11px] font-mono">DRAFT → SUBMITTED</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Entry detail (4 cols matching E-03) */}
            <div className="lg:col-span-4 bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger space-y-3 text-xs">
              <h3 className="font-semibold text-sm text-[#16213A]">Entry detail</h3>

              <div className="space-y-1.5 border-b border-[#DDD8CC] pb-3 text-[#5A6275]">
                <div className="flex justify-between">
                  <span>Audit ID:</span>
                  <span className="font-mono text-[#16213A] truncate max-w-[150px]">{selectedAuditEntry.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tenant:</span>
                  <span className="font-semibold text-[#16213A]">{selectedAuditEntry.tenant}</span>
                </div>
                <div className="flex justify-between">
                  <span>Actor:</span>
                  <span className="text-[#16213A]">{selectedAuditEntry.actor}</span>
                </div>
                <div className="flex justify-between">
                  <span>IP address:</span>
                  <span className="font-mono text-[#16213A]">{selectedAuditEntry.ip}</span>
                </div>
              </div>

              <div>
                <span className="font-medium text-[#5A6275] block mb-1">Before:</span>
                <pre className="p-2 bg-[#F1EEE7] border border-[#DDD8CC] rounded text-[11px] font-mono text-[#16213A]">
                  {selectedAuditEntry.before}
                </pre>
              </div>

              <div>
                <span className="font-medium text-[#5A6275] block mb-1">After:</span>
                <pre className="p-2 bg-[#FBE6E4] border border-[#F7C6C2] rounded text-[11px] font-mono text-[#9B1C1C]">
                  {selectedAuditEntry.after}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: SCHEMA & TEMPLATES */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              Schema & templates
            </h1>
            <p className="text-xs text-[#5A6275] mt-1">
              Configure standardized Chart of Accounts (COA) templates, default ledger rules, and reporting taxonomies.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#DDD8CC] shadow-ledger space-y-4 text-xs">
            <h2 className="text-base font-serif font-semibold text-[#16213A]">Standard Chart of Accounts (COA) Schema</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#F1EEE7] rounded border border-[#DDD8CC]">
                <span className="font-bold block mb-1">1000 - Assets</span>
                <p className="text-[#5A6275]">1010 Operating Bank Account, 1020 Mobile Money, 1500 Equipment</p>
              </div>
              <div className="p-3 bg-[#F1EEE7] rounded border border-[#DDD8CC]">
                <span className="font-bold block mb-1">5000 - Grant Eligible Expenses</span>
                <p className="text-[#5A6275]">5100 Equipment, 5200 Contractors, 5300 R&D Personnel</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Provision Tenant Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision Tenant Organisation"
        description="Create a new verified organisation container on Grant Ledger."
      >
        <form onSubmit={handleCreateTenant} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#16213A] font-medium mb-1">
              Organisation Legal Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tembo Agritech Ltd"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A]"
            />
          </div>

          <div>
            <label className="block text-[#16213A] font-medium mb-1">
              Tenant Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A]"
            >
              <option value="STARTUP">Startup (Grantee)</option>
              <option value="INSTITUTION">Institution (Funder / Trust / NGO)</option>
            </select>
          </div>

          <div>
            <label className="block text-[#16213A] font-medium mb-1">
              Tax ID / Registration Number
            </label>
            <input
              type="text"
              placeholder="e.g. ••••4471"
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full p-2 bg-white border border-[#DDD8CC] rounded-md text-[#16213A] font-mono"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-[#DDD8CC]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-[#DDD8CC] rounded-md text-[#5A6275]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0E6466] hover:bg-[#0A4F51] text-white font-medium rounded-md"
            >
              Confirm Provision
            </button>
          </div>
        </form>
      </Modal>

      {/* Manage Tenant Drawer/Modal */}
      {selectedTenantManage && (
        <Modal
          isOpen={!!selectedTenantManage}
          onClose={() => setSelectedTenantManage(null)}
          title={`Manage ${selectedTenantManage.name}`}
          description="Ecosystem metadata and tenant lifecycle state."
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-md bg-[#F1EEE7] border border-[#DDD8CC] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#5A6275]">Entity Type:</span>
                <span className="font-semibold text-[#16213A] font-mono">{selectedTenantManage.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6275]">Tax ID:</span>
                <span className="font-mono text-[#16213A]">{selectedTenantManage.taxId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6275]">Active Seats / Users:</span>
                <span className="font-mono text-[#16213A]">{selectedTenantManage.usersCount} users</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6275]">Current Lifecycle:</span>
                <StatusBadge status={selectedTenantManage.status} size="sm" />
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-[#16213A] block mb-1">
                Lifecycle Action
              </span>
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedTenantManage.id)}
                className={`w-full py-2 px-3 rounded-md text-xs font-medium transition ${
                  selectedTenantManage.status === 'Active'
                    ? 'bg-[#FBE6E4] text-[#9B1C1C] border border-[#F7C6C2] hover:bg-[#f8d4d1]'
                    : 'bg-[#E4F1E8] text-[#1D5E3A] border border-[#C8E4D1] hover:bg-[#d5ebd9]'
                }`}
              >
                {selectedTenantManage.status === 'Active' ? 'Suspend Tenant Access' : 'Reactivate Tenant'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
