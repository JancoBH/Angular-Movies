import {Component, OnInit} from '@angular/core';

import { AuthService } from '../../../providers/auth-service'
import { Router } from '@angular/router'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error: any;
  registerForm: FormGroup;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  registerUser(post): void {
    if (this.registerForm.valid) {
      this.authService.emailSignUp(post.email, post.password).then( (res) => {
        console.log(res);
      })
    }
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ],
    });
  }

}
