import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesService } from './services/movies.service';
import { AuthService } from './services/auth-service'

import 'hammerjs';
import { MovieCardComponent } from './components/ui/poster-card-view/poster-card.component';
import { MovieComponent, AppMovieDialogComponent } from './components/InTheater/movie/movie.component';
import { GenresComponent } from './components/InTheater/genres/genres.component';
import { ActorComponent } from './components/actor/actor.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { GenresListComponent } from './components/all-movies/genres-list/genres-list.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { environment } from '../environments/environment';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatPaginatorModule, MatMenuModule, MatDialogModule, MatSliderModule,
  MatExpansionModule
} from '@angular/material';
import { ModalComponent } from './components/ui/modal/modal.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { AccountComponent } from './components/user/account/account.component';
import {OnTVService} from './services/onTV/onTV.service';
import { TvShowComponent } from './components/OnTV/tv-show/tv-show.component';
import { AllMoviesComponent } from './components/InTheater/all-movies/all-movies.component';
import { AllTvShowsComponent } from './components/OnTV/all-tv-shows/all-tv-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieCardComponent,
    MovieComponent,
    GenresComponent,
    ActorComponent,
    LoginComponent,
    PageNotFoundComponent,
    CapitalizePipe,
    GenresListComponent,
    RegisterComponent,
    ModalComponent,
    AppMovieDialogComponent,
    SettingsComponent,
    AccountComponent,
    TvShowComponent,
    AllMoviesComponent,
    AllTvShowsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    MatExpansionModule
  ],
  providers: [MoviesService, AuthService, OnTVService],
  entryComponents: [
    AppMovieDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
