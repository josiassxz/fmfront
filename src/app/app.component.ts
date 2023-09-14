import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/local-storage.service';

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
  ) { }

  ngOnInit(): void {
    this.verifyLogin();
  }

  verifyLogin() {
    const login = this.localStorageService.getItem('LOGIN');
    if (login && login.id) {
      this.loginCliente = login;
    }
  }

  logout() {
    this.localStorageService.removeItem('LOGIN');
    location.reload();
  }
}
