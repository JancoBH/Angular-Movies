import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { AF } from './providers/af';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoviesService, AF]
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(public afService: AF, private router: Router){

    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          this.isLoggedIn = false;
        }
        else {

          if(auth.google){
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
          }
          else {
            this.afService.displayName = auth.auth.email;
            this.afService.email = auth.auth.email;
          }

          this.isLoggedIn = true;
          this.router.navigate(['']);
        }
      }
    );

  }

  logout() {
    this.afService.logout();
    this.router.navigate(['/login']);
  }

}
