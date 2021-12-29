import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../../services/inTheater/movies.service'
import {PaginationModel} from '../../../models/pagination.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  title: string;
  movies: Array<PaginationModel> = [];

  constructor(
    private _moviesService: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['id'];
      this.title = params['name'];
      this.getMoviesByGenre(id);
    });
  }

  getMoviesByGenre(id) {
    const moviesByGenreSubs = this._moviesService.getMoviesByGenre(id).subscribe(
      res => {
        this.movies = res.results;
        this.movies.forEach(np => np['isMovie'] = true);
      }, error => console.log(error),
      () => { if (moviesByGenreSubs) { moviesByGenreSubs.unsubscribe(); } }
    );
  }

}
