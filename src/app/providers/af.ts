import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

@Injectable()
export class AF {
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
}
