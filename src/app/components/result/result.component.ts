import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from "rxjs";
import { DataService } from "../../services/data-service.service";
import { MovieData } from "../../model/moviedata";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  private readonly destroy$ = new Subject<void>();
  movieListOriginal:MovieData[] = [];
  movieListFiltered:MovieData[] = [];
  displayedColumns: string[] = ['id', 'title', 'year', 'imDbRating']

  constructor( public dataService: DataService) {}

  ngOnInit() {
    this.dataService.getSpecificDataFromMovies()
      .pipe(
        tap(movies => {
          this.movieListOriginal = movies;
          this.movieListFiltered = this.movieListOriginal;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChanged(filterValue: any) {
    if (filterValue.title !== '') {
      this.movieListFiltered = this.movieListOriginal.filter(
        movie => movie.title.toLowerCase().includes(filterValue.title.toLowerCase()))
    } else {
      this.movieListFiltered = this.movieListOriginal
    };
    if (filterValue.year !== '') {
      this.movieListFiltered = this.movieListFiltered.filter(
        movie =>  movie.year.toLowerCase().includes(filterValue.year.toLowerCase()))
    };
  }
}
