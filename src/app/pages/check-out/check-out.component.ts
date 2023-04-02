import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from './../../store/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  cart: any;
  showingArray: any;
  counter = 0;
  sum = 0;
  constructor(private _Router: Router, private _CartService: CartService) {}

  ngOnInit(): void {
    this._CartService.getUSerCart().subscribe({
      next: (response) => {
        this.cart = response;
        this.showingArray = Object.entries(response);
        this.showingArray.map(
          (elm: any) => (
            (this.counter += elm[1].quantity),
            (this.sum += elm[1].quantity * elm[1].product.price)
          )
        );
      },
    });
  }
  AddedProduct = new FormGroup({
    uname: new FormControl(null, [Validators.required]),
    adress: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });

  submitAddProductForm(AddedProduct: FormGroup) {
    let userData: any = JSON.parse(
      localStorage.getItem('currentUserData') || ''
    );

    let object = {
      form: AddedProduct.value,
      cart: this.cart,
      date: new Date(),
      user: localStorage.getItem('userId'),
      totalSum: this.sum,
      counter: this.counter,
      // ---------------
      idToken: userData.credential.idToken,
      // ---------------
      name: userData.additionalUserInfo.profile.name,
      email: userData.additionalUserInfo.profile.email,
      picture: userData.additionalUserInfo.profile.picture,
      id: userData.additionalUserInfo.profile.id,
      uid: userData.additionalUserInfo.profile.uid,
    };
    this._CartService.placeOrders(object).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(['/app-order-success']);
      },
      error: (error) => {
        console.log(error);
      },
    });
    console.log(AddedProduct);
  }
}
