import { Component, OnInit } from '@angular/core';
import {PaginatorModel} from '../../models/paginator.model';
import {GenresListModel} from '../../models/genres-list';
import {OnTVService} from '../../services/onTV/onTV.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {

  onTheAir: Array<PaginatorModel> = [];
  genres: GenresListModel;
  max = 10;
  min = 0;
  step = 1;
  value = 0;
  thumbLabel = true;
  tickInterval = 10;
  totalResults: any;

  constructor(private onTvService: OnTVService) { }

  ngOnInit() {
    this.getTvOnTheAir(1);
    this.onTvService.getGenres().subscribe( res => this.genres = res.genres);
  }

  getTvOnTheAir(page: number) {
    const getTVonTheAirSubs = this.onTvService.getTvOnTheAir(page).subscribe(
      res => {
        this.totalResults = res.total_results;
        this.onTheAir = res.results;
        this.onTheAir.forEach(np => np['isMovie'] = false);
      }, error => console.log(error),
      () => { if (getTVonTheAirSubs) { getTVonTheAirSubs.unsubscribe(); }}
    );
  }

  changePage(event) {
    this.getTvOnTheAir(event.pageIndex + 1);
  }

}
