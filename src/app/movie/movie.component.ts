import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movie$: Promise<Movie> | undefined;

  constructor(private _movieServ: MoviesService,
              private _activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie = async() => {
    let routeParamId: string | number | null = this._activatedRoute.snapshot!.paramMap.get('id');

    if (routeParamId) {
      routeParamId = parseInt(routeParamId); // transform from string to number.
      this.movie$ = this._movieServ.getMovieById(routeParamId); // send the good number ID to the method
    }
  }

}
