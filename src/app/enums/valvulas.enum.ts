export class ValvulasEnum {
    public static readonly CALIBRADO = new ValvulasEnum("1", 'Calibrado');
    public static readonly NAO_CALIBRADO = new ValvulasEnum("2", 'Não calibrado');
    public static readonly NAO_APLICAVEL = new ValvulasEnum("3", 'Não aplicável');
   // public static readonly NOVO_CALIBRADO = new ValvulasEnum("3", 'Novo calibrado');
  
    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): ValvulasEnum[] {
      return [this.CALIBRADO, this.NAO_CALIBRADO, this.NAO_APLICAVEL];
    }
  
    public static toEnum(id: string): ValvulasEnum {
      return this.getValues().find(p => p.id === id);
    }
  }