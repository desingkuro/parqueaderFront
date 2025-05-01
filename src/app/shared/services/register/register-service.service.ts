import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }

  registerAcceso(acceso: any): Observable<any>{
    return this.http.post('http://localhost:3000/api/auth/register', acceso);
  }
}
