import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../services/inTheater/movies.service';
import {MovieModel} from '../../../models/movie.model';
import {MovieCast} from '../../../models/movie-cast';
import {MovieVideo} from '../../../models/movie-video';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
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
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private seo: SeoService
  ) {}

  ngOnInit() {

    this.seo.generateTags({
      title: 'Movie Page',
      description: 'Movie Page for Angular Movies',
      image: 'https://image.tmdb.org/t/p/w1920/5wNUJs23rT5rTBacNyf5h83AynM.jpg',
      slug: 'movie'
    });

    this.router.params.subscribe( (params) => {
      const id = params['id'];

      this._moviesService.getMovie(id).subscribe( movie => {
        this.movie = movie;

        if (!this.movie) {
          alert('Server Error')
        } else {
          this.isLoading = false;
        }
      });

      this._moviesService.getMovieCredits(id).subscribe( res => {
        res.cast = res.cast.filter( item => { return item.profile_path });
        this.cast = res.cast.slice(0, 5);
      });

      this._moviesService.getMovieVideos(id).subscribe( res => {
        if (res.results && res.results.length) {
          this.video = res.results[0];
          this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.video['key']);
        }
      });

      this._moviesService.getRecomendMovies(id).subscribe(res => {
        this.similarMovies = res.results.slice(0, 8);
        this.similarMovies.forEach(np => np['isMovie'] = true);
      });

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
