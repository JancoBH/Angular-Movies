import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../../services/inTheater/movies.service';
import {PaginatorModel} from '../../../models/paginator.model';
import {GenresListModel} from "../../../models/genres-list";

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {

  nowPlaying: Array<PaginatorModel> = [];
  genres: GenresListModel;
  max = 10;
  min = 0;
  step = 1;
  value = 0;
  thumbLabel = true;
  tickInterval = 10;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.getNowPlayinMovies(1);
    this.moviesService.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );
  }

  getNowPlayinMovies(page: number) {
    this.moviesService.getNowPlaying(page).subscribe( res => {
      this.nowPlaying = res.results;
      this.nowPlaying.forEach(np => np['isMovie'] = true);
    });
  }

}
