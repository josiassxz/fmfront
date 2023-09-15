import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import UsuarioModel from 'src/app/models/usuario.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthService } from '../auth.service';
import { keyframes } from '@angular/animations';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Component({
  selector: 'fm-inspec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mostrarSenha = true;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    const auth = localStorageService.getItem('LOGIN');
    if (auth && auth.id) {
      router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      apelido: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.notificationService.warn('Preencha todos os campos obrigatórios.');
      return;
    }
    const data = this.loginForm.value;
    const usuario = { email: data.apelido, senha: data.senha };
    this.authService.login(usuario).subscribe(
      res => {
        const date = new Date();
        const TIME = { hora: date.getHours(), minuto: date.getMinutes() }

        this.localStorageService.setItem('LOGIN', res);
        this.localStorageService.setItem('LOGIN-TIME', TIME);
        location.reload();
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 500);
      },
      () => {
        this.notificationService.warn('Usuário não encontrado.');
        return;
      });
  }
}
