import {Component, OnInit} from '@angular/core';

import { MoviesService } from '../movies/services/movies.service'
import {OnTVService} from '../tv-shows/services/onTV.service';
import {SeoService} from '../../core/services/seo.service';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import {take} from 'rxjs/operators';
import {MovieModel} from '../movies/models/movie.model';
import {TvModel} from '../tv-shows/models/tv.model';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 2.3,
    spaceBetween: 20,
    navigation: true,
    watchSlidesProgress: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      1279: {slidesPerView: 6.3, spaceBetween: 20},
      959: {slidesPerView: 5.3, spaceBetween: 20},
      600: {slidesPerView: 4.3, spaceBetween: 20},
      480: {slidesPerView: 2.3, spaceBetween: 10},
    }
  };

  movieTabList = ['Now playing', 'Upcoming', 'Popular'];
  moviesList: Array<MovieModel> = [];
  selectedMovieTab = 0;

  tvShowsTabList = ['Airing Today', 'Currently Airing', 'Popular'];
  tvShowsList: Array<TvModel> = [];
  selectedTVTab = 0;

  constructor(
    private moviesService: MoviesService,
    private onTvService: OnTVService,
    private seo: SeoService
  ) {}

  ngOnInit() {

    this.seo.generateTags({
      title: 'Angular Movies and Series',
      description: 'Movie and Series Home Page',
      image: 'https://jancobh.github.io/Angular-Movies/background-main.jpg'
    });

    this.getMovies('now_playing', 1);
    this.getTVShows('airing_today', 1);
  }

  tabChange(event) {
    this.selectedMovieTab = event.index;
    if (event.index === 0) {
      this.getMovies('now_playing', 1);
    } else if (event.index === 1) {
      this.getMovies('upcoming', 1);
    } else if (event.index === 2) {
      this.getMovies('popular', 1);
    }
  }

  tabTVChange(event) {
    this.selectedTVTab = event.index;
    if (event.index === 0) {
      this.getTVShows('airing_today', 1);
    } else if (event.index === 1) {
      this.getTVShows('on_the_air', 1);
    } else if (event.index === 2) {
      this.getTVShows('popular', 1);
    }
  }

  getMovies(type: string, page: number): void {
    this.moviesService.getMovies(type, page).pipe(take(1)).subscribe(res => {
      this.moviesList = res.results;
    });
  }

  getTVShows(type: string, page: number): void {
    this.onTvService.getTVShows(type, page).subscribe(res => {
      this.tvShowsList = res.results;
    });
  }

}
