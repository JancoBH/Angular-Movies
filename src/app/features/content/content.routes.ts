import {Route} from '@angular/router';
import {ContentComponent} from './content.component';
import {DetailComponent} from './pages/detail/detail.component';

export const CONTENT_ROUTES: Route[] = [
  {path: '',
    children: [
      { path: '', component: ContentComponent},
      { path: ':url', component: DetailComponent}
    ]},
];

