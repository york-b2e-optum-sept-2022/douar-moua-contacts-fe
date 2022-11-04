import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "../Interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $newAccount = new BehaviorSubject<IAccount | null> (null);
  $currentUser = new BehaviorSubject<IAccount | null>(null)
  $isLoggedIn = new BehaviorSubject<boolean>(true)

  constructor(private httpService: HttpService) { }

  createNewAccount(username: string, password: string){

    if(username == ""){
      alert("Username can not be blank.")
      return;
    }

    this.httpService.createNewAccount(username, password).pipe(first()).subscribe({
      next: (account) => {
        this.$newAccount.next(account);
      },
      error: (err) => {
        if (err.status === 409){
          alert("Username is taken. Please try a different one.")
          return;
        }
        alert("Unable to create account. Please try again later.")
      }
    });
  }

  login(username: string, password: string){
    this.httpService.login(username, password).pipe(first()).subscribe({
      next: (account) => {
        console.log(account)
        this.$currentUser.next(account)
      },
      error: (err) => {
        console.log(err)
        alert("Invalid login credentials, please try again.");
      }
    })
  }
}
