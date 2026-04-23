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
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { inject } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  imports: [IonInput, IonIcon, IonButton, IonList, IonItem, IonLabel, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, FormModalComponent],
})
export class TaskFormComponent {
  private categoryService = inject(CategoryService);
  private taskService = inject(TaskService);

  task = input<Task | null>(null);
  isOpen = input(false);

  save = output<{ title: string; categoryId: string | null }>();
  dismiss = output<void>();

  title = signal('');
  categoryId = signal<string | null>(null);
  isCategoryPickerOpen = signal(false);

  categories = this.categoryService.categories;

  isEditing = computed(() => !!this.task());
  isSaveDisabled = computed(() => !this.title().trim());

  constructor() {
    addIcons({ chevronForward });
  }

  ngOnChanges(): void {
    const t = this.task();
    if (t) {
      this.title.set(t.title);
      this.categoryId.set(t.categoryId || null);
    } else {
      this.title.set('');
      this.categoryId.set(null);
    }
  }

  onTitleInput(value: string): void {
    this.title.set(value);
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

  onSave(): void {
    if (!this.isSaveDisabled()) {
      this.save.emit({ title: this.title().trim(), categoryId: this.categoryId() });
    }
  }

  onDismiss(): void {
    this.dismiss.emit();
  }

  getSelectedCategory(): Category | undefined {
    const id = this.categoryId();
    return id ? this.categoryService.getCategoryById(id) : undefined;
  }
}