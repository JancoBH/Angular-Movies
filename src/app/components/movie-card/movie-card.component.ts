import { Component, Input } from '@angular/core';
import {Movie} from '../../models/movie';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  constructor (){}

  @Input() public movie: Movie;

}
