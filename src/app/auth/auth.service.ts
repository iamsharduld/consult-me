import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    // let user$ = this.afAuth.onAuthStateChanged;
    // console.log(typeof(user$), user$)
    console.log('here');
    this.afAuth.authState.subscribe((userAuthObj) => {
      this.user = userAuthObj;
      if(this.user) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }

  async login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(){
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

}
