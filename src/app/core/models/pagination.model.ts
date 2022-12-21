import {TvModel} from '../../features/content/models/tv.model';
import {MovieModel} from '../../features/content/models/movie.model';

export class PaginationModel {

  public dates?: Object;
  public page: number;
  public results: Array<MovieModel | TvModel>;
  public total_pages: number;
  public total_results: number;

}
