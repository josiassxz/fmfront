import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import UsuarioModel from 'src/app/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import EmpresaModel from 'src/app/models/empresa.model';
import { ManterUsuariosService } from '../../manter-usuarios/manter-usuarios.service';
import { ManterEmpresasService } from '../manter-empresas.service';
import { ObjUtils } from 'src/app/util/obj.util';
import { NotificationService } from 'src/app/shared/notification.service';
import { BuscaCepService } from '../busca-cep.service';

@Component({
  selector: 'app-manter-empresas-form',
  templateUrl: './manter-empresas-form.component.html',
  styleUrls: ['./manter-empresas-form.component.css']
})
export class ManterEmpresasFormComponent implements OnInit, AfterViewInit {

  edicao: boolean = false;
  empresaForm: FormGroup;
  disabled = false;
  usuario: UsuarioModel;
  usuarios: UsuarioModel[];
  empresa: EmpresaModel;

  dataSource = new MatTableDataSource<UsuarioModel>([]);
  displayedColumnsusuario: string[] = ['nome', 'email', 'excluir'];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  estados = [
    {
      id: "AC",
      descricao: "Acre"
    },
    {
      id: "AL",
      descricao: "Alagoas"
    },
    {
      id: "AM",
      descricao: "Amazonas"
    },
    {
      id: "AP",
      descricao: "Amapá"
    },
    {
      id: "BA",
      descricao: "Bahia"
    },
    {
      id: "CE",
      descricao: "Ceará"
    },
    {
      id: "DF",
      descricao: "Distrito Federal"
    },
    {
      id: "ES",
      descricao: "Espírito Santo"
    },
    {
      id: "GO",
      descricao: "Goiás"
    },
    {
      id: "MA",
      descricao: "Maranhão"
    },
    {
      id: "MG",
      descricao: "Minas Gerais"
    },
    {
      id: "MS",
      descricao: "Mato Grosso do Sul"
    },
    {
      id: "MT",
      descricao: "Mato Grosso"
    },
    {
      id: "PA",
      descricao: "Pará"
    },
    {
      id: "PB",
      descricao: "Paraíba"
    },
    {
      id: "PE",
      descricao: "Pernambuco"
    },
    {
      id: "PI",
      descricao: "Piauí"
    },
    {
      id: "PR",
      descricao: "Paraná"
    },
    {
      id: "RJ",
      descricao: "Rio de Janeiro"
    },
    {
      id: "RN",
      descricao: "Rio Grande do Norte"
    },
    {
      id: "RO",
      descricao: "Rondônia"
    },
    {
      id: "RR",
      descricao: "Roraima"
    },
    {
      id: "RS",
      descricao: "Rio Grande do Sul"
    },
    {
      id: "SC",
      descricao: "Santa Catarina"
    },
    {
      id: "SE",
      descricao: "Sergipe"
    },
    {
      id: "SP",
      descricao: "São Paulo"
    },
    {
      id: "TO",
      descricao: "Tocantins"
    }
  ]


  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usuarioService: ManterUsuariosService,
    private empresaService: ManterEmpresasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private buscaCepService: BuscaCepService
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
    this.getUsuarios();
    // document.getElementById('titulo').focus();
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  private initForm(): void {
    this.empresaForm = this.formBuilder.group({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      razaoSocial: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      cnpj: new FormControl('', [Validators.required, Validators.maxLength(18)]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      usuarios: new FormControl(''),
      cep: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      endereco: new FormControl('')
    });
  }

  getUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(res => {
      this.usuarios = res;
    })
  }

  buscaCep() {
    this.buscaCepService.buscaCep(this.empresaForm.get('cep').value).subscribe(res => {
      this.empresaForm.get('cidade').setValue(res.localidade);
      this.empresaForm.get('endereco').setValue(res.logradouro);
      this.empresaForm.get('estado').setValue(res.uf);
    })
  }

  openEdit(id: number): void {
    this.empresaService.get(id).subscribe((res: EmpresaModel) => {
      this.empresa = res;
      this.empresaForm.reset(res);
      this.empresaForm.patchValue({ id: id });
      this.dataSource.data = res.usuarios;
    });
  }

  saveOrUpdate() {
    if (this.validarForm(this.empresaForm)) {
      const empresa = this.empresaForm.value;
      empresa.usuarios = this.dataSource.data.map(usuario => {
        return { id: usuario.id }
      });
      if (this.edicao) {
        empresa.id = this.empresa.id;
        this.empresaService.alterar(empresa).subscribe(() => {
          this.notificationService.success('Empresa editada com sucesso');
          this.router.navigate(['/administrador/manter-empresas/lista']);
        });
      } else {
        this.empresaService.salvar(empresa).subscribe(() => {
          this.notificationService.success('Empresa salva com sucesso');
          this.router.navigate(['/administrador/manter-empresas/lista']);
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

  vincularUsuario() {
    const usuario = this.empresaForm.get('usuarios').value;
    if (ObjUtils.isNotEmpty(usuario)) {
      if (!this.dataSource.data) {
        this.dataSource = new MatTableDataSource([]);
      }
      const listEquals = this.dataSource.data.filter(item => item.nome === usuario.nome);
      if (listEquals && listEquals.length === 0) {
        this.mountUsuarioDto(usuario);
        this.dataSource.data = Object.assign([], this.dataSource.data);
        this.dataSource.data.push(this.usuario);
        this.dataSource._updateChangeSubscription();
        this.empresaForm.get('usuarios').reset();
      } else {
        alert("Usuario já vinculado")
      }
    }
  }

  private mountUsuarioDto(usuario) {
    this.usuario = new UsuarioModel();
    this.usuario.id = usuario.id
    this.usuario.nome = usuario.nome;
    this.usuario.email = usuario.email;

  }

  excluirUsuario(value) {
    // this.eventoService.deleteByIdDefensor(value.id).subscribe(res => {
    this.dataSource.data = this.arrayRemove(this.dataSource.data, value);
    this.dataSource._updateChangeSubscription();
    // });
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  getTittle(): string {
    if (this.edicao && !this.disabled) {
      return 'Editar Empresa';
    } else if (this.disabled) {
      return 'Visualizar Empresa';
    } else {
      return 'Incluir Empresa';
    }
  }


}
