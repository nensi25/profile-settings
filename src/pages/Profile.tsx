import React, { useEffect, useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { UserRound, Save, Sparkles } from 'lucide-react';

const AVATARS = [
  'The Focused','The Coder','The Planner','The Reader','The Music Lover',
  'The Dreamer','The Productive','The Chill Buddy','The Curious','The Artist',
  'The Explorer','The Leader','The Night Owl','The Healthy','The Minimalist',
  'The Gamer Learner','The Aesthetic','The Calm Mind','The Scholar','MindMate AI'
].map((label, index) => ({ label, src: `/avatars/avatar-${String(index + 1).padStart(2, '0')}.webp` }));

export default function Profile() {
  const { user, updateUser, showToast } = useAppContext();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '/avatars/avatar-01.webp');
  useEffect(() => { setName(user?.name || ''); setEmail(user?.email || ''); setAvatar(user?.avatar || '/avatars/avatar-01.webp'); }, [user]);
  const saveProfile = () => {
    const cleanName = name.trim(); const cleanEmail = email.trim();
    if (cleanName.length < 2) { showToast('Please enter your name.', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) { showToast('Please enter a valid email address.', 'error'); return; }
    const oldEmail = user?.email?.toLowerCase();
    try {
      const accounts: Array<{name:string; email:string; password:string; avatar?:string}> = JSON.parse(localStorage.getItem('mindmate_accounts') || '[]');
      const duplicate = accounts.some((account) => account.email.toLowerCase() === cleanEmail.toLowerCase() && account.email.toLowerCase() !== oldEmail);
      if (duplicate) { showToast('That email is already used by another local account.', 'error'); return; }
      const index = accounts.findIndex((account) => account.email.toLowerCase() === oldEmail);
      if (index >= 0) { accounts[index] = { ...accounts[index], name: cleanName, email: cleanEmail, avatar }; localStorage.setItem('mindmate_accounts', JSON.stringify(accounts)); }
    } catch { /* account list may not exist for legacy demo sessions */ }
    updateUser({ name: cleanName, email: cleanEmail, avatar });
    showToast('Your MindMate profile has been updated.', 'success');
  };
  return <AppShell pageTitle="My Profile" pageSubtitle="Your identity, your style, your learning journey">
    <div className="mx-auto max-w-5xl space-y-3 pb-4">
      <div className="profile-hero relative overflow-hidden rounded-2xl p-3 sm:p-4 text-white">
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="profile-avatar-orb h-9 w-9 shrink-0 sm:h-10 sm:w-10 overflow-hidden rounded-xl border border-white/40 bg-white/15 shadow-2xl backdrop-blur"><img src={avatar.startsWith('/avatars/') ? avatar : '/avatars/avatar-01.webp'} alt="Selected study avatar" className="h-full w-full object-cover" /></div>
          <div><div className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold"><Sparkles className="h-3.5 w-3.5"/> YOUR LEARNING ID</div><h2 className="text-xl sm:text-2xl font-bold">{name.trim() || 'Your name goes here'}</h2><p className="mt-1 text-sm text-white/80">{email || 'Add your email address below'}</p><p className="mt-1 max-w-md text-xs text-white/80">Make MindMate yours. Your avatar and profile details appear throughout your study space.</p></div>
        </div>
        <div className="profile-aurora-orb profile-aurora-orb-one"/><div className="profile-aurora-orb profile-aurora-orb-two"/>
      </div>
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-3 py-2.5"><div className="flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-2.5 text-primary"><UserRound className="h-5 w-5"/></div><div><h3 className="text-lg font-semibold text-dark">Profile details</h3><p className="text-sm text-muted">Choose how your name and avatar appear in MindMate.</p></div></div></div>
        <div className="space-y-3 p-2.5 sm:p-4">
          <div><div className="mb-2 flex flex-wrap items-end justify-between gap-2"><div><p className="text-sm font-semibold text-dark">Choose your study avatar</p><p className="mt-1 text-xs text-muted">20 neon-inspired identities made for MindMate learners.</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{AVATARS.find(a => a.src === avatar)?.label || 'Selected avatar'}</span></div><div className="grid grid-cols-4 gap-1 min-[520px]:grid-cols-5 sm:grid-cols-6 xl:grid-cols-8">{AVATARS.map((item)=><button key={item.src} type="button" onClick={()=>setAvatar(item.src)} aria-label={`Choose ${item.label} avatar`} aria-pressed={avatar===item.src} className={`group overflow-hidden rounded-xl border text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${avatar===item.src?'border-primary ring-2 ring-primary/50 shadow-md':'border-border hover:border-primary/60'}`}><div className="relative h-11 overflow-hidden bg-slate-950 min-[520px]:h-12 sm:h-14 xl:h-16"><img src={item.src} alt={item.label} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />{avatar===item.src && <span className="absolute right-1 top-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">SELECTED</span>}</div><div className="bg-background px-0.5 py-1 text-center text-[9px] font-semibold leading-tight text-dark min-h-6 flex items-center justify-center">{item.label}</div></button>)}</div></div>
          <div className="grid gap-3 sm:grid-cols-2"><label className="block text-sm font-medium text-dark">Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" autoComplete="name" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"/></label><label className="block text-sm font-medium text-dark">Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"/></label></div>
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-border"><img src={avatar.startsWith('/avatars/') ? avatar : '/avatars/avatar-01.webp'} alt="Selected avatar preview" className="h-full w-full object-cover" /></span><div><p className="font-semibold text-dark">{name.trim() || 'Your name'}</p><p className="text-sm text-muted">{email || 'Your email'}</p></div></div><button onClick={saveProfile} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"><Save className="h-4 w-4"/>Save profile</button></div>
          <p className="text-xs leading-5 text-muted">Prototype note: these details are saved in this browser only. Email ownership is not verified and this does not update an external email account.</p>
        </div>
      </Card>
    </div>
  </AppShell>;
}
