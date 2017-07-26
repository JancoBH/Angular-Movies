import { Component} from '@angular/core';

import { AuthService } from '../../../services/auth-service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public error: any;

  constructor(private authService: AuthService, private router: Router) { }

  registerUser(event, name, email, password) {
    event.preventDefault();
    this.authService.registerUser(email, password).then((user) => {
      this.authService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
      });
  }

}
