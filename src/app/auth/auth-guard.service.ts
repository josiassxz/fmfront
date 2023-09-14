import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  canActivate(): Observable<boolean> {
    const logado = this.localStorageService.getItem('LOGIN');
    if (!logado || !logado.id) {
      this.router.navigate(['/']);
      return of(false);
    }
    return of(true);
  }
}