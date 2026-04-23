import { TaskStatus } from '../models/task.model';

export interface StatusConfig {
  label: string;
  color: string;
  icon: string;
}

export type { TaskStatus };

export const STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
  pending: { label: 'Pendiente', color: 'medium', icon: 'ellipse-outline' },
  in_progress: { label: 'En Proceso', color: 'warning', icon: 'hourglass-outline' },
  completed: { label: 'Completada', color: 'success', icon: 'checkmark-circle-outline' },
  cancelled: { label: 'Cancelada', color: 'danger', icon: 'close-circle-outline' },
};

export const ALL_STATUSES: (TaskStatus | null)[] = [null, 'pending', 'in_progress', 'completed', 'cancelled'];

export type SortBy = 'created' | 'dueDate' | 'title';

export const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'created', label: 'Fecha' },
  { value: 'dueDate', label: 'Vencimiento' },
  { value: 'title', label: 'A-Z' },
];