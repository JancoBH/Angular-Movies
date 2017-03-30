import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component'
import { MovieComponent } from "./components/movie/movie.component";
import {GenresComponent} from "./components/genres/genres.component";

export const appRoutes: Routes = [
  { path: '', component: MoviesComponent},
  { path: 'movie/:id', component: MovieComponent },
  { path: 'genres/:id/:name', component: GenresComponent }
];
