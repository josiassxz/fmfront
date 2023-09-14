export class StatusEnum {
    public static readonly APROVADO = new StatusEnum("1", 'Aprovado');
    public static readonly REPROVADO = new StatusEnum("2", 'Reprovado');
    public static readonly APROVADO_RESTRICAO = new StatusEnum("3", 'Aprovado com restrição');
    public static readonly CONDENADO = new StatusEnum("4", 'Condenado');
  
    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): StatusEnum[] {
      return [this.APROVADO, this.REPROVADO, this.APROVADO_RESTRICAO, this.CONDENADO];
    }
  
    public static toEnum(codigo: string): StatusEnum {
      return this.getValues().find(p => p.id === codigo);
    }
  }