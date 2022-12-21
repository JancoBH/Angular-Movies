import {SharedModule} from '../../shared/shared.module';
import {ContentComponent} from './content.component';
import {NgModule} from '@angular/core';
import {ContentRoutesModule} from './content.routes.module';
import {DetailComponent} from './pages/detail/detail.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  imports: [
    SharedModule,
    ContentRoutesModule,
    MatPaginatorModule,
    MatProgressBarModule,
    DetailComponent
  ],
  declarations: [
    ContentComponent
  ],
  providers: []
})

export class ContentModule {}
