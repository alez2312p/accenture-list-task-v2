import { Injectable, signal, effect, computed } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

export type SortBy = 'created' | 'dueDate' | 'title';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';

  private _tasks = signal<Task[]>(this.loadFromStorage());
  public tasks = this._tasks.asReadonly();

  private _lastAction = signal<{
    type: string;
    task?: Task;
    taskData?: Partial<Task>;
  } | null>(null);

  public sortBy = signal<SortBy>('created');
  public searchQuery = signal<string>('');

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._tasks()));
    });
  }

  private loadFromStorage(): Task[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    const rawTasks: (Task & { completed?: boolean })[] = JSON.parse(stored);
    return rawTasks.map((t) => {
      const status: TaskStatus =
        t.status || (t.completed ? 'completed' : 'pending');
      return {
        id: t.id,
        title: t.title,
        status,
        categoryId: t.categoryId,
        createdAt: new Date(t.createdAt),
        statusChangedAt: t.statusChangedAt
          ? new Date(t.statusChangedAt)
          : new Date(t.createdAt),
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
      };
    });
  }

  createTask(
    title: string,
    categoryId?: string,
    status: TaskStatus = 'pending',
    dueDate?: Date,
  ): void {
    const now = new Date();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status,
      categoryId,
      createdAt: now,
      statusChangedAt: now,
      dueDate,
    };
    this._tasks.update((prev) => [...prev, newTask]);
    this._lastAction.set({ type: 'create', task: newTask });
  }

  updateTask(
    id: string,
    data: Partial<Pick<Task, 'title' | 'categoryId' | 'dueDate'>>,
  ): void {
    const task = this._tasks().find((t) => t.id === id);
    this._tasks.update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t)),
    );
    const updated = this._tasks().find((t) => t.id === id);
    if (updated && task) {
      this._lastAction.set({ type: 'update', task, taskData: data });
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): void {
    const task = this._tasks().find((t) => t.id === id);
    this._tasks.update((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        return { ...t, status, statusChangedAt: new Date() };
      }),
    );
    if (task) {
      this._lastAction.set({ type: 'status', task, taskData: { status } });
    }
  }

  deleteTask(id: string): void {
    const task = this._tasks().find((t) => t.id === id);
    this._tasks.update((prev) => prev.filter((t) => t.id !== id));
    if (task) {
      this._lastAction.set({ type: 'delete', task });
    }
  }

  deleteTasksByCategory(categoryId: string): void {
    this._tasks.update((prev) =>
      prev.filter((t) => t.categoryId !== categoryId),
    );
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setSortBy(sort: SortBy): void {
    this.sortBy.set(sort);
  }
}
