import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../admin-services/products.service';

@Component({
  selector: 'app-admin-prducts',
  templateUrl: './admin-prducts.component.html',
  styleUrls: ['./admin-prducts.component.scss'],
})
export class AdminPrductsComponent implements OnInit {
  retrievedProducts: any[] = [];
  products: any[] = [];
  searchFilter: any[] = [];
  constructor(private _ProductsService: ProductsService) {
    this._ProductsService.getproducts().subscribe({
      next: (response) => {
        if (response) {
          this.retrievedProducts = Object.entries(response);
          this.products = Object.entries(response);
        } else {
          this.retrievedProducts = [];
          this.products = [];
        }
      },
    });
  }

  deleteProduct(id: any) {
    let newArr: any[] = [];
    this._ProductsService.DeleteProduct(id).subscribe({
      next: (response) => {
        this.products.map((elm: any) => {

          if (elm[0] === id) {
          } else {
            newArr.push(elm);
          }


        });
        this.products = newArr;
      },
    });
  }

  filter(search: any) {
    if (search.value != '' || null) {
      // console.log(search.value)
      this.searchFilter = this.products.filter((p) =>
        p[1].title.toLowerCase().includes(search.value.toLowerCase())
      );
      this.products = this.searchFilter;
    } else {
      this.products = this.retrievedProducts;
    }
  }
  ngOnInit(): void {}
  // ---------------------------------------------------------------------------
  // new Component table
}
