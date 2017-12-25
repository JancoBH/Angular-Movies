import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../../services/inTheater/movies.service'
import {PaginatorModel} from '../../../models/paginator.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  title: string;
  movies: Array<PaginatorModel> = [];

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
        this.movies.forEach(np => np['isMovie'] = true);
      }, error => console.log(error));
    });
  }

}
