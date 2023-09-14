import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import UsuarioModel from 'src/app/models/usuario.model';
import EmpresaModel from 'src/app/models/empresa.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ManterEmpresasService } from '../../manter-empresas/manter-empresas.service';
import { TipoEquipamentoEnum } from 'src/app/enums/tipo-equipamento.enum';
import { NotificationService } from 'src/app/shared/notification.service';
import { ManterEquipamentosService } from '../manter-equipamentos.service';
import EquipamentoModel from 'src/app/models/equipamento.model';
import { ObjUtils } from 'src/app/util/obj.util';
import { FileUpload } from 'src/app/models/file-upload.model';
import DocumentosModel from 'src/app/models/documentos.model';
import { CondicaoEnum } from 'src/app/enums/condicoes.enum';
import { NormasEnum } from 'src/app/enums/normas.enum';
import { PlacasEnum } from 'src/app/enums/placas.enum';
import { ValvulasEnum } from 'src/app/enums/valvulas.enum';
import { IndicadoresEnum } from 'src/app/enums/indicadores.enum';
import { SimNaoEnum } from 'src/app/enums/sim-nao.enum';
import { InstrumentosEnum } from 'src/app/enums/instrumentos.enum';
import { StatusEnum } from 'src/app/enums/status.enum';
import { CategoriaCaldeirasEnum } from 'src/app/enums/categoria-caldeiras.enum';
import { CategoriaVasosEnum } from 'src/app/enums/categoria-vasos.enum';

@Component({
  selector: 'app-manter-equipamentos-form',
  templateUrl: './manter-equipamentos-form.component.html',
  styleUrls: ['./manter-equipamentos-form.component.css']
})
export class ManterEquipamentosFormComponent implements OnInit, AfterViewInit {

  edicao: boolean = false;
  equipamentoForm: FormGroup;
  disabled = false;
  usuario: UsuarioModel;
  validateTipo: boolean;
  empresas: EmpresaModel[];
  tiposEquipamentos = TipoEquipamentoEnum.getValues();
  equipamento: EquipamentoModel;
  anexosForm: FormGroup;

  dataSource = new MatTableDataSource<UsuarioModel>([]);
  displayedColumnsusuario: string[] = ['nome', 'email', 'senha'];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  condicoes = CondicaoEnum.getValues();

  normas = NormasEnum.getValues();

  placas = PlacasEnum.getValues();

  valvulas = ValvulasEnum.getValues();

  indicadores = IndicadoresEnum.getValues();

  simNao = SimNaoEnum.getValues();

  instrumentos = InstrumentosEnum.getValues();

  instrumentosTemperatura = InstrumentosEnum.getValuesTemperatura();

  status = StatusEnum.getValues();

  categoriasCaldeiras = CategoriaCaldeirasEnum.getValues();

  categoriasVasos = CategoriaVasosEnum.getValues();

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private equipamentoService: ManterEquipamentosService,
    private empresaService: ManterEmpresasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.disabled = params['disabled'] === 'true';
      if (id) {
        this.edicao = true;
        this.openEdit(id);
      }
      this.initForm();
    });
    this.getEmpresas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // document.getElementById('titulo').focus();
  }

  getEmpresas() {
    this.empresaService.listarEmpresas().subscribe(res => {
      this.empresas = res;
    })
  }

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  private initForm(): void {
    this.equipamentoForm = this.formBuilder.group({
      id: new FormControl(null),
      empresa: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      tagEquipamento: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      descricao: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', [Validators.required]),
      condicao: new FormControl(''),
      observacao: new FormControl(''),
      norma: new FormControl(''),
      tipoEquipamento: new FormControl('', [Validators.required]),
      categoriaCaldeira: new FormControl(''),
      categoriaVaso: new FormControl(''),
      inspecaoExterna: new FormControl(''),
      inspecaoInterna: new FormControl(''),
      proximaInspecaoExterna: new FormControl(''),
      proximaInspecaoInterna: new FormControl(''),
      placaIndentificacao: new FormControl(''),
      valvulaSeguranca: new FormControl(''),
      indicadorPressao: new FormControl(''),
      pmta: new FormControl(''),
      anoCadastro: new FormControl(''),
      numLacre: new FormControl(''),
      dataCalibracao: new FormControl(''),
      proximaCalibracao: new FormControl(''),
      roscaConexao: new FormControl(''),
      marcaModelo: new FormControl(''),
      instrumento: new FormControl(''),
      instrumentoTemperatura: new FormControl(''),
      escala: new FormControl(''),
      unidadeMedida: new FormControl(''),
      tamanho: new FormControl(''),
      bitola: new FormControl(''),
      setPoint: new FormControl(''),
      unidadeAjuste: new FormControl(''),
      status: new FormControl(''),
      possuiRgi: new FormControl(''),
      fluido: new FormControl(''),
      numRelatorio: new FormControl(''),
      laudoValSeguranca: new FormControl(''),
      numSerie: new FormControl(''),
      capacidade: new FormControl(''),
      inspecao: new FormControl(''),
      proximaInspecao: new FormControl(''),
      observacaoRgi: new FormControl(''),
      //documentos: new FormControl('')
    });
    this.anexosForm = this.formBuilder.group({
      documentos: new FormControl('')
    });

  }

  openEdit(id: number): void {
    this.equipamentoService.get(id).subscribe((res: EquipamentoModel) => {
      this.equipamento = res;
      this.equipamentoForm.reset(res);
      if (res.tipoEquipamento === 'CALDEIRA') {
        this.equipamentoForm.patchValue({ categoriaCaldeira: res.categoria });
      } else {
        this.equipamentoForm.patchValue({ categoriaVaso: res.categoria });
      }
      if (res.tipoEquipamento === 'INDICADOR') {
        this.equipamentoForm.patchValue({ instrumento: res.instrumento });
      } else {
        this.equipamentoForm.patchValue({ instrumentoTemperatura: res.instrumento });
      }
      this.setAnexo(res.documentos);

      if (this.disabled) {
        this.equipamentoForm.disable();
      }
    });
  }

  saveOrUpdate() {
    if (this.validarForm(this.equipamentoForm)) {
      const formData = new FormData();
      const equipamento = this.getEquipamento();
      if (this.edicao) {
        equipamento.id = this.equipamento.id;
        formData.append('equipamentosJson', JSON.stringify(equipamento));
        this.addAnexosToFormDada(formData);
        this.equipamentoService.alterar(formData, this.equipamento.id).subscribe(() => {
          this.notificationService.success('Operação realizada com sucesso.');
          this.router.navigate(['/administrador/manter-equipamentos/lista']);
        });
      } else {
        formData.append('equipamentosJson', JSON.stringify(equipamento));
        this.addAnexosToFormDada(formData);
        this.equipamentoService.salvar(formData).subscribe(() => {
          this.notificationService.success('Operação realizada com sucesso.');
          this.router.navigate(['/administrador/manter-equipamentos/lista']);
        });
      }
    }
  }

  getEquipamento() {
    const form = this.equipamentoForm.getRawValue();
    const equipamento = new EquipamentoModel(
      form.id,
      form.tagEquipamento,
      form.descricao,
      form.localizacao,
      form.tipoEquipamento === 'CALDEIRA' ? form.categoriaCaldeira : form.categoriaVaso,
      form.condicao,
      form.tipoEquipamento,
      form.inspecaoExterna,
      form.inspecaoInterna,
      form.proximaInspecaoExterna,
      form.proximaInspecaoInterna,
      form.placaIndentificacao,
      form.valvulaSeguranca,
      form.indicadorPressao,
      form.pmta,
      form.anoCadastro,
      form.observacao,
      form.numLacre,
      form.dataCalibracao,
      form.proximaCalibracao,
      form.roscaConexao,
      form.marcaModelo,
      form.tipoEquipamento === 'INDICADOR' ? form.instrumento : form.instrumentoTemperatura,
      form.escala,
      form.unidadeMedida,
      form.tamanho,
      form.bitola,
      form.setPoint,
      form.unidadeAjuste,
      form.status,
      form.possuiRgi,
      form.fluido,
      form.numRelatorio,
      form.laudoValSeguranca,
      form.numSerie,
      form.capacidade,
      form.norma,
      form.inspecao,
      form.proximaInspecao,
      form.empresa,
      this.getDadosAnexoDocumentos(),
      form.observacaoRgi
    );
    return equipamento;
  }

  getDadosAnexoDocumentos(): DocumentosModel[] {
    const listaAnexo = new Array<DocumentosModel>();
    const documentos = this.anexosForm.get('documentos').value;
    if (ObjUtils.isNotEmpty(documentos)) {
      for (let index = 0; index < documentos.length; index++) {
        const doc = documentos[index];
        const documento = new DocumentosModel();
        documento.id = doc.id;
        documento.tipo = doc.description;
        documento.nome = doc.file.name;
        listaAnexo.push(documento);

      }
    }
    return listaAnexo;
  }

  private addAnexosToFormDada(formData: FormData) {
    if (this.anexosForm.get('documentos').value && this.anexosForm.get('documentos').value.length > 0) {
      Array.from(this.anexosForm.get('documentos').value).forEach((value: FileUpload) => {
        formData.append('files', value.file, value.file.name);
      });
    }
  }



  private setAnexo(documentos: DocumentosModel[]) {
    const filesUpload = [];
    if (ObjUtils.isNotEmpty(documentos)) {
      documentos.forEach(doc => {
        const fileUpload = this.getFileUploadList(doc);
        if (ObjUtils.isNotEmpty(fileUpload)) {
          if (documentos.length > 1) {
            filesUpload.push(fileUpload);
          } else {
            filesUpload.push(fileUpload);
          }
        }
      });
    }
    this.anexosForm.get('documentos').patchValue(filesUpload);
  }

  private getFileUploadList(referenciaDocumento: DocumentosModel): FileUpload {
    if (ObjUtils.isNotEmpty(referenciaDocumento)) {
      return new FileUpload(
        new File([null], referenciaDocumento.nome),
        referenciaDocumento.tipo,
        referenciaDocumento.id
      );
    } else {
      return null;
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
      return 'Editar Equipamento';
    } else if (this.disabled) {
      return 'Visualizar Equipamento';
    } else {
      return 'Incluir Equipamento';
    }
  }

}
