import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';
import {TvShowsRoutesModule} from './tv-shows.routes.module';
import {TvShowsComponent} from './tv-shows.component';
import {TvShowDetailComponent} from './pages/tv-show-detail/tv-show-detail.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    SharedModule,
    TvShowsRoutesModule,
    DragDropModule,
    MatPaginatorModule,
    MatExpansionModule,
  ],
  declarations: [
    TvShowsComponent,
    TvShowDetailComponent
  ],
  providers: []
})

export class TvShowsModule {}
