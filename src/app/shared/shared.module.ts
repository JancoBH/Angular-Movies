import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {CustomMaterialModule} from './custom-material.module';
import {SwiperModule} from 'swiper/angular';
import {MovieCardComponent} from '../components/ui/poster-card-view/poster-card.component';
import {ImgMissingDirective} from '../directives/img-missing.directive';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SwiperModule,
    MovieCardComponent,
    ImgMissingDirective
  ],
  declarations: [
    MovieCardComponent,
    ImgMissingDirective
  ]
})
export class SharedModule { }
