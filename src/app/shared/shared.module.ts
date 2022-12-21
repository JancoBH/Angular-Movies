import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CustomMaterialModule} from './custom-material.module';
import {MovieCardComponent} from './components/poster-card-view/poster-card.component';
import {ImgMissingDirective} from './directives/img-missing.directive';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    CustomMaterialModule,
    MovieCardComponent,
    ImgMissingDirective
  ],
  declarations: [
    MovieCardComponent,
    ImgMissingDirective
  ]
})
export class SharedModule { }
