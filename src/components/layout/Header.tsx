import React from 'react';
import { 
  Bell, 
  Search, 
  ChevronRight,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  breadcrumbs?: string[];
}

export const Header: React.FC<HeaderProps> = ({ title, breadcrumbs }) => {
  const { notifications, currentUser } = useApp();
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const initials = currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <header className="h-14 bg-white border-b border-[#DDD8CC] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Title / Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <div className="flex items-center space-x-1.5 text-[#5A6275]">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span className={idx === breadcrumbs.length - 1 ? 'font-semibold text-[#16213A]' : ''}>
                  {crumb}
                </span>
                {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 text-[#8C8573]" />}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <span className="font-semibold text-[#16213A]">{title || 'Dashboard'}</span>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Sample Data Pill (matching screenshot top-right) */}
        <span className="px-2.5 py-1 rounded-pill bg-[#FBF0D9] text-[#7A4A00] border border-[#F4DCAC] text-[11px] font-mono font-bold tracking-wider">
          SAMPLE DATA
        </span>

        {/* Notifications */}
        <button
          onClick={() => navigate('/startup/notifications')}
          className="p-1.5 text-[#5A6275] hover:text-[#16213A] hover:bg-[#F1EEE7] rounded transition relative"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#9B1C1C] rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* User Avatar Circle */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#DDD8CC]">
          <div className="w-7 h-7 rounded-full bg-[#16213A] text-white flex items-center justify-center text-xs font-semibold">
            {initials}
          </div>
          <div className="hidden sm:block text-left text-xs leading-none">
            <span className="font-semibold text-[#16213A] block">{currentUser.name}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#ECEAE4] text-[#4A5266] font-bold">
            {currentUser.role === 'STARTUP_FOUNDER' ? 'FIN' : currentUser.role === 'INSTITUTION_OFFICER' ? 'REV' : 'ADM'}
          </span>
        </div>
      </div>
    </header>
  );
};
