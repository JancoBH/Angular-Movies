import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnTVService {

  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = environment.theMovieDBApi;
    this.language = 'en-US';
    this.region = 'US'
  }

  getTVShows(type: string, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${type}?api_key=${this.apiKey}&page=${page}&language=${this.language}`)
  }

  getTvOnTheAir(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/on_the_air?api_key=${this.apiKey}&page=${page}&language=${this.language}`)
  }

  getTVShow(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}`)
  }

  getTVShowVideos(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}/videos?api_key=${this.apiKey}`)
  }

  getRecomendTVShows(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}tv/${id}/recommendations?api_key=${this.apiKey}`)
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/tv/list?api_key=${this.apiKey}&language=${this.language}`)
  }

  getTVShowByGenre(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${id}&include_null_first_air_dates=false`);
  }

}
