import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import {GenresComponent} from './components/genres/movie-genres/genres.component';
import {GenresListComponent} from './components/genres/genres-list/genres-list.component';
import {GenresTvComponent} from './components/genres/genres-tv/genres-tv.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'genres', component: GenresListComponent },
  { path: 'movie-genres/:id/:name', component: GenresComponent },
  { path: 'movie-genres-tv/:id/:name', component: GenresTvComponent },
];
