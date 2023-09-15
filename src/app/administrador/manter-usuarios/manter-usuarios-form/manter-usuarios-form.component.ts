import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import UsuarioModel from 'src/app/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ManterUsuariosService } from '../manter-usuarios.service';
// import { Store } from '@ngxs/store';

@Component({
  selector: 'app-manter-usuarios-form',
  templateUrl: './manter-usuarios-form.component.html',
  styleUrls: ['./manter-usuarios-form.component.css']
})
export class ManterUsuariosFormComponent implements OnInit, AfterViewInit {

  edicao: boolean = false;
  usuarioForm: FormGroup;
  disabled = false;
  usuario: UsuarioModel;
  mostrarSenha = true;

  dataSource = new MatTableDataSource<UsuarioModel>([]);
  displayedColumnsusuario: string[] = ['nome', 'email', 'senha'];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: ManterUsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      Promise.resolve(null).then(() => {
        const id = params['id'];
        this.disabled = params['disabled'] === 'true';
        if (id) {
          this.edicao = true;
          this.openEdit(id);
        }
      });
      this.initForm();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // document.getElementById('titulo').focus();
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  private initForm(): void {
    this.usuarioForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.email]),
      senha: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
    });
  }

  openEdit(id: number): void {
    this.usuarioService.get(id).subscribe((res: UsuarioModel) => {
      this.usuario = res;
      this.usuarioForm.reset(res);
      this.usuarioForm.patchValue({ id: id });
    });
  }

  saveOrUpdate() {
    if (this.validarForm(this.usuarioForm)) {
      const usuario = this.usuarioForm.value;
      if (this.edicao) {
        usuario.id = this.usuario.id;
        this.usuarioService.alterar(usuario).subscribe(() => {
          // this.notificationService.success('msg.004');
          this.router.navigate(['/administrador/manter-usuarios/lista']);
        });
      } else {
        this.usuarioService.salvar(usuario).subscribe(() => {
          //  this.notificationService.success('msg.004');
          this.router.navigate(['/administrador/manter-usuarios/lista']);
        });
      }
    }
  }

  validarForm(form: FormGroup): boolean {
    if (form.invalid) {
      //this.notificationService.warn('msg.036');
      return false;
    }
    return true;
  }

  getTittle(): string {
    if (this.edicao && !this.disabled) {
      return 'Editar Usuário';
    } else if (this.disabled) {
      return 'Visualizar Usuário';
    } else {
      return 'Incluir Usuário';
    }
  }



}
