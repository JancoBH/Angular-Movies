import { Component } from '@angular/core';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn: boolean;
  isRedColor = true;
  isBlueColor = false;
  isGreenColor = false;

  constructor(public auth: AuthService) {

    this.auth.afAuth.authState.subscribe(
      a => {
        this.isLoggedIn = a !== null;
      }
    );

  }

  changeToRed(): void {
    this.isRedColor = true;
    this.isBlueColor = false;
    this.isGreenColor = false;
  }

  changeToBlue(): void {
    this.isRedColor = false;
    this.isBlueColor = true;
    this.isGreenColor = false;
  }

  changeToGreen(): void {
    this.isRedColor = false;
    this.isBlueColor = false;
    this.isGreenColor = true;
  }

}
