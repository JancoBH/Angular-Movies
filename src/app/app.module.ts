import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesService } from './services/inTheater/movies.service';

import 'hammerjs';
import { MovieCardComponent } from './components/ui/poster-card-view/poster-card.component';
import { MovieComponent, AppMovieDialogComponent } from './components/InTheater/movie/movie.component';
import { GenresComponent } from './components/InTheater/genres/genres.component';
import { ActorComponent } from './components/actor/actor.component';
import { LoginComponent } from './components/ui/login/login.component';
import { PageNotFoundComponent } from './components/ui/page-not-found/page-not-found.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { GenresListComponent } from './components/InTheater/genres-list/genres-list.component';
import { RegisterComponent } from './components/ui/register/register.component';
import { environment } from '../environments/environment';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatPaginatorModule, MatMenuModule, MatDialogModule, MatSliderModule,
  MatExpansionModule
} from '@angular/material';
import { ModalComponent } from './components/ui/modal/modal.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import {OnTVService} from './services/onTV/onTV.service';
import { TvShowComponent } from './components/OnTV/tv-show/tv-show.component';
import { AllMoviesComponent } from './components/InTheater/all-movies/all-movies.component';
import { AllTvShowsComponent } from './components/OnTV/all-tv-shows/all-tv-shows.component';
import {CoreModule} from './core/core.module';
import {AuthGuard} from './core/auth.guard';
import {SeoService} from './services/seo.service';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {GenresTvComponent} from './components/OnTV/genres-tv/genres-tv.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboard: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    MovieComponent,
    GenresComponent,
    GenresTvComponent,
    ActorComponent,
    LoginComponent,
    PageNotFoundComponent,
    CapitalizePipe,
    GenresListComponent,
    RegisterComponent,
    ModalComponent,
    AppMovieDialogComponent,
    SettingsComponent,
    ProfileComponent,
    TvShowComponent,
    AllMoviesComponent,
    AllTvShowsComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatSliderModule,
    MatExpansionModule,
    SwiperModule
],
  providers: [
    MoviesService,
    OnTVService,
    AuthGuard,
    SeoService,
    {provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG}
  ],
  entryComponents: [
    AppMovieDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
