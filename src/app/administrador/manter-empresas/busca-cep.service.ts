import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  baseUrl: string = `https://viacep.com.br/ws/`;

  constructor(private http: HttpClient) {
  }

  buscaCep (cep: number): Observable<any> {
    return this.http.get(this.baseUrl + cep + `/json/`);
  }


}
