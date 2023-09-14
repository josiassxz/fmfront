export class CategoriaCaldeirasEnum {
    public static readonly A = new CategoriaCaldeirasEnum('A', 'A');
    public static readonly B = new CategoriaCaldeirasEnum('B', 'B');
    public static readonly C = new CategoriaCaldeirasEnum('C', 'C');

    constructor(public id: string, public descricao: string) {}
  
    public static getValues(): CategoriaCaldeirasEnum[] {
      return [this.A, this.B, this.C];
    }
  
    public static toEnum(id: string): CategoriaCaldeirasEnum {
      return this.getValues().find(p => p.id === id);
    }
  }