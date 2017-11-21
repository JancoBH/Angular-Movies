import { Component, OnInit } from '@angular/core';
import {PaginatorModel} from '../../../models/paginator.model';
import {GenresListModel} from '../../../models/genres-list';
import {OnTVService} from '../../../services/onTV/onTV.service';

@Component({
  selector: 'app-all-tv-shows',
  templateUrl: './all-tv-shows.component.html',
  styleUrls: ['./all-tv-shows.component.css']
})
export class AllTvShowsComponent implements OnInit {

  onTheAir: Array<PaginatorModel> = [];
  genres: GenresListModel;
  max = 10;
  min = 0;
  step = 1;
  value = 0;
  thumbLabel = true;
  tickInterval = 10;

  constructor(private onTvService: OnTVService) { }

  ngOnInit() {
    this.getTvOnTheAir(1);
    this.onTvService.getGenres().subscribe( res => this.genres = res.genres);
  }

  getTvOnTheAir(page: number) {
    this.onTvService.getTvOnTheAir(page).subscribe(
      res => {
        this.onTheAir = res.results;
        this.onTheAir.forEach(np => np['isMovie'] = false);
      }, error => console.log(error)
    );
  }

}
