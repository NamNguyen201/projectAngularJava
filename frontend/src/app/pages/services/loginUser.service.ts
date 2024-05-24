import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

constructor(private http: HttpClient) { }
  public checkLogin(userName: string, passWord: string): Observable<LoginUser>{
    const body = {
      userName: userName,
      passWord: passWord
    }
    return this.http.post<LoginUser>(`${ApiPath.RETURN_OUTPUT_LOGIN_USER}`,body);
  }
}
