import { Component, inject, signal, computed } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonChip,
  IonSearchbar,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { TaskService, SortBy } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Task, TaskStatus } from '../models/task.model';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import {
  STATUS_CONFIG,
  ALL_STATUSES,
  SORT_OPTIONS,
} from '../config/task.config';
import { addIcons } from 'ionicons';
import {
  add,
  search,
  swapVertical,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonChip,
    IonSearchbar,
    IonButton,
    IonButtons,
    ConfirmModalComponent,
    TaskFormComponent,
    TaskCardComponent,
  ],
})
export class HomePage {
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);

  tasks = this.taskService.tasks;
  categories = this.categoryService.categories;
  statusConfig = STATUS_CONFIG;
  statusOptions = ALL_STATUSES;
  sortOptions = SORT_OPTIONS;

  selectedStatus = signal<TaskStatus | null>(null);
  isModalOpen = signal(false);
  editingTask = signal<Task | null>(null);
  taskToDelete = signal<Task | null>(null);
  isConfirmDeleteOpen = signal(false);
  showSortMenu = signal(false);
  statusConfigConst = STATUS_CONFIG;

  filteredTasks = computed(() => {
    const status = this.selectedStatus();
    const sort = this.taskService.sortBy();
    const query = this.taskService.searchQuery().toLowerCase();
    const allTasks = this.taskService.tasks();

    let tasks = status ? allTasks.filter((t) => t.status === status) : allTasks;

    if (query) {
      tasks = tasks.filter((t) => t.title.toLowerCase().includes(query));
    }

    return tasks.sort((a, b) => {
      switch (sort) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'created':
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
  });

  getCountByStatus(status: TaskStatus | null): number {
    const allTasks = this.tasks();
    return status
      ? allTasks.filter((t) => t.status === status).length
      : allTasks.length;
  }

  constructor() {
    addIcons({ add, search, swapVertical, checkmarkCircleOutline });
  }

  getCategoryById(categoryId?: string) {
    return categoryId
      ? this.categoryService.getCategoryById(categoryId)
      : undefined;
  }

  selectStatus(status: TaskStatus | null): void {
    this.selectedStatus.set(status);
  }

  isSelected(status: TaskStatus | null): boolean {
    return this.selectedStatus() === status;
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLIonSearchbarElement).value || '';
    this.taskService.setSearchQuery(query);
  }

  setSortBy(sort: SortBy): void {
    this.taskService.setSortBy(sort);
    this.showSortMenu.set(false);
  }

  getCurrentSort(): SortBy {
    return this.taskService.sortBy();
  }

  confirmDeleteTask(task: Task): void {
    this.taskToDelete.set(task);
    this.isConfirmDeleteOpen.set(true);
  }

  async onConfirmDelete(): Promise<void> {
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

  async onSwipePrev(task: Task): Promise<void> {
    const current = task.status;
    let newStatus: TaskStatus | null = null;

    if (current === 'completed') newStatus = 'in_progress';
    else if (current === 'in_progress') newStatus = 'pending';

    if (newStatus) {
      this.taskService.updateTaskStatus(task.id, newStatus);
      const toast = await toastController.create({
        message: STATUS_CONFIG[newStatus].label + ' ✓',
        duration: 1500,
        color: STATUS_CONFIG[newStatus].color,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  async onSwipeNext(task: Task): Promise<void> {
    const current = task.status;
    let newStatus: TaskStatus | null = null;

    if (current === 'pending') newStatus = 'in_progress';
    else if (current === 'in_progress') newStatus = 'completed';

    if (newStatus) {
      this.taskService.updateTaskStatus(task.id, newStatus);
      const toast = await toastController.create({
        message: STATUS_CONFIG[newStatus].label + ' ✓',
        duration: 1500,
        color: STATUS_CONFIG[newStatus].color,
        position: 'bottom',
      });
      await toast.present();
    }
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

  onSaveTask(event: {
    title: string;
    categoryId: string | null;
    status: TaskStatus;
    dueDate?: Date;
  }): void {
    const editing = this.editingTask();
    if (editing) {
      this.taskService.updateTask(editing.id, {
        title: event.title,
        categoryId: event.categoryId || undefined,
        dueDate: event.dueDate,
      });
      if (event.status !== editing.status) {
        this.taskService.updateTaskStatus(editing.id, event.status);
      }
    } else {
      this.taskService.createTask(
        event.title,
        event.categoryId || undefined,
        event.status,
        event.dueDate,
      );
    }
    this.closeModal();
  }
}
