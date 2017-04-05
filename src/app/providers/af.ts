import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AF {

  users: FirebaseListObservable<any>;
  displayName: string;
  email: string;

  constructor(public af: AngularFire) {}

  loginWithGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

  logout() {
    return this.af.auth.logout();
  }

  addUserInfo(){
    this.users.push({
      email: this.email,
      displayName: this.displayName
    });
  }

  registerUser(email, password) {
    return this.af.auth.createUser({
      email,
      password
    });
  }

  saveUserInfoFromForm(uid, name, email){
    return this.af.database.object('registeredUsers/' + uid).set({
      name,
      email
    });
  }

  loginWithEmail(email, password){
    return this.af.auth.login({
      email,
      password
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    });
  }
}
