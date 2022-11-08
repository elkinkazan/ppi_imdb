import { Top250DataDetail } from "./top250datatetail";

export type MovieData = Pick<Top250DataDetail, "id" | "title" | "year" | "imDbRating">;
