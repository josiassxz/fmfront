import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { UtilFunction } from 'src/app/util/util.function';
import { environment } from 'src/app/util/static-data';
import { Observable } from 'rxjs';
import { PageModel } from 'src/app/models/page.model';
import { AbstractRestService } from 'src/app/util/abstract-rest.service';
import EmpresaModel from 'src/app/models/empresa.model';
import EquipamentoModel from 'src/app/models/equipamento.model';


const route = `equipamentos`;


@Injectable({
  providedIn: 'root'
})
export class ManterEquipamentosService extends AbstractRestService<EquipamentoModel> {

  constructor(http: HttpClient, private utilFunction: UtilFunction) {
    super(http, route);
  }

  pesquisar(filtro: any, page: number, size: number): Observable<PageModel<EquipamentoModel>> {
    const params = this.utilFunction.getMapParamsPage(filtro, size, page);
    return this._http.get<PageModel<EquipamentoModel>>(`${route}`, { params });
  }

  excluir(id: number): Observable<any> {
    return this._http.delete<any>(this.route + '/' + id);
  }

  salvar(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this._http.post(`${this.route}/salvar`, formData, { headers: headers });
  }

  alterar(formData: FormData, id: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this._http.put(`${this.route}/${id}/alterar`, formData, { headers: headers });
  }

  listaEquipamentos(idEmpresa: number): Observable<any> {
    const params = new HttpParams().set('id', idEmpresa);
    return this._http.get(`${this.route}/lista/${idEmpresa}`, { params });
  }

  downloadDocumento(idDocumento: number): Observable<HttpResponse<Blob>> {
    return this._http.get(`${this.route}/download/${idDocumento}`, { observe: 'response', responseType: 'blob' });
  }

  downloadZip(ids: number[]): Observable<HttpResponse<Blob>> {
    const params = new HttpParams().set('ids', ids.toString());
    return this._http.get(`${this.route}/download/lista/`, { params, observe: 'response', responseType: 'blob' });
  }
}
