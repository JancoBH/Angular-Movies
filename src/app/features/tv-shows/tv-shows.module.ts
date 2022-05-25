import {SharedModule} from '../../shared/shared.module';
import {NgModule} from '@angular/core';
import {TvShowsRoutesModule} from './tv-shows.routes.module';
import {TvShowsComponent} from './tv-shows.component';
import {TvShowDetailComponent} from './pages/tv-show-detail/tv-show-detail.component';

@NgModule({
  imports: [
    SharedModule,
    TvShowsRoutesModule,
  ],
  declarations: [
    TvShowsComponent,
    TvShowDetailComponent
  ],
  providers: []
})

export class TvShowsModule {}
