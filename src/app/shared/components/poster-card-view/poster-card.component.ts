import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.scss']
})
export class MovieCardComponent {

  @Input() model: any;
  @Input() isMovie: boolean;

  constructor () {}
}
