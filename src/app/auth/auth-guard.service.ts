import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable()
export class AuthGuardService {
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const logado = this.localStorageService.getItem('LOGIN');
    const admTitle = route.parent.data['title'];
    if (!logado || !logado.id) {
      this.router.navigate(['/']);
      return of(false);
    }
    if (
      admTitle && admTitle.length > 0 &&
      admTitle.startsWith('Adm') && logado.tipo !== '1'
    ) {
      this.router.navigate(['/']);
      return of(false);
    }
    return of(true);
  }
}