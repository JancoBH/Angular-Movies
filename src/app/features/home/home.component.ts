import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed, HostListener } from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MovieCardComponent,
        RouterLink,
        SwiperDirective,
        SlicePipe,
        MatTabGroup,
        MatTab,
        MatIcon
    ]
})

export class HomeComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private onTvService = inject(OnTVService);
  private seo = inject(SeoService);

  windowWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1200);

  @HostListener('window:resize')
  onResize() {
    this.windowWidth.set(window.innerWidth);
  }

  slidesOffsetAfter = computed(() => {
    const width = this.windowWidth();
    if (width <= 576) {
      return 15;
    } else if (width <= 768) {
      return Math.max(15, (width - 720) / 2 + 15);
    } else if (width <= 992) {
      return Math.max(15, (width - 960) / 2 + 15);
    } else {
      return Math.max(15, (width - 1140) / 2 + 15);
    }
  });

  slidesOffsetBefore = computed(() => this.slidesOffsetAfter());
  isMobile = computed(() => this.windowWidth() < 576);


  config: SwiperOptions = {
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      1200: {slidesPerView: 6.3, spaceBetween: 20},
      992: {slidesPerView: 5.3, spaceBetween: 20},
      768: {slidesPerView: 4.3, spaceBetween: 15},
      576: {slidesPerView: 3.3, spaceBetween: 15},
      320: {slidesPerView: 2.3, spaceBetween: 10},
    }
  };

  movieTabList = ['Now playing', 'Upcoming', 'Popular'];
  moviesData = signal<Record<string, Array<MovieModel>>>({
    now_playing: [],
    upcoming: [],
    popular: []
  });
  selectedMovieTab = signal(0);

  tvShowsTabList = ['Airing Today', 'Currently Airing', 'Popular'];
  tvShowsData = signal<Record<string, Array<TvModel>>>({
    airing_today: [],
    on_the_air: [],
    popular: []
  });
  selectedTVTab = signal(0);

  ngOnInit() {
    this.seo.generateTags({
      title: 'Angular Movies and Series',
      description: 'Movie and Series Home Page',
      image: 'https://jancobh.github.io/Angular-Movies/background-main.webp'
    });

    this.loadMovieTab('now_playing');
    this.loadTVTab('airing_today');
  }

  loadMovieTab(type: string): void {
    if (this.moviesData()[type].length > 0) return;
    this.moviesService.getMovies(type, 1).pipe(take(1)).subscribe(res => {
      this.moviesData.update(prev => ({ ...prev, [type]: res.results }));
    });
  }

  tabMovieChange({ index }: { index: number; }) {
    this.selectedMovieTab.set(index);
    const movieTypes = ['now_playing', 'upcoming', 'popular'];
    const selectedType = movieTypes[index];
    if (selectedType) {
      this.loadMovieTab(selectedType);
    }
  }

  loadTVTab(type: string): void {
    if (this.tvShowsData()[type].length > 0) return;
    this.onTvService.getTVShows(type, 1).pipe(take(1)).subscribe(res => {
      this.tvShowsData.update(prev => ({ ...prev, [type]: res.results }));
    });
  }

  tabTVChange({ index }: { index: number; }) {
    this.selectedTVTab.set(index);
    const tvShowTypes = ['airing_today', 'on_the_air', 'popular'];
    const selectedType = tvShowTypes[index];
    if (selectedType) {
      this.loadTVTab(selectedType);
    }
  }

}
