import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acceso, UserRegister } from '../../interfaces/register';

@Injectable({
  providedIn: 'root',
})

export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  registerUser(user: UserRegister): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', user);
  }

  registerAcceso(acceso: Acceso): Observable<any>{
    return this.http.post('http://localhost:3000/api/auth/register', acceso);
  }
}
