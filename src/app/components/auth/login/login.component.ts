import { Component } from '@angular/core';
import { AuthService } from '../../../providers/auth-service'
import { Router } from '@angular/router'
import {FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public error: any;
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  private afterSignIn(): void {
    this.router.navigate(['/']);
  }

  signInWithGoogle(): void  {
    this.authService.googleLogin().then( () => {
      this.afterSignIn();
    });
  }

  loginWithEmail(post) {

    this.authService.emailLogin(post.email, post.password).then(() => {
      if (this.loginForm.valid) {
        this.afterSignIn();
      } else {
        this.error = this.authService.error;
      }
    })
  }

}
