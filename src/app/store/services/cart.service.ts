import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  // userId: any;
  userId = localStorage.getItem('userId');
  url = environment.database.url;
  ServiceCartCounter = new BehaviorSubject<any>(0);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  ngOnInit() {}

  // get products
  getUSerCart() {
    return this._HttpClient.get(this.url + 'cart/' + this.userId + '.json');
  }

  // get cart quantity
  getQuantity() {
    let counter = 0;
    this.getUSerCart().subscribe({
      next: (response: any) => {
        if (response) {
          Object.values(response).map((elm: any) => (counter += +elm.quantity));
          this.ServiceCartCounter.next(counter);
        }
      },
    });
    return this.ServiceCartCounter;
  }

  getOneItemQuantity(item: any) {
    let cartUrl =
      this.url + 'cart/' + this.userId + '/' + item[1].title + '.json';
    return this._HttpClient.get(cartUrl);
  }

  // add to cart
  async addToCart(product: any) {
    let cartUrl =
      this.url + 'cart/' + this.userId + '/' + product.title + '.json';
    // object define
    let postProduct = {
      product: {
        category: product.category,
        imgurl: product.imgurl,
        price: product.price,
        title: product.title,
      },
      quantity: 1,
    };
    // wtf is this shit !!!??
    this._HttpClient.get(cartUrl).subscribe({
      next: (response: any) => {
        if (response) {
          postProduct.quantity = response.quantity + 1;
          this.ServiceCartCounter.next(this.ServiceCartCounter.value + 1);
          return this._HttpClient.put(cartUrl, postProduct).subscribe();
        } else {
          this.ServiceCartCounter.next(this.ServiceCartCounter.value + 1);
          return this._HttpClient.put(cartUrl, postProduct).subscribe();
        }
      },
    });
  }

  // delete from cart
  async deleteFromCart(product: any) {
    let cartUrl =
      this.url + 'cart/' + this.userId + '/' + product.title + '.json';
    // object define
    let postProduct = {
      product: {
        category: product.category,
        imgurl: product.imgurl,
        price: product.price,
        title: product.title,
      },
      quantity: 0,
    };
    // wtf is this shit !!!??
    this._HttpClient.get(cartUrl).subscribe({
      next: (response: any) => {
        if (response?.quantity > 1) {
          postProduct.quantity = response.quantity - 1;
          this.ServiceCartCounter.next(this.ServiceCartCounter.value - 1);
          return this._HttpClient.put(cartUrl, postProduct).subscribe();
        } else {
          this.ServiceCartCounter.next(this.ServiceCartCounter.value - 1);
          return this._HttpClient.delete(cartUrl).subscribe();
        }
      },
      error: (error) => console.log('error'),
    });
  }

  // clear cart
  clearCart() {
    let cartUrl = this.url + 'cart/' + this.userId + '.json';
    this.ServiceCartCounter.next(0);
    return this._HttpClient.delete(cartUrl);
  }

  // place orders
  placeOrders(order: any) {
    let cartUrl = this.url + 'orders/' + this.userId + '.json';
    this.clearCart().subscribe();
    return this._HttpClient.post(cartUrl, order);
  }
  // ---------------------------------------------
}
