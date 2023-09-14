import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilFunction } from 'src/app/util/util.function';
import { environment } from 'src/app/util/static-data';
import { Observable } from 'rxjs';
import { PageModel } from 'src/app/models/page.model';
import { AbstractRestService } from 'src/app/util/abstract-rest.service';
import EmpresaModel from 'src/app/models/empresa.model';


const route = `empresas`;

@Injectable({
  providedIn: 'root'
})
export class ManterEmpresasService extends AbstractRestService<EmpresaModel>{

  constructor(http: HttpClient,  private utilFunction: UtilFunction) {
    super(http, route);
   }

   pesquisar(filtro: any, page: number, size: number): Observable<PageModel<EmpresaModel>> {
    const params = this.utilFunction.getMapParamsPage(filtro, size, page);
    return this._http.get<PageModel<EmpresaModel>>(`${route}`, { params });
  }

  excluir(id: number): Observable<any> {
    return this._http.delete<any>(this.route + '/' + id);
  }

  salvar(formData: FormData): Observable<any> {
    return this._http.post(`${this.route}`, formData);
  }

  alterar(usuario: EmpresaModel): Observable<any> {
  return this._http.put(`${this.route}/${usuario.id}`, usuario);
  }

  listarEmpresas(): Observable<EmpresaModel[]> {
    return this._http.get<EmpresaModel[]>(`${this.route}/lista-empresas`);
  }
  
  }
