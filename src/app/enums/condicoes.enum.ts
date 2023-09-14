export class CondicaoEnum {
    public static readonly APROVADO = new CondicaoEnum("1", 'Aprovado');
    public static readonly REPROVADO = new CondicaoEnum("2", 'Reprovado');

    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): CondicaoEnum[] {
      return [this.APROVADO, this.REPROVADO];
    }
  
    public static toEnum(id: string): CondicaoEnum {
      return this.getValues().find(p => p.id === id);
    }
  }