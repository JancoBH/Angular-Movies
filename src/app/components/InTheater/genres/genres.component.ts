import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../../services/movies.service'
import {MovieModel} from '../../../models/movie.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  title: string;
  movies: MovieModel;

  constructor(
    private _moviesService: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['id'];
      this.title = params['name'];
      this._moviesService.getMoviesByGenre(id).subscribe( res => {
        this.movies = res.results;
      });
    });
  }

}
