import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { RegisterComponent } from './features/register/register.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' },
];
