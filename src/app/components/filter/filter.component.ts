import { Component, OnInit } from '@angular/core';
import { MovieFilterFields } from "../../model/movie-filter-fields.enum";
import { Subject } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  readonly MovieFilterFields: typeof MovieFilterFields = MovieFilterFields;
  private readonly destroy$ = new Subject<void>();
  // @ts-ignore
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.initForm();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      [MovieFilterFields.title]: [''],
      [MovieFilterFields.year]: [''],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchMovie(searchForm: FormGroup): void {
    this.router.navigate(['/result'],
      {queryParams: {
        title : searchForm.value.title.toLowerCase().trim(),
        year: searchForm.value.year.toLowerCase().trim()
      }}
    );
  }

}
