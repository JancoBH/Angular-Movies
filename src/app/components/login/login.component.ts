import { Component } from '@angular/core';
import { AF } from '../../providers/af'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public error: any;

  constructor(
    public afService: AF,
    private router: Router
  ) { }

  loginWithGoogle() {
    this.afService.loginWithGoogle().then( res => {
      this.afService.addUserInfo();
      this.router.navigate(['']);
    });
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

}
