import {Component, OnInit} from '@angular/core';

import { MoviesService } from '../../services/inTheater/movies.service'
import {PaginatorModel} from '../../models/paginator.model';
import {OnTVService} from '../../services/onTV/onTV.service';
import {SeoService} from '../../services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  nowPlaying: Array<PaginatorModel> = [];
  popularList: Array<PaginatorModel> = [];
  upcomingList: Array<PaginatorModel> = [];
  topRatedList: Array<PaginatorModel> = [];

  onTheAir: Array<PaginatorModel> = [];
  airingToday: Array<PaginatorModel> = [];
  popularTvShows: Array<PaginatorModel> = [];

  constructor(
    private moviesService: MoviesService,
    private onTvService: OnTVService,
    private seo: SeoService
  ) {

    this.moviesService.getUpComingMovies(1).subscribe(res => {
      this.upcomingList = res.results.filter(up => new Date(up.release_date).getTime() >= new Date().getTime());
      this.upcomingList.forEach(np => np['isMovie'] = true);
    });

    this.moviesService.getTopRatedMovies().subscribe(res => {
      this.topRatedList = res.results;
    });
  }

  ngOnInit() {

    this.seo.generateTags({
      title: 'Angular Movies and Series',
      description: 'Movie and Series Home Page',
      image: 'https://angular-movies-c91ba.firebaseapp.com/assets/background-main.jpg'
    });

    this.getNowPlayinMovies(1);
    this.getPopularMovies(1);

    //  On TV
    this.getTvOnTheAir(1);
    this.getAiringToday(1);
    this.getPopularTvShow(1);
  }

  getNowPlayinMovies(page: number) {
    this.moviesService.getNowPlaying(page).subscribe( res => {
      this.nowPlaying = res.results;
      this.nowPlaying.forEach(np => np['isMovie'] = true);
    });
  }

  getPopularMovies(page: number) {
    this.moviesService.getPopular(page).subscribe(res => {
      this.popularList = res.results;
      this.popularList.forEach(np => np['isMovie'] = true);
    });
  }

  //  On TV

  getTvOnTheAir(page: number) {
    this.onTvService.getTvOnTheAir(page).subscribe(
      res => {
        this.onTheAir = res.results;
        this.onTheAir.forEach(np => np['isMovie'] = false);
      },
      error => console.log(error)
    );
  }

  getAiringToday(page: number) {
    this.onTvService.getTVAiringToday(page).subscribe(
      res => {
        this.airingToday = res.results;
        this.airingToday.forEach(np => np['isMovie'] = false);
      },
      error => console.log(error)
    );
  }

  getPopularTvShow(page: number) {
    this.onTvService.getPopularTVShow(page).subscribe(
      res => {
        this.popularTvShows = res.results;
        this.popularTvShows.forEach(np => np['isMovie'] = false);
      },
      error => console.log(error)
    );
  }
}
