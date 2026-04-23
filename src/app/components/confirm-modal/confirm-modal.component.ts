import { Component, input, output } from '@angular/core';
import { IonButton, IonIcon, IonModal } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { warningOutline } from 'ionicons/icons';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [IonButton, IonIcon, IonModal],
})
export class ConfirmModalComponent {
  isOpen = input(false);
  title = input('Confirmar');
  message = input('¿Está seguro que desea eliminar?');
  confirmText = input('Eliminar');
  cancelText = input('Cancelar');

  confirm = output<void>();
  cancel = output<void>();

  constructor() {
    addIcons({ warningOutline });
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}