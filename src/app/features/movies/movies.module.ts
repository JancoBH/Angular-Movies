import {SharedModule} from '../../shared/shared.module';
import {MoviesComponent} from './movies.component';
import {NgModule} from '@angular/core';
import {MoviesRoutesModule} from './movies.routes.module';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    SharedModule,
    MoviesRoutesModule,
    DragDropModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  declarations: [
    MoviesComponent,
    MovieDetailComponent
  ],
  providers: []
})

export class MoviesModule {}
