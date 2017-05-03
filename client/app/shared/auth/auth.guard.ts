import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Auth} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      // if(this.auth.isAdmin()){
      //   return true;
      // } else {
      //   this.router.navigate(['unauthorized']);
      //   return false;
      // }
      return true;
    } else {
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return true;
    }
  }
}
