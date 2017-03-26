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
    search.set('language', 'es-ES');
    search.set('api_key', this.apiKey);
    return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
                        .map(res => {
                          return res.json()
                        });
  }

}
