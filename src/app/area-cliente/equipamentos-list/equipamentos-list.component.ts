import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import {
  EQUIPAMENTO_COLUMNS,
  INDICADORES_PRESSAO_COLUMNS,
  LINHA_VIDA_ELEVADOR_COLUMNS,
  TUBULACAO_COLUMNS,
  VALVULAS_SEGURANCA_COLUMNS,
  VASOS_PRESSAO_CALDEIRA_COLUMNS,
} from 'src/app/util/static-data';
import EquipamentoModel from 'src/app/models/equipamento.model';
import { UtilFunction } from 'src/app/util/util.function';
import { ManterEquipamentosService } from 'src/app/administrador/manter-equipamentos/manter-equipamentos.service';
import { merge, startWith, switchMap, map } from 'rxjs';
import { TipoEquipamentoEnum } from 'src/app/enums/tipo-equipamento.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogDownloadComponent } from './dialog-download/dialog-download.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ObjUtils } from 'src/app/util/obj.util';
import { TipoArquivoEnum } from 'src/app/enums/tipo-arquivo.enum';
import { IndicadoresEnum } from 'src/app/enums/indicadores.enum';
import { InstrumentosEnum } from 'src/app/enums/instrumentos.enum';
import { NormasEnum } from 'src/app/enums/normas.enum';
import { PlacasEnum } from 'src/app/enums/placas.enum';
import { StatusEnum } from 'src/app/enums/status.enum';
import { ValvulasEnum } from 'src/app/enums/valvulas.enum';
import { CategoriaVasosEnum } from 'src/app/enums/categoria-vasos.enum';

@Component({
  selector: 'app-equipamentos-list',
  templateUrl: './equipamentos-list.component.html',
  styleUrls: ['./equipamentos-list.component.scss']
})
export class EquipamentosListComponent implements OnInit, AfterViewInit {
  tipoEquip = 'VASO'
  tipoAtual = 'VASO';
  tiposEquipamento = TipoEquipamentoEnum.getValues();
  tiposArquivo = TipoArquivoEnum.getValues();
  id = null;

  vasosPressaoCaldeiraColumns = VASOS_PRESSAO_CALDEIRA_COLUMNS;
  indicadoresPressaoColumns = INDICADORES_PRESSAO_COLUMNS;
  valvulasSegurancaColumns = VALVULAS_SEGURANCA_COLUMNS;
  linhaVidaElevadorColumns = LINHA_VIDA_ELEVADOR_COLUMNS;
  equipamentoColumns = EQUIPAMENTO_COLUMNS;
  tubulacaoColumns = TUBULACAO_COLUMNS;

  selection = new SelectionModel<EquipamentoModel>(true, []);
  desabilitarBotao = true;

  isLoading = true;
  padraoColumns: string[] = [
    'anoCadastro',
    'tag',
    'descricao',
    'localizacao',
    'norma',
    'observacao'
  ]
  displayedColumns: string[] = [
    'select',
    ...this.padraoColumns,
    ...this.vasosPressaoCaldeiraColumns,
    'download'
  ];

  normas = NormasEnum.getValues(); 

  dataSource = new MatTableDataSource([]);
  pageSizeOptions: number[] = [5, 10, 25, 100];
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
    private equipamentosService: ManterEquipamentosService,
    private activatedRoute: ActivatedRoute,
    private utilFunction: UtilFunction,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id) {
        this.id = id;
      }
    })
  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const filtroTemp = { ...this.filtro, tipoEquipamento: this.tipoAtual, idEmpresa: this.id };

          if (filtroTemp && filtroTemp.descricao && filtroTemp.descricao !== '') {
            filtroTemp.descricao = filtroTemp.descricao.toUpperCase().trim();
          }

          if (this.paginator && this.paginator.length && this.paginator.pageSize) {
            filtroTemp.size = this.paginator.pageSize;
            filtroTemp.page = this.paginator.pageIndex;
          }

          const param = this.utilFunction.get_http_params_from_object(filtroTemp);
          this.isLoadingResults = true;
          return this.equipamentosService.pagination(param);
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

  openDialog(element: EquipamentoModel) {
    this.dialog.open(DialogDownloadComponent, { 
      data: { documentos: element.documentos, multiple: false },
      autoFocus: false
    });
  }

  downloadAllSelected() {
    const selected = this.selection.selected;
    if (selected.length > 1) {
      const documentsList = this.mountDocumentsList(selected);
      this.dialog.open(DialogDownloadComponent, { 
        data: { documentos: documentsList, multiple: true },
        autoFocus: false
      });
    } else {
      this.openDialog(selected[0]);
    }
  }

  mountDocumentsList(selected: EquipamentoModel[]) {
    const arquivosList = [];
    this.tiposArquivo.forEach(tipo => {
      arquivosList.push({ ...tipo, documentos: [] });
    })
    selected.forEach(equip => {
      equip.documentos.forEach(doc => {
        const index = Number(doc.tipo) - 1;
        arquivosList[index].documentos.push(doc);
      });
    });
    return arquivosList.filter(arq => arq.documentos.length > 0);
  }

  changeTipo() {
    this.tipoAtual = this.tipoEquip;
    switch (this.tipoAtual) {
      case 'INDICADOR':
        this.displayedColumns = [
          'select',
          ...this.padraoColumns,
          ...this.indicadoresPressaoColumns,
          'download'
        ];
        break;
      case 'VALVULA':
        this.displayedColumns = [
          'select',
          ...this.padraoColumns,
          ...this.valvulasSegurancaColumns,
          'download'
        ];
        break;
      case 'LINHA':
      case 'ELEVADOR':
        this.displayedColumns = [
          'select',
          ...this.padraoColumns,
          ...this.linhaVidaElevadorColumns,
          'download'
        ];
        break;
      case 'EQUIPAMENTO':
        this.displayedColumns = [
          'select',
          ...this.padraoColumns,
          ...this.equipamentoColumns,
          'download'
        ];
        break;
      case 'TUBULACAO':
        this.displayedColumns = [
          'select',
          ...this.padraoColumns,
          ...this.tubulacaoColumns,
          'download'
        ];
        break;
      default:
        this.displayedColumns = [
          'select',
          ...this.padraoColumns,
          ...this.vasosPressaoCaldeiraColumns,
          'download'
        ];
        break;
    }
    this.limparFiltro();
  }

  checkToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.desabilitarBotao = true;
    } else {
      this.desabilitarBotao = false;
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
      });
    }
  }

  isAllSelected(): boolean {
    if (ObjUtils.isNotEmpty(this.dataSource)) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  hasSelected() {
    this.desabilitarBotao = true;
    if (ObjUtils.isNotEmpty(this.dataSource)) {
      this.dataSource.data.forEach(row => {
        if (this.selection.isSelected(row)) {
          this.desabilitarBotao = false;
        }
      });
    }
  }

  checkboxLabel(row?: EquipamentoModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  getDescricaoEnum(id, tipo) {
    if (!id) {
      return '-';
    }
    switch(tipo) {
      case 'N':
        return NormasEnum.toEnum(id).descricao;
      case 'P':
        return PlacasEnum.toEnum(id).descricao;
      case 'V':
        return ValvulasEnum.toEnum(id).descricao;
      case 'I':
        return IndicadoresEnum.toEnum(id).descricao;
      case 'T':
        return InstrumentosEnum.toEnum(id).descricao;
      case 'S':
        return StatusEnum.toEnum(id).descricao;
      case 'VASO':
        return CategoriaVasosEnum.toEnum(id).descricao;
      default:
        return '-';
    }
  }

  fieldValidation(element) {
      return element ? element : '-';
  }
}
