import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  showPopup: boolean;
  popupMsg: string;
  movie: Movie;
  loaded: boolean;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    public auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.loaded = false;
    this.showPopup = false;

    const queryID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(queryID);

    this.movieService
      .queryID2Movie(queryID)
      .then(movie => {
        this.movie = movie;
        this.loaded = true;
      })
      .catch(err => {
        this.popupMsg = `Failed to fetch movie with id: ${queryID}\n${err}`;
        this.displayPopup();
      });
  }

  addToCart(): void {
    this.movie.units_available--;
    this.cartService.addToCart(this.movie, 1)
      .then(_ => this.popupMsg = 'Cart updated successfully')
      .catch(err => {
        this.popupMsg = `Failed to update cart\n${err}`;
        this.movie.units_available++;
      })
      .finally(() => this.displayPopup())
  }


  displayPopup(hide: boolean = true): void {
    this.showPopup = true;
    if (hide)
      setTimeout(() => this.showPopup = false, 2000);
  }

}
