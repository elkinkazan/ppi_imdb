import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MovieFilterFields} from "../../model/movie-filter-fields.enum";
import {MovieFilterFieldsValue} from "../../model/movie-filter-fields-value";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filterChanged: EventEmitter<MovieFilterFieldsValue> = new EventEmitter<MovieFilterFieldsValue>();

  readonly MovieFilterFields: typeof MovieFilterFields = MovieFilterFields;

  private readonly destroy$ = new Subject<void>();
  // @ts-ignore
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterValue: MovieFilterFieldsValue) => this.filterChanged.emit(filterValue));
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

  searchMovie(searchForm: FormGroup) {
    this.filterChanged.emit(searchForm.value)
  }

}
