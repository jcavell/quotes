import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Auth} from "./auth.service";
import {AuthorisedToActivate} from "./authorisedToActivate";

@Injectable()
export class AuthForRepGuard implements CanActivate {

  authorisedToActivate: AuthorisedToActivate;

  constructor(private auth: Auth, private router: Router) {
    this.authorisedToActivate = new AuthorisedToActivate(auth, router, () => this.auth.isRep());
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authorisedToActivate.canActivate(next, state);
  }
}
