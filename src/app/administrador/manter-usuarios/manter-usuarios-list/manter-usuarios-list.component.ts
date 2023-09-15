import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import UsuarioModel from 'src/app/models/usuario.model';
// import { Store } from '@ngxs/store';
import { merge } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { BottonSheetConfirmComponent } from 'src/app/shared/botton-sheet-confirm/botton-sheet-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ManterUsuariosService } from '../manter-usuarios.service';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-manter-usuarios-list',
  templateUrl: './manter-usuarios-list.component.html',
  styleUrls: ['./manter-usuarios-list.component.css']
})
export class ManterUsuariosListComponent implements OnInit, AfterViewInit {

  isLoading = true;
  usuario: UsuarioModel[] = [];
  displayedColumns: string[] = ['nome', 'email', 'tipo', 'editar', 'excluir', 'visualizar'];

  dataSource = new MatTableDataSource([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  totalElements = 0;
  size = 5;
  page = 0;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  filtro: any = {
    size: 5,
    page: 0
  };

  tipo = [
    { id: 1, descricao: 'Administrador' },
    { id: 2, descricao: 'Cliente' }
  ]


  constructor(
    private bottomSheet: MatBottomSheet,
    private usuarioService: ManterUsuariosService,
    //private matFormField: MatFormField
    // public store: Store
  ) { }

  ngOnInit() {
    // this.listarUsuarios();
    // this.matFormField.matForm.hide();

  }

  get_http_params_from_object(obj: any): HttpParams {
    let params = new HttpParams();
    Object.keys(obj).forEach((key: any, index: number) => {
      if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
        params = params.append(key, obj[key].toString());
      }
    });
    return params;
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const filtroTemp = { ...this.filtro };

          if (filtroTemp && filtroTemp.descricao && filtroTemp.descricao !== '') {
            filtroTemp.descricao = filtroTemp.descricao.toUpperCase().trim();
          }

          if (this.paginator && this.paginator.length && this.paginator.pageSize) {
            filtroTemp.size = this.paginator.pageSize;
            filtroTemp.page = this.paginator.pageIndex;
          }

          const param = this.get_http_params_from_object(filtroTemp);

          this.isLoadingResults = true;
          //return this.planoCarreiraService.pagination(param);
          return this.usuarioService.pagination(param);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          return data.content;
        })
      )
      .subscribe(data => {
        this.dataSource.data = [...data];
      });
  }

  // listarUsuarios(){
  //   this.usuarioService.listarUsuarios().subscribe(resp => {
  //     if(!resp){
  //       resp = [];
  //     }
  //     this.dataSource.data = resp;
  //   })
  // }

  limparFiltro() {
    this.dataSource.data = [];
    this.filtro = {};
    this.pesquisar();
  }

  pesquisar() {
    this.paginator._changePageSize(5);
    this.paginator.firstPage();
  }

  getTipo(id) {
    return this.tipo.find(i => i.id == id).descricao
  }

  excluir(usuario: any): void {
    this.bottomSheet
      .open(BottonSheetConfirmComponent, {
        data: {
          registro:
            usuario.nome.length > 70
              ? usuario.nome.substr(0, 70) + '...'
              : usuario.nome
        }
      })
      .afterDismissed()
      .subscribe((confirma: boolean) => {
        if (confirma) {
          this.usuarioService.excluir(usuario.id).subscribe(() => {
            //this.notificationService.success('msg.004');
            this.pesquisar();
          });
        }
      });


  }

}
