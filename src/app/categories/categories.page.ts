import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
  IonInput,
} from '@ionic/angular/standalone';
import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';
import { Category } from '../models/category.model';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { FormModalComponent } from '../components/form-modal/form-modal.component';
import { addIcons } from 'ionicons';
import { add, trash, create, close } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonButtons,
    IonInput,
    ConfirmModalComponent,
    FormModalComponent,
  ],
})
export class CategoriesPage {
  private categoryService = inject(CategoryService);
  private taskService = inject(TaskService);

  categories = this.categoryService.categories;

  isModalOpen = signal(false);
  editingCategory = signal<Category | null>(null);
  categoryToDelete = signal<Category | null>(null);
  isConfirmDeleteOpen = signal(false);

  categoryName = signal('');
  categoryColor = signal('#3880ff');

  colorOptions = [
    '#3880ff', '#5260ff', '#7c4dff', '#a355ff',
    '#d75dca', '#e431a6', '#f74161', '#fa6674',
    '#ff8f60', '#ffb347', '#ffc857', '#94d82d',
    '#46c123', '#0ecd68', '#2bc6a7', '#20a8cd',
  ];

  isSaveDisabled = () => !this.categoryName().trim();

  constructor() {
    addIcons({ add, trash, create, close });
  }

  openAddModal(): void {
    this.editingCategory.set(null);
    this.categoryName.set('');
    this.categoryColor.set(this.getRandomColor());
    this.isModalOpen.set(true);
  }

  openEditModal(category: Category): void {
    this.editingCategory.set(category);
    this.categoryName.set(category.name);
    this.categoryColor.set(category.color);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingCategory.set(null);
  }

  saveCategory(): void {
    const name = this.categoryName().trim();
    if (!name) return;

    const editing = this.editingCategory();
    if (editing) {
      this.categoryService.updateCategory(editing.id, name, this.categoryColor());
    } else {
      this.categoryService.createCategory(name, this.categoryColor());
    }
    this.closeModal();
  }

  confirmDeleteCategory(category: Category): void {
    this.categoryToDelete.set(category);
    this.isConfirmDeleteOpen.set(true);
  }

  onConfirmDelete(): void {
    const category = this.categoryToDelete();
    if (category) {
      this.taskService.deleteTasksByCategory(category.id);
      this.categoryService.deleteCategory(category.id);
    }
    this.isConfirmDeleteOpen.set(false);
    this.categoryToDelete.set(null);
  }

  onCancelDelete(): void {
    this.isConfirmDeleteOpen.set(false);
    this.categoryToDelete.set(null);
  }

  private getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colorOptions.length);
    return this.colorOptions[randomIndex];
  }
}