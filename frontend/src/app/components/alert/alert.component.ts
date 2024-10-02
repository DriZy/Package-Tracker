import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from '../../services/alert.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alerts$.subscribe(alert => {
      this.alerts.push(alert);
      // Remove alert after 3 seconds
      setTimeout(() => {
        this.alerts = this.alerts.filter(a => a !== alert);
      }, 3000);
    });
  }
}
