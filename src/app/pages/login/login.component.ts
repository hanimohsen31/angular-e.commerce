import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../store/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AngularFireAuth: AngularFireAuth,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  logInWithGoogle() {
    return this._AngularFireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (response: any) => {
        console.log(response);
        localStorage.setItem('currentUserData', JSON.stringify(response));
        this._AuthService.saveCurrentUSer()
        this._Router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
