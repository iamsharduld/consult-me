import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormModel = {
    email: '',
    passwd: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.loginFormModel);
  }

}
