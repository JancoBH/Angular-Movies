import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import {PaginationModel} from '../../../../core/models/pagination.model';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {SeoService} from '../../../../core/services/seo.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {take} from 'rxjs/operators';
import {OnTVService} from "../../services/onTV.service";
import {IMovie} from "../../interfaces/movie.interface";
import {ITV} from "../../interfaces/tv.interface";
import {IContent} from "../../interfaces/content.interface";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {MovieCardComponent} from "../../../../shared/components/poster-card-view/poster-card.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DatePipe,
        CdkDrag,
        CdkDragHandle,
        MovieCardComponent,
        MatProgressBar,
        MatIcon,
        MatButton,
        MatDialogContent,
        MatDialogTitle,
        NgOptimizedImage
    ]
})
export class DetailComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private tvShowsService = inject(OnTVService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private seo = inject(SeoService);
  private destroyRef = inject(DestroyRef);
  trailerDialog = inject(MatDialog);


  contentType = '';
  content = signal<Partial<IMovie | ITV | any>>({});
  recomendedContentList = signal<Array<PaginationModel>>([]);
  video = signal<IContent | null>(null);
  isLoading = signal(true);

  @ViewChild('matTrailerDialog') matTrailerDialog: TemplateRef<any>;

  constructor() {
    this.contentType = this.router.url.split('/')[1];
  }

  ngOnInit() {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      params => {
        const id = params['url'];

        if (this.contentType === 'movies') {
          this.getMovie(id);
          this.getMovieVideo(id);
          this.getRecomendedMovie(id);
        } else {
          this.getTVShow(id);
          this.getTVShowVideo(id);
          this.getRecomendedTVShow(id);
        }

      }
    );
  }

  getMovie(id: string) {
    this.isLoading.set(true);

    this.moviesService.getMovie(id).pipe(take(1)).subscribe(
      movie => {
        this.content.set(movie);
        this.generateSeo(movie);
        this.isLoading.set(false);
      }
    );
  }

  getMovieVideo(id: string) {
    this.moviesService.getMovieVideos(id).pipe(take(1)).subscribe(
      res => {
        if (res?.results?.length > 0) {
          const trailerList = res.results.filter((video: { type: string; }) => video.type === 'Trailer');
          const trailer = trailerList[0];
          trailer['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailer['key']);
          this.video.set(trailer);
        } else {
          this.video.set(null);
        }
      }
    );
  }

  getRecomendedMovie(id: string) {
    this.moviesService.getRecomendMovies(id).pipe(take(1)).subscribe(
      res => {
        this.recomendedContentList.set(res.results.slice(0, 12));
      }
    );
  }

  // TV
  getTVShow(id: string) {
    this.isLoading.set(true);

    this.tvShowsService.getTVShow(id).pipe(take(1)).subscribe(
      tvShow => {
        this.content.set(tvShow);
        this.generateSeo(tvShow);
        this.isLoading.set(false);
      }
    );
  }

  getTVShowVideo(id: string) {
    this.tvShowsService.getTVShowVideos(id).pipe(take(1)).subscribe(
      res => {
        if (res?.results?.length > 0) {
          const trailer = res.results.filter((video: { type: string; }) => video.type === 'Trailer')[0];
          trailer['url'] = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailer['key']);
          this.video.set(trailer);
        } else {
          this.video.set(null);
        }
      }
    );
  }

  getRecomendedTVShow(id: string) {
    this.tvShowsService.getRecomendTVShows(id).pipe(take(1)).subscribe(
      res => {
        this.recomendedContentList.set(res.results.slice(0, 12));
      }
    );
  }

  // Seo tags
  generateSeo(content: Partial<IMovie | ITV | any>) {
    this.seo.generateTags({
      title: `${content.title}`,
      description: `${content.overview}`,
      image: `https://image.tmdb.org/t/p/w780/${content.backdrop_path}`,
      slug: 'movie'
    });
  }

  openDialog(): void {
    const dialogRef = this.trailerDialog.open(this.matTrailerDialog, {});
    dialogRef.disableClose = false;
  }

}
