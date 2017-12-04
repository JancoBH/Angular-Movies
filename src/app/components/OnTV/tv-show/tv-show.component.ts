import { Component, OnInit } from '@angular/core';
import {TvShowModel} from '../../../models/onTV/tvShow.model';
import {OnTVService} from '../../../services/onTV/onTV.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {

  tvShow: TvShowModel;
  isLoading = true;

  constructor(
    private onTvService: OnTVService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['id'];

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
