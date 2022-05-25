import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {PeopleComponent} from './people.component';
import {PeopleRoutesModule} from './people.routes.module';
import {PersonComponent} from './person/person.component';

@NgModule({
  imports: [
    SharedModule,
    PeopleRoutesModule,
  ],
  declarations: [
    PeopleComponent,
    PersonComponent
  ],
  providers: []
})

export class PeopleModule {}
