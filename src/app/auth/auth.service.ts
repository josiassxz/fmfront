import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../util/static-data';
import { Observable } from 'rxjs';

const route = `${environment.URL_SERVER_API}/usuarios`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(usuario): Observable<any> {
    return this._http.post(`${route}/login`, usuario);
  }
}
