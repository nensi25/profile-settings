import React, { useEffect, useMemo, useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PlannerDay } from '../components/shared/PlannerDay';
import { plannerDays, learner } from '../data/mockData';
import { Target, Sparkles, RefreshCw, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Planner() {
  const { showToast } = useAppContext();
  const currentDay = 'Wed'; // Mock current day
  const [completedTasks, setCompletedTasks] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('mindmate_planner_completed_v2');
      return saved ? JSON.parse(saved) as Record<string, string> : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem('mindmate_planner_completed_v2', JSON.stringify(completedTasks));
  }, [completedTasks]);
  const totalTasks = useMemo(() => plannerDays.reduce((total, day) => total + day.tasks.length, 0), []);
  const completedCount = Object.keys(completedTasks).filter(id => id.includes(':') && plannerDays.some(day => day.tasks.some(task => id === `${day.day}:${task.name}`))).length;
  const completionPercent = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
  const handleCompleteTask = (id: string, reflection: string) => {
    setCompletedTasks(previous => ({ ...previous, [id]: reflection }));
    showToast('Study session completed. Your reflection has been saved.', 'success');
  };

  const handleRegenerate = () => {
    showToast('AI is regenerating your learning plan...', 'info');
  };

  return (
    <AppShell pageTitle="Weekly Planner" pageSubtitle="Your personalized path to success">
      <div className="max-w-6xl space-y-8">
        
        {/* Goal Card */}
        <Card className="p-6 bg-gradient-to-r from-surface to-indigo-50/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary font-semibold mb-2 text-sm uppercase tracking-wider">
                <Target className="h-4 w-4" /> Current Goal
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">{learner.goal}</h2>
              <p className="text-muted text-sm">Exam in 3 weeks. You are on track.</p>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-dark">Weekly plan completed</span>
                <span className="text-primary">{completionPercent}%</span>
              </div>
              <ProgressBar value={completionPercent} className="h-2" />
              <p className="mt-2 text-xs text-muted">{completedCount} of {totalTasks} sessions completed with a saved reflection</p>
            </div>
          </div>
        </Card>

        {/* AI Notification */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <div className="text-orange-500 mt-0.5">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-orange-900 mb-1">Plan Updated by MindMate</h4>
              <p className="text-sm text-orange-800/80">You struggled with OOP yesterday, so MindMate added a recovery session on Tuesday to strengthen your foundation before moving on.</p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="secondary" size="sm" onClick={handleRegenerate} className="bg-white hover:bg-orange-100 text-orange-700 border-orange-200">
              <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
            </Button>
            <Button variant="ghost" size="sm" className="text-orange-700 hover:bg-orange-100">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Planner Grid */}
        <Card className="p-6 overflow-x-auto">
          <div className="flex min-w-[800px] gap-6">
            {plannerDays.map((dayData, i) => (
              <PlannerDay 
                key={i} 
                data={dayData} 
                isToday={dayData.day === currentDay}
                completedTasks={completedTasks}
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
        </Card>

      </div>
    </AppShell>
  );
}
