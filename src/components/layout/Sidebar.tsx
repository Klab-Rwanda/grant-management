import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  FileText, 
  Bell, 
  Building2, 
  Banknote, 
  Users, 
  Briefcase, 
  FolderKanban,
  Sliders,
  LogOut,
  ChevronDown,
  Activity,
  Award,
  Flame,
  PieChart,
  CheckSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  badge?: string;
}

interface NavGroup {
  section: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentUser, switchRole } = useApp();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isAdmin = currentUser.role === 'PLATFORM_ADMIN';

  // Navigation matching DS-1 & mockups (A-01, A-02, A-03, A-04, B-01, X-01)
  const startupNav: NavGroup[] = [
    { section: '', items: [
      { label: 'Dashboard', path: '/startup/dashboard', icon: LayoutDashboard }
    ]},
    { section: 'ACCOUNTING', items: [
      { label: 'Chart of accounts', path: '/startup/chart-of-accounts', icon: BookOpen },
      { label: 'Journal entries', path: '/startup/journal', icon: FileText },
      { label: 'General ledger', path: '/startup/ledger', icon: BookOpen },
      { label: 'Reports', path: '/startup/reports', icon: FileText },
      { label: 'Burn & runway', path: '/startup/burn-runway', icon: Flame },
      { label: 'Budget vs actuals', path: '/startup/budgets', icon: PieChart },
      { label: 'Bank import', path: '/startup/bank-import', icon: Banknote },
    ]},
    { section: 'OPERATIONS', items: [
      { label: 'Activity log', path: '/startup/milestones', icon: Activity }
    ]},
    { section: 'GRANTS', items: [
      { label: 'My grants', path: '/startup/grants', icon: Award },
      { label: 'Grant offer', path: '/startup/grant-offer', icon: FileText },
      { label: 'Tranche workspace', path: '/startup/tranches', badge: '3', icon: Layers },
      { label: 'Evidence vault', path: '/startup/evidence', icon: ShieldCheck }
    ]},
    { section: 'WORKSPACE', items: [
      { label: 'Notifications', path: '/startup/notifications', badge: '4', icon: Bell },
      { label: 'Audit log', path: '/startup/reports', icon: Activity },
      { label: 'Team & roles', path: '/startup/team', icon: Users },
      { label: 'Integrations', path: '/startup/integrations', icon: Sliders }
    ]}
  ];

  const institutionNav: NavGroup[] = [
    { section: 'PORTFOLIO', items: [
      { label: 'Programs list', path: '/institution/programs', icon: FolderKanban },
      { label: 'Funded portfolio', path: '/institution/startups', icon: Briefcase },
    ]},
    { section: 'REVIEWS', items: [
      { label: 'Review queue', path: '/institution/reviews', badge: '7', icon: CheckSquare },
      { label: 'Committee sign-off', path: '/institution/approvals', icon: Award },
      { label: 'Disbursement & wire', path: '/institution/reconciliation', icon: Banknote },
    ]},
    { section: 'RECORDS', items: [
      { label: 'Audit log', path: '/institution/reports', icon: Activity },
      { label: 'Notifications', path: '/startup/notifications', badge: '3', icon: Bell },
    ]}
  ];

  const adminNav: NavGroup[] = [
    { section: 'PLATFORM', items: [
      { label: 'Tenants', path: '/admin/tenants', icon: Building2 },
      { label: 'Platform health', path: '/admin/health', icon: Activity },
      { label: 'Platform audit log', path: '/admin/audit', icon: FileText },
      { label: 'Schema & templates', path: '/admin/schema', icon: Sliders },
    ]}
  ];

  const currentNav = isAdmin ? adminNav : currentUser.role === 'INSTITUTION_OFFICER' ? institutionNav : startupNav;

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'STARTUP_FOUNDER') navigate('/startup/dashboard');
    else if (newRole === 'INSTITUTION_OFFICER') navigate('/institution/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <aside className={`w-64 border-r flex flex-col h-screen fixed left-0 top-0 z-30 select-none ${
      isAdmin 
        ? 'bg-[#16213A] border-[#223150] text-[#CBD5E1]' 
        : 'bg-[#F1EEE7] border-[#DDD8CC] text-[#3E4A63]'
    }`}>
      {/* Brand Header */}
      <div className={`h-14 flex items-center px-4 border-b ${
        isAdmin ? 'border-[#223150]' : 'border-[#DDD8CC]'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-[#16213A] text-white flex items-center justify-center font-bold text-xs">
            G
          </div>
          <span className={`text-sm font-semibold tracking-tight ${
            isAdmin ? 'text-white' : 'text-[#16213A]'
          }`}>
            Grant Ledger
          </span>
        </div>
      </div>

      {/* Workspace Switcher Pill */}
      <div className={`p-3 border-b ${isAdmin ? 'border-[#223150]' : 'border-[#DDD8CC]'}`}>
        <button
          onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          className={`w-full flex items-center gap-2 p-2 rounded-md border text-left text-xs transition ${
            isAdmin 
              ? 'bg-[#223150] border-[#2E4268] text-white hover:bg-[#283b5e]' 
              : 'bg-white border-[#DDD8CC] text-[#16213A] hover:border-[#8C8573]'
          }`}
        >
          <div className={`w-7 h-7 rounded flex items-center justify-center font-semibold text-[11px] shrink-0 ${
            isAdmin ? 'bg-[#3E4A63] text-white' : 'bg-[#E5EEF9] text-[#1E4E8C]'
          }`}>
            {isAdmin ? 'PL' : currentUser.role === 'INSTITUTION_OFFICER' ? 'RI' : 'TA'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-xs truncate">
              {isAdmin ? 'Platform governance' : currentUser.organizationName}
            </div>
            <div className="text-[10px] opacity-75 truncate">
              {isAdmin ? 'Ecosystem Admin' : currentUser.role === 'INSTITUTION_OFFICER' ? 'Institution workspace' : 'Startup workspace'}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
        </button>

        {roleDropdownOpen && (
          <div className="mt-1.5 bg-white border border-[#DDD8CC] rounded-lg shadow-lg py-1 text-xs text-[#16213A] z-50">
            <button
              onClick={() => handleRoleSwitch('STARTUP_FOUNDER')}
              className="w-full text-left px-3 py-2 hover:bg-[#F1EEE7] flex flex-col"
            >
              <span className="font-semibold">Tembo Agritech Ltd</span>
              <span className="text-[10px] text-[#5A6275]">Startup workspace</span>
            </button>
            <button
              onClick={() => handleRoleSwitch('INSTITUTION_OFFICER')}
              className="w-full text-left px-3 py-2 hover:bg-[#F1EEE7] flex flex-col border-t border-[#DDD8CC]"
            >
              <span className="font-semibold">Riverbend Innovation Trust</span>
              <span className="text-[10px] text-[#5A6275]">Institution workspace</span>
            </button>
            <button
              onClick={() => handleRoleSwitch('PLATFORM_ADMIN')}
              className="w-full text-left px-3 py-2 hover:bg-[#F1EEE7] flex flex-col border-t border-[#DDD8CC]"
            >
              <span className="font-semibold">Platform Governance</span>
              <span className="text-[10px] text-[#5A6275]">Ecosystem Admin</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {currentNav.map((group, gIdx) => (
          <div key={gIdx} className="space-y-0.5">
            {group.section && (
              <div className={`px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${
                isAdmin ? 'text-[#64748B]' : 'text-[#5A6275]'
              }`}>
                {group.section}
              </div>
            )}
            {group.items.map((item, iIdx) => (
              <NavLink
                key={iIdx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                    isActive
                      ? isAdmin
                        ? 'bg-[#223150] text-white font-semibold'
                        : 'bg-white text-[#16213A] shadow-sm font-semibold border-l-2 border-[#0E6466]'
                      : isAdmin
                      ? 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                      : 'text-[#3E4A63] hover:text-[#16213A] hover:bg-white/60'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    item.badge === '3' 
                      ? 'bg-[#FBF0D9] text-[#7A4A00]' 
                      : 'bg-[#ECEAE4] text-[#4A5266]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className={`p-3 border-t flex items-center justify-between ${
        isAdmin ? 'border-[#223150] bg-[#121B30]' : 'border-[#DDD8CC] bg-[#EAE6DE]'
      }`}>
        <div className="flex items-center space-x-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#16213A] text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className={`text-xs font-semibold truncate ${isAdmin ? 'text-white' : 'text-[#16213A]'}`}>
              {currentUser.name}
            </p>
            <p className="text-[10px] text-[#5A6275] truncate">
              {currentUser.email}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/auth/login')}
          title="Sign out"
          className="p-1 text-[#5A6275] hover:text-[#16213A] rounded transition"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
