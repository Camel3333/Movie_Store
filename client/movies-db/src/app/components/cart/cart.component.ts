import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  showPopup: boolean;
  popupMsg: string;
  cartLoaded: boolean;
  cart: Cart[];
  totalCost: number;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.showPopup = false;
    console.log(this.showPopup);
    this.totalCost = 0;
    this.cartLoaded = false;
    this.cartService.getCart()
      .then(cart => {
        this.cart = cart;
        this.cart.forEach(item => {
          this.totalCost += item.price * item.amount;
        });
      })
      .catch(err => console.error(err))
      .finally(() => this.cartLoaded = true);
  }


  completeOrder(): void {
    this.cartService.completeOrder()
      .then(c => {
        this.popupMsg = 'Order has been completed successfully';
        this.cart = [];
      })
      .catch(err => this.popupMsg = `Failed to complete order\n${err}`)
      .finally(() => this.displayPopup());
  }

  displayPopup(hide: boolean = true): void {
    this.showPopup = true;
    if (hide)
      setTimeout(() => this.showPopup = false, 2000);
  }


}
