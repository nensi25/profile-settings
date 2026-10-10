import React from 'react';
import { PlannerDayData } from '../../types';
import { TaskCard } from './TaskCard';

interface PlannerDayProps {
  data: PlannerDayData;
  isToday?: boolean;
  completedTasks: Record<string, string>;
  onComplete: (id: string, reflection: string) => void;
}

export function PlannerDay({ data, isToday = false, completedTasks, onComplete }: PlannerDayProps) {
  return (
    <div className="flex flex-col flex-1 min-w-[150px]">
      <div className={`text-center py-2 mb-3 border-b-2 font-medium ${isToday ? 'border-primary text-primary' : 'border-transparent text-muted'}`}>
        {data.day}
      </div>
      <div className="flex flex-col gap-3">
        {data.tasks.map((task, i) => {
          const id = `${data.day}:${task.name}`;
          return <TaskCard key={id} id={id} {...task} isDone={Boolean(completedTasks[id])} reflection={completedTasks[id] || ''} onComplete={onComplete} />;
        })}
        {data.tasks.length === 0 && (
          <div className="text-center text-xs text-muted py-4 border border-dashed rounded-xl border-gray-200">Rest day</div>
        )}
      </div>
    </div>
  );
}
