import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppContext } from '../../context/AppContext';
import { ToastContainer } from '../ui/Toast';
import { AlertCircle } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
}

export function AppShell({ children, pageTitle, pageSubtitle }: AppShellProps) {
  const { isOnline } = useAppContext();

  return (
    <div className="min-h-screen bg-background flex text-dark font-['Inter',sans-serif]">
      <Sidebar />
      <div className="flex-1 ml-[64px] sm:ml-[76px] lg:ml-[240px] flex flex-col min-h-screen min-w-0 w-[calc(100vw-64px)] sm:w-[calc(100vw-76px)] lg:w-[calc(100vw-240px)]">
        <Header title={pageTitle} subtitle={pageSubtitle} />
        
        {!isOnline && (
          <div className="bg-warning text-yellow-900 px-6 py-2 flex items-center justify-center gap-2 text-sm font-medium z-20 shadow-sm relative">
            <AlertCircle className="h-4 w-4" />
            You're offline. Core learning features are still available.
          </div>
        )}
        
        <main className="flex-1 p-3 sm:p-5 lg:p-8 w-full max-w-7xl mx-auto min-w-0">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
