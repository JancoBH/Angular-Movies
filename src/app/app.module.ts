import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { firebaseConfig } from './firebaseConfig'
import { AngularFireModule } from 'angularfire2'
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesService } from './movies.service';
import { AF } from "./providers/af"

import 'hammerjs';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieComponent } from './components/movie/movie.component';
import { GenresComponent } from './components/genres/genres.component';
import { ActorComponent } from './components/actor/actor.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieComponent,
    GenresComponent,
    ActorComponent,
    LoginComponent,
    PageNotFoundComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MoviesService, AF],
  bootstrap: [AppComponent]
})
export class AppModule { }
