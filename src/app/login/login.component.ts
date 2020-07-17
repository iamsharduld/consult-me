import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { take, map } from 'rxjs/operators';
import { Router } from  "@angular/router";

import {MatDialog} from '@angular/material/dialog';

// Custom services
import { AuthService } from '../auth/auth.service';

// Custom Componenets
import { LoginPopupComponent } from './login-popup/login-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
