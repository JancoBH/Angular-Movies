import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

const params = new HttpParams();

@Injectable()
export class MoviesService {

  baseUrl: string;
  apiKey: string;
  language: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'Your-Api-Key';
    this.language = 'en-US';
  }

  getNowPlaying(page: number): Observable<any> {
    params.set('language', this.language);
    return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}`, {params})
  }

  searchMovies(searchStr: string, page: number): Observable<any> {
    params.set('language', this.language);
    return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}&page=${page}`, {params})
  }

    getPopular(page: number): Observable<any> {
    params.set('language', this.language);
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}`, {params})
  }

  getUpComingMovies(page: number): Observable<any> {
    params.set('language', this.language);
    return this.http.get(`${this.baseUrl}movie/upcoming?api_key=${this.apiKey}&page=${page}`, {params})
  }

  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/top_rated?api_key=${this.apiKey}`)
  }

  getGenres(): Observable<any> {
    params.set('language', 'en_US');
    return this.http.get(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`, {params})
  }

  getMoviesByGenre(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/${id}/movies?api_key=${this.apiKey}`)
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`)
  }

  getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}`)
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`)
  }

  getMovieVideos(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`)
  }

  getSimilarMovies(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/similar?api_key=${this.apiKey}`)
  }

  getPersonDetail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}`)
  }

  getPersonCast(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}`)
  }

}
