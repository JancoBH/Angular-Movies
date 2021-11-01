import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/ui/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '404', component: NotFoundComponent, pathMatch: 'full'},
  {path: 'movies', loadChildren: () => import('./components/movies/movies.module').then(m => m.MoviesModule)},
  {path: 'tv-shows', loadChildren: () => import('./components/tv-shows/tv-shows.module').then(m => m.TvShowsModule)},
  {path: 'people', loadChildren: () => import('./components/people/people.module').then(m => m.PeopleModule)},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
