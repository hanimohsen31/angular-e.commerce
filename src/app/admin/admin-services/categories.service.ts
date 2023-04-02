import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = `${environment.database.url}/categories.json`;

  constructor(private _HttpClient: HttpClient) {}

  getCategories(): Observable<any> {
    return this._HttpClient.get(this.url);
  }
}
