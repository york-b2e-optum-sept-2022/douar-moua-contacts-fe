import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "../Interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $account = new BehaviorSubject<IAccount | null> (null);

  constructor(private httpService: HttpService) { }

  createNewAccount(username: string, password: string){
    this.httpService.createNewAccount(username, password).pipe(first()).subscribe({
      next: (account) => {
        this.$account.next(account);
      },
      error: (err) => {
        if (err.status === 409){
          alert("Username is taken. Please try a different one.")
          return;
        }
        alert("Unable to create account. Please try again later.")
      }
    })
  }
}
