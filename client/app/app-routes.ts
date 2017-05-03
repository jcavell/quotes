import {RouterModule, Routes} from "@angular/router";
import {RepComponent} from "./rep/rep.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "./shared/auth/auth.guard";
import {UnauthorizedComponent} from "./shared/auth/unauthorized.component";

const appRoutes: Routes = [
  { path: 'reps', component: RepComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

 export const appRoutingProviders: any[] = [AuthGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
