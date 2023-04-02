import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/store/services/auth.service';
import { CartService } from './../../store/services/cart.service';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;
  cartContent: any;
  quantity: any;

  // icons
  faUser = faUser;
  faSearch = faSearch;
  faOpencart = faOpencart;

  // auth
  isLoggedin: any = this._AuthService.isLoggedin()
  isAdmin: any = this._AuthService.isAdmin()


  constructor(
    private fireauth: AngularFireAuth,
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.fireauth.authState.subscribe((userData) => {
      return (this.user = userData);
    });


    this._CartService.getQuantity().subscribe({
      next: (response) => (this.quantity = response),
    });
  }

  signOutWithGoogle() {
    this._AuthService.logout();
  }
}
