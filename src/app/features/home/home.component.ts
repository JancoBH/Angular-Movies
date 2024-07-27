import {Component, OnInit} from '@angular/core';
import { MoviesService } from '../content/services/movies.service'
import {OnTVService} from '../content/services/onTV.service';
import {SeoService} from '../../core/services/seo.service';
import {take} from 'rxjs/operators';
import {MovieModel} from '../content/models/movie.model';
import {TvModel} from '../content/models/tv.model';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MovieCardComponent} from "../../shared/components/poster-card-view/poster-card.component";
import {RouterLink} from "@angular/router";
import {SlicePipe} from "@angular/common";
import {SwiperOptions} from "swiper/types";
import {SwiperDirective} from "../../shared/directives/swiper.directive";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MovieCardComponent,
    RouterLink,
    SwiperDirective,
    SlicePipe,
    MatTabGroup,
    MatTab,
    MatIcon
  ],
  standalone: true
})

export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    watchSlidesProgress: true,
    breakpoints: {
      992: {slidesPerView: 6.3, spaceBetween: 20, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      768: {slidesPerView: 4.3, spaceBetween: 15, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      576: {slidesPerView: 3.3, spaceBetween: 15, slidesOffsetBefore: 0, slidesOffsetAfter: 0},
      320: {slidesPerView: 2.3, spaceBetween: 10, slidesOffsetBefore: 10, slidesOffsetAfter: 10},
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
      image: 'https://jancobh.github.io/Angular-Movies/background-main.webp'
    });

    this.getMovies('now_playing', 1);
    this.getTVShows('airing_today', 1);
  }

  getMovies(type: string, page: number): void {
    this.moviesService.getMovies(type, page).pipe(take(1)).subscribe(res => {
      this.moviesList = res.results;
    });
  }

  tabMovieChange({ index }: { index: number; }) {
    this.selectedMovieTab = index;
    const movieTypes = ['now_playing', 'upcoming', 'popular'];
    const selectedType = movieTypes[index];
    if (selectedType) {
      this.getMovies(selectedType, 1);
    }
  }

  getTVShows(type: string, page: number): void {
    this.onTvService.getTVShows(type, page).subscribe(res => {
      this.tvShowsList = res.results;
    });
  }

  tabTVChange({ index }: { index: number; }) {
    this.selectedTVTab = index;
    const tvShowTypes = ['airing_today', 'on_the_air', 'popular'];
    const selectedType = tvShowTypes[index];
    if (selectedType) {
      this.getTVShows(selectedType, 1);
    }
  }

}
