import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilFunction } from 'src/app/util/util.function';
import { environment } from 'src/app/util/static-data';
import { Observable } from 'rxjs';
import UsuarioModel from 'src/app/models/usuario.model';
import { PageModel } from 'src/app/models/page.model';
import { AbstractRestService } from 'src/app/util/abstract-rest.service';

const route = `usuarios`;

@Injectable({
  providedIn: 'root'
})

export class ManterUsuariosService extends AbstractRestService<UsuarioModel> {

  constructor(http: HttpClient,  private utilFunction: UtilFunction) {
    super(http, route);
   }

  listarUsuarios(): Observable<UsuarioModel[]> {
    return this._http.get<UsuarioModel[]>(`${this.route}/listar-usuarios`);
  }

  pesquisar(filtro: any, page: number, size: number): Observable<PageModel<UsuarioModel>> {
    const params = this.utilFunction.getMapParamsPage(filtro, size, page);
    return this._http.get<PageModel<UsuarioModel>>(`${route}`, { params });
  }

  excluir(id: number): Observable<any> {
    return this._http.delete<any>(this.route + '/' + id);
  }

  salvar(formData: FormData): Observable<any> {
    return this._http.post(`${this.route}`, formData);
  }

  alterar(usuario: UsuarioModel): Observable<any> {
  return this._http.put(`${this.route}/${usuario.id}`, usuario);
  }
  
}
