import { Component } from '@angular/core';
import {AccountService} from "../../Services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = ""
  password: string = ""

  constructor(private accountService: AccountService) { }


  onLoginClick() {
    console.log(this.username, this.password)
  }
}
