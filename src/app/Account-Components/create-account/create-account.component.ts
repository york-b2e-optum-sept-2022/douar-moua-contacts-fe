import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../Services/account.service";
import {IAccount} from "../../Interfaces/IAccount";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  newAccount: IAccount = {
    username: "",
    password: ""
  }

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  createNewAccount() {
    console.log(this.newAccount)
  }
}
