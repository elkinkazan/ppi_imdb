import {MovieFilterFields} from "./movie-filter-fields.enum";

export interface MovieFilterFieldsValue {
  [MovieFilterFields.title]: string;
  [MovieFilterFields.year]: string;
}
