import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class MoovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3"
  private apiKey = "f75a547ab685e08253aaa55fc7cd6128"
  constructor(public http: Http) {}

  getLatestMovies(page = 1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.apiKey)
  }
  getMovieDetails(filmeid){
    return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.apiKey)
  }

}
