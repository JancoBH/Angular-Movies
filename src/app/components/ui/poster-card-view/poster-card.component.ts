import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poster-card',
  templateUrl: './poster-card.component.html',
  styleUrls: ['./poster-card.component.css']
})
export class MovieCardComponent {

  @Input() public model: any;

  constructor () {}

}
