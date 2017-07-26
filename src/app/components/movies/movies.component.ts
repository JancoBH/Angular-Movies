import { Component} from '@angular/core';

import { MoviesService } from '../../services/movies.service'
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
  nowPlaying: any;
  popularList: PopularMovies;
  upcomingList: UpcommingMovies;
  topRatedList: TopRatedMovies;
  searchRes: SearchMovies;
  searchStr: string;
  isLoading = true;

  constructor(private moviesService: MoviesService) {
    this.moviesService.getNowPlaying().subscribe( res => {
      this.nowPlaying = res;
      this.isLoading = false;
    });

    this.moviesService.getPopular().subscribe(res => {
      this.popularList = res;
      this.isLoading = false;
    });

    this.moviesService.getUpComingMovies().subscribe(res => {
      this.upcomingList = res;
    });

    this.moviesService.getTopRatedMovies().subscribe(res => {
      this.topRatedList = res;
    });
  }

  searchMovies() {
    this.moviesService.searchMovies(this.searchStr).subscribe( res => {
      this.searchRes = res;
    });
  }

}
