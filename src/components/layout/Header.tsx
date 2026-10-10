import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Avatar } from '../ui/Avatar';
import { Bell, ChevronDown, Settings, LogOut, User, BookOpen, Brain, CalendarDays, FileText, BarChart3, Users, Lightbulb, Dumbbell, Search as SearchIcon, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { notifications, user, logout } = useAppContext();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Initials from user name
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'NG';

  // Search navigates to relevant MindMate sections and suggests common learning topics.
  const searchCatalog = [
    { title: 'Home Dashboard', description: 'Today’s plan and learning overview', path: '/home', keywords: 'home dashboard plan today overview' , icon: Brain },
    { title: 'Learn / AI Tutor', description: 'Ask questions and learn concepts', path: '/learn', keywords: 'learn learning ai tutor assistant ask explain python functions', icon: BookOpen },
    { title: 'Practice', description: 'Practice topics and improve mastery', path: '/practice', keywords: 'practice quiz questions revision exercises python dbms oop computer networks', icon: Dumbbell },
    { title: 'Progress', description: 'Review scores, mastery and progress', path: '/progress', keywords: 'progress score history performance mastery analytics', icon: BarChart3 },
    { title: 'Learning Twin', description: 'View your learning profile and strengths', path: '/learning-twin', keywords: 'learning twin mastery strengths weak topics personalize', icon: Brain },
    { title: 'Planner', description: 'Manage your study plan and schedule', path: '/planner', keywords: 'planner calendar schedule tasks study plan', icon: CalendarDays },
    { title: 'Materials', description: 'Open your learning materials', path: '/materials', keywords: 'materials notes pdf documents files study', icon: FileText },
    { title: 'Insights', description: 'Personalized recommendations and insights', path: '/insights', keywords: 'insights recommendations next best action suggestions', icon: Lightbulb },
    { title: 'Friends & Battle', description: 'Study partners, challenges and XP', path: '/friends', keywords: 'friends battle invite referral xp reward leaderboard study together', icon: Users },
    { title: 'Settings', description: 'Manage your preferences', path: '/settings', keywords: 'settings privacy accessibility account preferences', icon: Settings },
  ];
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    const terms = query.split(/\\s+/).filter(Boolean);
    return searchCatalog
      .map((item) => {
        const searchable = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
        const score = terms.reduce((total, term) => total + (item.title.toLowerCase().includes(term) ? 4 : item.keywords.includes(term) ? 2 : item.description.toLowerCase().includes(term) ? 1 : 0), 0);
        return { ...item, score, searchable };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [searchQuery]);

  return (
    <header className="relative z-20 min-h-[68px] h-auto bg-surface border-b border-border flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-5 lg:px-8 w-full shrink-0">
      <div>
        <h2 className="text-lg sm:text-2xl lg:text-[28px] font-bold text-dark leading-tight">{title}</h2>
        {subtitle && <p className="hidden sm:block text-xs sm:text-sm text-muted">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <div className="relative hidden w-56 md:block lg:w-60" ref={searchRef}>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
            <SearchIcon className="h-4 w-4 text-muted" />
          </div>
          <input
            value={searchQuery}
            onChange={(event) => { setSearchQuery(event.target.value); setShowSearchResults(true); }}
            onFocus={() => setShowSearchResults(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setShowSearchResults(false);
              if (event.key === 'Enter' && searchResults.length > 0) {
                navigate(searchResults[0].path);
                setSearchQuery('');
                setShowSearchResults(false);
              }
            }}
            placeholder="Search topics, pages..."
            aria-label="Search MindMate"
            aria-expanded={showSearchResults}
            className="block w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute right-0 top-full z-[60] mt-2 max-h-[360px] w-[min(340px,85vw)] overflow-y-auto rounded-2xl border border-border bg-surface p-2 shadow-xl">
              {searchResults.length ? (
                <>
                  <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">Search results</p>
                  {searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path + item.title}
                        onClick={() => { navigate(item.path); setSearchQuery(''); setShowSearchResults(false); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-indigo-50"
                      >
                        <span className="rounded-lg bg-indigo-50 p-2 text-primary"><Icon className="h-4 w-4" /></span>
                        <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-dark">{item.title}</span><span className="block truncate text-xs text-muted">{item.description}</span></span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted" />
                      </button>
                    );
                  })}
                </>
              ) : (
                <div className="px-4 py-6 text-center"><SearchIcon className="mx-auto mb-2 h-5 w-5 text-muted" /><p className="text-sm font-semibold text-dark">No results found</p><p className="mt-1 text-xs text-muted">Try Python, DBMS, practice, progress or materials.</p></div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="p-2 text-muted hover:text-dark hover:bg-gray-50 rounded-full transition-colors relative"
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-danger rounded-full ring-2 ring-surface" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface rounded-card shadow-lg border border-border py-2 z-50">
              <div className="px-4 py-2 border-b border-border flex justify-between items-center">
                <h3 className="font-semibold text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      'px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-border last:border-0',
                      !n.isRead && 'bg-indigo-50/50'
                    )}
                  >
                    <div className="flex gap-3">
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                      <p className="text-dark/90">{n.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity py-1 px-1 rounded-lg"
          >
            <Avatar src={user?.avatar?.startsWith('/avatars/') ? user.avatar : '/avatars/avatar-01.webp'} fallback={initials} size="sm" className="ring-1 ring-primary/20" />
            <span className="hidden md:block text-sm font-medium text-dark">{user?.name ?? 'Learner'}</span>
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-surface rounded-card shadow-lg border border-border py-1.5 z-50">
              <div className="px-4 py-2 border-b border-border mb-1">
                <p className="text-sm font-semibold text-dark truncate">{user?.name ?? 'Learner'}</p>
                <p className="text-xs text-muted truncate">{user?.email ?? ''}</p>
              </div>
              <button
                onClick={() => { setShowProfile(false); navigate('/settings'); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-dark hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4 text-muted" /> Profile
              </button>
              <button
                onClick={() => { setShowProfile(false); navigate('/settings'); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-dark hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4 text-muted" /> Settings
              </button>
              <div className="border-t border-border mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
