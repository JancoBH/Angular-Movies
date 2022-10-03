import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
  ],
})
export class CustomMaterialModule { }
