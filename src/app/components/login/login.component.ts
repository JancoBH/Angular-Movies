import { Component } from '@angular/core';
import { AF } from '../../providers/af'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    public afService: AF,
    private router: Router
  ) { }

  login(){
    this.afService.loginWithGoogle().then( res => {
      // Send them to the homepage if they are logged in
      this.router.navigate(['']);
    });
  }

}
