import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil, tap } from "rxjs";
import { DataService } from "../../services/data-service.service";
import { MovieData } from "../../model/moviedata";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private readonly destroy$ = new Subject<void>();

  title: string = '';
  year: string = '';
  movieListOriginal:MovieData[] = [];
  movieListFiltered:MovieData[] = [];
  displayedColumns: string[] = ['id', 'title', 'year', 'imDbRating']

  constructor( public dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    combineLatest([this.dataService.getSpecificDataFromMovies(), this.route.queryParams]).pipe(
      tap(([movies, params]) => {
          this.movieListOriginal = movies;
          this.movieListFiltered = this.movieListOriginal;
          this.title = params['title'] ?? '';
          this.year = params['year'] ?? '';
          this.onFilterChanged(this.title, this.year)
      }),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChanged(title: string, year: string): void {
    if (title !== '') {
      this.movieListFiltered = this.movieListOriginal.filter(
        movie => movie.title.toLowerCase().includes(title))
    } else {
      this.movieListFiltered = this.movieListOriginal
    };
    if (year !== '') {
      this.movieListFiltered = this.movieListFiltered.filter(
        movie =>  movie.year.toLowerCase().includes(year))
    };
  }
}
