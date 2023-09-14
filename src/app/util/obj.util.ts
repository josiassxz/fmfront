export class ObjUtils {
  /**
   * Verifica se o objeto repassado tem o valor igual a Null.
   * @param value
   */
  public static isNull(value: any): boolean {
    return value === null || value === undefined || value === '';
  }

  /**
   * Verifica se o objeto repassado <b>Não</b> tem o valor igual a Null.
   * @param value
   */
  public static isNotNull(value: any): boolean {
    return !this.isNull(value);
  }

  /**
   * Método responsável por realizar a validação do objeto repassado,
   * verificando se o mesmo é não nulo e não vazio.
   * Tratativas para String e Array.
   * @param value
   */
  public static isEmpty(value: any): boolean {
    if (this.isNotNull(value)) {
      if (value instanceof Array) {
        return value.length === 0;
      }
      return value.toString().trim() === '' || value === 'undefined';
    } else {
      return true;
    }
  }

  /**
   * Método responsável por realizar a validação do objeto repassado,
   * verificando se o mesmo é não nulo e não vazio.
   * Tratativas para String e Array.
   * @param value
   */
  public static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }

  public static addInt(value: any, plus: number): number {
    // tslint:disable-next-line:radix
    return parseInt(value.toString()) + plus;
  }
}
