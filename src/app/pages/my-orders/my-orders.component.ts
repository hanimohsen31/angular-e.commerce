import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  userId = localStorage.getItem('userId');
  orders: any;
  Object=Object
  constructor(private _HttpClient: HttpClient) {}

  ngOnInit(): void {
    console.log(this.userId);
    this.getMyOrders().subscribe({
      next: (response) => {
        this.orders = Object.entries(response);
        console.log(Object.entries(this.orders[1][1].cart));
        // console.log(Object.entries(this.orders[1].cart));
      },
    });
  }
  getMyOrders() {
    let url = environment.database.url;
    return this._HttpClient.get(url + 'orders/' + this.userId + '.json');
  }

  getQuant(object:any){
    console.log(object)
    console.log(object.quantity)
    return object.quantity
  }
}
