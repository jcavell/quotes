import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AuthForAdminGuard} from "./shared/auth/authForAdmin.guard";
import {UnauthorizedComponent} from "./shared/auth/unauthorized.component";
import {AuthForRepGuard} from "./shared/auth/authForRep.guard";
import {XsellComponent} from "./xsell/xsell.component";
import {CompanyComponent} from "./company/company.component";
import {CustomerComponent} from "./customer/customer.component";

const appRoutes: Routes = [
  { path: 'companies', component: CompanyComponent, canActivate: [AuthForAdminGuard] },
  { path: 'customers', component: CustomerComponent, canActivate: [AuthForAdminGuard] },
  { path: 'xsells', component: XsellComponent, canActivate: [AuthForAdminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [AuthForAdminGuard, AuthForRepGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
