import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

let search = new URLSearchParams();

@Injectable()
export class MoviesService {

  apiKey: string;

  constructor(private _jsonp: Jsonp) {
    this.apiKey = 'fed69657ba4cc6e1078d2a6a95f51c8c';
  }

  getPopular(){
    search.set('sort_by','popularity.desc');
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK', {search})
                        .map(res => {
                          return res.json();
                        });
  }

  getGenres() {
    search.set('language', 'en_US');
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
                        .map(res => {
                          return res.json();
                        });
  }

  getMoviesByGenre(id: string){
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/genre/'+ id +'/movies?callback=JSONP_CALLBACK', {search})
                        .map(res => {
                          return res.json();
                        });
  }

  getMovie(id: string){
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '?callback=JSONP_CALLBACK', {search})
      .map(res => {
        return res.json();
      });
  }

  getMovieReviews(id: string){
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/reviews?callback=JSONP_CALLBACK', {search})
                        .map( res => {
                          return res.json();
                        });
  }

  getMovieCredits(id: string){
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/credits?callback=JSONP_CALLBACK', {search})
                        .map( res => {
                          return res.json();
                        });
  }

  getMovieVideos(id: string){
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/videos?callback=JSONP_CALLBACK', {search})
                        .map( res => {
                          return res.json();
                        });
  }

  getSimilarMovies(id: string){
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'/similar?callback=JSONP_CALLBACK', {search})
                        .map ( res => {
                          return res.json();
                        });
  }

}
