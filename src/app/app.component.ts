import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from './core/auth.service';
import {isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  isRedColor = true;
  isBlueColor = false;
  isGreenColor = false;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    private router: Router,
    public auth: AuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {

    this.auth.afAuth.authState.subscribe(
      a => {
        this.isLoggedIn = a !== null;
      }
    );

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if (this.isBrowser) {
        window.scrollTo(0, 0);
      }
    });
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
