import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {PaginatorModel} from '../../../models/paginator.model';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {

  nowPlaying: Array<PaginatorModel> = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getNowPlayinMovies(1);
  }

  getNowPlayinMovies(page: number) {
    this.moviesService.getNowPlaying(page).subscribe( res => {
      this.nowPlaying = res.results;
    });
  }

}
