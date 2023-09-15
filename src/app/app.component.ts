import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FmInspecao';
  loginCliente = null;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verifyLogin();

    this.router.events.subscribe(() => {
      this.verifyLoginTime();
    });
  }

  verifyLogin() {
    const login = this.localStorageService.getItem('LOGIN');
    if (login && login.id) {
      this.loginCliente = login;
    }
  }

  verifyLoginTime() {
    const actualDate = new Date();
    const time = this.localStorageService.getItem('LOGIN-TIME');

    if (
      !time && this.loginCliente ||
      actualDate.getHours() > time?.hora + 1 ||
      actualDate.getHours() > time?.hora && actualDate.getMinutes() > time?.minuto
    ) {
      this.logout();
    }
  }

  logout() {
    this.localStorageService.removeItem('LOGIN');
    this.localStorageService.removeItem('LOGIN-TIME');
    location.reload();
  }
}
