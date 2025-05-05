import { Injectable } from '@angular/core';
import { UserLogin } from '../../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor(private http:HttpClient) { }

  login(user:UserLogin):Observable<any>{
    return this.http.post('http://localhost:3123/api/login/iniciar', user);
  }
}
