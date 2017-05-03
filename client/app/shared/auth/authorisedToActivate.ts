import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Auth} from "./auth.service";

type BooleanCallback = () => boolean;

export class AuthorisedToActivate implements CanActivate {

  constructor(private auth: Auth, private router: Router, private isAuthorised: BooleanCallback) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.authenticated()) {
      if (this.isAuthorised()) {
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return true;
    }
  }
}
