import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PeopleComponent} from './people.component';
import {PersonComponent} from './person/person.component';

const personRoutes: Routes = [
  {path: '',
    children: [
      { path: '', component: PeopleComponent},
      { path: 'person/:id', component: PersonComponent},
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(personRoutes)
  ],
  exports: [RouterModule]
})

export class PeopleRoutesModule {}
