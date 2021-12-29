import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationModel} from '../../models/pagination.model';
import {GenresListModel} from '../../models/genres-list';
import {MoviesService} from '../../services/inTheater/movies.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  nowPlaying: Array<PaginationModel> = [];
  genres: GenresListModel;

  totalResults: any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private moviesService: MoviesService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getNowPlayinMovies(1);
    this.moviesService.getGenres().subscribe( res => {
        this.genres = res.genres;
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
