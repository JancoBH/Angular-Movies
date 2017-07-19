import { Component } from '@angular/core';
import { MoviesService } from './movies.service';
import { AF } from './providers/af';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoviesService, AF]
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(public afService: AF, private router: Router) {

    this.afService.afAuth.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
        } else {

          if (auth) {
            this.afService.displayName = auth.displayName;
            this.afService.email = auth.email;
          } else {
            this.afService.displayName = auth.email;
            this.afService.email = auth.email;
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
