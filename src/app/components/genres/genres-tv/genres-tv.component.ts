import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '../../../models/pagination.model';
import {ActivatedRoute} from '@angular/router';
import {OnTVService} from '../../../services/onTV/onTV.service';

@Component({
  selector: 'app-genres-tv',
  templateUrl: './genres-tv.component.html',
  styleUrls: ['./genres-tv.component.css']
})
export class GenresTvComponent implements OnInit {

  title: string;
  tvShow: Array<PaginationModel> = [];

  constructor(
    private onTVService: OnTVService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe( (params) => {
      const id = params['id'];
      this.title = params['name'];
      this.onTVService.getTVShowByGenre(id).subscribe( res => {
        this.tvShow = res.results;
      }, error => console.log(error));
    });
  }

}
