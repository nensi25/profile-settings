import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Check, Clock, BookOpen, XCircle } from 'lucide-react';
import { cn } from '../../utils';

interface TaskCardProps {
  id: string;
  name: string;
  duration: string;
  type: string;
  isDone?: boolean;
  reflection?: string;
  onComplete: (id: string, reflection: string) => void;
}

export function TaskCard({ id, name, duration, type, isDone = false, reflection = '', onComplete }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(reflection);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');

  const getTypeColor = (t: string) => {
    switch (t.toLowerCase()) {
      case 'practice': return 'bg-indigo-100 text-indigo-700';
      case 'recovery': return 'bg-orange-100 text-orange-700';
      case 'review': return 'bg-blue-100 text-blue-700';
      case 'quiz': return 'bg-purple-100 text-purple-700';
      case 'assessment': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const submitCompletion = () => {
    if (notes.trim().length < 15) {
      setError('Write at least 15 characters about what you practised or learned.');
      return;
    }
    if (!confirm) {
      setError('Please confirm that you completed the study session.');
      return;
    }
    onComplete(id, notes.trim());
    setError('');
    setIsOpen(false);
  };

  return (
    <>
      <Card className={cn('p-3 transition-all', isDone ? 'border-emerald-300 bg-emerald-50/70' : 'hover:border-primary/50')}>
        <div className="flex items-start gap-2">
          <div className={cn('h-6 w-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5', isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 text-transparent')}>
            {isDone && <Check className="h-4 w-4" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn('font-medium text-sm break-words', isDone && 'text-emerald-800')}>{name}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider', getTypeColor(type))}>{type}</span>
              <span className="flex items-center text-xs text-muted whitespace-nowrap"><Clock className="h-3 w-3 mr-1" />{duration}</span>
            </div>
            {isDone ? (
              <div className="mt-2 text-xs font-semibold text-emerald-700">Completed · reflection saved</div>
            ) : (
              <button type="button" onClick={() => { setIsOpen(true); setError(''); }} className="mt-3 w-full rounded-lg bg-primary/10 px-2.5 py-2 text-xs font-semibold text-primary hover:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary">
                Start / complete session
              </button>
            )}
          </div>
        </div>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby={`complete-title-${id}`}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-2xl text-dark">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></div>
                <h2 id={`complete-title-${id}`} className="text-lg font-bold">Complete your study session</h2>
                <p className="mt-1 text-sm text-muted">{name} · {duration}</p>
              </div>
              <button type="button" aria-label="Close" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-muted hover:bg-background"><XCircle className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background p-3">
              <p className="text-sm font-semibold">Quick learning reflection</p>
              <p className="mt-1 text-xs text-muted">Write what you practised, one thing you understood, or what you still need to review. This helps make completion meaningful.</p>
              <textarea value={notes} onChange={e => { setNotes(e.target.value); setError(''); }} rows={4} maxLength={500} placeholder="Example: I practised Python default arguments and can explain when they are optional…" className="mt-3 w-full resize-y rounded-lg border border-border bg-surface p-3 text-sm text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="mt-1 text-right text-xs text-muted">{notes.trim().length}/500 characters · at least 15 required</div>
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm text-dark">
              <input type="checkbox" checked={confirm} onChange={e => { setConfirm(e.target.checked); setError(''); }} className="mt-1 h-4 w-4 accent-indigo-600" />
              <span>I genuinely completed this study session and the reflection describes my work.</span>
            </label>
            {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-background">Not yet</button>
              <button type="button" onClick={submitCompletion} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Save reflection & complete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
