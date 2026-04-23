import { Component, input, output, computed } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonFooter,
  IonModal,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonFooter,
    IonModal,
  ],
})
export class FormModalComponent {
  isOpen = input(false);
  title = input('Formulario');
  saveText = input('Guardar');
  isEditing = input(false);
  isSaveDisabled = input(true);

  save = output<void>();
  dismiss = output<void>();

  finalSaveText = computed(() =>
    this.isEditing() ? 'Actualizar' : this.saveText(),
  );

  constructor() {
    addIcons({ close });
  }

  onSave(): void {
    if (!this.isSaveDisabled()) {
      this.save.emit();
    }
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
