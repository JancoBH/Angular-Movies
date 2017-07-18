import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: Object;
  reviews: Array<Object>;
  similarMovies: Array<Object>;
  cast: Array<Object>;
  video: Object;
  loading: boolean;

  constructor(
    private _moviesService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
      this.loading = true;
    }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['id'];

      this._moviesService.getMovie(id).subscribe( movie => {
        this.movie = movie;

        if (!this.movie) {
          alert('Server Error')
        } else {
          this.loading = false;
        }
      });

      this._moviesService.getMovieReviews(id).subscribe( res => {
        this.reviews = res.results;
      });

      this._moviesService.getMovieCredits(id).subscribe( res => {
        res.cast = res.cast.filter( item => { return item.profile_path });
        this.cast = res.cast.slice(0, 4);
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

}
