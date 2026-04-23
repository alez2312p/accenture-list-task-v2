import { Component, input, output, ViewChild } from '@angular/core';
import {
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { STATUS_CONFIG } from '../../config/task.config';
import { TimeSpentPipe, FormatDatePipe, DueDatePipe } from '../../pipes';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, chevronBack, chevronForward, timeOutline, calendarOutline, alertCircleOutline, repeatOutline } from 'ionicons/icons';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  imports: [
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonButton,
    IonIcon,
    TimeSpentPipe,
    FormatDatePipe,
    DueDatePipe,
  ],
})
export class TaskCardComponent {
  task = input.required<Task>();
  category = input<Category | undefined>();
  statusConfig = STATUS_CONFIG;

  @ViewChild('slidingItem') slidingItem!: IonItemSliding;

  edit = output<Task>();
  delete = output<Task>();
  swipePrev = output<Task>();
  swipeNext = output<Task>();

  constructor() {
    addIcons({
      createOutline,
      trashOutline,
      chevronBack,
      chevronForward,
      timeOutline,
      calendarOutline,
      alertCircleOutline,
      repeatOutline,
    });
  }

  onEdit(): void {
    this.edit.emit(this.task());
  }

  onDelete(): void {
    this.delete.emit(this.task());
  }

  async onSwipePrev(): Promise<void> {
    await this.slidingItem?.close();
    this.swipePrev.emit(this.task());
  }

  async onSwipeNext(): Promise<void> {
    await this.slidingItem?.close();
    this.swipeNext.emit(this.task());
  }

  isOverdue(): boolean {
    const task = this.task();
    if (!task.dueDate) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < now && task.status !== 'completed';
  }

  getPrevStatus(): TaskStatus | null {
    const current = this.task().status;
    if (current === 'completed') return 'in_progress';
    if (current === 'in_progress') return 'pending';
    return null;
  }

  getNextStatus(): TaskStatus | null {
    const current = this.task().status;
    if (current === 'pending') return 'in_progress';
    if (current === 'in_progress') return 'completed';
    return null;
  }

  getPrevStatusColor(): string {
    const status = this.getPrevStatus();
    if (!status) return 'medium';
    return this.statusConfig[status].color;
  }

  getNextStatusColor(): string {
    const status = this.getNextStatus();
    if (!status) return 'medium';
    return this.statusConfig[status].color;
  }

  showTime(): boolean {
    return this.task().status === 'completed';
  }

  showCreatedDate(): boolean {
    const status = this.task().status;
    return status !== 'pending' && status !== 'completed';
  }
}