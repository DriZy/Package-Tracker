import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket$: WebSocketSubject<any> | null = null; // Initialize to null

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.socket$ = new WebSocketSubject(environment.websocketUrl); // Create WebSocket only in the browser
    }
  }

  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    }
  }

  getMessages() {
    return this.socket$;
  }

  closeConnection() {
    this.socket$?.complete(); // Close the socket connection if it exists
  }
}
