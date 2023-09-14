export class CategoriaVasosEnum {
    public static readonly I = new CategoriaVasosEnum("1", 'I');
    public static readonly II = new CategoriaVasosEnum("2", 'II');
    public static readonly III = new CategoriaVasosEnum("3", 'III');
    public static readonly IV = new CategoriaVasosEnum("4", 'IV');
    public static readonly V = new CategoriaVasosEnum("5", 'V');

    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): CategoriaVasosEnum[] {
      return [this.I, this.II, this.III, this.IV, this.V];
    }
  
    public static toEnum(id: string): CategoriaVasosEnum {
      return this.getValues().find(p => p.id === id);
    }
  }