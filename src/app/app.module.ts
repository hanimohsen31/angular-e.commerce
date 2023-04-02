// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// firebase
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AdminPrductsComponent } from './admin/admin-prducts/admin-prducts.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductFormEditComponent } from './admin/admin-product-form-edit/admin-product-form-edit.component';
import { AdminMaterialTableComponent } from './admin/admin-material-table/admin-material-table.component';
import { MaterialExampleModule } from './store/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesPipe } from './store/categories.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreComponent } from './pages/store/store.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { HeroComponent } from './components/hero/hero.component';
import { CategoryComponent } from './components/category/category.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    CartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminPrductsComponent,
    AdminOrdersComponent,
    FooterComponent,
    LoginComponent,
    AdminProductFormComponent,
    AdminProductFormEditComponent,
    AdminMaterialTableComponent,
    CategoriesPipe,
    StoreComponent,
    CommingSoonComponent,
    HeroComponent,
    CategoryComponent,
    SliderComponent,
    ProductComponent,
    SearchComponent,
    ProductDetailsComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    // table
    MaterialExampleModule,
    BrowserAnimationsModule,
    FontAwesomeModule

  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
