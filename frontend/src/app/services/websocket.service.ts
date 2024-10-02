import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import {privateDecrypt} from "node:crypto";
import {AlertService} from "./alert.service";

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket$: WebSocketSubject<any> | null = null; // Initialize to null
  constructor(@Inject(PLATFORM_ID) private platformId: object, private alertService: AlertService) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket$ = new WebSocketSubject(environment.websocketUrl); // Create WebSocket only in the browser
    }

  }

  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
      this.alertService.success("Message sent via websocket");
    }else {
      this.alertService.error('No WebSocket connection');
    }
  }

  getMessages() {
    return this.socket$;
  }

  closeConnection() {
    this.socket$?.asObservable().subscribe({
      complete: () => {
        this.alertService.info('WebSocket connection closed');
      },
      error: () => {
        this.alertService.error('WebSocket connection error');
      }
    }),
      () => {
        this.alertService.error('WebSocket connection error');
      };
  }
}
