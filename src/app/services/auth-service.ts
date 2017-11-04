import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  users = [];
  displayName: string;
  email: string;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  addUserInfo() {
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  saveUserInfoFromForm(uid, name, email) {
    return this.db.object('registeredUsers/' + uid).set({
      name,
      email
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
