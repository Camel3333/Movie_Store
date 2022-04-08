import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  loaded: boolean;
  deleteForm: FormGroup;
  categories: FormControl;
  category: FormControl;
  validCategories: string[];
  showPopup: boolean;
  popupMsg: string;

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loaded = false;
    this.movieService
      .getValidCategories()
      .then(categories => {
        this.validCategories = categories;
        this.category = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]+")]);
        this.categoryForm = new FormGroup({
          'category': this.category,
        });
        this.deleteForm = new FormGroup({
          'categories': new FormControl()
        });
      })
      .finally(() => this.loaded = true)
  }

  submit(): void {
    if (this.categoryForm.valid) {
      this.movieService.addCategory(this.categoryForm.value.category)
        .then(c => this.popupMsg = 'Category added successfully.')
        .catch(err => this.popupMsg = `Failed to add category\n${err}`)
        .finally(this.displayPopup);
    }
    else {
      this.popupMsg = 'Invalid category data';
      this.displayPopup();
    }
  }


  deleteCategory(): void {
    const cat = this.deleteForm.value.categories;
    if (cat) {
      this.movieService.deleteCategory(cat)
        .then(c => this.popupMsg = 'Category deleted successfully.')
        .catch(err => this.popupMsg = `Failed to delete category\n${err}`)
        .finally(this.displayPopup);
    }
  }


  displayPopup(hide: boolean = true): void {
    this.showPopup = true;
    if (hide)
      setTimeout(() => this.showPopup = false, 2000);
  }
}
