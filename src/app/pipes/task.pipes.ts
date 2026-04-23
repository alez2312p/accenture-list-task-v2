import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSpent',
  standalone: true,
})
export class TimeSpentPipe implements PipeTransform {
  transform(createdAt: Date, status: string): string | null {
    if (status !== 'completed') return null;

    const created = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const diff = now - created;

    if (diff <= 0) return 'ahora';

    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) return `${days}día${days > 1 ? 's' : ''} ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}min`;
  }
}

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }
}

@Pipe({
  name: 'dueDate',
  standalone: true,
})
export class DueDatePipe implements PipeTransform {
  transform(date: Date | undefined, taskStatus: string): string {
    if (!date) return '';

    const d = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDay = new Date(d).setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((dueDay - today.getTime()) / (24 * 60 * 60 * 1000));

    if (diffDays < 0) return 'vencida';
    if (diffDays === 0) return 'hoy';
    if (diffDays === 1) return 'mañana';

    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }
}