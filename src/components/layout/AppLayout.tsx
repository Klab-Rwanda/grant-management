import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppLayoutProps {
  title?: string;
  breadcrumbs?: string[];
}

export const AppLayout: React.FC<AppLayoutProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col antialiased text-slate-900 dark:text-slate-100">
      <Sidebar />
      <div className="pl-64 flex flex-col flex-1 min-w-0">
        <Header title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
