import { Component} from '@angular/core';

import { MoviesService } from '../../movies.service'
import {PopularMovies} from '../../models/popular-movies';
import {UpcommingMovies} from '../../models/upcomming-movies';
import {TopRatedMovies} from '../../models/top-rated-movies';
import {SearchMovies} from '../../models/search-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  popularList: PopularMovies;
  upcomingList: UpcommingMovies;
  topRatedList: TopRatedMovies;
  searchRes: SearchMovies;
  searchStr: string;
  isLoading = true;

  constructor(private _moviesService: MoviesService) {
    this._moviesService.getPopular().subscribe(res => {
      this.popularList = res;
      this.isLoading = false;
    });
    this._moviesService.getUpComingMovies().subscribe(res => {
      this.upcomingList = res;
    });
    this._moviesService.getTopRatedMovies().subscribe(res => {
      this.topRatedList = res;
    });
  }

  searchMovies() {
    this._moviesService.searchMovies(this.searchStr).subscribe( res => {
      this.searchRes = res;
    });
  }

}
