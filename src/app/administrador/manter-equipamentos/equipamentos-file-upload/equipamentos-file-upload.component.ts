import { HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoArquivoEnum } from 'src/app/enums/tipo-arquivo.enum';
// import { NotificationService } from '@app/core';
// import { RemoteStoreService } from '@app/core/utils/remote-store.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { ObjUtils } from 'src/app/util/obj.util'; 
import { ManterEquipamentosService } from '../manter-equipamentos.service';

@Component({
  selector: 'app-equipamentos-file-upload',
  templateUrl: './equipamentos-file-upload.component.html',
  styleUrls: ['./equipamentos-file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EquipamentosFileUploadComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: EquipamentosFileUploadComponent,
      multi: true
    }
  ]
})
export class EquipamentosFileUploadComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {

  @ViewChild('fileInput')
  fileInput: any;
  @Input()
  disableUpload: Boolean = true;
  @Input()
  disableDownload: Boolean = false;
  @Input()
  disableExclude: Boolean = false;
  @Input()
  disabled = false;
  @Input()
  disableTypeIfSaved: Boolean = false;
  @Input()
  showDescricaoArquivo: Boolean = true;
  @Input()
  showData: Boolean = true;
  @Input()
  multiple: Boolean;
  @Input()
  extensoes: string[];
  @Input()
  messageComplement: string;
  @Input()
  accept: string;
  @Input()
  maxFileSize: number;
  @Input()
  maxFilesSize: number;
  @Input()
  validateTipo: boolean;
  @Input()
  showDataArquivo: Boolean = false;
  @Input()
  nomeColunaDataArquivo = 'Data do Arquivo';

  @Input()
  textoAuto: string;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @Output()
  readonly removeEvent = new EventEmitter();

  @Output()
  readonly addEvent = new EventEmitter();

  @Output()
  readonly onDescriptionEvent = new EventEmitter();

  @Output()
  readonly onDataArquivoEvent = new EventEmitter();

  sumSizeFiles = 0;
  maxFileSizeDefault = 5;
  maxFilesSizeDefault = 10;

  descricao = new FormControl('', Validators.required);

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  displayedColumnsUploadArquivo = ['name', 'tipoArquivo', 'excluir', 'download'];
  dataSourceArquivoUpload = new MatTableDataSource([]);
  descricoes = TipoArquivoEnum.getValues();
  /** Placeholders for the callbacks which are later provides by the Control Value Accessor*/
  public onChangeCallback = (_: any) => {};
  private files: any = [];
  @HostListener('blur', ['$event'])
  public onTouchCallback = () => {};
  validateFn: any = () => {};

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.id === f2.id;
  }

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    // private notificationService: NotificationService,
    private equipamentosService: ManterEquipamentosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    if (event && event.length > 0) {
      let filesUpload: FileUpload[] = this.convertToModel(event);
      filesUpload = this.validateOnlyExtension(filesUpload);
      filesUpload = this.validateDuplicateFiles(filesUpload);

      this.files =
        this.dataSourceArquivoUpload.data && this.dataSourceArquivoUpload.data.length > 0
          ? this.dataSourceArquivoUpload.data
          : this.files;

      filesUpload.forEach(fileUpload => {
        if (this.validateFileSize(fileUpload.file.size)) {
          if (!this.multiple && this.dataSourceArquivoUpload.data.length > 0) {
            this.files = [];
          }
          this.files.push(fileUpload);
        }
      });
      this.addEvent.emit(this.files);
      this.onChangeCallback(this.files);
    }
  }

  convertToModel(event: FileList): FileUpload[] {
    const filesUpload: FileUpload[] = [];

    Array.from(event).forEach(file => {
      const fileUpload: FileUpload = new FileUpload(file, null);
      filesUpload.push(fileUpload);
    });

    return filesUpload;
  }

  validateDuplicateFiles(filesUpload: FileUpload[]): FileUpload[] {
    if (this.files && this.files.length > 0) {
      const duplicateFilesNames: string[] = [];
      for (let x = filesUpload.length - 1; x >= 0; x--) {
        for (let y = 0; y < this.files.length; y++) {
          if (filesUpload[x].file.name === this.files[y].file.name) {
            duplicateFilesNames.push(this.files[y].file.name);
            filesUpload.splice(x, 1);
            break;
          }
        }
      }

      if (duplicateFilesNames && duplicateFilesNames.length > 0) {
        //this.notificationService.warn(duplicateFilesNames.join() + ' já foi(ram) selecionado(s)!');
      }
    }

    return filesUpload;
  }

  changeTipo(element, value) {
    element.description = value;
  }

  // valida a extensão do arquivo.
  validateOnlyExtension(filesUpload: FileUpload[]): FileUpload[] {
    let allowed_extensions = [];
    const validFiles: FileUpload[] = [];
    const invalidFilesNames: string[] = [];
    let splitFileName, extension, isValidFile;

    if (this.extensoes && this.extensoes.length > 0) {
      allowed_extensions = this.extensoes;
    } else {
      const image_extensions = ['bmp', 'jpg', 'jpeg', 'jpe', 'jfif', 'png', 'gif'];
      const text_extensions = ['txt', 'pdf'];
      const video_extensions = ['avi', 'mpeg', 'mpg', 'mp4', 'mkv'];
      const audio_extensions = ['mp3', 'acc', 'wav', 'ogg'];
      allowed_extensions = image_extensions.concat(text_extensions, video_extensions, audio_extensions);
    }

    filesUpload.forEach(fileUpload => {
      isValidFile = false;
      splitFileName = fileUpload.file.name.split('.');
      extension = splitFileName[splitFileName.length - 1].toLowerCase();

      for (let index = 0; index < allowed_extensions.length; index++) {
        if (allowed_extensions[index] === extension) {
          isValidFile = true;
          break;
        }
      }

      if (isValidFile) {
        validFiles.push(fileUpload);
      } else {
        invalidFilesNames.push(fileUpload.file.name);
      }
    });

    if (invalidFilesNames.length > 0) {
      let invalidFiles = 'Arquivo(s) com extensão inválida:\n';
      invalidFilesNames.forEach(invalidFileName => {
        invalidFiles = invalidFiles.concat(invalidFileName + '\n');
      });
      //this.notificationService.warn(invalidFiles);
    }

    return validFiles;
  }

  ngAfterViewInit() {
    this.dataSourceArquivoUpload.paginator = this.paginator;
    this.dataSourceArquivoUpload.sort = this.sort;
  }

  writeValue(value: any) {
    if (value === null || value === undefined || value.length === 0) {
      this._elementRef.nativeElement.value = '';
      this.dataSourceArquivoUpload.data = [];
      return;
    } else {
      if (this.showData) {
        this.dataSourceArquivoUpload.data = [value];
      }
      return;
    }
    this.onChangeCallback(value);
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchCallback = fn;
  }

  excluirArquivo(file: FileUpload) {
    const filesAtualizado: FileUpload[] = [];
    const listFiles: FileUpload[] = this.dataSourceArquivoUpload.data;
    this.sumSizeFiles = 0;

    for (let i = 0; i < listFiles.length; i++) {
      if (listFiles[i].file.name !== file.file.name) {
        filesAtualizado.push(listFiles[i]);
        this.sumSizeFiles += listFiles[i].file.size;
      }
    }
    this.dataSourceArquivoUpload.data = filesAtualizado;
    this.files = filesAtualizado;

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.removeEvent.emit(file);
    this.onChangeCallback(this.files);
  }

  /** Return the validation result*/
  validate(c: FormControl) {
    if (c.value) {
      this.validateFn = this.validateFiles(this.extensoes);
    }
    return this.validateFn(c);
    // return null;
  }

  validateFiles(extensoes: string[]) {
    return (c: FormControl) => {
      if (c.value && c.value.length > 0) {
        // const files = Array.from(c.value);

        // for (let i = 0; i < c.value.length; i++) {
        //   if (!this.validateFileSize(c.value[i].size) || !this.validateSingleFile(i)) {
        //     c.value.splice(c.value.indexOf(c.value[i]), 1);
        //   }
        // }
        let newfiles = this.dataSourceArquivoUpload.data;
        if (this.multiple) {
          newfiles = [];
          newfiles.push(...c.value);
        } else {
          newfiles = c.value;
        }
        this.dataSourceArquivoUpload.data = newfiles;
      }
      return null;
    };
  }

  getMaxFileSize(): number {
    return this.maxFileSize ? this.maxFileSize : this.maxFileSizeDefault;
  }

  getMaxFilesSize(): number {
    return this.maxFilesSize ? this.maxFilesSize : this.maxFilesSizeDefault;
  }

  getMaxFileSizeBytes(): number {
    return this.getMaxFileSize() * 1024 * 1024;
  }

  getMaxFilesSizeBytes(): number {
    return this.getMaxFilesSize() * 1024 * 1024;
  }

  validateFileSize(totalsize) {
    let errorMessage = null;

    if (totalsize > this.getMaxFileSizeBytes()) {
      errorMessage = `Upload de arquivos não pode exceder o máximo de ${this.getMaxFileSize()} megabytes por arquivo.`;
    } else if (this.sumSizeFiles + totalsize > this.getMaxFilesSizeBytes()) {
      errorMessage = `O somatório no upload de arquivos não pode exceder o máximo de ${this.getMaxFilesSize()} megabytes.`;
    }

    if (errorMessage) {
      //this.notificationService.warn(errorMessage);
      return false;
    }

    this.sumSizeFiles += totalsize;
    return true;
  }

  validateSingleFile(): boolean {
    if (!this.multiple && this.dataSourceArquivoUpload.data.length > 0) {
      let errorMessage = 'É permitido adicionar somente um registro';
      errorMessage += this.messageComplement ? `${this.messageComplement}!` : '!';
      //this.notificationService.warn(errorMessage);
      return false;
    }

    return true;
  }

  downloadArquivo(row: FileUpload) {
    if (row.id) {
      this.equipamentosService.downloadDocumento(row.id).subscribe((res: HttpResponse<Blob>) => {
        const filename = res.headers.get('filename');
        EquipamentosFileUploadComponent.createElement(res.body, filename);
      });
    }
     else {
      EquipamentosFileUploadComponent.createElement(row.file, row.file.name);
    }
  }

  private static createElement(file: Blob, filename: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = filename;
    link.click();
  }

  onDescriptionChange() {
    if (ObjUtils.isEmpty(this.files)) {
      this.files = this.dataSourceArquivoUpload.data;
    }
    if (this.files.size === 0) {
      this.onDescriptionEvent.emit(this.files);
    }
    this.onChangeCallback(this.files);
  }

  onDataArquivoChange() {
    if (ObjUtils.isEmpty(this.files)) {
      this.files = this.dataSourceArquivoUpload.data;
    }
    if (this.files.size === 0) {
      this.onDataArquivoEvent.emit(this.files);
    }
    this.onChangeCallback(this.files);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.validateTipo) {
      this.descricao.markAsTouched();
    }
  }

}
