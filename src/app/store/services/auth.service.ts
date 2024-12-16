import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  currentUserData: any = null;

  isLoggedin() {
    let currentUSer: any = localStorage.getItem('currentUserData');
    return currentUSer || null;
  }

  isAdmin() {
    let admin: any = localStorage.getItem('isAdmin');
    // console.log(admin);
    return admin || null;
  }

  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _HttpClient: HttpClient,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    // get current user
    this.saveCurrentUSer();
  }

  saveCurrentUSer() {
    let userData: any = localStorage.getItem('currentUserData');
    if (userData !== null) {
      this.currentUserData = userData;
      let userId = JSON.parse(this.currentUserData)?.additionalUserInfo?.profile
        ?.id;
      let email = JSON.parse(this.currentUserData)?.user?.email;
      localStorage.setItem('userId', userId);
      // get admin
      this.checkAdmin().subscribe({
        next: (response: any) => {
          if (response) {
            response.map((elm: any) => {
              if (elm == email) {
                localStorage.setItem('isAdmin', 'true');
                this.isLoggedin();
                this.isAdmin();
              }
            });
          }
        },
      });
    }
  }

  checkAdmin() {
    return this._HttpClient.get(environment.database.url + 'admins.json');
  }

  // logout
  logout() {
    this._AngularFireAuth.signOut();
  }
}
