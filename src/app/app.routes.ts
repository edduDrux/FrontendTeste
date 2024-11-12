import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductManagerComponent } from './component/product-manager/product-manager.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'manager', component: ProductManagerComponent },
  { path: 'product/add', component: ProductManagerComponent },
  { path: 'product/edit/:id', component: ProductManagerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];