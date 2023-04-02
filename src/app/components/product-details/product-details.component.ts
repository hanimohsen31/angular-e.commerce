import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../admin/admin-services/products.service';
import { CartService } from './../../store/services/cart.service';
import { CategoriesService } from './../../admin/admin-services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { faCaretSquareLeft, faCaretSquareRight, faEye } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _CategoriesService: CategoriesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

  id = this._ActivatedRoute.snapshot.params['id'];
  product: any;
  // icons
  faCartPlus = faCartPlus
  faEye = faEye
  
  durationInSeconds = 100;
  notificationShown = false;
  notificationContent = '';
  notificationColor = '';


  // add to cart
  useAddToCart(product: any) {
    console.log(product);
    this._CartService.addToCart(product[1]);
  }
  ngOnInit(): void {
    // user id

    // get products
    this._ProductsService.getproducts().subscribe({
      next: (response) => {
        let products = Object.entries(response);
        console.log(products);
        console.log(this.id);
        products.filter((elm, indx) => {
          if (elm[0] === this.id) {
            this.product = products[indx];
          }
        });
      },
    });
  }

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
