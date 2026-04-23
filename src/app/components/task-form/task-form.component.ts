import { Component, input, output, signal, computed } from '@angular/core';
import {
  IonInput,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
} from '@ionic/angular/standalone';
import { CategoryService } from '../../services/category.service';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { addIcons } from 'ionicons';
import { chevronForward, ellipseOutline, hourglassOutline, checkmarkCircleOutline, closeCircleOutline, calendarOutline } from 'ionicons/icons';
import { inject } from '@angular/core';

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; icon: string }> = {
  pending: { label: 'Pendiente', color: '#999999', icon: 'ellipse-outline' },
  in_progress: { label: 'En Proceso', color: '#ffca28', icon: 'hourglass-outline' },
  completed: { label: 'Completada', color: '#10b981', icon: 'checkmark-circle-outline' },
  cancelled: { label: 'Cancelada', color: '#ef4444', icon: 'close-circle-outline' },
};

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [
    IonInput,
    IonIcon,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    FormModalComponent,
  ],
})
export class TaskFormComponent {
  private categoryService = inject(CategoryService);

  task = input<Task | null>(null);
  isOpen = input(false);

  save = output<{ title: string; categoryId: string | null; status: TaskStatus; dueDate?: Date }>();
  dismiss = output<void>();

  title = signal('');
  categoryId = signal<string | null>(null);
  status = signal<TaskStatus>('pending');
  dueDate = signal<Date | undefined>(undefined);
  isCategoryPickerOpen = signal(false);
  isStatusPickerOpen = signal(false);

  categories = this.categoryService.categories;
  statusOptions = Object.entries(STATUS_CONFIG) as [TaskStatus, typeof STATUS_CONFIG.pending][];
  statusConfig = STATUS_CONFIG;

  isEditing = computed(() => !!this.task());
  isSaveDisabled = computed(() => !this.title().trim());

  constructor() {
    addIcons({ chevronForward, ellipseOutline, hourglassOutline, checkmarkCircleOutline, closeCircleOutline, calendarOutline });
  }

  ngOnChanges(): void {
    const t = this.task();
    if (t) {
      this.title.set(t.title);
      this.categoryId.set(t.categoryId || null);
      this.status.set(t.status);
      this.dueDate.set(t.dueDate);
    } else {
      this.title.set('');
      this.categoryId.set(null);
      this.status.set('pending');
      this.dueDate.set(undefined);
    }
  }

  onTitleInput(value: string): void {
    this.title.set(value);
  }

  onDueDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dueDate.set(input.value ? new Date(input.value) : undefined);
  }

  openCategoryPicker(): void {
    this.isCategoryPickerOpen.set(true);
  }

  closeCategoryPicker(): void {
    this.isCategoryPickerOpen.set(false);
  }

  selectCategory(categoryId: string | null): void {
    this.categoryId.set(categoryId);
    this.closeCategoryPicker();
  }

  openStatusPicker(): void {
    this.isStatusPickerOpen.set(true);
  }

  closeStatusPicker(): void {
    this.isStatusPickerOpen.set(false);
  }

  selectStatus(status: TaskStatus): void {
    this.status.set(status);
    this.closeStatusPicker();
  }

  onSave(): void {
    if (!this.isSaveDisabled()) {
      this.save.emit({
        title: this.title().trim(),
        categoryId: this.categoryId(),
        status: this.status(),
        dueDate: this.dueDate(),
      });
    }
  }

  onDismiss(): void {
    this.dismiss.emit();
  }

  getSelectedCategory(): Category | undefined {
    const id = this.categoryId();
    return id ? this.categoryService.getCategoryById(id) : undefined;
  }

  getSelectedStatus(): typeof STATUS_CONFIG.pending {
    return STATUS_CONFIG[this.status()];
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}