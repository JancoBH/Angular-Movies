import { Component, Input } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ImgMissingDirective} from "../../directives/img-missing.directive";
import {DatePipe, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.scss'],
  imports: [
    RouterLink,
    ImgMissingDirective,
    DatePipe,
    NgIf,
    NgOptimizedImage
  ],
  standalone: true
})
export class MovieCardComponent {

  @Input() model: any;
  @Input() isMovie: boolean;

  constructor () {}
}
