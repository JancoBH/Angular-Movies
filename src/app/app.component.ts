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
  genres: Array<Object>;
  isLoggedIn: boolean;

  constructor(private _moviesServices: MoviesService, public afService: AF, private router: Router){
    this._moviesServices.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );

    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");
          this.isLoggedIn = true;
          // UPDATE: I forgot this at first. Without it when a user is logged in and goes directly to /login
          // the user did not get redirected to the home page.
          this.router.navigate(['']);
        }
      }
    );

  }

  logout() {
    this.afService.logout();
  }

}
