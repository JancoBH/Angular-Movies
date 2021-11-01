import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import { MoviesService } from '../../../services/inTheater/movies.service';
import {MovieModel} from '../../../models/movie.model';
import {MovieCast} from '../../../models/movie-cast';
import {MovieVideo} from '../../../models/movie-video';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {PaginatorModel} from '../../../models/paginator.model';
import {SeoService} from '../../../services/seo.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: MovieModel;
  similarMovies: Array<PaginatorModel> = [];
  cast: MovieCast;
  video: MovieVideo;
  isLoading = true;

  @ViewChild('closeModal') public  closeModal: ElementRef;
  @ViewChild('openModal') public  openModal: ElementRef;

  constructor(
    private _moviesService: MoviesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
        this.getMovie(id);
        this.getMovieCredits(id);
        this.getMovieVideo(id);
        this.getRecomendedMovie(id);
      }
    );
  }

  getMovie(id) {
    const movieSubs = this._moviesService.getMovie(id).subscribe(
      movie => {
        this.movie = movie;
        this.generateSeo();

        if (!this.movie) {
          alert('Server Error')
        } else {
          this.isLoading = false;
        }
      }, () => {},
      () => { if (movieSubs) { movieSubs.unsubscribe() } }
    );
  }

  getMovieCredits(id) {
    const movieCreditsSubs = this._moviesService.getMovieCredits(id).subscribe(
      res => {
        // console.log(res);
        res.cast = res.cast.filter( item => { return item.profile_path });
        this.cast = res.cast.slice(0, 5);
      }, () => {},
      () => { if (movieCreditsSubs) { movieCreditsSubs.unsubscribe() } }
    );
  }

  getMovieVideo(id) {
    const movieVideosSubs = this._moviesService.getMovieVideos(id).subscribe(
      res => {
        if (res.results && res.results.length) {
          this.video = res.results[0];
          this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video['key']);
        }
      }, () => {},
      () => { if (movieVideosSubs) { movieVideosSubs.unsubscribe() } }
    );
  }

  getRecomendedMovie(id) {
    const recomendedMoviesSubs = this._moviesService.getRecomendMovies(id).subscribe(
      res => {
        this.similarMovies = res.results.slice(0, 8);
        this.similarMovies.forEach(np => np['isMovie'] = true);
      }, () => {},
      () => { if (recomendedMoviesSubs) { recomendedMoviesSubs.unsubscribe() } }
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
    this.dialog.open(AppMovieDialogComponent, {
      height: '500px',
      width: '800px',
      data: { video: this.video}
    });
  }

}

@Component({
  selector: 'app-movie-dialog',
  templateUrl: 'app-movie-dialog.html'
})
export class AppMovieDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AppMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
