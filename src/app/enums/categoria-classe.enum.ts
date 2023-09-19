export class CategoriaClasseEnum {
    public static readonly A = new CategoriaClasseEnum('A', 'A');
    public static readonly B = new CategoriaClasseEnum('B', 'B');
    public static readonly C = new CategoriaClasseEnum('C', 'C');
    public static readonly D = new CategoriaClasseEnum('D', 'D');

    constructor(public id: string, public descricao: string) {}
  
    public static getValuesCategoria(): CategoriaClasseEnum[] {
      return [this.A, this.B, this.C];
    }
  
    public static getValuesClasse(): CategoriaClasseEnum[] {
      return [this.A, this.B, this.C, this.D];
    }
  }