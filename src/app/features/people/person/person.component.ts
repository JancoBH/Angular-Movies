import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import {Actors} from '../models/actors';
import {MovieModel} from '../../content/models/movie.model';
import {MoviesService} from '../../content/services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatCardModule} from "@angular/material/card";

import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    MatCardModule,
    MatIconModule,
    MatTabsModule
]
})
export class PersonComponent implements OnInit {
  private _moviesSerice = inject(MoviesService);
  private router = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);


  person = signal<Actors>(new Actors());
  movies = signal<MovieModel>(new MovieModel());
  externalIds = signal<Record<string, string | undefined>>({});

  ngOnInit() {
    this.router.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params['id'];
      this._moviesSerice.getPersonDetail(id).subscribe(person => {
        this.person.set(person);
      }, error => console.log(error));
      this._moviesSerice.getPersonCast(id).subscribe(res => {
        this.movies.set(res.cast);
      }, error => console.log(error));

      this._moviesSerice.getPersonExternalData(id).subscribe(res => {
        this.externalIds.set(res);
      }, error => console.log(error));
    });
  }

}
