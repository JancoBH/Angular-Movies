import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public error: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then( res => {
      this.authService.addUserInfo();
      this.router.navigate(['']);
    });
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();
    this.authService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if (error) {
          this.error = error;
        }
      });
  }

}
