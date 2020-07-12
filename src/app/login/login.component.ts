import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { Router } from  "@angular/router";

// Custom services
import { AuthService } from '../auth/auth.service';

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

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginFormModel.email, this.loginFormModel.passwd);
  }

}
