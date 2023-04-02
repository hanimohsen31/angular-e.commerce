import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminPrductsComponent } from './admin/admin-prducts/admin-prducts.component';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { AdminProductFormEditComponent } from './admin/admin-product-form-edit/admin-product-form-edit.component';
import { AdminMaterialTableComponent } from './admin/admin-material-table/admin-material-table.component';
import { StoreComponent } from './pages/store/store.component';
import { CommingSoonComponent } from './pages/comming-soon/comming-soon.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  // pages
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'app-order-success', component: OrderSuccessComponent },
  { path: 'store', component: StoreComponent },
  { path: 'search', component: SearchComponent },
  { path: 'comming-soon', component: CommingSoonComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  // admin
  { path: 'admin-orders', component: AdminOrdersComponent },
  { path: 'admin-products', component: AdminPrductsComponent },
  { path: 'admin-product-form', component: AdminProductFormComponent },
  {
    path: 'admin-product-form-edit/:id',
    component: AdminProductFormEditComponent,
  },
  { path: 'app-admin-material-table', component: AdminMaterialTableComponent },
  // auth
  { path: 'login', component: LoginComponent },
  // others
  // { path: '',  component: HomeComponent},
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
  // { path: '/', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
