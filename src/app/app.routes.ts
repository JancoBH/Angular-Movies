import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)},
  {path: '404', loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent)},
  {path: 'movies', loadChildren: () => import('./features/content/content.routes').then(m => m.CONTENT_ROUTES)},
  {path: 'tv-shows', loadChildren: () => import('./features/content/content.routes').then(m => m.CONTENT_ROUTES)},
  {path: '**', redirectTo: '404'}
];
