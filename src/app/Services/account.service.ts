import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "../_Interfaces/IAccount";
import {BehaviorSubject, first, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  $newAccount = new BehaviorSubject<IAccount | null> (null);
  $currentUser = new BehaviorSubject<IAccount | null>(null)

  isLoggedIn: boolean = true
  $isLoggedIn = new Subject<boolean>()

  isCreatingAccount: boolean = true
  $isCreatingAccount = new Subject<boolean>()

  constructor(private httpService: HttpService) { }

  //toggle create account from login
  creatingAccount(){
    this.$isCreatingAccount.next(this.isCreatingAccount)
  }

  //toggle login from create-account
  loggingIn(){
    this.$isCreatingAccount.next(!this.isCreatingAccount)
  }

  //create new account
  createNewAccount(username: string, password: string){

    if(username == "" || password == ""){
      alert("Username and password can not be blank.")
      return;
    }

    this.httpService.createNewAccount(username, password).pipe(first()).subscribe({
      next: (account) => {
        this.$newAccount.next(account);
        alert("Success! Login with your new account now!")
        this.$isCreatingAccount.next(!this.isCreatingAccount)
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

  //validate login credentials & login
  login(username: string, password: string){

    if (username == "" || password == ""){
      alert("Username and password can not be blank.")
      return;
    }

    this.httpService.login(username, password).pipe(first()).subscribe({
      next: (account) => {
        this.$isLoggedIn.next(this.isLoggedIn)
        this.$currentUser.next(account)
      },
      error: (err) => {
        console.log(err)
        alert("Invalid login credentials, please try again.");
      }
    })

  };

  //log out
  logOut(){
    this.$isLoggedIn.next(!this.isLoggedIn)
  }


}
