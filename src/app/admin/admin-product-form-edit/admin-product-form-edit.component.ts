import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from './../admin-services/categories.service';
import { ProductsService } from './../admin-services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-form-edit',
  templateUrl: './admin-product-form-edit.component.html',
  styleUrls: ['./admin-product-form-edit.component.scss'],
})
export class AdminProductFormEditComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  product: any = {};
  id: any;
  constructor(
    private _CategoriesService: CategoriesService,
    private _ProductsService: ProductsService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.id = this._ActivatedRoute.snapshot.paramMap.get('id');
  }

  EditProduct: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    category: new FormControl(1, [Validators.required]),
    imgurl: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._ProductsService.getproducts().subscribe({
      next: (response) => {
        this.products = response;
        this.product = response[this.id];
        this.EditProduct = new FormGroup({
          title: new FormControl(response[this.id].title, [
            Validators.required,
          ]),
          price: new FormControl(response[this.id].price, [
            Validators.required,
          ]),
          category: new FormControl(response[this.id].category, [
            Validators.required,
          ]),
          imgurl: new FormControl(response[this.id].imgurl, [
            Validators.required,
          ]),
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Submit Edit
  submitEditProductForm(EditProduct: FormGroup) {
    this._ProductsService.editProduct(this.id, EditProduct.value).subscribe({
      next: (response) => {
        console.log(response);
        this._Router.navigate(['/app-admin-material-table']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
