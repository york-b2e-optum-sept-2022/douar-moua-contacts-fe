import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "./Services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'douar-moua-contacts-fe';

  isLoggedIn: boolean = false
  loginSub: Subscription;

  isCreatingAccount: boolean = false
  creatingAccountSub: Subscription;

  constructor(private accountService: AccountService) {

    this.loginSub = this.accountService.$isLoggedIn.subscribe(
      (isLogin: boolean) => {this.isLoggedIn = isLogin}
    )

    this.creatingAccountSub = this.accountService.$isCreatingAccount.subscribe(
      (isCreating: boolean) => {this.isCreatingAccount = isCreating}
    )
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe()
    this.creatingAccountSub.unsubscribe()
  }
}
