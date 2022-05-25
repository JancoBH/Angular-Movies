import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../core/models/pagination.model';
import {GenresListModel} from '../../core/models/genres-list';
import {OnTVService} from './services/onTV.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {

  onTheAir: Array<PaginationModel> = [];
  genres: GenresListModel;
  totalResults: any;

  constructor(
    private onTvService: OnTVService
  ) {}

  ngOnInit() {
    this.getTvOnTheAir(1);
    this.onTvService.getGenres().subscribe( res => this.genres = res.genres);
  }

  getTvOnTheAir(page: number) {
    this.onTvService.getTvOnTheAir(page).pipe(take(1)).subscribe(
      res => {
        this.totalResults = res.total_results;
        this.onTheAir = res.results;
      }, error => console.log(error)
    );
  }

  changePage(event) {
    this.getTvOnTheAir(event.pageIndex + 1);
  }

}
