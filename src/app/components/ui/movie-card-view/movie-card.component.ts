import { Component, Input } from '@angular/core';
import {MovieModel} from '../../../models/movie.model';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() public movie: MovieModel;

  constructor () {}

}
