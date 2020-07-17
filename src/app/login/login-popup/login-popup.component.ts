import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { Router } from  "@angular/router";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  loginFormModel = {
    email: '',
    passwd: ''
  }

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginPopupComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.loginFormModel.email, this.loginFormModel.passwd);
    this.dialogRef.close();
  }

}
