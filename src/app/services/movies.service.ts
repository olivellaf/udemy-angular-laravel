import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private API_URL_ENDPOINT = environment.API_URL_ENDPOINT;

  constructor(private _http: HttpClient) {  }

  getAllMovies = async(): Promise<Movie[]> => {
    return await this._http.get(`${this.API_URL_ENDPOINT}movies`).toPromise() as Promise<Movie[]>;
  }

  getMovieById = async(id: number): Promise<Movie> => {
    return await this._http.get(`${this.API_URL_ENDPOINT}movies/${id}`).toPromise() as Promise<Movie>;
  }

  deleteMovieById = async(id: number | undefined): Promise<Object> => {
    return await this._http.delete(`${this.API_URL_ENDPOINT}movies/${id}`).toPromise() as Promise<Object>;
  }

  createMovie = async(movie: Movie): Promise<Object> => {
    return await this._http.post(`${this.API_URL_ENDPOINT}movies`, movie).toPromise();
  }

  updateMovie = async(id: string | number | null, movie: Movie): Promise<Object> => {
    return await this._http.put(`${this.API_URL_ENDPOINT}movies/${id}`, movie).toPromise();
  }
}
