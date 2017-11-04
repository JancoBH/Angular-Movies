import { Component, Input } from '@angular/core';
import {Movie} from '../../models/movie';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() public movie: Movie;

  constructor () {}

}
