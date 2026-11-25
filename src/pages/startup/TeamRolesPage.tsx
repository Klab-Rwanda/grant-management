import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail, 
  MoreVertical, 
  Check, 
  Clock, 
  Trash2,
  Lock,
  Download
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const TeamRolesPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'FOUNDER' | 'FINANCE_LEAD' | 'OPERATIONS' | 'AUDITOR'>('FINANCE_LEAD');

  // Exact team members matching G-08
  const [teamMembers, setTeamMembers] = useState([
    {
      id: '1',
      name: 'Amani Ndegwa',
      email: 'amani@tembo-agritech.example',
      role: 'FOUNDER',
      roleLabel: 'Founder & CEO',
      status: 'ACTIVE',
      joined: '12 Jan 2026',
      permissions: 'Full workspace administration, grant acceptance, wire sign-off'
    },
    {
      id: '2',
      name: 'Grace Mutua',
      email: 'grace.mutua@tembo-agritech.example',
      role: 'FINANCE_LEAD',
      roleLabel: 'Finance Lead',
      status: 'ACTIVE',
      joined: '01 Feb 2026',
      permissions: 'General ledger, journal postings, evidence vault, tranche submissions'
    },
    {
      id: '3',
      name: 'David Kimani',
      email: 'david.k@tembo-agritech.example',
      role: 'OPERATIONS',
      roleLabel: 'Operations & Agronomist',
      status: 'ACTIVE',
      joined: '15 Mar 2026',
      permissions: 'Milestone deliverables, field receipts capture, read-only ledger'
    },
    {
      id: '4',
      name: 'Samuel Thorne',
      email: 's.thorne@kpmg-audit.example',
      role: 'AUDITOR',
      roleLabel: 'External Grant Auditor',
      status: 'INVITED',
      joined: 'Invited 2 days ago',
      permissions: 'Read-only access to double-entry ledger, evidence vault, and SHA hashes'
    }
  ]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setTeamMembers(prev => [
      ...prev,
      {
        id: String(Date.now()),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        roleLabel: inviteRole.replace('_', ' '),
        status: 'INVITED',
        joined: 'Just now',
        permissions: 'Standard role permissions'
      }
    ]);
    setIsInviteModalOpen(false);
    setInviteEmail('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching G-08 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Team & roles
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · Workspace user directory, role-based access control, and audit trail ownership
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite team member</span>
          </button>
        </div>
      </div>

      {/* Role Definitions Card */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#DDD8CC] rounded-lg p-4 shadow-ledger">
          <div className="text-xs font-semibold text-[#16213A] flex items-center justify-between mb-1">
            <span>Founder & CEO</span>
            <Shield className="w-4 h-4 text-[#0E6466]" />
          </div>
          <p className="text-[11px] text-[#5A6275]">Full signatory for legal grant offers, bank accounts, and disbursements.</p>
        </div>
        <div className="bg-white border border-[#DDD8CC] rounded-lg p-4 shadow-ledger">
          <div className="text-xs font-semibold text-[#16213A] flex items-center justify-between mb-1">
            <span>Finance Lead</span>
            <Shield className="w-4 h-4 text-[#0E6466]" />
          </div>
          <p className="text-[11px] text-[#5A6275]">Posts double-entry journals, balances trial balance, tags tranches.</p>
        </div>
        <div className="bg-white border border-[#DDD8CC] rounded-lg p-4 shadow-ledger">
          <div className="text-xs font-semibold text-[#16213A] flex items-center justify-between mb-1">
            <span>Operations</span>
            <Shield className="w-4 h-4 text-[#5A6275]" />
          </div>
          <p className="text-[11px] text-[#5A6275]">Submits milestone deliverables, uploads field receipts, manages tasks.</p>
        </div>
        <div className="bg-white border border-[#DDD8CC] rounded-lg p-4 shadow-ledger">
          <div className="text-xs font-semibold text-[#16213A] flex items-center justify-between mb-1">
            <span>Auditor / Reviewer</span>
            <Lock className="w-4 h-4 text-[#D97706]" />
          </div>
          <p className="text-[11px] text-[#5A6275]">Strict read-only inspection of vouchers, hashes, and bank reconciliations.</p>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F1EEE7] border-b border-[#DDD8CC] flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#16213A] uppercase tracking-wider">
            Workspace Members ({teamMembers.length})
          </h2>
          <span className="text-xs text-[#5A6275]">4 active seats · 1 invitation pending</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">User</th>
                <th className="py-2.5 px-4 text-left font-medium">Workspace Role</th>
                <th className="py-2.5 px-4 text-left font-medium">Permissions Scope</th>
                <th className="py-2.5 px-4 text-left font-medium">Status</th>
                <th className="py-2.5 px-4 text-left font-medium">Joined Date</th>
                <th className="py-2.5 px-4 text-right font-medium pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {teamMembers.map((m) => (
                <tr key={m.id} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#16213A] text-white flex items-center justify-center font-bold text-xs uppercase">
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-[#16213A]">{m.name}</div>
                        <div className="text-[11px] text-[#5A6275] font-mono">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#F1EEE7] border border-[#DDD8CC] text-[#16213A] text-[11px] font-medium">
                      {m.roleLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#5A6275] max-w-xs truncate text-[11px]">
                    {m.permissions}
                  </td>
                  <td className="py-3 px-4">
                    {m.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#0E6466] font-medium">
                        <Check className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#D97706] font-medium">
                        <Clock className="w-3.5 h-3.5" /> Pending invite
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#5A6275] text-[11px]">{m.joined}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-[#5A6275] hover:text-[#C0392B] p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite workspace member">
        <form onSubmit={handleInvite} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-[#16213A] mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={inviteEmail} 
              onChange={e => setInviteEmail(e.target.value)} 
              placeholder="e.g. colleague@tembo-agritech.example"
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
          <div>
            <label className="block font-medium text-[#16213A] mb-1">Role & Permissions</label>
            <select
              value={inviteRole}
              onChange={e => setInviteRole(e.target.value as any)}
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            >
              <option value="FINANCE_LEAD">Finance Lead (Full ledger & tranche management)</option>
              <option value="OPERATIONS">Operations (Milestone evidence & receipts)</option>
              <option value="AUDITOR">Auditor (Read-only verification access)</option>
              <option value="FOUNDER">Founder (Full workspace signatory)</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsInviteModalOpen(false)} 
              className="px-3.5 py-1.5 border border-[#DDD8CC] rounded-md text-[#5A6275] hover:bg-[#F1EEE7]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-3.5 py-1.5 bg-[#0E6466] text-white rounded-md hover:bg-[#0B4F51]"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
