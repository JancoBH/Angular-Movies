import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TvModel} from '../../models/tv.model';
import {OnTVService} from '../../services/onTV.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.scss']
})
export class TvShowDetailComponent implements OnInit, OnDestroy {

  tvShow: TvModel = new TvModel();
  isLoading = true;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private onTvService: OnTVService,
    private router: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['url'];
      this.getTVShowData(id);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getTVShowData(id: string): void {
    this.isLoading = true;

    this.onTvService.getTVShow(id).pipe(take(1)).subscribe( tvShow => {
      this.tvShow = tvShow;
      this.isLoading = false;
    });
  }

}
