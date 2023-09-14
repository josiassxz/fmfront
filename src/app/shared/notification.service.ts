import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) { }

  default(message: string, params?: Object) {
    this.show(
      message,
      {
        duration: 2500,
        panelClass: 'default-notification-overlay'
      },
      params
    );
  }

  info(message: string, params?: Object) {
    this.show(
      message,
      {
        duration: 2500,
        panelClass: 'info-notification-overlay'
      },
      params
    );
  }

  success(message: string, params?: Object) {
    this.show(
      message,
      {
        duration: 2500,
        panelClass: 'success-notification-overlay'
      },
      params
    );
  }

  warn(message: string, params?: Object) {
    this.show(
      message,
      {
        duration: 2500,
        panelClass: 'warning-notification-overlay'
      },
      params
    );
  }

  error(message: string, params?: Object) {
    this.show(
      message,
      {
        duration: 3000,
        panelClass: 'error-notification-overlay'
      },
      params
    );
  }

  private show(message: string, configuration: MatSnackBarConfig, params?: Object) {
    this.zone.run(() => this.snackBar.open(message, null, configuration));
  };
}
