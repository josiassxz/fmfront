import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';
import { BottonSheetConfirmComponent } from 'src/app/shared/botton-sheet-confirm/botton-sheet-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import EmpresaModel from 'src/app/models/empresa.model';
import { merge } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { ManterEmpresasService } from '../manter-empresas.service';



@Component({
  selector: 'app-manter-empresas-list',
  templateUrl: './manter-empresas-list.component.html',
  styleUrls: ['./manter-empresas-list.component.css']
})
export class ManterEmpresasListComponent implements OnInit, AfterViewInit {
  isLoading = true;
  empresa: EmpresaModel[]= [];
  displayedColumns: string[] = ['nomeEmpresa', 'razaoSocial', 'cpfCnpj', 'email', 'telefone', 'cidade', 'editar', 'excluir', 'visualizar'];

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


  constructor(
    private bottomSheet: MatBottomSheet,
    private empresaService: ManterEmpresasService
   // public store: Store
  ) {}

  ngOnInit() {
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
          return this.empresaService.pagination(param);
          return null;
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

  limparFiltro() {
    this.dataSource.data = [];
    this.filtro = {};
    this.pesquisar();
  }

  pesquisar() {
    this.paginator._changePageSize(5);
    this.paginator.firstPage();
  }

  excluir(empresa: any): void {
    this.bottomSheet
      .open(BottonSheetConfirmComponent, {
        data: {
          registro:
            empresa.nome.length > 70
              ? empresa.nome.substr(0, 70) + '...'
              : empresa.nome
        }
      })
      .afterDismissed()
      .subscribe((confirma: boolean) => {
        if (confirma) {
          this.empresaService.excluir(empresa.id).subscribe(() => {
          //  this.notificationService.success('msg.004');
           this.pesquisar();
          });
        }
      });
  }

}
