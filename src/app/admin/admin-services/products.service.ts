import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // url
  url = environment.database.url;
  // constructor
  constructor(private _HttpClient: HttpClient) {}
  // get
  getproducts(): Observable<any> {
    return this._HttpClient.get(this.url + '/products.json');
  }
  // add
  addProduct(product: any): Observable<any> {
    return this._HttpClient.post(this.url + '/products.json', product);
  }
  // delete
  DeleteProduct(prodId: any): Observable<any> {
    let deleteUrl = this.url + '/products/' + prodId + '.json';
    return this._HttpClient.delete(deleteUrl);
  }
  // edit
  editProduct(prodId: any, product: any): Observable<any> {
    let editUrl = this.url + '/products/' + prodId + '.json';
    return this._HttpClient.put(editUrl, product);
  }
}
