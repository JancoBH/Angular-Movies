import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MoviesService} from '../../services/inTheater/movies.service';
import {MovieModel} from '../../models/movie.model';
import {Actors} from '../../models/actors';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  person: Actors = new Actors();
  movies: MovieModel = new MovieModel();
  externalIds: Object = {};

  constructor(
    private _moviesSerice: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this._moviesSerice.getPersonDetail(id).subscribe(person => {
        this.person = person;
        console.log(person);
      }, error => console.log(error));
      this._moviesSerice.getPersonCast(id).subscribe(res => {
        this.movies = res.cast;
        console.log(this.movies);
      }, error => console.log(error));

      this._moviesSerice.getPersonExternalData(id).subscribe(res => {
        this.externalIds = res;
      }, error => console.log(error));
    });
  }

}
