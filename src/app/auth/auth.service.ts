import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.user$ = this.afAuth.authState;
  }

  async login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(){
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }

}
