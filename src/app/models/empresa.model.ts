import UsuarioModel from "./usuario.model";

export default class EmpresaModel {
    constructor(
      public id: number,
      public nome: string = '',
      public razaoSocial: string = '',
      public cnpj: string = '',
      public email: string= '',
      public telefone: string = '',
      public cidade: string = '',
      public estado: string = '',
      public endereco: string = '',
      public cep: string = '',
      public usuarios : UsuarioModel[],
      public status: boolean = false
    ) {}
  }
  