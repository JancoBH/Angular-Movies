import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {DetailComponent} from './pages/detail/detail.component';

const contentRoutes: Routes = [
  {path: '',
    children: [
      { path: '', component: ContentComponent},
      { path: ':url', component: DetailComponent}
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(contentRoutes)
  ],
  exports: [RouterModule]
})

export class ContentRoutesModule {}
