export class PlacasEnum {
    public static readonly BOM = new PlacasEnum("1", 'Bom estado');
    public static readonly NAO = new PlacasEnum("2", 'Não possui');
    public static readonly POSSUI = new PlacasEnum("3", 'Possui');
    public static readonly RUIM = new PlacasEnum("4", 'Ruim');
  
    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): PlacasEnum[] {
      return [this.BOM, this.NAO, this.RUIM, this.POSSUI];
    }
  
    public static toEnum(id: string): PlacasEnum {
      return this.getValues().find(p => p.id === id);
    }
  }