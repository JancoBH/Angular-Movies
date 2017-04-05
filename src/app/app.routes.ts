import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component'
import { MovieComponent } from "./components/movie/movie.component";
import {GenresComponent} from "./components/genres/genres.component";
import {ActorComponent} from "./components/actor/actor.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {GenresListComponent} from "./components/genres-list/genres-list.component";
import {RegisterComponent} from "./components/register/register.component";

export const appRoutes: Routes = [
  { path: '', component: MoviesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'movie/:id', component: MovieComponent },
  { path: 'genres', component: GenresListComponent },
  { path: 'genres/:id/:name', component: GenresComponent },
  { path: 'actor/:id', component: ActorComponent },
  { path: '**', component: PageNotFoundComponent}
];
