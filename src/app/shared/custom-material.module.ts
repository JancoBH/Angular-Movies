import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  imports: [
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
  ],
})
export class CustomMaterialModule { }
