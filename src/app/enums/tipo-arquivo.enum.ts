export class TipoArquivoEnum {
    public static readonly RELATORIO = new TipoArquivoEnum('1', 'Relatório de Inspeção');
    public static readonly LIVRO = new TipoArquivoEnum('2', 'Livro de Registro');
    public static readonly PRONTUARIO = new TipoArquivoEnum('3', 'Prontuário');
    public static readonly PROJETO = new TipoArquivoEnum('4', 'Projeto de Instalação');
    public static readonly MANUAL = new TipoArquivoEnum('5', 'Manual de Operação');
    public static readonly CERTIFICADO = new TipoArquivoEnum('6', 'Certificado de Calibração');

  
    constructor(public codigo: string, public descricao: string) {}
  
    public static getValues(): TipoArquivoEnum[] {
      return [this.RELATORIO, this.LIVRO, this.PRONTUARIO, this.PROJETO, this.MANUAL, this.CERTIFICADO];
    }
  
    public static toEnum(codigo: string): TipoArquivoEnum {
      return this.getValues().find(p => p.codigo === codigo);
    }
  }