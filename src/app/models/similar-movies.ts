import {Movie} from "./movie";

export class SimilarMovies {
  public page: number;
  public results: Array<Movie>;
  public total_pages: number;
  public total_results: number;
}
