import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filtered = new EventEmitter<Movie[]>();

  filterForm: FormGroup;
  minPrice: FormControl;
  maxPrice: FormControl;
  categories: FormArray;
  validCategories: string[];
  loaded: boolean;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.minPrice = new FormControl('');
    this.maxPrice = new FormControl('');

    this.movieService
      .getValidCategories()
      .then(categories => {
        this.validCategories = categories;
        this.categories = new FormArray(this.validCategories.map(cat => new FormControl(false)));
        this.filterForm = new FormGroup({
          'minPrice': this.minPrice,
          'maxPrice': this.maxPrice,
          'categories': this.categories,
        });
      })
      .catch(console.error)
      .finally(() => this.loaded = true)
  }

  async filter({ minPrice, maxPrice, categories }): Promise<void> {
    // validation here

    const cats = categories
      .map((val, idx) => val ? this.validCategories[idx] : null)
      .filter(cat => cat !== null);

    try {
      const movies = await this.movieService.filterMovies(minPrice, maxPrice, cats);
      this.filtered.emit(movies);
    } catch (err) {
      // no idea what to do with filtering error
      console.log(err);
    }
  }

}
