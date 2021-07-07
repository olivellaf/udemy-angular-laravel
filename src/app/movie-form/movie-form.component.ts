import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  public movieForm: FormGroup;
  public movie: Movie | undefined;
  public isEditing: boolean = false; // used for some changes on the form
  private routeParamId: string | number | null = 0; // default as 0 when we create a movie

  constructor(
    private _movieServ: MoviesService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.movieForm = this._formBuilder.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      synopsis: ['This is an example of a possible synopsis of the movie, larger than 15.'], // we let synopsis optional
      cover: ['https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1',
        [Validators.required, Validators.minLength(15)]],
    });
  }

  ngOnInit(): void {
    this.getMovie();
  }

  onSubmit = (form: FormGroup) => {
    console.log(form.valid);
    console.log(form.value);

    if(form.valid) {
      // we check if we are editing or not, and o one thing or another depending of.
      const call = (this.isEditing)  // the condition
        ? this._movieServ.updateMovie(this.routeParamId, form.value) // if its tru do this
        : this._movieServ.createMovie(form.value); // if not, do this

      call.then( res => {
        console.log(res);
        alert('Saved and added properly');
        this._router.navigateByUrl('/movies');
      }).catch( err => {
        alert('Something went wrong.');
        console.log(err);
      });
    }
  }

  getMovie = () => {
    this.routeParamId = this._activatedRoute.snapshot!.paramMap.get('id');
    if(this.routeParamId) {
      this.routeParamId = parseInt(this.routeParamId);
        if(this.routeParamId === 0) {
          this.isEditing = true;
          return;
        }
        this.isEditing = true;
        this._movieServ.getMovieById(this.routeParamId).then(res => {
          this.movieForm.setValue({
            title: res.title,
            year: res.year,
            synopsis: res.synopsis,
            cover: res.cover
          });

          console.log(res);

          console.log();
        }).catch(  err => {
          alert('Something went wrong. Check the console.');
          console.log(err);
        })
    }
  }

}
