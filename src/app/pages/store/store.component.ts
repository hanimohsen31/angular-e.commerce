import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from './../../admin/admin-services/products.service';
import { CartService } from './../../store/services/cart.service';
import { CategoriesService } from './../../admin/admin-services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  faCaretSquareLeft,
  faCaretSquareRight,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  userId: any;
  initialProducts: any;
  categories: any;
  categorySelected: any;
  filterdArray: any;
  userCartContent: any;
  durationInSeconds = 100;
  notificationShown = false;
  notificationContent = '';
  notificationColor = '';

  // icons
  faCartPlus = faCartPlus;
  faEye = faEye;

  // is logged in
  isLoggedIn = localStorage.getItem('currentUserData');

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _CategoriesService: CategoriesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}

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

  ngOnInit(): void {
    // user id
    this.userId = this._CartService.userId;

    // get products
    this._ProductsService.getproducts().subscribe({
      next: (response) => {
        if (response) {
          this.initialProducts = Object.entries(response);
          // ------------------------------------------
          // get selected
          this._ActivatedRoute.queryParamMap.subscribe({
            next: (response) => {
              if (response.get('value')) {
                this.categorySelected = response.get('value');
                this.filterdArray = this.initialProducts.filter((elm: any) => {
                  return elm[1].category == this.categorySelected;
                });
              } else {
                this.categorySelected = '';
                this.filterdArray = this.initialProducts;
              }
            },
          });
        }
      },
    });

    // get categories
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });

    // get quantity
    this._CartService.getUSerCart().subscribe({
      next: (response: any) => {
        this.userCartContent = response;
      },
    });
  }

  getItemQuantity(product: any) {
    let titleee = product[1].title;
    if (this.userCartContent[titleee]?.quantity) {
      return this.userCartContent[titleee].quantity;
    } else {
      return 0;
    }
  }

  // filter Products
  filter() {
    // category filter
    this._ActivatedRoute.queryParamMap.subscribe({
      next: (response) => {
        if (response.get('value')) {
          this.categorySelected = response.get('value');
          this.filterdArray = this.initialProducts.filter((elm: any) => {
            return elm[1].category == this.categorySelected;
          });
        } else {
          this.filterdArray = this.initialProducts;
          this.categorySelected = '';
        }
      },
    });
  }

  // add to cart
  useAddToCart(product: any) {
    console.log(product);
    this._CartService.addToCart(product[1]);
  }

  // delete from cart
  useDeleteFromCart(product: any) {
    this._CartService.deleteFromCart(product[1]);
  }

  // after change
  iconsAndText = [
    { icon: 'assets/images/ico1.png', text: 'Eco' },
    { icon: 'assets/images/ico2.png', text: 'Healthy' },
    { icon: 'assets/images/ico3.png', text: 'Yummy' },
    { icon: 'assets/images/ico4.png', text: 'Cheaply' },
  ];

  viewDetaisl(product: any) {
    console.log(product);
    // this._Router.navigate(['/product-details', product[1].imgurl.slice(27,-4)]);
    this._Router.navigate(['/product-details', product[0]]);
  }
}
