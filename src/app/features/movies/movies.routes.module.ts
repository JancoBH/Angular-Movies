import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MoviesComponent} from './movies.component';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';

const moviesRoutes: Routes = [
  {path: '',
    children: [
      { path: '', component: MoviesComponent},
      { path: 'detail/:url', component: MovieDetailComponent}
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [RouterModule]
})

export class MoviesRoutesModule {}
