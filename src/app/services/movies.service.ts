import { Injectable } from '@angular/core';
import {Http, Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

const search = new URLSearchParams();

@Injectable()
export class MoviesService {

  apiKey: string;

  constructor(private _jsonp: Jsonp) {
    this.apiKey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
  }

  getNowPlaying(): Observable<any> {
    search.set('region', 'US');
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/now_playing?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      });
  }

  searchMovies(searchStr: string) {
    search.set('sort_by', 'popularity.desc');
    search.set('query', searchStr);
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      });
  }

  getPopular(): Observable<any> {
    search.set('sort_by', 'popularity.desc');
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      });
  }

  getUpComingMovies() {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/upcoming?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }

  getTopRatedMovies() {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/top_rated?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }

  getGenres() {
    search.set('language', 'en_US');
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
                        .map(res => {
                          return res.json();
                        });
  }

  getMoviesByGenre(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/genre/' + id + '/movies?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      });
  }

  getMovie(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      });
  }

  getMovieReviews(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/reviews?callback=JSONP_CALLBACK', {search})
      .map( res => {
        return res.json();
      });
  }

  getMovieCredits(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/credits?callback=JSONP_CALLBACK', {search})
      .map( res => {
        return res.json();
      });
  }

  getMovieVideos(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/videos?callback=JSONP_CALLBACK', {search})
      .map( res => {
        return res.json();
      });
  }

  getSimilarMovies(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '/similar?callback=JSONP_CALLBACK', {search})
      .map ( res => {
        return res.json();
      });
  }

  getPersonDetail(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/person/' + id + '?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }

  getPersonCast(id: string) {
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/person/' + id + '/movie_credits?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      })
  }

}
