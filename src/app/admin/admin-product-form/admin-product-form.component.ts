import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from './../admin-services/categories.service';
import { ProductsService } from './../admin-services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss'],
})
export class AdminProductFormComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private _CategoriesService: CategoriesService,
    private _ProductsService: ProductsService,
    private _Router: Router,
  ) {}

  ngOnInit(): void {
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  AddProduct = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    imgurl: new FormControl(null, [Validators.required]),
  });

  submitAddProductForm(AddProduct: FormGroup) {
    this._ProductsService.addProduct(AddProduct.value).subscribe({
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
