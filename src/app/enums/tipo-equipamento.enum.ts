export class TipoEquipamentoEnum {
    public static readonly VASO = new TipoEquipamentoEnum("VASO", 'Vaso de pressão');
    public static readonly VALVULA = new TipoEquipamentoEnum("VALVULA", 'Válvula de segurança');
    public static readonly INDICADOR = new TipoEquipamentoEnum("INDICADOR", 'Indicador de pressão');
    public static readonly INDICADOR_TEMPERATURA = new TipoEquipamentoEnum("INDICADOR_TEMPERATURA", 'Indicador de temperatura');
    public static readonly CALDEIRA = new TipoEquipamentoEnum("CALDEIRA", 'Caldeira');
    public static readonly TUBULACAO = new TipoEquipamentoEnum("TUBULACAO", 'Tubulação');
    public static readonly LINHA = new TipoEquipamentoEnum("LINHA", 'Linha de vida');
    public static readonly ELEVADOR = new TipoEquipamentoEnum("ELEVADOR", 'Elevador');
    public static readonly EQUIPAMENTO = new TipoEquipamentoEnum("EQUIPAMENTO", 'Equipamento');

    constructor(public codigo: string, public descricao: string) {}

    public static getValues(): TipoEquipamentoEnum[] {
      return [this.VASO, this.VALVULA, this.INDICADOR, this.INDICADOR_TEMPERATURA, this.CALDEIRA, this.TUBULACAO, this.LINHA, this.ELEVADOR, this.EQUIPAMENTO];
    }

    public static toEnum(codigo: string): TipoEquipamentoEnum {
      return this.getValues().find(p => p.codigo === codigo);
    }
  }
