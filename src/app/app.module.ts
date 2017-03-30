import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesService } from './movies.service';

import 'hammerjs';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieComponent } from './components/movie/movie.component';
import { GenresComponent } from './components/genres/genres.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieComponent,
    GenresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
