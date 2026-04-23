import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonBadge,
  IonButtons,
  IonModal,
} from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { addIcons } from 'ionicons';
import { add, trash, create, chevronDown } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonBadge,
    IonButtons,
    IonModal,
    ConfirmModalComponent,
    TaskFormComponent,
  ],
})
export class HomePage {
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);

  filteredTasks = this.taskService.filteredTasks;
  categories = this.categoryService.categories;
  currentFilter = this.taskService.filterByCategoryId;

  isModalOpen = signal(false);
  editingTask = signal<Task | null>(null);
  taskToDelete = signal<Task | null>(null);
  isConfirmDeleteOpen = signal(false);
  isFilterPickerOpen = signal(false);

  constructor() {
    addIcons({ add, trash, create, chevronDown });
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTaskCompleted(task.id);
  }

  openFilterPicker(): void {
    this.isFilterPickerOpen.set(true);
  }

  closeFilterPicker(): void {
    this.isFilterPickerOpen.set(false);
  }

  applyFilter(categoryId: string | null): void {
    this.taskService.setFilter(categoryId);
    this.closeFilterPicker();
  }

  confirmDeleteTask(task: Task): void {
    this.taskToDelete.set(task);
    this.isConfirmDeleteOpen.set(true);
  }

  onConfirmDelete(): void {
    const task = this.taskToDelete();
    if (task) {
      this.taskService.deleteTask(task.id);
    }
    this.isConfirmDeleteOpen.set(false);
    this.taskToDelete.set(null);
  }

  onCancelDelete(): void {
    this.isConfirmDeleteOpen.set(false);
    this.taskToDelete.set(null);
  }

  openAddModal(): void {
    this.editingTask.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(task: Task): void {
    this.editingTask.set(task);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.editingTask.set(null);
  }

  onSaveTask(event: { title: string; categoryId: string | null }): void {
    const editing = this.editingTask();
    if (editing) {
      this.taskService.updateTask(editing.id, event.title, event.categoryId || undefined);
    } else {
      this.taskService.createTask(event.title, event.categoryId || undefined);
    }
    this.closeModal();
  }

  getCategoryById(categoryId?: string): Category | undefined {
    return categoryId ? this.categoryService.getCategoryById(categoryId) : undefined;
  }
}