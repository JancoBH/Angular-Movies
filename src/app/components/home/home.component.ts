import {AfterViewInit, Component, OnInit} from '@angular/core';

import { MoviesService } from '../../services/inTheater/movies.service'
import {PaginatorModel} from '../../models/paginator.model';
import {OnTVService} from '../../services/onTV/onTV.service';
import {SeoService} from '../../services/seo.service';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import {take} from 'rxjs/operators';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      1279: {
        slidesPerView: 5.5,
        spaceBetween: 20,
      },
      959: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
      599: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
      480: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1.5,
        spaceBetween: 10
      },
    }
  };

  movieTabList = ['Now playing', 'Upcoming', 'Popular'];
  moviesList: Array<PaginatorModel> = [];
  selectedMovieTab = 0;

  tvShowsTabList = ['Airing Today', 'Currently Airing', 'Popular'];
  tvShowsList: Array<PaginatorModel> = [];
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
      image: 'https://angular-movies-c91ba.firebaseapp.com/assets/background-main.jpg'
    });


    this.getTVShows('airing_today', 1);
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.getMovies('now_playing', 1);
    }, 500);
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
    this.moviesList = [];
    this.moviesService.getMovies(type, page).pipe(take(1)).subscribe(res => {
      this.moviesList = res.results;
    });
  }

  getTVShows(type: string, page: number): void {
    this.tvShowsList = [];
    this.onTvService.getTVShows(type, page).subscribe(res => {
      this.tvShowsList = res.results;
    });
  }

  onSwiper(swiper) {
    swiper.update();
  }
  onSlideChange() {
    // console.log('slide change');
  }

}
