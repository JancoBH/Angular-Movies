import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import {GenresList} from "../../models/genres-list";

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent{

  genres: GenresList;

  constructor(private _moviesServices: MoviesService) {
    this._moviesServices.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );
  }
}
