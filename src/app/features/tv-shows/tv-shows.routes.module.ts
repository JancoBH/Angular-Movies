import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TvShowsComponent} from './tv-shows.component';
import {TvShowDetailComponent} from './pages/tv-show-detail/tv-show-detail.component';

const tvShowsRoutes: Routes = [
  {path: '',
    children: [
      { path: '', component: TvShowsComponent},
      { path: 'detail/:url', component: TvShowDetailComponent}
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(tvShowsRoutes)
  ],
  exports: [RouterModule]
})

export class TvShowsRoutesModule {}
