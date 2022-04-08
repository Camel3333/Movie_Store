import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../models/movie';
import { News } from "../../models/news";
import { NewsService } from "../../services/news.service";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  moviesLoaded: boolean;
  awaitingResponse: boolean;
  news: News[];
  newsLoaded: boolean;
  showPopup: boolean;
  popupMsg: string;

  constructor(
    private movieService: MovieService,
    private newsService: NewsService
  ) {
  }

  ngOnInit(): void {
    this.movies = [];
    this.moviesLoaded = false;
    this.news = [];
    this.newsLoaded = false;
    // load movie list
    this.loadMovies();
    this.loadNews();
  }

  loadMovies(): void {
    const offset = this.movies.length;
    this.awaitingResponse = true;

    this.movieService
      .getMovieList(offset)
      .then(movies => {
        this.movies.push(...movies);
        this.moviesLoaded = true;
      })
      .catch(err => {
        // display error msg
        this.popupMsg = 'Failed to load movies';
        this.displayPopup();
      })
      .finally(() => this.awaitingResponse = false);
  }

  loadNews(): void {
    this.newsService
      .getNewsList().then(
        news => {
          news.forEach(item => {
            const date = ('' + item.timestamp).split('-');
            const temp: News = {
              _id: item._id,
              title: item.title,
              message: item.message,
              timestamp: new Date(+date[2], +date[1] - 1, +date[0])
            };
            this.news.push(temp);
          });
          this.newsLoaded = true;
        }
      ).catch(err => {
        console.log('Failed to get news \n' + err);
      });
  }

  onFiltered(movies: Movie[]): void {
    this.movies = movies;
  }

  displayPopup(hide: boolean = true): void {
    this.showPopup = true;
    if (hide)
      setTimeout(() => this.showPopup = false, 2000);
  }
}
