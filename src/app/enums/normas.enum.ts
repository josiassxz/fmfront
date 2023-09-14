export class NormasEnum {
    public static readonly ONZE = new NormasEnum("1", 'NR-11');
    public static readonly DOZE = new NormasEnum("2", 'NR-12');
    public static readonly TREZE = new NormasEnum("3", 'NR-13');
    public static readonly TRINTA_CINCO = new NormasEnum("4", 'NR-35');
  
    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): NormasEnum[] {
      return [this.ONZE, this.DOZE, this.TREZE, this.TRINTA_CINCO];
    }
  
    public static toEnum(id: string): NormasEnum {
      return this.getValues().find(p => p.id === id);
    }
  }