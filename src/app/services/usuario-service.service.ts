import { Injectable } from '@angular/core';

import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  public url;

  constructor(private http: HttpClient) { { this.url = GLOBAL.url } }

  obtener(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url, { headers: headers });
  }

  loginUser(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/login', data, { headers: headers });

  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }



    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);


      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;

      }

      console.log(decodedToken);

      if (!decodedToken) {
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;


    }


    return allowRoles.includes(decodedToken['rol']);
  }




  crear_usuario(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, data, { headers: headers });
  }





}
