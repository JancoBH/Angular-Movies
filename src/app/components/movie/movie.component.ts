import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import {Movie} from '../../models/movie';
import {MovieReviews} from '../../models/movie-reviews';
import {MovieCast} from '../../models/movie-cast';
import {MovieVideo} from '../../models/movie-video';
import {SimilarMovies} from '../../models/similar-movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {

  movie: Movie;
  reviews: MovieReviews;
  similarMovies: SimilarMovies;
  cast: MovieCast;
  video: MovieVideo;
  isLoading = true;

  @ViewChild('closeModal') public  closeModal: ElementRef;
  @ViewChild('openModal') public  openModal: ElementRef;

  constructor(
    private _moviesService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {

    const modal = document.getElementById('myModal');
    this.openModal.nativeElement.onclick = () => {
      modal.style.display = 'block';
    };

    this.closeModal.nativeElement.onclick = () => {
      modal.style.display = 'none';
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

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

      this._moviesService.getMovieReviews(id).subscribe( res => {
        this.reviews = res;
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

      this._moviesService.getSimilarMovies(id).subscribe( res => {
        this.similarMovies = res.results.slice(0, 10);
      });

    });
  }

  ngAfterViewInit() {

  }

}
