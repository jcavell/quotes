import {NavigationEnd, Router} from "@angular/router";
export class Refresher {

  constructor(router: Router) {
    router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }
}
