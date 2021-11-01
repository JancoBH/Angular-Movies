import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesService } from './services/inTheater/movies.service';
import { GenresComponent } from './components/genres/movie-genres/genres.component';
import { GenresListComponent } from './components/genres/genres-list/genres-list.component';
import { environment } from '../environments/environment';
import {OnTVService} from './services/onTV/onTV.service';
import {SeoService} from './services/seo.service';

import {GenresTvComponent} from './components/genres/genres-tv/genres-tv.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {NavbarComponent} from './components/ui/navbar/navbar.component';
import {AppMovieDialogComponent} from './components/movies/movie-detail/movie-detail.component';
import {NotFoundComponent} from './components/ui/not-found/not-found.component';
import {FooterComponent} from './components/ui/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    GenresComponent,
    GenresTvComponent,
    GenresListComponent,
    AppMovieDialogComponent,
    NotFoundComponent
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
