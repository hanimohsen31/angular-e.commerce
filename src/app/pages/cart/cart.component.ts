import { Component, OnInit } from '@angular/core';
import { CartService } from './../../store/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartCounter: any;
  cartArray: any;
  totalSum = 0;
  constructor(private _CartService: CartService) {}

  ngOnInit(): void {
    this.cartCounter = this._CartService.getQuantity().subscribe({
      next: (response) => (this.cartCounter = response),
    });
    // console.log(this.cartCounter)

    this._CartService.getUSerCart().subscribe({
      next: (response) => {
        this.cartArray = Object.values(response);
        // console.log(this.cartArray);
        this.cartArray.map(
          // (elm: any) => (this.totalSum += (+elm.product?.price ?? 0) * +elm.quantity)
          (elm: any) => (this.totalSum += +elm.product?.price  * +elm.quantity)
        );
      },
    });
  }

  // updateDekOmElview(){
  // bullshit
  // this.cartArray.map((elm:any) => {elm.product.title === product.title ? elm.quantity += 1: null})
  // }

  // add to cart
  useAddToCart(product: any) {
    // console.log(product);
    this._CartService.addToCart(product);
    this.cartArray.map((elm: any) => {
      elm.product.title === product.title ? (elm.quantity += 1) : null;
    });
    this.totalSum = 0;
    this.cartArray.map(
      (elm: any) => (this.totalSum += +elm.product?.price * +elm.quantity)
    );
  }

  // delete from cart
  useDeleteFromCart(product: any) {
    this._CartService.deleteFromCart(product);
    this.cartArray.map((elm: any) => {
      elm.product.title === product.title ? (elm.quantity -= 1) : null;
    });
    this.totalSum = 0;
    this.cartArray.map(
      (elm: any) => (this.totalSum += +elm.product?.price * +elm.quantity)
    );
  }

  notificationShown = false;
  notificationContent = '';
  notificationColor = '';
  notification(text: string) {
    if (text === 'add') {
      this.notificationShown = true;
      this.notificationContent = 'Added';
      this.notificationColor = 'blue';
      setTimeout(() => (this.notificationShown = false), 2000);
    } else if (text === 'delete') {
      this.notificationShown = true;
      this.notificationContent = 'Removed';
      this.notificationColor = 'red';
      setTimeout(() => (this.notificationShown = false), 2000);
    }
  }
}
