import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() showModal = false; // To control modal visibility
  @Input() title: string = ''; // Optional title for the modal
  @Output() proceed = new EventEmitter<void>(); // Emit when the "Proceed" button is clicked
  @Output() cancel = new EventEmitter<void>(); // Emit when the "Cancel" button is clicked

  onProceed() {
    this.proceed.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
