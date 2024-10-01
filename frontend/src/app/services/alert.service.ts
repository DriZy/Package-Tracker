import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new Subject<Alert>();
  alerts$ = this.alertSubject.asObservable();

  showAlert(type: 'success' | 'error' | 'info', message: string) {
    this.alertSubject.next({ type, message });
  }

  success(message: string) {
    this.showAlert('success', message);
  }

  error(message: string) {
    this.showAlert('error', message);
  }

  info(message: string) {
    this.showAlert('info', message);
  }
}
