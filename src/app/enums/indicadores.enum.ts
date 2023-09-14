export class IndicadoresEnum {
  public static readonly CALIBRADO = new IndicadoresEnum("1", 'Calibrado');
  public static readonly NAO_CALIBRADO = new IndicadoresEnum("2", 'Não calibrado');
  public static readonly NAO_APLICAVEL = new IndicadoresEnum("3", 'Não aplicável');
  

  constructor(public id: string, public descricao: string) {}

  public static getValues(): IndicadoresEnum[] {
    return [this.CALIBRADO, this.NAO_CALIBRADO, this.NAO_APLICAVEL];
  }

  public static toEnum(id: string): IndicadoresEnum {
    return this.getValues().find(p => p.id === id);
  }
}