import {SharedModule} from '../../shared/shared.module';
import {MoviesComponent} from './movies.component';
import {NgModule} from '@angular/core';
import {MoviesRoutesModule} from './movies.routes.module';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';

@NgModule({
  imports: [
    SharedModule,
    MoviesRoutesModule,
  ],
  declarations: [
    MoviesComponent,
    MovieDetailComponent
  ],
  providers: []
})

export class MoviesModule {}
