import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { PaginationModel } from '../../core/models/pagination.model';
import { MoviesService } from './services/movies.service';
import { OnTVService } from './services/onTV.service';
import { ActivatedRoute, Router } from "@angular/router";
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MovieCardComponent } from "../../shared/components/poster-card-view/poster-card.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { TitleCasePipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-movies',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatPaginatorModule,
    MovieCardComponent,
    MatButtonModule,
    MatCardModule,
    TitleCasePipe,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ContentComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private tvShowsService = inject(OnTVService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  contentType = '';
  nowPlaying = signal<Array<PaginationModel>>([]);
  totalResults = signal(0);
  isLoading = signal(true);
  currentPage = signal(0);

  currentFilter = signal<string>('now_playing');
  selectedGenreId = signal<string | null>(null);
  selectedGenreName = signal<string | null>(null);
  genresList = signal<Array<{ id: number; name: string }>>([]);

  constructor() {
    this.contentType = this.router.url.split('?')[0].split('/')[1];
  }

  ngOnInit() {
    this.loadGenres();

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      const genreId = params['genre'];
      const genreName = params['genreName'];
      const filterParam = params['filter'];

      if (genreId) {
        this.selectedGenreId.set(genreId);
        this.selectedGenreName.set(genreName || 'Genre');
        this.currentFilter.set('genre');
        this.loadData(1);
      } else {
        this.selectedGenreId.set(null);
        this.selectedGenreName.set(null);
        const defaultFilter = this.contentType === 'movies' ? 'now_playing' : 'airing_today';
        const activeFilter = filterParam || defaultFilter;
        this.currentFilter.set(activeFilter);
        this.loadData(1);
      }
    });
  }

  loadGenres() {
    const service = this.contentType === 'movies' ? this.moviesService : this.tvShowsService;
    service.getGenres().pipe(take(1)).subscribe(
      res => {
        this.genresList.set(res.genres || []);
      },
      () => {}
    );
  }

  loadData(page: number) {
    this.isLoading.set(true);
    this.currentPage.set(page - 1);
    const filter = this.currentFilter();

    if (this.contentType === 'movies') {
      if (filter === 'genre') {
        const id = this.selectedGenreId();
        if (id) {
          this.moviesService.getMoviesByGenre(id, page).pipe(take(1)).subscribe(
            res => {
              this.totalResults.set(res.total_results || 100);
              this.nowPlaying.set(res.results);
              this.isLoading.set(false);
            },
            () => this.isLoading.set(false)
          );
        }
      } else {
        this.moviesService.getMovies(filter, page).pipe(take(1)).subscribe(
          res => {
            this.totalResults.set(res.total_results);
            this.nowPlaying.set(res.results);
            this.isLoading.set(false);
          },
          () => this.isLoading.set(false)
        );
      }
    } else {
      // TV Shows
      if (filter === 'genre') {
        const id = this.selectedGenreId();
        if (id) {
          this.tvShowsService.getTVShowByGenre(id, page).pipe(take(1)).subscribe(
            res => {
              this.totalResults.set(res.total_results || 100);
              this.nowPlaying.set(res.results);
              this.isLoading.set(false);
            },
            () => this.isLoading.set(false)
          );
        }
      } else {
        this.tvShowsService.getTVShows(filter, page).pipe(take(1)).subscribe(
          res => {
            this.totalResults.set(res.total_results);
            this.nowPlaying.set(res.results);
            this.isLoading.set(false);
          },
          () => this.isLoading.set(false)
        );
      }
    }
  }

  setFilter(filter: string) {
    this.selectedGenreId.set(null);
    this.selectedGenreName.set(null);
    this.currentFilter.set(filter);
    this.router.navigate([this.contentType], { queryParams: { filter: filter } });
  }

  setGenreFilter(id: string, name: string) {
    this.router.navigate([this.contentType], { queryParams: { genre: id, genreName: name } });
  }

  onGenreSelectChange(genreId: string | null) {
    if (genreId) {
      const genre = this.genresList().find(g => '' + g.id === genreId);
      if (genre) {
        this.setGenreFilter(genreId, genre.name);
      }
    } else {
      const defaultFilter = this.contentType === 'movies' ? 'now_playing' : 'airing_today';
      this.setFilter(defaultFilter);
    }
  }

  changePage(event: PageEvent) {
    this.loadData(event.pageIndex + 1);
  }
}
