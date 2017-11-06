import {Reviewer} from './reviewer';

export class MovieReviews {

  public id: number;
  public page: number;
  public results: Array<Reviewer>;
  public total_pages: number;
  public total_results: number;

}
