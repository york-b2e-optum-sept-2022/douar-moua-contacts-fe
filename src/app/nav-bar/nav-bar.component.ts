import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../Services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnDestroy{

  isLoggedIn: boolean = false
  loginSub: Subscription;

  creatingAccount: boolean = false
  creatingAccountSub: Subscription;

  constructor(private accountService: AccountService) {

    this.loginSub = this.accountService.$isLoggedIn.subscribe(
      (isLogin: boolean) => {this.isLoggedIn = isLogin}
    )

    this.creatingAccountSub = this.accountService.$isCreatingAccount.subscribe(
      (isCreating: boolean) => {this.creatingAccount = isCreating}
    )

  }

  isCreatingAccount() {
    this.accountService.creatingAccount();
  }

  loginToggle() {
    this.accountService.loggingIn();
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe()
    this.creatingAccountSub.unsubscribe()

  }

}
