import { HttpResponse } from '@angular/common/http';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManterEquipamentosService } from 'src/app/administrador/manter-equipamentos/manter-equipamentos.service';
import { TipoArquivoEnum } from 'src/app/enums/tipo-arquivo.enum';

@Component({
  selector: 'app-dialog-download',
  templateUrl: './dialog-download.component.html',
  styleUrls: ['./dialog-download.component.css']
})
export class DialogDownloadComponent {
  downloadButtonList = [];
  multiple = false;
  tiposArquivo = TipoArquivoEnum.getValues();

  constructor(
    private dialogRef: MatDialogRef<DialogDownloadComponent>,
    private equipamentosService: ManterEquipamentosService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.downloadButtonList = data.documentos;
    this.multiple = data.multiple;
  }

  onDownload(element) {
    if (element) {
      if (!this.multiple) {
        this.equipamentosService.downloadDocumento(element.id).subscribe((res: HttpResponse<Blob>) => {
          const filename = res.headers.get('filename');
          DialogDownloadComponent.createElement(res.body, filename);
        });
      } else {
        const ids = element.documentos.map(doc => doc.id);
        this.equipamentosService.downloadZip(ids).subscribe((res: HttpResponse<Blob>) => {
          const filename = res.headers.get('filename');
          DialogDownloadComponent.createElement(res.body, filename);
        });
      }
    }
  }

  onDownloadAll() {
    const ids = this.multiple
      ? this.downloadButtonList.flatMap(equip => equip.documentos).map(doc => doc.id)
      : this.downloadButtonList.map(doc => doc.id);

    this.equipamentosService.downloadZip(ids).subscribe((res: HttpResponse<Blob>) => {
      const filename = res.headers.get('filename');
      DialogDownloadComponent.createElement(res.body, filename);
    });
  }

  private static createElement(file: Blob, filename: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
  }

  getDescricao(element) {
    return this.multiple ? element.descricao : TipoArquivoEnum.toEnum(element.tipo).descricao;
  }
}
