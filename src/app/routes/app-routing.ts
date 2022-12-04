import { Routes } from "@angular/router";
import { DashboardComponent } from "@app/pages/dashboard/dashboard.component";

export const APP_ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/dashboard" },
  { path: "dashboard", providers: [], component: DashboardComponent },
];
