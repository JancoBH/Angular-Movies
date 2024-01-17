import { Component, OnInit } from '@angular/core';
import {Actors} from '../models/actors';
import {MovieModel} from '../../content/models/movie.model';
import {MoviesService} from '../../content/services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  imports: [
    MatCardModule,
    NgIf,
    MatIconModule,
    MatTabsModule
  ],
  standalone: true
})
export class PersonComponent implements OnInit {

  person: Actors = new Actors();
  movies: MovieModel = new MovieModel();
  externalIds: Object = {};

  constructor(
    private _moviesSerice: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this._moviesSerice.getPersonDetail(id).subscribe(person => {
        this.person = person;
      }, error => console.log(error));
      this._moviesSerice.getPersonCast(id).subscribe(res => {
        this.movies = res.cast;
      }, error => console.log(error));

      this._moviesSerice.getPersonExternalData(id).subscribe(res => {
        this.externalIds = res;
      }, error => console.log(error));
    });
  }

}
