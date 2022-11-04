import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../Interfaces/IAccount";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  createNewAccount(username: string, password: string) : Observable<IAccount>{
    return this.httpClient.post('http://localhost:8080/api/account', {
      username: username,
      password: password}
    ) as Observable<IAccount>
  }

  login(username: string, password: string) : Observable<IAccount>{
    return this.httpClient.get(`http://localhost:8080/api/account?username=${username}&password=${password}`
    ) as Observable<IAccount>
  }
}
