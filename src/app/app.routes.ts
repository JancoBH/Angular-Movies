import { Routes } from '@angular/router';
import { MoviesComponent } from './components/all-movies/movies/movies.component'
import { MovieComponent } from './components/all-movies/movie/movie.component';
import {GenresComponent} from './components/all-movies/genres/genres.component';
import {ActorComponent} from './components/actor/actor.component';
import {LoginComponent} from './components/auth/login/login.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {GenresListComponent} from './components/all-movies/genres-list/genres-list.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {SettingsComponent} from './components/user/settings/settings.component';
import {AccountComponent} from './components/user/account/account.component';

export const appRoutes: Routes = [
  { path: '', component: MoviesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'account', component: AccountComponent},
  { path: 'movie/:id', component: MovieComponent },
  { path: 'genres', component: GenresListComponent },
  { path: 'genres/:id/:name', component: GenresComponent },
  { path: 'actor/:id', component: ActorComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: PageNotFoundComponent}
];
