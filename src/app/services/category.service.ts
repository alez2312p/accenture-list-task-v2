import { Injectable, signal, effect } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly STORAGE_KEY = 'categories';

  // 1. Estado manejado (Privado para escritura, Público para lectura)
  private _categories = signal<Category[]>(this.loadFromStorage());
  public categories = this._categories.asReadonly();

  constructor() {
    // 2. Efecto automático: cada vez que _categories cambie, se guarda en LocalStorage
    effect(() => {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this._categories()),
      );
    });
  }

  private loadFromStorage(): Category[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  createCategory(name: string, color: string): void {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    // Actualizamos el signal (esto dispara el effect automáticamente)
    this._categories.update((prev) => [...prev, newCategory]);
  }

  updateCategory(id: string, name: string, color: string): void {
    this._categories.update((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name, color } : c)),
    );
  }

  deleteCategory(id: string): void {
    this._categories.update((prev) => prev.filter((c) => c.id !== id));
  }

  getCategoryById(id: string): Category | undefined {
    return this._categories().find((c) => c.id === id);
  }
}
