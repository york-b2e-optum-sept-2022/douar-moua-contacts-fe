import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../Services/account.service";
import {IAccount} from "../../Interfaces/IAccount";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  username: string = ""
  password: string = ""

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  createNewAccount() {
    this.accountService.createNewAccount(this.username, this.password)
  }
}
