import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  constructor(
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
  }

  onReadMore(): void {
    const queryID = this.movieService.movie2queryID(this.movie);
    this.router.navigate(['movies', queryID]);
  }
}
