export default class UsuarioModel {
  constructor(
    public id: number = null,
    public nome: string = null,
    public email: string = null,
    public senha: string = null,
    public status: boolean = false,
    public tipo: string = ''
  ) {}
}
