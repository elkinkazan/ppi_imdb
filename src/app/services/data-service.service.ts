import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { MovieData } from "../model/moviedata";
import { Top250Data } from "../model/top250data";

@Injectable()
export class DataService {
  // can be a variable
  protected basePath = 'https://imdb-api.com/en/API/Top250Movies/';
  public defaultHeaders = new HttpHeaders();

  constructor(protected httpClient: HttpClient) { }

  public fetchTop250Movies(): Observable<Top250Data> {
    return this.httpClient.get<Top250Data>(this.basePath, {headers: this.defaultHeaders})
  }

  public getSpecificDataFromMovies():Observable<MovieData[]> {
    return this.fetchTop250Movies()
      .pipe(
        map(info => {
          return info.items.map( (item) =>
            ({id: item.id, title: item.title, year: item.year, imDbRating: item.imDbRating})
          )
        }),
      )
  }
}
