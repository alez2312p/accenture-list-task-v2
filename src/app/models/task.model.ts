export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  categoryId?: string;
  createdAt: Date;
  statusChangedAt: Date;
  dueDate?: Date;
}