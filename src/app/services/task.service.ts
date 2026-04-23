import { Injectable, signal, effect, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';

  private _tasks = signal<Task[]>(this.loadFromStorage());
  public tasks = this._tasks.asReadonly();

  public filterByCategoryId = signal<string | null>(null);

  public filteredTasks = computed(() => {
    const categoryId = this.filterByCategoryId();
    const allTasks = this._tasks();
    return categoryId
      ? allTasks.filter((t) => t.categoryId === categoryId)
      : allTasks;
  });

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._tasks()));
    });
  }

  private loadFromStorage(): Task[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  getTasks(): Task[] {
    return this._tasks();
  }

  getTasksByCategory(categoryId?: string): Task[] {
    return categoryId
      ? this._tasks().filter((t) => t.categoryId === categoryId)
      : this._tasks();
  }

  createTask(title: string, categoryId?: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      categoryId,
      createdAt: new Date(),
    };
    this._tasks.update((prev) => [...prev, newTask]);
  }

  updateTask(id: string, title: string, categoryId?: string): void {
    this._tasks.update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title, categoryId } : t)),
    );
  }

  toggleTaskCompleted(id: string): void {
    this._tasks.update((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  deleteTask(id: string): void {
    this._tasks.update((prev) => prev.filter((t) => t.id !== id));
  }

  deleteTasksByCategory(categoryId: string): void {
    this._tasks.update((prev) =>
      prev.filter((t) => t.categoryId !== categoryId),
    );
  }

  setFilter(categoryId: string | null): void {
    this.filterByCategoryId.set(categoryId);
  }
}
