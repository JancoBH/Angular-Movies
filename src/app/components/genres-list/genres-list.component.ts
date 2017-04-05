import { Component } from '@angular/core';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent{

  genres: Array<Object>;

  constructor(private _moviesServices: MoviesService) {
    this._moviesServices.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );
  }
}
