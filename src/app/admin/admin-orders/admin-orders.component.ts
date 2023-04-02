import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders: any;
  Object = Object;
  constructor(private _HttpClient: HttpClient) {}

  ngOnInit(): void {
    let arr3: any[] = [];

    this.getAdminOrders().subscribe({
      next: (response) => {
        let arr1 = Object.values(response);

        let arr2: any[] = [];
        arr1.map((elm) => {
          arr2.push(Object.values(elm));
        });

        let arr3: any[] = [];

        arr2.map((elm) => {
          elm.map((element: any) => {
            arr3.push(element);
          });
        });

        this.orders = arr3
      },
    });
  }
  getAdminOrders() {
    let url = environment.database.url;
    return this._HttpClient.get(url + 'orders.json');
  }

  getQuant(object: any) {
    // console.log(object);
    // console.log(object.quantity);
    return object.quantity;
  }
}
