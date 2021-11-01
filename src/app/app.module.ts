import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesService } from './services/inTheater/movies.service';
import { MovieCardComponent } from './components/ui/poster-card-view/poster-card.component';
import { MovieComponent, AppMovieDialogComponent } from './components/InTheater/movie/movie.component';
import { GenresComponent } from './components/InTheater/genres/genres.component';
import { ActorComponent } from './components/actor/actor.component';
import { PageNotFoundComponent } from './components/ui/page-not-found/page-not-found.component';
import { GenresListComponent } from './components/InTheater/genres-list/genres-list.component';
import { environment } from '../environments/environment';
import {OnTVService} from './services/onTV/onTV.service';
import { TvShowComponent } from './components/OnTV/tv-show/tv-show.component';
import { AllMoviesComponent } from './components/InTheater/all-movies/all-movies.component';
import { AllTvShowsComponent } from './components/OnTV/all-tv-shows/all-tv-shows.component';
import {SeoService} from './services/seo.service';

import {GenresTvComponent} from './components/OnTV/genres-tv/genres-tv.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NavbarComponent} from './components/ui/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MovieCardComponent,
    MovieComponent,
    GenresComponent,
    GenresTvComponent,
    ActorComponent,
    PageNotFoundComponent,
    GenresListComponent,
    AppMovieDialogComponent,
    TvShowComponent,
    AllMoviesComponent,
    AllTvShowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    MoviesService,
    OnTVService,
    SeoService
  ],
  entryComponents: [
    AppMovieDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
