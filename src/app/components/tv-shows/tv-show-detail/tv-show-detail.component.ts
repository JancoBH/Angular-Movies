import { Component, OnInit } from '@angular/core';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.css']
})
export class TvShowDetailComponent implements OnInit {

  tvShow: TvShowModel;
  isLoading = true;

  constructor(
    private onTvService: OnTVService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['url'];

      this.onTvService.getTVShow(id).subscribe( tvShow => {
        this.tvShow = tvShow;

        if (!this.tvShow) {
          alert('Server Error')
        } else {
          this.isLoading = false;
        }
      });

    });
  }

}
