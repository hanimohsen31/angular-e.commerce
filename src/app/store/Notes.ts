// to add firebase to project
/**
 * firebase logout
 * firebase login
 * npm i @angular/fire
 * ng add @angular/fire
 * all app info will be added into environment.ts file
 */

// in app.module.ts
// firebase
/*
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
*/
/****************************/
/*
@NgModule({
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    provideDatabase(() => getDatabase())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
});
*/
/****************************************************************************************************************** */
// Main Problems till now
/**
 * can not move login retrieved data from navbar.component.ts into the auth.service.ts
 *
 */

// user.displayName
// user.email
// user.photoURL
// user.uid


// npm install firebase
// ng add @angular/fire
// ng add @ng-bootstrap/ng-bootstrap
// npm install @angular/forms --save
// ng add @angular/material
