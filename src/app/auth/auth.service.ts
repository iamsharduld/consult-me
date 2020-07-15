import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$;

  constructor(
    public  afAuth:  AngularFireAuth,
    public  router:  Router,
    private http: HttpClient
    ) {
    this.user$ = this.afAuth.authState;
  }

  async login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(){
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  storeTokenInLocalStorage(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return this.http.post("http://127.0.0.1:5000/auth", {
      "username": "sd",
      "password": "sdpass"
    })
  }

}
