import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.scss']
})
export class MovieCardComponent {

  @Input() public model: any;
  @Input() public isMovie: boolean;

  constructor () {}
}
