import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../core/models/pagination.model';
import {GenresListModel} from '../../core/models/genres-list';
import {MoviesService} from './services/movies.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  nowPlaying: Array<PaginationModel> = [];
  genres: GenresListModel;

  totalResults: any;

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.getNowPlayinMovies(1);
    this.moviesService.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );
  }

  getNowPlayinMovies(page: number) {
    this.moviesService.getNowPlaying(page).pipe(take(1)).subscribe(
      res => {
        this.totalResults = res.total_results;
        this.nowPlaying = res.results;
      }, () => {}
    );
  }

  changePage(event) {
    this.getNowPlayinMovies(event.pageIndex + 1);
  }

}
