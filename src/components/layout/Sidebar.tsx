import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Dumbbell, 
  BrainCircuit, 
  BarChart2, 
  Calendar, 
  Files, 
  Lightbulb, 
  Users, 
  Settings,
  UserRound,
  Brain
} from 'lucide-react';
import { cn } from '../../utils';
import { useAppContext } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { StatusIndicator } from '../ui/StatusIndicator';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Learn', icon: BookOpen, path: '/learn' },
  { label: 'Practice', icon: Dumbbell, path: '/practice' },
  { label: 'Learning Twin', icon: BrainCircuit, path: '/learning-twin' },
  { label: 'Progress', icon: BarChart2, path: '/progress' },
  { label: 'Planner', icon: Calendar, path: '/planner' },
  { label: 'Materials', icon: Files, path: '/materials' },
  { label: 'Insights', icon: Lightbulb, path: '/insights' },
  { label: 'My Profile', icon: UserRound, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const { isOnline, toggleOnline, user } = useAppContext();
  const [showOnlineStatus, setShowOnlineStatus] = useState(() => { try { return JSON.parse(localStorage.getItem('mindmate_settings') || '{}').showOnlineStatus !== false; } catch { return true; } });
  useEffect(() => { const sync = (event: Event) => { const detail = (event as CustomEvent<Record<string, boolean>>).detail; if (detail && typeof detail.showOnlineStatus === 'boolean') setShowOnlineStatus(detail.showOnlineStatus); }; window.addEventListener('mindmate-settings-updated', sync); return () => window.removeEventListener('mindmate-settings-updated', sync); }, []);
  const displayName = user?.name?.trim() || 'Learner';
  const initials = displayName.split(/\s+/).map((part) => part[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="w-[64px] sm:w-[76px] lg:w-[240px] fixed inset-y-0 left-0 bg-surface border-r border-border flex flex-col z-40 transition-[width]">
      <div className="p-3 lg:p-6 flex items-center justify-center lg:justify-start gap-3">
        <div className="bg-primary text-white p-2 rounded-xl">
          <Brain className="h-6 w-6" />
        </div>
        <div className="hidden lg:block">
          <h1 className="font-bold text-xl leading-tight">MindMate</h1>
          <p className="text-[10px] font-bold text-primary tracking-wider uppercase">Adaptive Learning Twin</p>
        </div>
      </div>

      <nav className="flex-1 min-h-0 px-1.5 lg:px-4 space-y-1 overflow-y-auto pb-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.label}
            aria-label={item.label}
            className={({ isActive }) => cn(
              "flex items-center justify-center lg:justify-start gap-3 px-2 lg:px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
              isActive 
                ? "text-primary bg-indigo-50" 
                : "text-muted hover:text-dark hover:bg-gray-50"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />}
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted")} />
                <span className="hidden lg:inline">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        <div className="my-4 border-t border-border px-1 lg:px-3 pt-4">
          <NavLink
            to="/friends"
            title="Friends"
            aria-label="Friends"
            className={({ isActive }) => cn(
              "flex items-center justify-center lg:justify-start gap-3 px-2 lg:px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
              isActive ? "text-primary bg-indigo-50" : "text-muted hover:text-dark hover:bg-gray-50"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />}
                <Users className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted")} />
                <span className="hidden lg:inline">Friends</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>

      <div className="shrink-0 p-2 lg:p-4 border-t border-border mt-auto space-y-4">
        {showOnlineStatus && <div
          className="hidden lg:flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={toggleOnline}
          title="Toggle online status (demo)"
        >
          <StatusIndicator isOnline={isOnline} />
        </div>}

        <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-0 lg:px-3">
          <Avatar src={user?.avatar?.startsWith('/avatars/') ? user.avatar : '/avatars/avatar-01.webp'} fallback={initials} size="sm" className="ring-1 ring-primary/20" />
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="text-sm font-medium text-dark truncate">{displayName}</p>
            <p className="text-xs text-muted truncate">MindMate Learner</p>
          </div>
          <NavLink to="/profile" aria-label="Open profile" className="hidden lg:block text-muted hover:text-dark">
            <UserRound className="h-5 w-5" />
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
