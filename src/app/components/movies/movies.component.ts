import { Component} from '@angular/core';

import { MoviesService } from '../../movies.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  popularList: Array<Object>;
  upcomingList: Array<Object>;
  topRatedList: Array<Object>;
  searchRes: Array<Object>;
  searchStr: string;

  constructor(private _moviesService: MoviesService) {
    this._moviesService.getPopular().subscribe(res => {
      this.popularList = res.results;
    });
    this._moviesService.getUpComingMovies().subscribe(res => {
      this.upcomingList = res.results;
    });
    this._moviesService.getTopRatedMovies().subscribe(res => {
      this.topRatedList = res.results;
    });
  }

  searchMovies(){
    this._moviesService.searchMovies(this.searchStr).subscribe( res => {
      this.searchRes = res.results;
    });
  }

}
