import {RouterModule, Routes} from "@angular/router";
import {RepComponent} from "./rep/rep.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthForAdminGuard} from "./shared/auth/authForAdmin.guard";
import {UnauthorizedComponent} from "./shared/auth/unauthorized.component";
import {AuthForRepGuard} from "./shared/auth/authForRep.guard";

const appRoutes: Routes = [
  { path: 'reps', component: RepComponent, canActivate: [AuthForAdminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [AuthForAdminGuard, AuthForRepGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
