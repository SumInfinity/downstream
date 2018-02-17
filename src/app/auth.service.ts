import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
      error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then(
          (token: string) => this.token = token
          )
      }
      )
      .catch(
      error => console.log(error)
      );
  }
  signinFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then(
          (token: string) => this.token = token
          )
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  signinGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then(
          (token: string) => this.token = token
          )
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  signinTwitter() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
          .then(
          (token: string) => this.token = token
          )
      }
      )
      .catch(
      error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
      (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
