import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AuthForAdminGuard} from "./shared/auth/authForAdmin.guard";
import {UnauthorizedComponent} from "./shared/auth/unauthorized.component";
import {AuthForRepGuard} from "./shared/auth/authForRep.guard";
import {XsellComponent} from "./xsell/xsell.component";

const appRoutes: Routes = [
  { path: 'xsell', component: XsellComponent, canActivate: [AuthForAdminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [AuthForAdminGuard, AuthForRepGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
