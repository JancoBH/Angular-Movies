import {MovieModel} from './movie.model';

export class MoviePaginatorModel {

  public id: number;
  public dates: Object;
  public page: number;
  public results: Array<MovieModel>;
  public total_pages: number;
  public total_results: number;

}
