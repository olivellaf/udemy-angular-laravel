import { Component, OnInit } from '@angular/core';

import { Movie } from '../models/Movie';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies$: Promise<Movie[]> | undefined;

  constructor(private _movieServ: MoviesService) {

  }

  ngOnInit(): void {
    this.movies$ = this._movieServ.getAllMovies();
  }


  deleteMovie = (id: number | undefined) => {
      if(confirm('Are you sure, you want to delete this movie?')) {
        this._movieServ.deleteMovieById(id)
          .then( res => {
            alert('Movie removed properly');
          }).catch(err => {
            alert('Something went wrong.')
            console.log(err);
          }).finally( () => this.getMovies());
      }
  }

  getMovies() {
    this.movies$ = this._movieServ.getAllMovies();
    console.log(this.movies$);
  }
}
