import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../../movies.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularList: Array<Object>;

  constructor(private _moviesService: MoviesService) {
    this._moviesService.getPopular().subscribe(res => {
      this.popularList = res.results;
      console.log(this.popularList);
    });
  }

  ngOnInit() {
  }

}
