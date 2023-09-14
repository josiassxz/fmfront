import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';
import { BottonSheetConfirmComponent } from 'src/app/shared/botton-sheet-confirm/botton-sheet-confirm.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import EmpresaModel from 'src/app/models/empresa.model';
import EquipamentoModel from 'src/app/models/equipamento.model';
import { ManterEquipamentosService } from '../manter-equipamentos.service';
import { startWith, switchMap, map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { NormasEnum } from 'src/app/enums/normas.enum';
import { TipoEquipamentoEnum } from 'src/app/enums/tipo-equipamento.enum';


@Component({
  selector: 'app-manter-equipamentos-list',
  templateUrl: './manter-equipamentos-list.component.html',
  styleUrls: ['./manter-equipamentos-list.component.css']
})
export class ManterEquipamentosListComponent {

  isLoading = true;
  empresa: EmpresaModel[]= [];
  equipamento: EquipamentoModel[] = [];
  displayedColumns: string[] = ['anoCadastro', 'empresa', 'tagEquipamento', 'tipoEquipamento', 'norma', 'localizacao', 'editar', 'excluir', 'visualizar'];

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

  tiposEquipamento = TipoEquipamentoEnum.getValues();
  normas = NormasEnum.getValues();

  constructor(
    private bottomSheet: MatBottomSheet,
    private equipamentoService : ManterEquipamentosService
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
          return this.equipamentoService.pagination(param);
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

  excluir(equipamento: any): void {
    this.bottomSheet
      .open(BottonSheetConfirmComponent, {
        data: ''
      })
      .afterDismissed()
      .subscribe((confirma: boolean) => {
        if (confirma) {
          this.equipamentoService.excluir(equipamento.id).subscribe(() => {
           //this.notificationService.success('msg.004');
           this.pesquisar();
          });
        }
      });
  }

  getDescricaoEnum(id, tipo) {
    switch(tipo) {
      case 'N':
        return NormasEnum.toEnum(id).descricao;
      case 'T':
        return TipoEquipamentoEnum.toEnum(id).descricao;
      default:
        return '-';
    }
  }

}
