import { Routes } from '@angular/router';
import { DashboardPage } from '@app/pages/dashboard/dashboard.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardPage },
];
