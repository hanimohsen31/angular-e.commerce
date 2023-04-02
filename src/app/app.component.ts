import { Component } from '@angular/core';
import {AuthService} from './store/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'angular-ecommerce';
  constructor(
    private _AuthService: AuthService
  ) {
    this._AuthService.saveCurrentUSer()
  }
}
