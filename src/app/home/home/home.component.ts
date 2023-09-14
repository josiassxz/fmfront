import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginAdmin = false;

  constructor (
    private router: Router,
    private locaStorageService: LocalStorageService
    ) {}

  ngOnInit(): void {
    const login = this.locaStorageService.getItem('LOGIN');
    if (login && login.id && login.tipo == 1) {
      this.loginAdmin = true;
    }
  }

  onNavigation(pagina: string) {
    this.router.navigate([pagina]);
  }

}
