export class SimNaoEnum {
    public static readonly SIM = new SimNaoEnum("S", 'Sim');
    public static readonly NAO = new SimNaoEnum("N", 'Não');
  
    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): SimNaoEnum[] {
      return [this.SIM, this.NAO];
    }
  
    public static toEnum(id: string): SimNaoEnum {
      return this.getValues().find(p => p.id === id);
    }
  }