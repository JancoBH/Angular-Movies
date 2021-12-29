import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationModel} from '../../models/pagination.model';
import {GenresListModel} from '../../models/genres-list';
import {OnTVService} from '../../services/onTV/onTV.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit, OnDestroy {

  onTheAir: Array<PaginationModel> = [];
  genres: GenresListModel;
  totalResults: any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private onTvService: OnTVService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getTvOnTheAir(1);
    this.onTvService.getGenres().subscribe( res => this.genres = res.genres);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getTvOnTheAir(page: number) {
    this.onTvService.getTvOnTheAir(page).pipe(take(1)).subscribe(
      res => {
        this.totalResults = res.total_results;
        this.onTheAir = res.results;
      }, error => console.log(error)
    );
  }

  changePage(event) {
    this.getTvOnTheAir(event.pageIndex + 1);
  }

}
