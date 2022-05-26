import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MovieModel} from '../../models/movie.model';
import {PaginationModel} from '../../../../core/models/pagination.model';
import {MovieVideo} from '../../models/movie-video';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import {SeoService} from '../../../../core/services/seo.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movie: MovieModel = new MovieModel();
  recomendedMovieList: Array<PaginationModel> = [];
  cast = [];
  video: MovieVideo;
  isLoading = true;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('closeModal') public  closeModal: ElementRef;
  @ViewChild('openModal') public  openModal: ElementRef;

  @ViewChild('matTrailerDialog') matTrailerDialog: TemplateRef<any>;

  constructor(
    private _moviesService: MoviesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private seo: SeoService,
    public trailerDialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params['url'];
        this.getMovie(id);
        this.getMovieCredits(id);
        this.getMovieVideo(id);
        this.getRecomendedMovie(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getMovie(id) {
    this.isLoading = true;

    this._moviesService.getMovie(id).pipe(take(1)).subscribe(
      movie => {
        this.movie = movie;
        this.generateSeo();
      }, () => {},
      () => this.isLoading = false
    );
  }

  getMovieCredits(id) {
    this._moviesService.getMovieCredits(id).pipe(take(1)).subscribe(
      res => {
        res.cast = res.cast.filter( item => { return item.profile_path });
        this.cast = res.cast.slice(0, 5);
      }, () => {}
    );
  }

  getMovieVideo(id) {
    this._moviesService.getMovieVideos(id).pipe(take(1)).subscribe(
      res => {
        if (res?.results?.length > 0) {
          this.video = res.results[0];
          this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video['key']);
        } else {
          this.video = null;
        }
      }, () => {}
    );
  }

  getRecomendedMovie(id) {
    this._moviesService.getRecomendMovies(id).pipe(take(1)).subscribe(
      res => {
        this.recomendedMovieList = res.results.slice(0, 12);
      }, () => {}
    );
  }

  // Seo tags
  generateSeo() {
    this.seo.generateTags({
      title: `${this.movie.title}`,
      description: `${this.movie.overview}`,
      image: `https://image.tmdb.org/t/p/w780/${this.movie.backdrop_path}`,
      slug: 'movie'
    });
  }

  openDialog(): void {
    const dialogRef = this.trailerDialog.open(this.matTrailerDialog, {});
    dialogRef.disableClose = false;
  }

}
