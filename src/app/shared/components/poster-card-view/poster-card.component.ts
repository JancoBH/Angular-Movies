import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ImgMissingDirective } from "../../directives/img-missing.directive";
import { DatePipe, DecimalPipe, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ImgMissingDirective,
    DatePipe,
    DecimalPipe,
    NgOptimizedImage
  ]
})
export class MovieCardComponent {
  @Input() model: any;
  @Input() isMovie = false;

  constructor() {}
}
